import { Card } from "ui/prebuilt/index"

export enum OnRampStatus{
    Success = 'Success',
  Failure = 'Failure',
  Processing = 'Processing'
}

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: OnRampStatus | string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                    
                </div>
                <div>{t.status}</div>
                <div className="flex flex-col justify-center">
                   <div>+ Rs {t.amount / 100}</div> 
                     
                </div>

            </div>)}
        </div>
    </Card>
}