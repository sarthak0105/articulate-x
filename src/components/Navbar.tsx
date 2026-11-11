"use client";

import Link from "next/link";
import { Sparkles, Compass, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onQuickBook?: () => void;
  onOpenDesignSystem?: () => void;
}

export function Navbar({ onQuickBook, onOpenDesignSystem }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 transition-opacity hover:opacity-95"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm ring-1 ring-slate-800 transition-transform group-hover:scale-105">
            <span className="font-mono text-lg font-bold tracking-tight text-white">
              A<span className="text-blue-500">X</span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
              Articulate<span className="text-blue-600">X</span>
            </span>
            <span className="text-[11px] font-medium tracking-wide text-slate-500 uppercase mt-0.5">
              From Um to Unmissable
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <Link
            href="/"
            className="flex items-center gap-1.5 transition-colors hover:text-blue-600"
          >
            <Compass className="h-4 w-4" />
            Find a Mentor
          </Link>
          <a
            href="#how-it-works"
            className="transition-colors hover:text-blue-600"
          >
            How 1:1 Works
          </a>
          <a
            href="#testimonials"
            className="transition-colors hover:text-blue-600"
          >
            Learner Stories
          </a>
          {onOpenDesignSystem && (
            <button
              onClick={onOpenDesignSystem}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
              title="Inspect Design System Tokens & Components"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              Design System
            </button>
          )}
        </nav>

        {/* Right Action */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>100% Free 30-min Demo</span>
          </div>

          <button
            onClick={() => {
              if (onQuickBook) {
                onQuickBook();
              } else {
                window.location.href = "/#mentors-directory";
              }
            }}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
          >
            Book Free Demo
          </button>
        </div>
      </div>
    </header>
  );
}
