"use client";

import { CalendarDays, ChevronDown } from "lucide-react";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { DateRange } from "@/types";
import { cn } from "@/lib/utils";

const storageKey = "hospital-dashboard-date-range";

export interface DateRangeContextValue {
  dateRange: DateRange;
  setDateRange: (value: DateRange) => void;
}

export const DateRangeContext = createContext<DateRangeContextValue | null>(null);

export interface DateRangeProviderProps {
  children: ReactNode;
}

function getPresetRange(preset: DateRange["preset"]): DateRange {
  const now = new Date();
  const start = new Date(now);

  if (preset === "today") {
    start.setHours(0, 0, 0, 0);
  }

  if (preset === "week") {
    const day = start.getDay() || 7;
    start.setDate(start.getDate() - day + 1);
    start.setHours(0, 0, 0, 0);
  }

  if (preset === "month") {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
  }

  return {
    from: start,
    to: now,
    preset,
  };
}

function formatInputDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getInitialDateRange(): DateRange {
  if (typeof window === "undefined") {
    return getPresetRange("month");
  }

  const saved = window.localStorage.getItem(storageKey);
  if (!saved) {
    return getPresetRange("month");
  }

  try {
    const parsed = JSON.parse(saved) as {
      from: string;
      to: string;
      preset: DateRange["preset"];
    };

    return {
      from: new Date(parsed.from),
      to: new Date(parsed.to),
      preset: parsed.preset,
    };
  } catch {
    return getPresetRange("month");
  }
}

export function DateRangeProvider({ children }: DateRangeProviderProps) {
  const [dateRange, setDateRange] = useState<DateRange>(getInitialDateRange);

  useEffect(() => {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify({
        from: dateRange.from.toISOString(),
        to: dateRange.to.toISOString(),
        preset: dateRange.preset,
      }),
    );
  }, [dateRange]);

  const value = useMemo(() => ({ dateRange, setDateRange }), [dateRange]);

  return <DateRangeContext.Provider value={value}>{children}</DateRangeContext.Provider>;
}

export function useDateRangeContext() {
  const context = useContext(DateRangeContext);

  if (!context) {
    throw new Error("useDateRangeContext must be used within DateRangeProvider");
  }

  return context;
}

export interface DateRangeFilterProps {
  className?: string;
}

const presetLabels: Record<DateRange["preset"], string> = {
  today: "Today",
  week: "This Week",
  month: "This Month",
  custom: "Custom Range",
};

export function DateRangeFilter({ className }: DateRangeFilterProps) {
  const { dateRange, setDateRange } = useDateRangeContext();
  const [isCustomOpen, setIsCustomOpen] = useState(dateRange.preset === "custom");

  function handlePresetChange(value: DateRange["preset"]) {
    setIsCustomOpen(value === "custom");
    setDateRange(value === "custom" ? { ...dateRange, preset: value } : getPresetRange(value));
  }

  function handleCustomDate(key: "from" | "to", value: string) {
    setDateRange({
      ...dateRange,
      [key]: new Date(`${value}T00:00:00`),
      preset: "custom",
    });
  }

  return (
    <div className={cn("relative", className)}>
      <label className="sr-only" htmlFor="date-range-preset">
        Date range
      </label>
      <div className="flex h-12 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 shadow-sm">
        <CalendarDays className="h-5 w-5 text-slate-800" />
        <select
          id="date-range-preset"
          value={dateRange.preset}
          onChange={(event) => handlePresetChange(event.target.value as DateRange["preset"])}
          className="h-full min-w-32 appearance-none bg-transparent pr-7 text-sm font-medium text-slate-900 outline-none"
        >
          <option value="today">{presetLabels.today}</option>
          <option value="week">{presetLabels.week}</option>
          <option value="month">{presetLabels.month}</option>
          <option value="custom">{presetLabels.custom}</option>
        </select>
        <ChevronDown className="pointer-events-none -ml-7 h-4 w-4 text-slate-700" />
      </div>

      {isCustomOpen ? (
        <div className="absolute right-0 top-14 z-50 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-lg sm:grid-cols-2">
          <label className="grid gap-1 text-xs font-medium text-slate-600">
            From
            <input
              type="date"
              value={formatInputDate(dateRange.from)}
              onChange={(event) => handleCustomDate("from", event.target.value)}
              className="h-10 rounded-md border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-teal-600"
            />
          </label>
          <label className="grid gap-1 text-xs font-medium text-slate-600">
            To
            <input
              type="date"
              value={formatInputDate(dateRange.to)}
              onChange={(event) => handleCustomDate("to", event.target.value)}
              className="h-10 rounded-md border border-slate-200 px-3 text-sm text-slate-900 outline-none focus:border-teal-600"
            />
          </label>
        </div>
      ) : null}
    </div>
  );
}
