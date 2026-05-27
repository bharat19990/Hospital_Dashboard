"use client";

import {
  Camera,
  DollarSign,
  Home,
  MessageCircle,
  Play,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const navItems: Array<{ label: string; href: string; icon: Icon }> = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "YouTube", href: "/youtube", icon: Play },
  { label: "Google Ads", href: "/google-ads", icon: DollarSign },
  { label: "Facebook", href: "/facebook", icon: Users },
  { label: "Instagram", href: "/instagram", icon: Camera },
  { label: "WhatsApp", href: "/whatsapp", icon: MessageCircle },
  { label: "Settings", href: "/settings", icon: Settings },
];

export interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden w-[240px] flex-col bg-[#062D5A] px-3 py-5 text-white shadow-xl md:flex xl:w-[240px] xl:px-4",
        "md:w-20",
        className,
      )}
    >
      <Link href="/dashboard" className="mb-7 flex items-center gap-3 px-2 xl:px-1">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border-2 border-[#0D9488] text-[#0D9488]">
          <svg aria-hidden="true" viewBox="0 0 48 48" className="h-8 w-8" fill="none">
            <path
              d="M19 5h10v14h14v10H29v14H19V29H5V19h14V5Z"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="hidden leading-tight xl:block">
          <span className="block text-xl font-bold tracking-normal">HealthPlus</span>
          <span className="block text-[11px] font-semibold uppercase tracking-[0.35em] text-[#0D9488]">Hospital</span>
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.href || (pathname === "/" && item.href === "/dashboard");

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              title={item.label}
              className={cn(
                "flex h-12 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition-colors md:justify-center xl:justify-start",
                isActive ? "bg-[#0D9488] text-white shadow-sm" : "text-white/90 hover:bg-white/10 hover:text-white",
              )}
            >
              <IconComponent className="h-6 w-6 shrink-0" />
              <span className="hidden xl:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
