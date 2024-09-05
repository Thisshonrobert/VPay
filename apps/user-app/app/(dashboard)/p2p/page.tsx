import P2pTransactions from '@components/P2pTransactions'
import { SendCard } from "@components/SendCard"
import { Calculatep2p } from '../../lib/action/Calculatep2p'



const page = async () => {
  const transactions = await Calculatep2p();
  return (
    <div className="w-full flex flex-row justify-center gap-10">

      <SendCard />
      <div className="w-1/3 mt-36">

        <P2pTransactions transactions={transactions} />

      </div>

    </div>
  )
}

export default page



