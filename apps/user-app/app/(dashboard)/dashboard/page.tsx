import { authOptions } from "app/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import getBalance from "app/lib/action/getBalance";
import getAllOnRampTxn from "app/lib/action/getAllOnRampTxn";
import getByMonth from "app/lib/action/getByMonth";
import { Graph } from "@components/Graph";
import { QuickActions } from "@components/QuickActions";
import { Avatar } from "@components/Avatar";
import { Suspense } from "react";
import { DashboardSkeleton } from "@components/Skeletons/DashboardSkeleton";
import { formatPaise, formatPaiseCompact, formatRelativeDay, greeting } from "app/lib/format";

async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/signin')
  }

  const balance = await getBalance();
  const transactions = await getAllOnRampTxn();
  const monthlyTxn = await getByMonth();

  let sentAmt = 0, receivedAmt = 0;
  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i]
    if (t.status === "Sent")
      sentAmt += t.amount;
    else if (t.status === 'Received')
      receivedAmt += t.amount;
  }

  const total = balance.amount + balance.locked;
  const recent = transactions.slice(0, 5);

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">

      {/* Greeting */}
      <div className="mb-6 flex items-center gap-3">
        <Avatar name={session.user.name} size="lg" />
        <div>
          <p className="text-body-md text-muted-foreground">{greeting()},</p>
          <h1 className="font-display text-headline-md font-medium text-foreground">
            {session.user.name}
          </h1>
        </div>
      </div>

      {/* Balance hero — the one saturated surface on an otherwise neutral page. */}
      <section
        className="relative mb-6 animate-rise-in overflow-hidden rounded-m3-2xl p-6 text-white shadow-m3-2 sm:p-8"
        style={{ background: "linear-gradient(135deg, #1a73e8 0%, #4285f4 55%, #669df6 100%)" }}
      >
        {/* Decorative concentric rings, echoing the GPay card artwork. */}
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border-[28px] border-white/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-12 h-56 w-56 rounded-full bg-white/10 blur-2xl" />

        <div className="relative">
          <p className="text-label-lg uppercase tracking-wider text-white/80">
            Total balance
          </p>
          <p className="tabular mt-1 font-display text-display-sm font-semibold sm:text-display-md">
            {formatPaise(total)}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="rounded-full bg-white/15 px-4 py-2 text-label-lg backdrop-blur-sm">
              Available&nbsp;
              <span className="tabular font-display font-semibold">{formatPaiseCompact(balance.amount)}</span>
            </span>
            <span className="rounded-full bg-white/15 px-4 py-2 text-label-lg backdrop-blur-sm">
              Processing&nbsp;
              <span className="tabular font-display font-semibold">{formatPaiseCompact(balance.locked)}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="mb-8">
        <QuickActions />
      </section>

      {/* Money in / money out */}
      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-m3-xl border border-border bg-card p-5 shadow-m3-1">
          <span className="gpay-tile h-12 w-12 bg-gpay-red-container text-gpay-red">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </span>
          <div>
            <p className="text-body-md text-muted-foreground">Sent to peers</p>
            <p className="tabular font-display text-headline-sm font-semibold text-foreground">
              {formatPaiseCompact(sentAmt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-m3-xl border border-border bg-card p-5 shadow-m3-1">
          <span className="gpay-tile h-12 w-12 bg-gpay-green-container text-gpay-green">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
            </svg>
          </span>
          <div>
            <p className="text-body-md text-muted-foreground">Received from peers</p>
            <p className="tabular font-display text-headline-sm font-semibold text-foreground">
              {formatPaiseCompact(receivedAmt)}
            </p>
          </div>
        </div>
      </section>

      {/* Recent activity */}
      <section className="mb-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-title-lg text-foreground">Recent activity</h2>
          <a href="/transactions" className="text-label-lg text-primary hover:underline">
            See all
          </a>
        </div>

        <div className="overflow-hidden rounded-m3-xl border border-border bg-card shadow-m3-1">
          {recent.length === 0 ? (
            <p className="px-5 py-10 text-center text-body-md text-muted-foreground">
              No transactions yet — add money to get started.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {recent.map((t, i) => {
                const outgoing = t.status === "Sent";
                return (
                  <li key={i} className="state-layer flex items-center gap-4 px-4 py-3.5 sm:px-5">
                    <Avatar name={t.name} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-body-lg text-foreground">{t.name}</p>
                      <p className="text-body-sm text-muted-foreground">
                        {formatRelativeDay(t.time)} · {t.status}
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
        </div>
      </section>

      {/* Monthly chart */}
      <Graph transactions={monthlyTxn} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <Dashboard />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";
