import { Skeleton } from "ui/components/ui/skeleton";

export const DashboardSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Greeting */}
      <div className="mb-6 flex items-center gap-3">
        <Skeleton className="h-14 w-14 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-6 w-40" />
        </div>
      </div>

      {/* Balance hero */}
      <Skeleton className="mb-6 h-48 w-full rounded-m3-2xl sm:h-52" />

      {/* Quick actions */}
      <div className="mb-8 grid grid-cols-4 gap-2 sm:gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 p-2">
            <Skeleton className="h-14 w-14 rounded-full sm:h-16 sm:w-16" />
            <Skeleton className="h-3 w-14" />
          </div>
        ))}
      </div>

      {/* Money in / out */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[0, 1].map((i) => (
          <Skeleton key={i} className="h-[88px] w-full rounded-m3-xl" />
        ))}
      </div>

      {/* Recent activity */}
      <div className="mb-8">
        <Skeleton className="mb-3 h-6 w-40" />
        <div className="space-y-px overflow-hidden rounded-m3-xl border border-border bg-card p-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 py-3">
              <Skeleton className="h-11 w-11 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <Skeleton className="h-[340px] w-full rounded-m3-xl" />
    </div>
  );
};
