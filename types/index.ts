export interface DateRange {
  from: Date;
  to: Date;
  preset: "today" | "week" | "month" | "custom";
}

export interface KpiMetric {
  label: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeDirection?: "up" | "down";
}

export type ChannelStatus = "green" | "yellow" | "red";

export interface ZohoAdmit {
  date: string;
  referralMode: string;
  channel: string;
}

export interface AIInsight {
  text: string;
  priority: number;
  channel: string;
}
