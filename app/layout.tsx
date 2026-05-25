import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { DateRangeProvider } from "@/components/layout/DateRangeFilter";
import { MobileNav } from "@/components/layout/MobileNav";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hospital Marketing Dashboard",
  description: "Internal hospital digital marketing analytics dashboard",
};

interface RootLayoutProps {
  children: ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DateRangeProvider>
          <div className="min-h-screen bg-[#F8FAFC]">
            <Sidebar />
            <div className="min-h-screen md:pl-20 xl:pl-[240px]">
              <Navbar />
              <main className="px-4 pb-24 pt-4 sm:px-6 md:pb-8 xl:px-8">{children}</main>
            </div>
            <MobileNav />
          </div>
        </DateRangeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
