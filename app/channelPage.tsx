"use client";

import {
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  Bar,
} from "recharts";
import {
  Activity as ActivityIcon,
  BarChart3,
  Camera as CameraIcon,
  DollarSign as DollarIcon,
  Eye as EyeIcon,
  ExternalLink,
  Info,
  MapPin as MapPinIcon,
  MessageCircle as MessageIcon,
  Play as PlayIcon,
  Search as SearchIcon,
  Sparkles,
  Users as UsersIcon,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { KpiCard } from "@/components/cards/KpiCard";
import { AIInsightsPanel } from "@/components/shared/AIInsightsPanel";
import { ZohoAdmitPanel } from "@/components/shared/ZohoAdmitPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { channelPages, type ChannelPageData, zohoAdmitsByChannel } from "@/lib/mockData";
import { cn, formatINR } from "@/lib/utils";

const iconMap = {
  play: PlayIcon,
  dollar: DollarIcon,
  map: MapPinIcon,
  users: UsersIcon,
  camera: CameraIcon,
  message: MessageIcon,
  search: SearchIcon,
  bar: BarChart3,
  eye: EyeIcon,
  activity: ActivityIcon,
};

function formatMetricValue(label: string, value: string | number) {
  return typeof value === "number" && (label === "Spend" || label === "Cost/Conv") ? formatINR(value) : value;
}

function renderPrimaryChart(chart: ChannelPageData["primaryChart"]) {
  if (chart.type === "area") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chart.data} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
          <XAxis dataKey={chart.xKey} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0" }} />
          <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          {chart.areas.map((area) => (
            <Area key={area.key} type="monotone" dataKey={area.key} name={area.label} stroke={area.color} fill={area.color} fillOpacity={0.3} strokeWidth={3} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  if (chart.type === "composed") {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={chart.data} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
          <XAxis dataKey={chart.xKey} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
          <YAxis yAxisId="left" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
          <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0" }} />
          <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          {chart.bars?.map((bar) => (
            <Bar key={bar.key} yAxisId={bar.axis ?? "left"} dataKey={bar.key} name={bar.label} fill={bar.color} radius={[6, 6, 0, 0]} />
          ))}
          {chart.lines?.map((line) => (
            <Line key={line.key} yAxisId={line.axis ?? "left"} type="monotone" dataKey={line.key} name={line.label} stroke={line.color} strokeWidth={3} dot={false} activeDot={{ r: 5 }} />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chart.data} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
        <XAxis dataKey={chart.xKey} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0" }} />
        <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
        {chart.lines.map((line) => (
          <Line key={line.key} type="monotone" dataKey={line.key} name={line.label} stroke={line.color} strokeWidth={3} dot={false} activeDot={{ r: 5 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

function renderSecondary(page: ChannelPageData) {
  const chart = page.secondary;
  if (!chart) return null;

  if (chart.type === "alert") {
    return (
      <Card className="rounded-xl border-blue-200 bg-blue-50/60">
        <CardContent className="flex gap-3 p-5 text-sm text-slate-700">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A5F]" />
          <div>
            <p className="font-semibold text-slate-950">{chart.title}</p>
            <p className="mt-1">{chart.message}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (chart.type === "pie") {
    return (
      <ChartCard title={chart.title}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={chart.data} dataKey="value" nameKey="name" innerRadius={70} outerRadius={110} paddingAngle={2}>
              {chart.data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0" }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {chart.data.map((item) => (
            <span key={item.name} className="flex items-center gap-2 text-slate-600">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.name} {item.value}%
            </span>
          ))}
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title={chart.title}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chart.data} layout={chart.type === "bar" && chart.layout === "vertical" ? "vertical" : "horizontal"} margin={{ top: 10, right: 16, left: chart.type === "bar" && chart.layout === "vertical" ? 40 : -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
          {chart.type === "bar" && chart.layout === "vertical" ? (
            <>
              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
              <YAxis dataKey={chart.xKey} type="category" width={140} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
            </>
          ) : (
            <>
              <XAxis dataKey={chart.xKey} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
            </>
          )}
          <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0" }} />
          <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          {chart.bars.map((bar) => (
            <Bar key={bar.key} dataKey={bar.key} name={bar.label} fill={bar.color} radius={[6, 6, 0, 0]}>
              {chart.data.map((entry, index) => (
                <Cell key={`${bar.key}-${index}`} fill={typeof entry.color === "string" ? entry.color : bar.color} />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
      <CardHeader className="p-5 pb-0">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
}

function DataTable({ table }: { table: ChannelPageData["tables"][number] }) {
  return (
    <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
      <CardHeader className="p-5 pb-0">
        <CardTitle className="text-lg">{table.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                {table.columns.map((column) => (
                  <th key={column.key} className="px-3 py-3 font-semibold">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-slate-100 last:border-b-0">
                  {table.columns.map((column) => {
                    const value = row[column.key];
                    const text = String(value);
                    const isBadge = ["Responded", "Pending", "High", "Med", "Low", "Awareness", "Story", "Event", "Doctor", "Update", "Reel", "Image", "Carousel"].includes(text);
                    return (
                      <td key={column.key} className="px-3 py-3 font-medium text-slate-700">
                        {isBadge ? (
                          <span className={cn("rounded-full px-2 py-1 text-xs font-semibold", text === "Pending" || text === "Med" ? "bg-amber-50 text-amber-700" : text === "Low" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700")}>{text}</span>
                        ) : (
                          text
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export function ChannelPage({ slug }: { slug: keyof typeof channelPages }) {
  const page = channelPages[slug];
  const Icon = iconMap[page.icon as keyof typeof iconMap] ?? ActivityIcon;
  const admits = zohoAdmitsByChannel[page.slug] ?? [];
  const revenue = admits.length * 50000;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#1E3A5F] text-white">
            <Icon className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-slate-950">{page.channelName}</h2>
            <p className="text-sm font-medium text-slate-500">This Month</p>
          </div>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {page.kpis.map((kpi) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={formatMetricValue(kpi.label, kpi.value)}
            unit={kpi.unit}
            change={kpi.change}
            changeDirection={kpi.changeDirection}
            isInverseMetric={kpi.isInverseMetric}
            statusColor={kpi.statusColor ?? page.status}
            icon={<Icon className="h-5 w-5" />}
          />
        ))}
      </section>

      <ChartCard title={page.primaryChart.title}>{renderPrimaryChart(page.primaryChart)}</ChartCard>

      <section className={cn("grid gap-5", page.zoho && page.slug !== "semrush" && page.slug !== "clarity" ? "lg:grid-cols-[3fr_2fr]" : "lg:grid-cols-1")}>
        {renderSecondary(page)}
        {page.zoho && page.slug !== "semrush" && page.slug !== "clarity" ? (
          <ZohoAdmitPanel channel={page.zoho.channel} admits={admits} totalRevenue={revenue} totalAdmits={243} />
        ) : null}
      </section>

      {page.alert ? (
        <Card className="rounded-xl border-blue-200 bg-blue-50/60 shadow-sm">
          <CardContent className="flex gap-3 p-5 text-sm text-slate-700">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#1E3A5F]" />
            <div>
              <p className="font-semibold text-slate-950">{page.alert.title}</p>
              <p className="mt-1">{page.alert.message}</p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {page.infoCard ? (
        <Card className="rounded-xl border-blue-300 bg-white shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-slate-950">{page.infoCard.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{page.infoCard.body}</p>
            </div>
            <Button asChild className="rounded-lg bg-[#1E3A5F]">
              <Link href={page.infoCard.href} target="_blank">
                {page.infoCard.buttonLabel}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {page.tables.map((table) => (
        <DataTable key={table.title} table={table} />
      ))}

      {page.roas ? (
        <Card className="rounded-xl border-emerald-200 bg-emerald-50/70 shadow-sm">
          <CardContent className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">ROAS</p>
              <p className="text-4xl font-bold tracking-normal text-emerald-800">{page.roas.value.toFixed(1)}x</p>
            </div>
            <p className="text-sm font-medium text-emerald-800">
              {formatINR(page.roas.revenue)} attributed revenue / {formatINR(page.roas.spend)} spend
            </p>
          </CardContent>
        </Card>
      ) : null}

      <AIInsightsPanel insights={page.insights} onRegenerate={() => undefined} />
    </div>
  );
}
