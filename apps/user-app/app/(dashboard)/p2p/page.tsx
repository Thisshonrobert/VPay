import P2pTransactions from '@components/P2pTransactions'
import { SendCard } from "@components/SendCard"
import { Calculatep2p } from '../../lib/action/Calculatep2p'
import { Suspense } from 'react';
import P2PSkeleton from '@components/Skeletons/P2PSkeleton';

async function P2p(){
  const transactions = await Calculatep2p();
  return (
    <div className="w-full flex flex-row justify-center gap-10">

      <SendCard />
      <div className="w-1/3 mt-[10%]">

        <P2pTransactions transactions={transactions} />

      </div>

    </div>
  )
}


export default function page() {
  return (
    <Suspense fallback={<P2PSkeleton />}>
      <P2p />
    </Suspense>
  )
}






