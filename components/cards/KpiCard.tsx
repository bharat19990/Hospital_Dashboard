import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import type { KpiMetric } from "@/types";

export interface KpiCardProps {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeDirection?: "up" | "down";
  icon?: ReactNode;
  statusColor?: "green" | "yellow" | "red";
  isLoading?: boolean;
  isInverseMetric?: boolean;
}

const statusBorder: Record<NonNullable<KpiCardProps["statusColor"]>, string> = {
  green: "border-r-emerald-500",
  yellow: "border-r-amber-400",
  red: "border-r-red-500",
};

export function KpiCard({
  label,
  value,
  unit,
  change,
  changeDirection,
  icon,
  statusColor = "green",
  isLoading,
  isInverseMetric,
}: KpiCardProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-slate-200 border-r-4 border-r-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="mt-6 h-10 w-32" />
        <Skeleton className="mt-5 h-6 w-24" />
      </div>
    );
  }

  const isDown = changeDirection === "down";
  const isPositive = isInverseMetric ? isDown : !isDown;
  const TrendIcon = isDown ? ArrowDownRight : ArrowUpRight;
  const trendClass = isPositive ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50";

  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 border-r-4 bg-white p-6 shadow-sm",
        statusBorder[statusColor],
      )}
    >
      <div className="flex items-center gap-3">
        {icon ? (
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-50 text-[#0D9488]">{icon}</div>
        ) : null}
        <p className="text-sm font-medium text-slate-500">{label}</p>
      </div>
      <div className="mt-5 flex items-end gap-1">
        <p className="text-4xl font-bold tracking-normal text-slate-950">{value}</p>
        {unit ? <span className="pb-1.5 text-base font-semibold text-slate-500">{unit}</span> : null}
      </div>
      <div className="mt-4 h-6">
        {typeof change === "number" ? (
          <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold", trendClass)}>
            <TrendIcon className="h-3.5 w-3.5" />
            {Math.abs(change)}%
          </span>
        ) : null}
      </div>
    </div>
  );
}
