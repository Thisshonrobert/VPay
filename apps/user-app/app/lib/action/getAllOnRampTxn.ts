'use server';

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";


const getAllOnRampTxn = async()=>{
    const session = await getServerSession(authOptions)
    const userId = Number(session?.user.id);
const OnRamptransactions = await prisma.onRampTransaction.findMany({
    where:{
        userId:userId
    },
    orderBy: {
        startTime: 'desc'
      }
})
const sentTransfers = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: userId
    },
    orderBy: {
      timeStamp: 'desc'
    }
  });

  const receivedTransfers = await prisma.p2pTransfer.findMany({
    where: {
      toUserId: userId
    },
    orderBy: {
      timeStamp: 'desc'
    }
  });



const Alltransactions = [
    ...OnRamptransactions.map((t)=>({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
        })),
    ...sentTransfers.map((t)=>({
        time: t.timeStamp,
        amount: t.amount,
        status: t.Status,
        toUserId: t.toUserId
    })),
    ...receivedTransfers.map(
        (tx) => 
            ({
        type: 'p2pReceived',
        time: tx.timeStamp,
        amount: tx.amount,
        fromUserId: tx.fromUserId
      })
    )    
]

Alltransactions.sort((a, b) => b.time.getTime() - a.time.getTime());

return Alltransactions;
   
}

export default getAllOnRampTxn;