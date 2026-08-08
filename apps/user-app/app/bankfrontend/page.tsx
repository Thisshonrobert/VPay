import { Suspense } from 'react';
import { BankContent } from './bank-content';

function BankLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <span
        className="h-8 w-8 animate-spin rounded-full border-[3px] border-primary border-t-transparent"
        aria-label="Loading payment details"
      />
    </div>
  );
}

export default function BankFrontendPage() {
  return (
    <Suspense fallback={<BankLoading />}>
      <BankContent />
    </Suspense>
  );
}
