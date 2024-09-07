import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

const getByMonth = async () => {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user.id);
  
    const sentTransfers = await prisma.p2pTransfer.findMany({
      where: {
        fromUserId: userId,
        timeStamp: {
          gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)), // Get data for the past year
        },
      },
      orderBy: {
        timeStamp: 'asc',
      },
    });
  
    const receivedTransfers = await prisma.p2pTransfer.findMany({
      where: {
        toUserId: userId,
        timeStamp: {
          gte: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        },
      },
      orderBy: {
        timeStamp: 'asc',
      },
    });
    console.log("Sent Transfers:", sentTransfers);
    console.log("Received Transfers:", receivedTransfers);
  
    // Initialize an array with 12 months (January to December) for the current year
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString('default', { month: 'long' }),
      sent: 0,
      received: 0,
    }));
  
    // Aggregate sent transactions by month
    sentTransfers.forEach((txn) => {
      const month = txn.timeStamp.getMonth();
      months[month].sent += txn.amount/100;
    });
    console.log("Months after sent aggregation:", months);
    // Aggregate received transactions by month
    receivedTransfers.forEach((txn) => {
      const month = txn.timeStamp.getMonth();
      months[month].received += txn.amount/100;
    });
    console.log("Months after received aggregation:", months);
  
    return months; // Return aggregated data for each month
  };

  export default getByMonth
  