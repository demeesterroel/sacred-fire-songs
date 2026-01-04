import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/common/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Camino Rojo | Songbook",
  description: "A digital songbook for medicine music ceremonies.",
  icons: {
    icon: "/favicon.svg",
  },
};

import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import QueryProvider from "@/components/providers/QueryProvider";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <div className="min-h-screen bg-black text-gray-100 font-sans flex flex-col md:flex-row selection:bg-red-500/30">

            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-gray-950 relative">
              {/* Mobile Header */}
              <Header />

              {/* Page Content */}
              {children}
            </div>
          </div>
        </QueryProvider>
      </body>
    </html >
  );
}
