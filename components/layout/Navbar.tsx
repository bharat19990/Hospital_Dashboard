"use client";

import { RefreshCw } from "lucide-react";
import { usePathname } from "next/navigation";
import { DateRangeFilter } from "@/components/layout/DateRangeFilter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/youtube": "YouTube",
  "/google-ads": "Google Ads",
  "/google-business": "Google Business",
  "/facebook": "Facebook",
  "/instagram": "Instagram",
  "/whatsapp": "WhatsApp",
  "/search-console": "Search Console",
  "/semrush": "SEMrush",
  "/clarity": "Clarity",
  "/ga4": "GA4",
  "/settings": "Settings",
};

export interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Dashboard";

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex min-h-20 items-center justify-between gap-4 border-b border-slate-200/70 bg-[#F8FAFC]/95 px-4 py-3 backdrop-blur md:px-6 xl:px-8",
        className,
      )}
    >
      <h1 className="text-2xl font-bold tracking-normal text-slate-950 sm:text-3xl">{title}</h1>
      <div className="flex items-center gap-2">
        <DateRangeFilter />
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Refresh dashboard data"
          className="hidden h-12 w-12 rounded-lg bg-white text-slate-800 shadow-sm sm:inline-flex"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
