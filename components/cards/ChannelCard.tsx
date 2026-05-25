import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ChannelStatus, KpiMetric } from "@/types";

export interface ChannelCardProps {
  channelName: string;
  logoSrc?: string;
  metrics: KpiMetric[];
  roas?: number;
  status: ChannelStatus;
  href: string;
}

const statusDot: Record<ChannelStatus, string> = {
  green: "bg-emerald-500",
  yellow: "bg-amber-400",
  red: "bg-red-500",
};

const channelBadge: Record<string, string> = {
  YouTube: "bg-red-600 text-white",
  "Google Ads": "bg-blue-600 text-white",
  "Google Business": "bg-blue-500 text-white",
  Facebook: "bg-blue-600 text-white",
  Instagram: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white",
  WhatsApp: "bg-emerald-500 text-white",
  "Search Console": "bg-slate-100 text-slate-700",
  SEMrush: "bg-orange-500 text-white",
  Clarity: "bg-blue-600 text-white",
  GA4: "bg-orange-500 text-white",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
}

export function ChannelCard({ channelName, logoSrc, metrics, roas, status, href }: ChannelCardProps) {
  return (
    <Link
      href={href}
      className="group relative block rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-md"
    >
      <span className={cn("absolute right-5 top-5 h-3 w-3 rounded-full", statusDot[status])} />
      <div className="flex items-center gap-3 pr-6">
        {logoSrc ? (
          <img src={logoSrc} alt="" className="h-11 w-11 rounded-lg object-contain" />
        ) : (
          <span
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-lg text-sm font-black",
              channelBadge[channelName] ?? "bg-slate-100 text-slate-700",
            )}
          >
            {getInitials(channelName)}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-950">{channelName}</h3>
          {typeof roas === "number" ? (
            <span className="mt-2 inline-flex rounded-md border border-teal-300 px-2 py-0.5 text-[11px] font-semibold text-teal-700">
              ROAS {roas.toFixed(2)}x
            </span>
          ) : null}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-3">
        {metrics.slice(0, 3).map((metric) => {
          const isDown = metric.changeDirection === "down";
          return (
            <div key={metric.label} className="border-r border-slate-200 last:border-r-0">
              <p className="text-[11px] font-medium text-slate-500">{metric.label}</p>
              <p className="mt-1 text-lg font-bold text-slate-950">
                {metric.value}
                {metric.unit ? <span className="text-sm text-slate-500">{metric.unit}</span> : null}
              </p>
              {typeof metric.change === "number" ? (
                <p className={cn("mt-1 flex items-center gap-1 text-xs font-semibold", isDown ? "text-red-600" : "text-emerald-600")}>
                  {isDown ? <ArrowDownRight className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
                  {Math.abs(metric.change)}%
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </Link>
  );
}
