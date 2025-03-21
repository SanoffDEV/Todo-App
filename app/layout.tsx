import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PropsWithChildren } from "react";
import { Toaster } from "@/src/components/ui/toaster";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  title: "Ultimate Todo App",
  description:
    "The ultimate todo app to organize your life, the easyiest and the fastest way to manage your tasks. Built with Next.js, Tailwind, Prisma, TypeScript, and more.",
  keywords:
    "todo, todo app, next.js, react, tailwind, prisma, typescript,task, tasks, manage, organize, life, easy, fast",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <SpeedInsights />
      <body
        className={`${geistSans.variable} font-sans ${geistMono.variable} antialiased  `}
      >
        <Providers>
          <main>{children}</main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
