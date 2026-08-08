'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface PaymentData {
  userId: number;
  amount: string;
  refId: number;
}

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL!

export function BankContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('No payment token provided');
      return;
    }

    try {
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      const data = JSON.parse(decoded) as PaymentData;
      setPaymentData(data);
    } catch (err) {
      setError('Invalid payment token');
      console.error('Token decode error:', err);
    }
  }, [token]);

  const handlePayment = async (success: boolean) => {
    if (!token || !paymentData) return;

    setLoading(true);
    try {
      const response = await fetch(`${WEBHOOK_URL}/hdfcWebhook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          user_identifier: paymentData.userId.toString(),
          amount: paymentData.amount,
          PaymentResponse: success ? 'Success' : 'Failure',
        }),
      });

      if (!response.ok) {
        throw new Error('Payment processing failed');
      }

      const result = await response.json();

      if (success && result.message === 'Captured') {
        const params = new URLSearchParams({
          amount: paymentData.amount,
          refId: paymentData.refId.toString(),
          userId: paymentData.userId.toString(),
        });
        router.push(`/success?${params.toString()}`);
      } else if (!success) {
        const channel = new BroadcastChannel('payment_channel');
        channel.postMessage('payment_failure');
        channel.close();
      }
    } catch (err) {
      setError('Failed to process payment. Please try again.');
      const channel = new BroadcastChannel('payment_channel');
      channel.postMessage('payment_failure');
      channel.close();
      console.error('Payment error:', err);
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-m3-2xl border border-border bg-card p-8 text-center shadow-m3-1">
          <span className="gpay-tile mx-auto mb-4 h-14 w-14 bg-gpay-red-container text-gpay-red">
            <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </span>
          <h1 className="font-display text-title-lg text-foreground">Something went wrong</h1>
          <p className="mt-2 text-body-lg text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <span
          className="h-8 w-8 animate-spin rounded-full border-[3px] border-primary border-t-transparent"
          aria-label="Loading payment details"
        />
      </div>
    );
  }

  const displayAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(Number(paymentData.amount) / 100);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-[520px] animate-rise-in">

        {/* This screen stands in for the bank's netbanking redirect. Label it
            plainly so it can never be mistaken for a real bank page. */}
        <div className="mb-4 flex items-start gap-3 rounded-m3-lg border border-gpay-yellow/40 bg-gpay-yellow-container px-4 py-3">
          <svg className="mt-0.5 h-5 w-5 shrink-0 text-gpay-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <p className="text-body-md text-foreground">
            <span className="font-medium">Simulated payment gateway.</span>{' '}
            This is a sandbox screen in the VPay demo — no real bank, account or money is involved.
          </p>
        </div>

        <div className="overflow-hidden rounded-m3-2xl border border-border bg-card shadow-m3-2">
          <header className="border-b border-border px-6 py-5">
            <p className="text-label-lg uppercase tracking-wider text-muted-foreground">
              Mock netbanking
            </p>
            <h1 className="mt-1 font-display text-title-lg text-foreground">
              Confirm your wallet top-up
            </h1>
          </header>

          {/* Amount */}
          <div className="px-6 py-8 text-center">
            <p className="text-label-lg uppercase tracking-wider text-muted-foreground">
              Amount
            </p>
            <p className="tabular mt-2 font-display text-display-sm font-semibold text-foreground">
              {displayAmount}
            </p>
            <p className="mt-2 text-body-md text-muted-foreground">
              Will be credited to your VPay wallet
            </p>
          </div>

          {/* Details */}
          <dl className="divide-y divide-border border-t border-border px-6">
            <div className="flex items-baseline justify-between gap-4 py-4">
              <dt className="text-body-md text-muted-foreground">Reference ID</dt>
              <dd className="font-mono text-body-lg text-foreground">{paymentData.refId}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-4">
              <dt className="text-body-md text-muted-foreground">Payee</dt>
              <dd className="text-body-lg text-foreground">VPay Wallet</dd>
            </div>
          </dl>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-border px-6 py-5 sm:flex-row">
            <button
              type="button"
              onClick={() => handlePayment(false)}
              disabled={loading}
              className="state-layer flex-1 rounded-full border border-border px-6 py-3.5 text-label-lg text-foreground
                transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-50"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => handlePayment(true)}
              disabled={loading}
              aria-busy={loading || undefined}
              className="state-layer flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5
                text-label-lg text-primary-foreground shadow-m3-1 transition-shadow hover:shadow-m3-2
                disabled:pointer-events-none disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none"
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
              )}
              {loading ? 'Processing…' : 'Approve payment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
