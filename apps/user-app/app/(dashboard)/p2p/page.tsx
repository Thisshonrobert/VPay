import prisma from '@repo/db/client'
import { getServerSession } from 'next-auth'
import P2pTransactions from '../../../components/P2pTransactions'
import { SendCard } from "../../../components/SendCard"
import { authOptions } from '../../lib/auth'

async function Calculatep2p() {
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
  });

  return transactions.map((t) => ({
    time: t.timeStamp,
    amount: t.amount,
    senderName: t.fromUser.name!, 
    recieverName: t.toUser.name!,     
    direction: t.fromUserId === Number(session!.user.id) ? 'Sent' : 'Received',
  }));
}

const page = async() => {
  const transactions = await Calculatep2p();
  return (
    <div className="w-full flex flex-row justify-center gap-10">
      
      <SendCard/>
      <div className="w-1/3 mt-36">
        
      <P2pTransactions transactions={transactions} />
      
      </div>
      
      
     
      
    </div>
  )
}

export default page



