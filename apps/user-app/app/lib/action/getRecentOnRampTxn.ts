'use server'
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

async function getRecentOnRampTransactions() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        throw new Error("User not authenticated");
    }

    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session.user.id),
        },
        take: 5, // Correct way to limit the number of records
        orderBy: {
            startTime: 'desc', // Order by startTime if you want the most recent transactions first
        },
    });

    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider,
    }));
}

export default getRecentOnRampTransactions;
