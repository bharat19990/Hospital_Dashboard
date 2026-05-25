"use client";

import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface AxisSeries {
  key: string;
  color: string;
  label: string;
}

export interface DualAxisChartProps<TData extends object = Record<string, unknown>> {
  data: TData[];
  xKey: string;
  leftLine: AxisSeries;
  rightBar: AxisSeries;
  title: string;
  height?: number;
}

export function DualAxisChart<TData extends object = Record<string, unknown>>({
  data,
  xKey,
  leftLine,
  rightBar,
  title,
  height = 280,
}: DualAxisChartProps<TData>) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-slate-950">{title}</h2>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 4, left: -22, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey={xKey} tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
            <YAxis yAxisId="left" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
            <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0" }} />
            <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
            <Bar yAxisId="right" dataKey={rightBar.key} name={rightBar.label} fill={rightBar.color} radius={[6, 6, 0, 0]} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey={leftLine.key}
              name={leftLine.label}
              stroke={leftLine.color}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
