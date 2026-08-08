import React from 'react'
import { Skeleton } from "ui/components/ui/skeleton"

const TransactionSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-5 w-64" />
      </div>

      <div className="space-y-6">
        {[0, 1].map((group) => (
          <div key={group}>
            <Skeleton className="mb-2 h-4 w-24" />
            <div className="overflow-hidden rounded-m3-xl border border-border bg-card p-4">
              {[0, 1, 2].map((row) => (
                <div key={row} className="flex items-center gap-4 py-3.5">
                  <Skeleton className="h-11 w-11 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                  <Skeleton className="hidden h-6 w-20 rounded-full sm:block" />
                  <Skeleton className="h-5 w-20" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionSkeleton
