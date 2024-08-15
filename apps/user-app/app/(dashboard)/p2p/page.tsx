import React from 'react'
import {SendCard} from "../../../components/SendCard"
import { Card,Box } from '@radix-ui/themes'
import { Center } from '@repo/ui/center'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import prisma from '@repo/db/client'
import P2pTransactions from '../../../components/P2pTransactions'

async function Calculatep2p() {
  const session = await getServerSession(authOptions);

  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        {
          fromUserId: Number(session.user.id),
        },
        {
          toUserId: Number(session.user.id),
        },
      ],
    },
    include: {
      fromUser: true, // Include sender user details
      toUser: true,   // Include receiver user details
    },
  });

  return transactions.map((t) => ({
    time: t.timeStamp,
    amount: t.amount,
    senderName: t.fromUser.name!, 
    recieverName: t.toUser.name!,     
    direction: t.fromUserId === Number(session.user.id) ? 'Sent' : 'Received',
  }));
}

const page = async() => {
  const transactions = await Calculatep2p();
  return (
    <div className="w-full flex flex-row justify-center gap-10">
      
      <SendCard/>
      <div className="w-1/2">
        
      <P2pTransactions transactions={transactions} />
      
      </div>
      
      
     
      
    </div>
  )
}

export default page



