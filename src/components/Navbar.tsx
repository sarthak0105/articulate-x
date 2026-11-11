"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

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
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled ? "top-4 left-4 right-4" : "top-0 left-0 right-0"
      }`}
    >
      <nav
        className={`mx-auto transition-all duration-500 ${
          isScrolled
            ? "bg-background/85 backdrop-blur-xl border border-foreground/10 rounded-2xl shadow-lg max-w-[1200px]"
            : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? "h-14" : "h-20"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className={`font-display tracking-tight text-foreground transition-all duration-500 ${
                isScrolled ? "text-xl" : "text-2xl"
              }`}
            >
              ArticulateX
            </span>
            <span
              className={`text-muted-foreground font-mono transition-all duration-500 ${
                isScrolled ? "text-[10px] mt-0.5" : "text-xs mt-1"
              }`}
            >
              TM
            </span>
          </Link>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-foreground/75 hover:text-foreground transition-colors duration-300 relative group font-sans"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {onOpenDesignSystem && (
              <button
                onClick={onOpenDesignSystem}
                className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-secondary/80 px-3 py-1 text-xs font-mono text-foreground hover:border-foreground transition-colors"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Tokens</span>
              </button>
            )}
          </div>

          {/* Desktop Call to Action */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (onQuickBook) {
                  onQuickBook();
                } else {
                  const el = document.getElementById("mentors-directory");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className={`inline-flex items-center gap-1.5 bg-foreground hover:bg-foreground/90 text-background rounded-full transition-all duration-500 font-medium ${
                isScrolled ? "px-4 h-8 text-xs" : "px-6 py-2.5 text-sm"
              }`}
            >
              <span>Book Free Demo</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
