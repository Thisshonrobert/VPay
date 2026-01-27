import { Suspense } from 'react';
import { BankContent } from './bank-content';
import { Card, CardContent, CardHeader, CardTitle } from 'ui';

function BankLoading() {
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

export default function BankFrontendPage() {
  return (
    <Suspense fallback={<BankLoading />}>
      <BankContent />
    </Suspense>
  );
}


