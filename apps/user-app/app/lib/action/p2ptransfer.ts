'use server'
import prisma from "@repo/db/client"; 
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { useMessage } from "hooks/useMessage";

export async function p2ptransfer(tonumber: string, amount: number) {
  const session = await getServerSession(authOptions);
  const fromUserId = session?.user.id;
  const {bark} = useMessage();

  if (!fromUserId) {
    return { message: "Error while sending" };
  }

  const toUser = await prisma.user.findFirst({
    where: { number: tonumber }
  });

  if (!toUser) {
    return { message: "User not found" };
  }

  try {
    // Start transaction
    await prisma.$transaction(async (txn) => {
      // Lock the balance row for the sender
      await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(fromUserId)} FOR UPDATE`;

      // Fetch the sender's balance
      const fromBalance = await txn.balance.findUnique({
        where: { userId: Number(fromUserId) }
      });

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient Balance");
      }

      // Update sender's balance
      await txn.balance.update({
        where: { userId: Number(fromUserId) },
        data: { amount: { decrement: amount } }
      });

      // Update receiver's balance
      await txn.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } }
      });

      // Create the P2P transfer record
      await txn.p2pTransfer.create({
        data: {
          fromUserId: Number(fromUserId),
          toUserId: toUser.id,
          amount,
          timeStamp: new Date(),
          Status: "Success" 
        }
      });
    });
    bark({ message: "transfer Successfull", success: true });
  } catch (error) {
    
    console.error("P2P transfer failed:", error.message);
    await prisma.p2pTransfer.create({
      data: {
        fromUserId: Number(fromUserId),
        toUserId: toUser.id,
        amount,
        timeStamp: new Date(),
        Status: "Failure" 
      }
    });
    bark({ message: "P2P transfer failed", success: false });

    return { message: "P2P transfer failed" };
  }

  return { message: "P2P transfer successful" };
}
