import { OnRampTransactions } from "@components/OnRampTransactions";
import getAllOnRampTxn from "../../lib/action/getAllOnRampTxn";


export default async function() {
    const transactions = await getAllOnRampTxn();

    return(
        <div>
            
        </div>
    )
        
}