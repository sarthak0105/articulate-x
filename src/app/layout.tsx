import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Articulate X — Live 1:1 Public Speaking Coaching | Find a Mentor & Book Demo",
  description:
    "Articulate X offers live 1:1 public speaking coaching with industry mentors for founders, executives, teams and students. Find your mentor and book a free 30-min demo session.",
  keywords: [
    "public speaking coaching",
    "executive presence",
    "pitch coaching",
    "TEDx coaching",
    "Articulate X",
    "mentor booking",
  ],
  authors: [{ name: "Articulate X" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
