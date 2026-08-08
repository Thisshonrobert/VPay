import P2pTransactions from '@components/P2pTransactions'
import { SendCard } from "@components/SendCard"
import { Calculatep2p } from '../../lib/action/Calculatep2p'
import { Suspense } from 'react';
import P2PSkeleton from '@components/Skeletons/P2PSkeleton';
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";
import { redirect } from "next/navigation";

async function P2p() {
  // Guard before querying: the actions derive userId from the session, and a
  // missing one reaches Prisma as NaN.
  const session = await getServerSession(authOptions);
  if (!session) redirect('/signin');

  const transactions = await Calculatep2p();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-6">
        <h1 className="font-display text-headline-md font-medium text-foreground">Pay a contact</h1>
        <p className="mt-1 text-body-lg text-muted-foreground">
          Send money instantly to anyone on VPay.
        </p>
      </header>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <SendCard />
        <P2pTransactions transactions={transactions} />
      </div>
    </div>
  )
}

export default function page() {
  return (
    <Suspense fallback={<P2PSkeleton />}>
      <P2p />
    </Suspense>
  )
}

export const dynamic = "force-dynamic";
