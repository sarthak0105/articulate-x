import type { Metadata, Viewport } from "next";
import "./globals.compiled.css";

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
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#0b0f1b] text-[#f4f6ff] font-sans selection:bg-[#7ca0ff]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
