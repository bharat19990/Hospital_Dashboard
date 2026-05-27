"use client";

import { IndianRupee, UserRound } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { ChannelCard } from "@/components/cards/ChannelCard";
import { LineChartWrapper } from "@/components/charts/LineChartWrapper";
import { AIInsightsPanel } from "@/components/shared/AIInsightsPanel";
import { dashboardChannelCards } from "@/lib/mockData";
import type { AIInsight } from "@/types";

const channelBreakdown = [
  { name: "YouTube", value: 42, color: "#EF2B2D" },
  { name: "Google Ads", value: 63, color: "#1A73E8" },
  { name: "Facebook", value: 27, color: "#9333EA" },
  { name: "Instagram", value: 19, color: "#EA580C" },
  { name: "WhatsApp", value: 22, color: "#22C55E" },
];

const performanceData = Array.from({ length: 31 }, (_, index) => {
  const day = index + 1;
  return {
    date: `May ${day}`,
    youtube: [8, 10, 9, 10, 12, 12, 11, 10, 11, 9, 10, 11, 11, 13, 12, 11, 11, 10, 12, 11, 12, 11, 10, 12, 12, 10, 11, 12, 10, 11, 13][index],
    googleAds: [12, 15, 14, 15, 17, 18, 16, 15, 15, 13, 14, 15, 16, 18, 16, 16, 15, 15, 17, 16, 17, 16, 14, 16, 16, 14, 15, 16, 15, 15, 18][index],
    facebook: [5, 6, 5, 6, 7, 7, 6, 6, 6, 5, 6, 6, 7, 6, 5, 7, 5, 5, 6, 6, 5, 6, 6, 5, 6, 5, 5, 7, 6, 5, 7][index],
    instagram: [4, 5, 4, 3, 5, 5, 5, 4, 4, 4, 4, 3, 4, 5, 4, 4, 5, 4, 4, 4, 3, 3, 4, 5, 4, 4, 3, 4, 3, 3, 5][index],
    whatsapp: [4, 5, 4, 5, 5, 5, 5, 4, 5, 4, 5, 5, 5, 6, 5, 5, 5, 5, 6, 5, 5, 5, 4, 5, 5, 4, 5, 5, 4, 5, 6][index],
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
    channel: "Instagram",
    text: "Instagram reach is up 28% with Reels leading engagement. Shift this week's creative mix toward short-form doctor and patient stories.",
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
            <p className="mt-4 text-6xl font-bold tracking-normal text-slate-950">173</p>
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
                <p className="text-3xl font-bold text-slate-950">5</p>
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
            <p className="mt-4 text-6xl font-bold tracking-normal text-slate-950">₹90.3L</p>
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
          { key: "youtube", color: "#EF2B2D", label: "YouTube" },
          { key: "googleAds", color: "#1A73E8", label: "Google Ads" },
          { key: "facebook", color: "#9333EA", label: "Facebook" },
          { key: "instagram", color: "#EA580C", label: "Instagram" },
          { key: "whatsapp", color: "#22C55E", label: "WhatsApp" },
        ]}
      />

      <AIInsightsPanel insights={insights} onRegenerate={() => undefined} />
    </div>
  );
}

export default DashboardPage;
