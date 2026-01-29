import { Badge } from "ui"
import { Card } from "ui/prebuilt/index"

export enum OnRampStatus {
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
            {transactions.map((t, index) =>
                <div key={index} className="flex justify-between">
                    <div>
                        <div className="text-sm">
                            Received INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>

                    </div>
                    <Badge className={`text-xs rounded-full h-5 ${t.status === "Success" ? "border-green-500 text-green-700 bg-green-50" :
                            t.status === "Processing" ? "border-yellow-500 text-yellow-700 bg-yellow-50" :
                                "border-red-500 text-red-700 bg-red-50"
                        }`} variant="outline">{t.status}</Badge>
                    <div className="flex flex-col justify-center">
                        <div>+ Rs {t.amount / 100}</div>

                    </div>

                </div>)}
        </div>
    </Card>
}