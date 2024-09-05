'use server'

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function Calculatep2p() {
    const session = await getServerSession(authOptions);
  
    const transactions = await prisma.p2pTransfer.findMany({
      where: {
        OR: [
          {
            fromUserId: Number(session?.user.id),
          },
          {
            toUserId: Number(session?.user.id),
          },
        ],
      },
      include: {
        fromUser: true, // Include sender user details
        toUser: true,   // Include receiver user details
      },
      take:5,
      orderBy:{
        timeStamp:"desc"
      }
    });
  
    return transactions.map((t) => ({
      time: t.timeStamp,
      amount: t.amount,
      senderName: t.fromUser.name, 
      recieverName: t.toUser.name,     
      direction: t.fromUserId === Number(session!.user.id) ? 'Sent' : 'Received',
    }));
  }