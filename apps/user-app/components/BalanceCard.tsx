import { formatPaise } from "app/lib/format";

export const BalanceCard = ({ amount, locked }: {
    amount: number;
    locked: number;
}) => {
    const rows = [
        { label: "Available to spend", value: amount, accent: "text-foreground" },
        { label: "Processing", value: locked, accent: "text-gpay-yellow" },
    ];

    return (
        <section className="rounded-m3-xl border border-border bg-card p-5 shadow-m3-1 sm:p-6">
            <h2 className="text-label-lg uppercase tracking-wider text-muted-foreground">
                Wallet balance
            </h2>
            <p className="tabular mt-1 font-display text-headline-lg font-semibold text-foreground">
                {formatPaise(amount + locked)}
            </p>

            <dl className="mt-5 space-y-3 border-t border-border pt-4">
                {rows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-4">
                        <dt className="text-body-md text-muted-foreground">{row.label}</dt>
                        <dd className={`tabular text-body-lg font-medium ${row.accent}`}>
                            {formatPaise(row.value)}
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    );
};
