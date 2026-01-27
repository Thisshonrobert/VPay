import { Suspense } from 'react';
import { SuccessContent } from './success-content';
import { Skeleton } from 'ui/components/ui/skeleton';

function SuccessLoading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Skeleton />
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<SuccessLoading />}>
      <SuccessContent />
    </Suspense>
  );
}


