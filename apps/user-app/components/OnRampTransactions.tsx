import { formatPaiseCompact, formatRelativeDay } from "app/lib/format";

export enum OnRampStatus {
    Success = 'Success',
    Failure = 'Failure',
    Processing = 'Processing'
}

const STATUS_STYLES: Record<string, string> = {
    Success: "bg-gpay-green-container text-gpay-green",
    Processing: "bg-gpay-yellow-container text-gpay-yellow",
    Failure: "bg-gpay-red-container text-gpay-red",
};

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
    return (
        <section className="rounded-m3-xl border border-border bg-card p-5 shadow-m3-1 sm:p-6">
            <h2 className="mb-4 font-display text-title-lg text-foreground">Recent top-ups</h2>

            {transactions.length === 0 ? (
                <div className="py-10 text-center">
                    <span className="gpay-tile mx-auto mb-3 h-12 w-12 bg-secondary text-muted-foreground">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                    </span>
                    <p className="text-body-md text-muted-foreground">No top-ups yet</p>
                </div>
            ) : (
                <ul className="-mx-2 divide-y divide-border">
                    {transactions.map((t, index) => {
                        const failed = t.status === "Failure";
                        return (
                            <li key={index} className="state-layer flex items-center gap-3 rounded-m3-sm px-2 py-3">
                                <span className="gpay-tile h-10 w-10 bg-gpay-blue-container text-gpay-blue">
                                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18" />
                                    </svg>
                                </span>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-body-lg text-foreground">{t.provider}</p>
                                    <p className="text-body-sm text-muted-foreground">
                                        {formatRelativeDay(t.time)}
                                    </p>
                                </div>

                                <div className="shrink-0 text-right">
                                    <p className={`tabular font-display text-title-md font-semibold ${failed ? "text-muted-foreground line-through" : "text-gpay-green"
                                        }`}>
                                        +{formatPaiseCompact(t.amount)}
                                    </p>
                                    <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-label-sm ${STATUS_STYLES[t.status] ?? "bg-muted text-muted-foreground"
                                        }`}>
                                        {t.status}
                                    </span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
};
