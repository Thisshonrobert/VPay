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


export default async function() {
    const session = await getServerSession(authOptions);
    const balance = await getBalance();
    const transactions = await getAllOnRampTxn();
    const monthlyTxn = await getByMonth();
    let sentAmt = 0,receivedAmt=0;
    for(let i=0;i<transactions.length;i++){
      const t = transactions[i]
      if(t.status==="Sent")
        sentAmt+=t.amount;
      else if(t.status==='Received')
        receivedAmt+=t.amount;
    }

    //All can be done by this
//     const sentAmt = transactions
//   .filter(t => t.status === "Sent")
//   .reduce((total, t) => total + t.amount, 0);

// const receivedAmt = transactions
//   .filter(t => t.status === "Received")
//   .reduce((total, t) => total + t.amount, 0);


    if(!session)
        {
         redirect('/signin')
        } 
     
    return <div className="w-screen">
        <div className="text-3xl text-[#6a51a6] pt-4 mb-4 font-bold">
            Good Day,{session?.user.name}
        </div>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card x-chunk="dashboard-01-chunk-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
              Sent Amount
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{sentAmt/100}</div>
              <p className="text-xs text-muted-foreground">
                -amount you sent to peers
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
              Received Amount
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{receivedAmt/100}</div>
              <p className="text-xs text-muted-foreground">
                +amount you received from peers 
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Locked</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{balance.locked/100}</div>
              <p className="text-xs text-muted-foreground">
                amount processing
              </p>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-01-chunk-3">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{balance.amount/100}</div>
              <p className="text-xs text-muted-foreground">
                total wallet amount
              </p>
            </CardContent>
         
          </Card>
        </div>
        <div className="max-w-3xl lg:ml-32">
        <Graph transactions={monthlyTxn}/>
        </div>
        </main>
    </div>
}
// export const dynamic = "force-dynamic";


// the amount should be locked when it is processed by the bank , since i dont have bank server the locked is always 0