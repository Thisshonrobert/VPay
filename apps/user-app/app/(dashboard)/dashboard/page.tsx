import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "ui";
import { authOptions } from "app/lib/auth";
import {
  Activity,
  CreditCard,
  DollarSign,
  Users
} from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import getBalance from "app/lib/action/getBalance";
import getAllOnRampTxn from "app/lib/action/getAllOnRampTxn";
import getByMonth from "app/lib/action/getByMonth";
import { Graph } from "@components/Graph";
import { Suspense } from "react";
import { DashboardSkeleton } from "@components/Skeletons/DashboardSkeleton";

async function Dashboard() {
  const session = await getServerSession(authOptions);
  const balance = await getBalance();
  const transactions = await getAllOnRampTxn();
  const monthlyTxn = await getByMonth();
  if (!session) {
    redirect('/signin')
  }
  let sentAmt = 0, receivedAmt = 0;
  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i]
    if (t.status === "Sent")
      sentAmt += t.amount;
    else if (t.status === 'Received')
      receivedAmt += t.amount;
  }

  return <div className="w-full p-4 md:p-8 overflow-hidden">
    <div className="text-4xl text-[#6a51a6] font-extrabold mb-8">
      Good Day, {session?.user.name}
    </div>
    <main className="flex flex-1 flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Sent Amount
            </CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{sentAmt / 100}</div>
            <p className="text-sm text-muted-foreground">
              -amount you sent to peers
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">
              Received Amount
            </CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{receivedAmt / 100}</div>
            <p className="text-sm text-muted-foreground">
              +amount you received from peers
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Locked</CardTitle>
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{balance.locked / 100}</div>
            <p className="text-sm text-muted-foreground">
              amount processing
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Total Balance</CardTitle>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹{balance.amount / 100}</div>
            <p className="text-sm text-muted-foreground">
              total wallet amount
            </p>
          </CardContent>

        </Card>
      </div>
      <div className="max-w-4xl lg:ml-16 mt-8">
        <Graph transactions={monthlyTxn} />
      </div>
    </main>
  </div>
}

export default function Page() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";