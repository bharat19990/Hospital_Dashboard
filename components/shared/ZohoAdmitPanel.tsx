import type { ZohoAdmit } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export interface ZohoAdmitPanelProps {
  channel: string;
  admits: ZohoAdmit[];
  totalRevenue: number;
  totalAdmits?: number;
  isLoading?: boolean;
}

export function ZohoAdmitPanel({ channel, admits, totalRevenue, totalAdmits = 243, isLoading }: ZohoAdmitPanelProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <Skeleton className="h-5 w-60" />
        <Skeleton className="mt-4 h-9 w-32" />
        <Skeleton className="mt-5 h-2 w-full" />
      </div>
    );
  }

  const percentage = totalAdmits > 0 ? Math.round((admits.length / totalAdmits) * 100) : 0;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-600">
        <span className="font-bold text-slate-950">{admits.length}</span> admits attributed to {channel} in this period
      </p>
      <p className="mt-3 text-3xl font-bold tracking-normal text-slate-950">
        {new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(totalRevenue)}
      </p>
      <p className="mt-1 text-xs font-medium text-slate-500">Estimated revenue from these admits</p>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-[#0D9488]" style={{ width: `${Math.min(percentage, 100)}%` }} />
      </div>
      <p className="mt-2 text-xs font-semibold text-slate-500">{percentage}% of total admits</p>
    </section>
  );
}
