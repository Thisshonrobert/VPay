import { Card, Heading, Text } from "@radix-ui/themes";

const P2pTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    senderName: string;
    recieverName: string;
    direction: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card
        className="p-4 bg-white shadow-md rounded-lg w-full"
        title="Recent Transactions"
      >
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    
    <Card className="p-4 bg-white shadow-md rounded-lg w-full " title="Recent Transactions">
      <div >
        <Heading as="h3">Recent Transactions</Heading>
        <div className="flex justify-between mt-2">
        <Heading size='2' as="h6">Sent/Received</Heading>
        <Heading size='2' as="h6">Username</Heading>
        <Heading size='2' as="h6">Amount</Heading>
        </div>
        {transactions.map((t,index) => (
          <div className="flex justify-between py-2 space-y-2" key={index}>
            <div className="flex flex-col">
              <Text className="text-md">{t.direction} INR</Text>
              <Text className="text-slate-600 text-md">
                {t.time.toLocaleDateString()}
              </Text>
            </div>
            <div className="text-md ">
              {t.direction === "Sent"
                ?  t.recieverName
                :  t.senderName}
            </div>
            <div className="text-right">
              <Text className={t.direction === "Sent" ? "text-red-500" : "text-green-500"}>
                {t.direction === "Sent" ? "-" : "+"} Rs {t.amount / 100}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Card>
   
  );
};

export default P2pTransactions;
