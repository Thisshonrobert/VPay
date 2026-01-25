'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from 'ui';

interface SuccessData {
  amount: string;
  refId: number;
  userId: number;
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get data from URL params or session storage
    const amount = searchParams.get('amount');
    const refId = searchParams.get('refId');
    const userId = searchParams.get('userId');

    if (amount && refId && userId) {
      setSuccessData({
        amount,
        refId: Number(refId),
        userId: Number(userId),
      });
    }

    setLoading(false);
  }, [searchParams]);

  const displayAmount = successData ? (Number(successData.amount) / 100).toFixed(2) : '0.00';
  const timestamp = new Date().toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-50 to-white">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-50 to-white p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Paid For Order</h1>
          <p className="text-gray-500">Payment successful</p>
        </div>

        {/* Amount */}
        <div className="text-center bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <p className="text-5xl font-bold text-gray-800 mb-2">₹{displayAmount}</p>
          <p className="text-lg text-green-600 font-semibold">Paid Successfully</p>
        </div>

        {/* Transaction Details */}
        <div className="space-y-4 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          {/* Wallet Icon + Transaction ID */}
          <div className="flex items-center justify-center gap-3 py-4 border-b border-gray-200">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 6v2h-2V6h2m0 12h-2v-2h2v2m6-6h2v2h-2v-2M8 6h2v2H8V6m-4 4h2v2H4v-2m0 8h2v2H4v-2m8-2h2v2h-2v-2m4-4h2v2h-2v-2z" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">VPay Wallet</p>
              <p className="text-lg font-semibold text-gray-800">Top-up</p>
            </div>
          </div>

          {/* Transaction ID */}
          <div className="py-3 border-b border-gray-200">
            <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Transaction ID</p>
            <p className="text-base font-mono font-semibold text-gray-800">{successData?.refId}</p>
          </div>

          {/* User ID */}
          <div className="py-3 border-b border-gray-200">
            <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">User ID</p>
            <p className="text-base font-semibold text-gray-800">{successData?.userId}</p>
          </div>

          {/* Timestamp */}
          <div className="py-3">
            <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Date & Time</p>
            <p className="text-base text-gray-800">{timestamp}</p>
          </div>
        </div>

        {/* Help Button */}
        <button className="w-full py-3 px-4 border-2 border-blue-400 text-blue-400 font-semibold rounded-lg hover:bg-blue-50 transition">
          Need Help?
        </button>

        {/* Continue Button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
        >
          Back to Dashboard
        </button>

        {/* Footer */}
        <div className="text-center text-xs text-gray-600 space-y-1">
          <p>© Copyright VPay Bank Ltd. | All Rights Reserved.</p>
          <div className="flex justify-center gap-3 text-gray-500">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </div>
  );
}
