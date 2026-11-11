"use client";

import Link from "next/link";
import { Sparkles, Compass } from "lucide-react";

interface NavbarProps {
  onQuickBook?: () => void;
  onOpenDesignSystem?: () => void;
}

export function Navbar({ onQuickBook, onOpenDesignSystem }: NavbarProps) {
  return (
    <header className="fixed top-4 inset-x-0 z-50 mx-auto w-[92%] max-w-4xl">
      <div className="flex h-14 items-center justify-between rounded-full border border-[#273044]/90 bg-[#0b0f1b]/85 px-4 sm:px-6 shadow-2xl backdrop-blur-xl">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-95"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#121828] border border-[#273044] text-[#f4f6ff] shadow-inner transition-transform group-hover:scale-105">
            <span className="font-mono text-xs font-bold tracking-tight">
              A<span className="text-[#7ca0ff]">X</span>
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-semibold tracking-tight text-[#f4f6ff]">
              Articulate<span className="text-[#7ca0ff]">X</span>
            </span>
            <span className="hidden sm:inline font-mono text-[10px] text-[#aab3c7]/60 tracking-wider uppercase ml-1">
              · 1:1 Coaching
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#aab3c7]">
          <Link
            href="/"
            className="flex items-center gap-1.5 transition-colors hover:text-[#f4f6ff]"
          >
            <Compass className="h-3.5 w-3.5 text-[#7ca0ff]" />
            Mentors
          </Link>
          <a
            href="#how-it-works"
            className="transition-colors hover:text-[#f4f6ff]"
          >
            The Method
          </a>
          <a
            href="#testimonials"
            className="transition-colors hover:text-[#f4f6ff]"
          >
            Outcomes
          </a>
          {onOpenDesignSystem && (
            <button
              onClick={onOpenDesignSystem}
              className="inline-flex items-center gap-1 rounded-full bg-[#182035] border border-[#273044] px-2.5 py-1 text-[11px] font-mono text-[#aab3c7] hover:text-[#f4f6ff] hover:border-[#7ca0ff]/40 transition-colors"
            >
              <Sparkles className="h-3 w-3 text-[#7ca0ff]" />
              Tokens
            </button>
          )}
        </nav>

        {/* Right Action: White Pill CTA */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              if (onQuickBook) {
                onQuickBook();
              } else {
                window.location.href = "/#mentors-directory";
              }
            }}
            className="inline-flex items-center justify-center rounded-full bg-[#f4f6ff] px-4 py-2 text-xs font-semibold text-[#0b0f1b] shadow-sm transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
          >
            Book Demo ↗
          </button>
        </div>
      </div>
    </header>
  );
}
