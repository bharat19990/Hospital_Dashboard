"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface LineSpec {
  key: string;
  color: string;
  label: string;
}

export interface LineChartWrapperProps<TData extends object = Record<string, unknown>> {
  data: TData[];
  xKey: string;
  lines: LineSpec[];
  title: string;
  subtitle?: string;
  height?: number;
}

export function LineChartWrapper<TData extends object = Record<string, unknown>>({
  data,
  xKey,
  lines,
  title,
  subtitle,
  height = 260,
}: LineChartWrapperProps<TData>) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
        {subtitle ? <p className="text-sm text-slate-500">{subtitle}</p> : null}
      </div>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 16, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #E2E8F0",
                boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
              }}
            />
            <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
            {lines.map((line) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                name={line.label}
                stroke={line.color}
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
