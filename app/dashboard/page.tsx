"use client";

import { IndianRupee, UserRound } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { ChannelCard } from "@/components/cards/ChannelCard";
import { LineChartWrapper } from "@/components/charts/LineChartWrapper";
import { AIInsightsPanel } from "@/components/shared/AIInsightsPanel";
import { dashboardChannelCards } from "@/lib/mockData";
import type { AIInsight, ChannelStatus, KpiMetric } from "@/types";

const channelBreakdown = [
  { name: "YouTube", value: 42, color: "#EF2B2D" },
  { name: "Google Ads", value: 63, color: "#1A73E8" },
  { name: "Google Business", value: 38, color: "#174EA6" },
  { name: "Facebook", value: 27, color: "#9333EA" },
  { name: "Instagram", value: 19, color: "#EA580C" },
  { name: "WhatsApp", value: 22, color: "#22C55E" },
  { name: "Search Console", value: 14, color: "#A855F7" },
  { name: "SEMrush", value: 8, color: "#F59E0B" },
  { name: "Clarity", value: 6, color: "#0E7490" },
  { name: "GA4", value: 4, color: "#345B7A" },
];

const channels: Array<{
  channelName: string;
  href: string;
  status: ChannelStatus;
  roas?: number;
  metrics: KpiMetric[];
}> = [
  {
    channelName: "YouTube",
    href: "/youtube",
    status: "green",
    roas: 5.32,
    metrics: [
      { label: "Admits", value: 42, change: 16.7, changeDirection: "up" },
      { label: "Revenue", value: "₹21.6L", change: 20.3, changeDirection: "up" },
    ],
  },
  {
    channelName: "Google Ads",
    href: "/google-ads",
    status: "green",
    roas: 5.48,
    metrics: [
      { label: "Admits", value: 63, change: 28.6, changeDirection: "up" },
      { label: "Revenue", value: "₹34.8L", change: 31.2, changeDirection: "up" },
    ],
  },
  {
    channelName: "Google Business",
    href: "/google-business",
    status: "green",
    metrics: [
      { label: "Admits", value: 38, change: 11.8, changeDirection: "up" },
      { label: "Revenue", value: "₹18.7L", change: 12.6, changeDirection: "up" },
    ],
  },
  {
    channelName: "Facebook",
    href: "/facebook",
    status: "yellow",
    roas: 2.91,
    metrics: [
      { label: "Admits", value: 27, change: 3.8, changeDirection: "up" },
      { label: "Revenue", value: "₹12.9L", change: 5.4, changeDirection: "up" },
    ],
  },
  {
    channelName: "Instagram",
    href: "/instagram",
    status: "green",
    roas: 3.21,
    metrics: [
      { label: "Admits", value: 19, change: 15.2, changeDirection: "up" },
      { label: "Revenue", value: "₹9.8L", change: 18.7, changeDirection: "up" },
    ],
  },
  {
    channelName: "WhatsApp",
    href: "/whatsapp",
    status: "green",
    metrics: [
      { label: "Admits", value: 22, change: 22.2, changeDirection: "up" },
      { label: "Revenue", value: "₹11.2L", change: 24.1, changeDirection: "up" },
    ],
  },
  {
    channelName: "Search Console",
    href: "/search-console",
    status: "yellow",
    metrics: [
      { label: "Admits", value: 14, change: 3.4, changeDirection: "down" },
      { label: "Revenue", value: "₹6.1L", change: 1.6, changeDirection: "down" },
    ],
  },
  {
    channelName: "SEMrush",
    href: "/semrush",
    status: "red",
    metrics: [
      { label: "Admits", value: 8, change: 11.1, changeDirection: "down" },
      { label: "Revenue", value: "₹3.2L", change: 9.5, changeDirection: "down" },
    ],
  },
  {
    channelName: "Clarity",
    href: "/clarity",
    status: "green",
    metrics: [
      { label: "Admits", value: 6, change: 9.1, changeDirection: "up" },
      { label: "Revenue", value: "₹2.6L", change: 8.3, changeDirection: "up" },
    ],
  },
  {
    channelName: "GA4",
    href: "/ga4",
    status: "yellow",
    metrics: [
      { label: "Admits", value: 4, change: 20, changeDirection: "down" },
      { label: "Revenue", value: "₹1.6L", change: 18.4, changeDirection: "down" },
    ],
  },
];

