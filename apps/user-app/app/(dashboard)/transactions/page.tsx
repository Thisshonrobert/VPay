import getAllOnRampTxn from "app/lib/action/getAllOnRampTxn";
import { Suspense } from "react";
import TransactionSkeleton from "@components/Skeletons/TransactionSkeleton";
import { Avatar } from "@components/Avatar";
import { formatPaiseCompact, formatRelativeDay } from "app/lib/format";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";
import { redirect } from "next/navigation";

type Txn = {
  name: string;
  email: string;
  status: string;
  time: Date;
  amount: number;
};

const STATUS_STYLES: Record<string, string> = {
  Success: "bg-gpay-green-container text-gpay-green",
  Received: "bg-gpay-green-container text-gpay-green",
  Sent: "bg-gpay-blue-container text-gpay-blue",
  Processing: "bg-gpay-yellow-container text-gpay-yellow",
  Failure: "bg-gpay-red-container text-gpay-red",
};

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-label-md ${STATUS_STYLES[status] ?? "bg-muted text-muted-foreground"
        }`}
    >
      {status}
    </span>
  );
}

/** Bucket transactions under day headings, newest day first. */
function groupByDay(transactions: Txn[]): [string, Txn[]][] {
  const groups = new Map<string, Txn[]>();

  for (const t of transactions) {
    const key = formatRelativeDay(t.time);
    const bucket = groups.get(key);
    if (bucket) bucket.push(t);
    else groups.set(key, [t]);
  }

  return Array.from(groups.entries());
}

async function TransactionPage() {
  // Guard before querying: the actions derive userId from the session, and a
  // missing one reaches Prisma as NaN.
  const session = await getServerSession(authOptions);
  if (!session) redirect('/signin');

  const transactions = (await getAllOnRampTxn()) as Txn[];
  const groups = groupByDay(transactions);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-6">
        <h1 className="font-display text-headline-md font-medium text-foreground">Activity</h1>
        <p className="mt-1 text-body-lg text-muted-foreground">
          Every payment across your VPay wallet.
        </p>
      </header>

      {transactions.length === 0 ? (
        <div className="rounded-m3-xl border border-border bg-card px-6 py-16 text-center shadow-m3-1">
          <span className="gpay-tile mx-auto mb-4 h-14 w-14 bg-secondary text-muted-foreground">
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </span>
          <p className="font-display text-title-lg text-foreground">No transactions yet</p>
          <p className="mt-1 text-body-md text-muted-foreground">
            Your payments will show up here once you start using the wallet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map(([day, items]) => (
            <section key={day}>
              <h2 className="mb-2 px-1 text-label-lg uppercase tracking-wide text-muted-foreground">
                {day}
              </h2>

              <ul className="overflow-hidden rounded-m3-xl border border-border bg-card shadow-m3-1 divide-y divide-border">
                {items.map((t, index) => {
                  const outgoing = t.status === "Sent";
                  const failed = t.status === "Failure";
                  return (
                    <li key={index} className="state-layer flex items-center gap-4 px-4 py-3.5 sm:px-5">
                      <Avatar name={t.name} />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-body-lg text-foreground">{t.name}</p>
                        <p className="truncate text-body-sm text-muted-foreground">{t.email}</p>
                      </div>

                      <div className="hidden sm:block">
                        <StatusPill status={t.status} />
                      </div>

                      <div className="shrink-0 text-right">
                        <p
                          className={`tabular font-display text-title-md font-semibold ${failed
                            ? "text-muted-foreground line-through"
                            : outgoing
                              ? "text-foreground"
                              : "text-gpay-green"
                            }`}
                        >
                          {outgoing ? "−" : "+"}{formatPaiseCompact(t.amount)}
                        </p>
                        <div className="mt-1 sm:hidden">
                          <StatusPill status={t.status} />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default function page() {
  return (
    <Suspense fallback={<TransactionSkeleton />}>
      <TransactionPage />
    </Suspense>
  )
}

export const dynamic = "force-dynamic";
