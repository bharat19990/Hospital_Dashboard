import { Skeleton } from "@/components/ui/skeleton";

export function KpiCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-28" />
      </div>
      <Skeleton className="mt-6 h-10 w-32" />
      <Skeleton className="mt-5 h-5 w-24" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <Skeleton className="h-5 w-48" />
      <Skeleton className="mt-5 h-64 w-full" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <Skeleton className="h-5 w-40" />
      <div className="mt-4 space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}

export function AIInsightsSkeleton() {
  return (
    <div className="rounded-xl bg-gradient-to-r from-[#1E3A5F] to-[#0D9488] p-5 shadow-sm">
      <Skeleton className="h-7 w-56 bg-white/30" />
      <div className="mt-4 space-y-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full bg-white/25" />
        ))}
      </div>
    </div>
  );
}
