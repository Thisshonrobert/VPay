import React from 'react'
import { Skeleton } from "ui/components/ui/skeleton"

const P2PSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-5 w-72" />
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        {/* Send card */}
        <div className="rounded-m3-2xl border border-border bg-card p-5 sm:p-7">
          <Skeleton className="mb-5 h-6 w-32" />
          <Skeleton className="h-3.5 w-8" />
          <Skeleton className="mt-1.5 h-[52px] w-full rounded-full" />

          <div className="mt-7 flex flex-col items-center gap-3">
            <Skeleton className="h-3.5 w-16" />
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-px w-40" />
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-9 w-20 rounded-full" />
            ))}
          </div>

          <Skeleton className="mt-7 h-14 w-full rounded-full" />
        </div>

        {/* People */}
        <div className="rounded-m3-xl border border-border bg-card p-5 sm:p-6">
          <Skeleton className="mb-4 h-6 w-24" />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 py-3">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-5 w-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default P2PSkeleton
