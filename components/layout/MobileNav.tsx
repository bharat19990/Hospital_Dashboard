"use client";

import { Camera, DollarSign, Home, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const mobileItems: Array<{ label: string; href: string; icon: Icon }> = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Ads", href: "/google-ads", icon: DollarSign },
  { label: "Facebook", href: "/facebook", icon: Users },
  { label: "Instagram", href: "/instagram", icon: Camera },
  { label: "Settings", href: "/settings", icon: Settings },
];

export interface MobileNavProps {
  className?: string;
}

export function MobileNav({ className }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 grid h-16 grid-cols-5 border-t border-slate-200 bg-white shadow-[0_-8px_24px_rgba(15,23,42,0.08)] md:hidden",
        className,
      )}
    >
      {mobileItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = pathname === item.href || (pathname === "/" && item.href === "/dashboard");

        return (
          <Link
            key={item.href}
            href={item.href}
            className="relative flex flex-col items-center justify-center gap-1 text-[11px] font-semibold text-slate-600"
          >
            <IconComponent className={cn("h-5 w-5", isActive ? "text-[#0D9488]" : "text-slate-500")} />
            <span className={isActive ? "text-[#0D9488]" : undefined}>{item.label}</span>
            {isActive ? <span className="absolute bottom-0 h-1 w-9 rounded-t-full bg-[#0D9488]" /> : null}
          </Link>
        );
      })}
    </nav>
  );
}
