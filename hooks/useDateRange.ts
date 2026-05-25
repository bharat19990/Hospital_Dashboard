"use client";

import { useState } from "react";
import type { DateRange } from "@/types";

export function useDateRange(initialRange?: DateRange) {
  const [dateRange, setDateRange] = useState<DateRange>(
    initialRange ?? {
      from: new Date(),
      to: new Date(),
      preset: "today",
    },
  );

  return { dateRange, setDateRange };
}
