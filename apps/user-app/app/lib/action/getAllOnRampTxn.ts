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
      },
      include:{
        user:true
      }
})
const sentTransfers = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: userId
    },
    orderBy: {
      timeStamp: 'desc'
    },
    include:{
      toUser:true
    }
  });

  const receivedTransfers = await prisma.p2pTransfer.findMany({
    where: {
      toUserId: userId
    },
    orderBy: {
      timeStamp: 'desc'
    },
    include:{
      fromUser:true
    }
  });



const Alltransactions = [
    ...OnRamptransactions.map((t)=>({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        name: t.provider,
        number:t.user.number
        })),
    ...sentTransfers.map((t)=>({
        time: t.timeStamp,
        amount: t.amount,
        status: t.Status === "Success"? "Sent":"Failure",
        name: t.toUser.name,
        number : t.toUser.number,
    })),
    ...receivedTransfers.map(
        (tx) => 
            ({
        time: tx.timeStamp,
        amount: tx.amount,
        status: tx.Status === "Success"? "Received":"Failure",
        name: tx.fromUser.name,
        number : tx.fromUser.number
      })
    )    
]

Alltransactions.sort((a, b) => b.time.getTime() - a.time.getTime());

return Alltransactions;
   
}

export default getAllOnRampTxn;