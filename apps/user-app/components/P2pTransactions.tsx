import { Card, Text } from "@radix-ui/themes";
import React from "react";

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
    <Card className="p-4 bg-white shadow-md rounded-lg w-full" title="Recent Transactions">
      <div className="grid grid-cols-3 gap-4">
        {transactions.map((t) => (
          <div className="flex flex-col py-2 space-y-2" key={t.time.toISOString()}>
            <div>
              <Text className="text-md">{t.direction} INR</Text>
              <Text className="text-slate-600 text-md">
                {t.time.toDateString()}
              </Text>
            </div>
            <div className="text-sm">
              {t.direction === "Sent"
                ? "to " + t.recieverName
                : "from " + t.senderName}
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
