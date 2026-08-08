import { Avatar } from "./Avatar";
import { formatPaiseCompact, formatRelativeDay } from "app/lib/format";

const P2pTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    senderName: string;
    recieverName: string;
    direction: string;
    status: 'Success' | 'Failure';
  }[];
}) => {
  const settled = transactions.filter((t) => t.status === 'Success');

  return (
    <section className="w-full rounded-m3-xl border border-border bg-card p-5 shadow-m3-1 sm:p-6">
      <h2 className="mb-4 font-display text-title-lg text-foreground">People</h2>

      {settled.length === 0 ? (
        <div className="py-10 text-center">
          <span className="gpay-tile mx-auto mb-3 h-12 w-12 bg-secondary text-muted-foreground">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </span>
          <p className="text-body-md text-muted-foreground">No peer transfers yet</p>
        </div>
      ) : (
        <ul className="-mx-2 divide-y divide-border">
          {settled.map((t, index) => {
            const outgoing = t.direction === "Sent";
            const counterparty = outgoing ? t.recieverName : t.senderName;

            return (
              <li key={index} className="state-layer flex items-center gap-3 rounded-m3-sm px-2 py-3">
                <Avatar name={counterparty} size="sm" />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-body-lg text-foreground">{counterparty}</p>
                  <p className="text-body-sm text-muted-foreground">
                    {outgoing ? "You paid" : "Paid you"} · {formatRelativeDay(t.time)}
                  </p>
                </div>

                <p
                  className={`tabular shrink-0 font-display text-title-md font-semibold ${outgoing ? "text-foreground" : "text-gpay-green"
                    }`}
                >
                  {outgoing ? "−" : "+"}{formatPaiseCompact(t.amount)}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default P2pTransactions;
