"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface BarSpec {
  key: string;
  color: string;
  label: string;
}

export interface BarChartWrapperProps<TData extends object = Record<string, unknown>> {
  data: TData[];
  xKey: string;
  bars: BarSpec[];
  title: string;
  layout?: "vertical" | "horizontal";
  height?: number;
}

export function BarChartWrapper<TData extends object = Record<string, unknown>>({
  data,
  xKey,
  bars,
  title,
  layout = "horizontal",
  height = 260,
}: BarChartWrapperProps<TData>) {
  const isVertical = layout === "vertical";

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-slate-950">{title}</h2>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout={isVertical ? "vertical" : "horizontal"} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            {isVertical ? (
              <>
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
                <YAxis dataKey={xKey} type="category" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
              </>
            ) : (
              <>
                <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
              </>
            )}
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0" }} />
            <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
            {bars.map((bar) => (
              <Bar key={bar.key} dataKey={bar.key} name={bar.label} fill={bar.color} radius={[6, 6, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
