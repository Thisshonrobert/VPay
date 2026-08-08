import prisma from './index';

const STALE_STATUSES = ['Initiated', 'Processing'] as const;

export type ReconcileResult = {
  scanned: number;
  expired: number;
  wonRace: number[];
};

/**
 * Fails any onramp transaction that has sat in Initiated/Processing longer
 * than `timeoutMs` and releases its locked balance back to "available".
 *
 * Each row is flipped with a conditional UPDATE (status still stale at the
 * moment of writing) inside its own transaction, so a webhook that resolves
 * the same row concurrently always wins the race: our UPDATE then matches
 * zero rows and we skip the balance decrement entirely. This avoids double-
 * crediting/debiting without needing a global lock across all stale rows.
 */
export async function expireStaleOnRampTransactions(
  timeoutMs: number
): Promise<ReconcileResult> {
  const cutoff = new Date(Date.now() - timeoutMs);

  const stale = await prisma.onRampTransaction.findMany({
    where: {
      status: { in: [...STALE_STATUSES] },
      startTime: { lt: cutoff },
    },
    select: { id: true, userId: true, amount: true },
  });

  const wonRace: number[] = [];

  for (const txn of stale) {
    await prisma.$transaction(async (tx) => {
      const flipped = await tx.onRampTransaction.updateMany({
        where: {
          id: txn.id,
          status: { in: [...STALE_STATUSES] },
        },
        data: { status: 'Failure' },
      });

      // count === 0 means a webhook already resolved this row since we listed
      // it — leave the balance alone, it was already handled there.
      if (flipped.count === 1) {
        await tx.balance.updateMany({
          where: { userId: txn.userId },
          data: { locked: { decrement: txn.amount } },
        });
        wonRace.push(txn.id);
      }
    });
  }

  return { scanned: stale.length, expired: wonRace.length, wonRace };
}
