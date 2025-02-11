import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PropsWithChildren } from "react";
import { Providers } from "./providers";
import { Toaster } from "@/src/components/ui/toaster";

export type ProviderProps = PropsWithChildren;
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo app created with Next.js by Mathis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} font-sans ${geistMono.variable} antialiased  `}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
