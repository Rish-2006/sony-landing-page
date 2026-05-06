import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sony WH-1000XM6 - Silence, perfected.",
  description: "Flagship wireless noise cancelling, re‑engineered for a world that never stops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-primary-bg text-white`}
      >
        {children}
      </body>
    </html>
  );
}
