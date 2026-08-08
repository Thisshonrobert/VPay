import { Suspense } from 'react';
import { SuccessContent } from './success-content';

function SuccessLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <span
        className="h-8 w-8 animate-spin rounded-full border-[3px] border-primary border-t-transparent"
        aria-label="Loading"
      />
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
