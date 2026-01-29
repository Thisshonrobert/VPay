'use client';

import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from 'ui';
import hdfc from '../../public/hdfc.png'


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
      // Decode the token from base64
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
      console.log('Payment result:', result);

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
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600 mb-4">{error}</p>

          </CardContent>
        </Card>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Loading Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const displayAmount = (Number(paymentData.amount) / 100).toFixed(2);

  return (
    <div className="flex justify-center items-center min-h-screen  from-blue-50 to-white p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to HDFC Bank NetBanking</h1>
          <div className="flex justify-center gap-4 items-center">
            <span className="text-sm font-semibold text-gray-600">Secured by</span>
            <Image
              src={hdfc}
              alt='HDFC'
              width={50}
              height={50}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Payment Card */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r bg-white text-white rounded-t-lg">
                <CardTitle className="text-2xl">Confirm Payment</CardTitle>
                <CardDescription >
                  VPay Wallet Top-up via NetBanking
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8 pt-8">
                {/* Amount Section */}
                <div className="border-2 border-blue-200 rounded-lg p-6 bg-blue-50">
                  <p className="text-sm text-gray-600 font-semibold mb-2 uppercase tracking-wide">Payment Amount</p>
                  <p className="text-5xl font-bold text-blue-600">₹{displayAmount}</p>
                  <p className="text-xs text-gray-500 mt-2">This amount will be debited from your account</p>
                </div>

                {/* Payment Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h3>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Transaction ID</p>
                    <p className="text-lg font-mono font-semibold text-gray-800">{paymentData.refId}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">User ID</p>
                    <p className="text-lg font-semibold text-gray-800">{paymentData.userId}</p>
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-sm text-yellow-800 flex items-start gap-3">
                    <span className="text-xl">⚠️</span>
                    <span>
                      Please verify all details carefully. Once confirmed, the payment cannot be reversed.
                      Ensure you are on the official HDFC Bank website.
                    </span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Button
                    onClick={() => handlePayment(false)}
                    disabled={loading}
                    variant="outline"
                    className="w-full py-3 text-lg font-semibold border-2 hover:bg-red-50"
                  >
                    {loading ? 'Processing...' : 'Decline'}
                  </Button>
                  <Button
                    onClick={() => handlePayment(true)}
                    disabled={loading}
                    className="w-full py-3 text-lg font-semibold bg-purple-800 hover:bg-puple-900 text-white"
                  >
                    {loading ? 'Processing...' : 'Accept & Pay'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Security Sidebar */}
          <div className="space-y-4">
            {/* Norton Security */}
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <svg className="w-16 h-16 mx-auto" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="48" fill="#00AA44" opacity="0.1" stroke="#00AA44" strokeWidth="2" />
                    <path d="M 35 50 L 45 60 L 65 40" stroke="#00AA44" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-800">Norton Secured</p>
                    <p className="text-xs text-gray-600">powered by Symantec</p>
                  </div>
                  <p className="text-xs text-gray-600">Your security is of utmost importance</p>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-0 shadow-md bg-blue-50">
              <CardHeader>
                <CardTitle className="text-base">Security Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span className="text-gray-700">Never share your password with anyone</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span className="text-gray-700">Logout after every session</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span className="text-gray-700">Check URL before entering details</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-xs text-gray-600 space-y-2">
          <p>© Copyright HDFC Bank Ltd. | All Rights Reserved.</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-blue-600">Terms and Conditions</a>
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Security</a>
          </div>
        </div>
      </div>
    </div>
  );
}
