'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Logo } from 'ui/prebuilt/Logo';

interface SuccessData {
  amount: string;
  refId: number;
  userId: number;
}

export function SuccessContent() {
  const searchParams = useSearchParams();
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const amount = searchParams.get('amount');
    const refId = searchParams.get('refId');
    const userId = searchParams.get('userId');

    if (amount && refId && userId) {
      setSuccessData({
        amount,
        refId: Number(refId),
        userId: Number(userId),
      });

      // Tell the opener tab to refresh its balance.
      const channel = new BroadcastChannel('payment_channel');
      channel.postMessage('payment_success');
      channel.close();
    }

    setLoading(false);
  }, [searchParams]);

  const displayAmount = successData
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
      Number(successData.amount) / 100
    )
    : '₹0.00';

  const timestamp = new Date().toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span
          className="h-8 w-8 animate-spin rounded-full border-[3px] border-primary border-t-transparent"
          aria-label="Loading"
        />
      </div>
    );
  }

  const rows = [
    { label: 'Transaction ID', value: successData?.refId, mono: true },
    { label: 'Paid to', value: 'VPay Wallet top-up' },
    { label: 'Date & time', value: timestamp },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-[440px] animate-rise-in">

        {/* Receipt */}
        <div className="overflow-hidden rounded-m3-2xl border border-border bg-card shadow-m3-2">

          {/* Green header — the universal "it worked" signal. */}
          <div className="flex flex-col items-center gap-4 bg-gpay-green-container px-6 py-10 text-center">
            <span className="flex h-20 w-20 animate-scale-in items-center justify-center rounded-full bg-gpay-green text-white shadow-m3-1">
              <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </span>

            <div>
              <p className="font-display text-title-lg text-gpay-green">Payment successful</p>
              <p className="tabular mt-2 font-display text-display-sm font-semibold text-foreground">
                {displayAmount}
              </p>
            </div>
          </div>

          {/* Details */}
          <dl className="divide-y divide-border px-6">
            {rows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-4 py-4">
                <dt className="text-body-md text-muted-foreground">{row.label}</dt>
                <dd className={`text-body-lg text-foreground ${row.mono ? 'font-mono' : ''}`}>
                  {String(row.value ?? '—')}
                </dd>
              </div>
            ))}
          </dl>

          <div className="px-6 pb-6 pt-2">
            <button
              type="button"
              onClick={() => window.close()}
              className="state-layer w-full rounded-full bg-primary px-6 py-3.5 text-label-lg text-primary-foreground shadow-m3-1 transition-shadow hover:shadow-m3-2"
            >
              Done
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 opacity-70">
          <Logo />
        </div>
      </div>
    </div>
  );
}