const performanceData = Array.from({ length: 31 }, (_, index) => {
  const day = index + 1;
  return {
    date: `May ${day}`,
    paid: [60, 72, 68, 70, 79, 84, 76, 70, 72, 63, 67, 72, 76, 86, 73, 73, 72, 73, 83, 75, 79, 75, 68, 76, 76, 66, 71, 76, 70, 73, 80][index],
    organic: [41, 47, 42, 47, 56, 56, 49, 50, 52, 43, 51, 52, 53, 65, 56, 56, 55, 51, 58, 52, 57, 53, 49, 59, 59, 48, 54, 56, 48, 51, 59][index],
    direct: [29, 36, 31, 33, 36, 37, 32, 33, 36, 28, 34, 33, 39, 34, 31, 37, 31, 30, 31, 31, 29, 35, 36, 29, 36, 31, 30, 39, 35, 30, 37][index],
    social: [18, 23, 20, 15, 21, 22, 23, 16, 20, 17, 18, 16, 20, 24, 16, 17, 24, 17, 18, 20, 16, 14, 18, 21, 17, 17, 16, 19, 15, 15, 20][index],
  };
});

const insights: AIInsight[] = [
  {
    priority: 1,
    channel: "Google Ads",
    text: "Google Ads is delivering the highest ROAS (5.48x) and contributes 25.9% of total admits. Consider increasing budget by 15-20%.",
  },
  {
    priority: 2,
    channel: "YouTube",
    text: "YouTube campaigns are showing strong growth (+16.7% admits). Continue investing in awareness-focused video content.",
  },
  {
    priority: 3,
    channel: "Search Console",
    text: "Search Console admits declined by 3.4%. Optimize underperforming pages and improve rankings for high-intent keywords.",
  },
  {
    priority: 4,
    channel: "WhatsApp",
    text: "WhatsApp is converting well with 22 admits and 24.1% revenue growth. Consider automating follow-ups to scale further.",
  },
];

function DashboardPage() {
  return (
    <div className="space-y-3">
      <section className="grid gap-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[1fr_1.35fr_1fr] lg:items-center">
        <div className="flex items-center justify-between gap-4 lg:px-7">
          <div>
            <p className="text-lg font-semibold text-slate-950">Total Admits</p>
            <p className="mt-4 text-6xl font-bold tracking-normal text-slate-950">243</p>
            <p className="mt-4 text-sm font-medium text-slate-500">
              <span className="font-bold text-emerald-600">↗ 18.6%</span> vs Last Month
            </p>
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-full border-4 border-teal-100 text-[#0D9488]">
            <UserRound className="h-6 w-6" />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-[240px_1fr] sm:items-center">
          <div className="relative h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={channelBreakdown} dataKey="value" innerRadius={65} outerRadius={105} paddingAngle={1}>
                  {channelBreakdown.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="text-3xl font-bold text-slate-950">10</p>
                <p className="text-sm font-medium text-slate-600">Channels</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-1 text-sm sm:grid-cols-1">
            {channelBreakdown.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="truncate text-slate-700">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 lg:px-7">
          <div>
            <p className="text-lg font-semibold text-slate-950">Estimated Revenue</p>
            <p className="mt-4 text-6xl font-bold tracking-normal text-slate-950">₹1.21 Cr</p>
            <p className="mt-4 text-sm font-medium text-slate-500">
              <span className="font-bold text-emerald-600">↗ 22.4%</span> vs Last Month
            </p>
          </div>
          <div className="grid h-14 w-14 place-items-center rounded-full border-4 border-teal-100 text-[#0D9488]">
            <IndianRupee className="h-8 w-8" />
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {dashboardChannelCards.map((channel) => (
          <ChannelCard key={channel.channelName} {...channel} />
        ))}
      </section>

      <LineChartWrapper
        data={performanceData}
        xKey="date"
        title="Cross-Channel Performance"
        height={245}
        lines={[
          { key: "paid", color: "#0D9488", label: "Paid Channels (Admits)" },
          { key: "organic", color: "#1A73E8", label: "Organic Channels (Admits)" },
          { key: "direct", color: "#9333EA", label: "Direct & Referral (Admits)" },
          { key: "social", color: "#F97316", label: "Social Channels (Admits)" },
        ]}
      />

      <AIInsightsPanel insights={insights} onRegenerate={() => undefined} />
    </div>
  );
}

export default DashboardPage;
