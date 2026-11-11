"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Compass, ShieldCheck } from "lucide-react";

interface NavbarProps {
  onQuickBook?: () => void;
  onOpenDesignSystem?: () => void;
}

const navLinks = [
  { name: "Mentors", href: "/#mentors-directory" },
  { name: "The Method", href: "#how-it-works" },
  { name: "Outcomes", href: "#testimonials" },
];

export function Navbar({ onQuickBook, onOpenDesignSystem }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 inset-x-0 z-50 mx-auto w-[94%] max-w-5xl transition-all duration-500">
      <nav
        className={`flex h-14 items-center justify-between px-5 sm:px-6 rounded-full border border-white/10 shadow-2xl backdrop-blur-xl transition-all duration-300 ${
          isScrolled
            ? "bg-[#090d16]/90 border-[#7ca0ff]/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            : "bg-[#090d16]/75"
        }`}
      >
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111624] border border-[#232d42] text-[#f4f6ff] transition-transform group-hover:scale-105">
            <span className="font-mono text-xs font-semibold tracking-tighter">
              A<span className="text-[#7ca0ff]">X</span>
            </span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-xl sm:text-2xl tracking-tight text-[#f4f6ff]">
              Articulate<span className="italic text-[#7ca0ff]">X</span>
            </span>
            <span className="hidden sm:inline font-mono text-[10px] text-[#8290ab] uppercase tracking-widest">
              TM
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-mono text-[#94a3b8]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative py-1 transition-colors hover:text-[#f4f6ff] group"
            >
              <span>{link.name}</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#7ca0ff] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          {onOpenDesignSystem && (
            <button
              onClick={onOpenDesignSystem}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#111624] border border-[#232d42] px-3 py-1 text-[11px] font-mono text-[#94a3b8] hover:text-[#f4f6ff] hover:border-[#7ca0ff]/40 transition-colors"
            >
              <ShieldCheck className="h-3 w-3 text-[#7ca0ff]" />
              <span>Design System</span>
            </button>
          )}
        </div>

        {/* Right Action: Clean White Pill CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              if (onQuickBook) {
                onQuickBook();
              } else {
                const el = document.getElementById("mentors-directory");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#f4f6ff] px-4 sm:px-5 py-2 text-xs font-medium text-[#090d16] shadow-sm transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Book Free Demo</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </nav>
    </header>
  );
}
