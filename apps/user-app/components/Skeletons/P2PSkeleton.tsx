import React from 'react'
import { Skeleton } from "ui/components/ui/skeleton"
import { Card } from "ui/prebuilt/index"

const P2PSkeleton = () => {
  return (
    <div className="w-full flex flex-row justify-center gap-10">
      {/* SendCard Skeleton */}
      <div className="flex justify-center items-center">
        <Card title="Send">
          <div className="min-w-72 pt-2 space-y-4">
            {/* Search Input Skeleton */}
            <Skeleton className="h-10 w-full rounded-md" />
            
            {/* Selected User Info Skeleton */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>

            {/* Amount Input Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            {/* Button Skeleton */}
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </Card>
      </div>

      {/* P2pTransactions Skeleton */}
      <div className="w-1/3 mt-[10%]">
        <Card title="Recent Transactions">
          <div className="space-y-4">
            {/* Header Skeleton */}
            <div className="flex justify-between pb-4 border-b">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Transaction Items Skeleton */}
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex justify-between py-2 space-y-2">
                <div className="flex flex-col w-1/3 space-y-1">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="w-1/3">
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="w-1/3">
                  <Skeleton className="h-4 w-16 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default P2PSkeleton
