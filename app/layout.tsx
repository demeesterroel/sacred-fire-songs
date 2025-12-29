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
import QueryProvider from "@/components/providers/QueryProvider";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans overflow-hidden`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <div className="h-screen h-[100svh] bg-black flex justify-center selection:bg-red-500/30">
            <div className="w-full max-w-[420px] bg-gray-900 h-full relative shadow-2xl flex flex-col overflow-hidden">
              <Header />
              {/* <PageTransition> */}
              {children}
              {/* </PageTransition> */}
            </div>
          </div>
        </QueryProvider>
      </body>
    </html >
  );
}
