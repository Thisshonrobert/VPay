import { AddMoney } from "@components/AddMoneyCard";
import { BalanceCard } from "@components/BalanceCard";
import { OnRampTransactions } from "@components/OnRampTransactions";
import getBalance from "../../lib/action/getBalance";
import getRecentOnRampTransactions from "../../lib/action/getRecentOnRampTxn";
import { Suspense } from "react";
import TransferSkeleton from "@components/Skeletons/TransferSkeleton";
import { getServerSession } from "next-auth";
import { authOptions } from "app/lib/auth";
import { redirect } from "next/navigation";

async function TransferPage() {
    // Guard before querying: the actions derive userId from the session, and a
    // missing one reaches Prisma as NaN.
    const session = await getServerSession(authOptions);
    if (!session) redirect('/signin');

    const balance = await getBalance();
    const transactions = await getRecentOnRampTransactions();

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
            <header className="mb-6">
                <h1 className="font-display text-headline-md font-medium text-foreground">Add money</h1>
                <p className="mt-1 text-body-lg text-muted-foreground">
                    Move funds from your bank into your VPay wallet.
                </p>
            </header>

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                <AddMoney />

                <div className="space-y-6">
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    );
}

export default function page() {
    return (
        <Suspense fallback={<TransferSkeleton />}>
            <TransferPage />
        </Suspense>
    )
}

export const dynamic = "force-dynamic";
