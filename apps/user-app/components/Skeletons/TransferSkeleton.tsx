import React from 'react'
import { Skeleton } from "ui/components/ui/skeleton"
import { Card } from "ui/prebuilt/index"

const TransferSkeleton = () => {
  return (
    <div className="w-screen">
      {/* Title Skeleton */}
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        <Skeleton className="h-10 w-40" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        {/* AddMoney Card Skeleton */}
        <div className="space-y-6">
          <Card title="Add Money to Wallet">
            <div className="w-full space-y-4">
              {/* Amount Input */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              {/* Bank Label and Select */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              {/* Button */}
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </Card>
        </div>

        {/* Right Column - Balance and Transactions */}
        <div className="space-y-4">
          {/* Balance Card Skeleton */}
          <Card title="Balance">
            <div className="space-y-2">
              {/* Unlocked Balance */}
              <div className="flex justify-between border-b border-slate-300 pb-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Total Locked Balance */}
              <div className="flex justify-between border-b border-slate-300 py-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>

              {/* Total Balance */}
              <div className="flex justify-between border-b border-slate-300 py-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </Card>

          {/* Recent Transactions Skeleton */}
          <Card title="Recent Transactions">
            <div className="pt-2 space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex justify-between pb-3 border-b border-slate-200">
                  <div className="space-y-1 flex-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-2 w-24" />
                  </div>
                  <div className="flex-1">
                    <Skeleton className="h-3 w-20 ml-auto" />
                  </div>
                  <div className="flex-1 flex justify-end">
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TransferSkeleton
