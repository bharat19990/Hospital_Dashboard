"use client";

import { useEffect, useState } from "react";
import type { DateRange } from "@/types";

export interface UseChannelDataState<TData> {
  data: TData | null;
  isLoading: boolean;
  error: Error | null;
}

export function useChannelData<TData>(channel: string, dateRange: DateRange): UseChannelDataState<TData> {
  const [state] = useState<UseChannelDataState<TData>>({
    data: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    void channel;
    void dateRange;
  }, [channel, dateRange]);

  return state;
}
