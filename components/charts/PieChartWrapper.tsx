"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export interface PieChartDatum {
  name: string;
  value: number;
  color: string;
}

export interface PieChartWrapperProps {
  data: PieChartDatum[];
  title: string;
  showLegend?: boolean;
  height?: number;
}

export function PieChartWrapper({ data, title, showLegend = true, height = 260 }: PieChartWrapperProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-slate-950">{title}</h2>
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius="58%" outerRadius="82%" paddingAngle={2}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #E2E8F0" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {showLegend ? (
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-slate-700">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="truncate">{item.name}</span>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
