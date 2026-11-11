"use client";

import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

interface DesignTokensModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DesignTokensModal({ isOpen, onClose }: DesignTokensModalProps) {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedToken(hex);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const colors = [
    { name: "Canvas Background", hex: "#0b0f1b", desc: "Midnight blue canvas background" },
    { name: "Surface Card", hex: "#121828", desc: "Primary card & container surface" },
    { name: "Line / Hairline", hex: "#273044", desc: "Subtle borders and separators" },
    { name: "Ink / Off-White", hex: "#f4f6ff", desc: "Primary typography and white pill CTA" },
    { name: "Muted Slate", hex: "#aab3c7", desc: "Secondary text & descriptions" },
    { name: "Primary Accent", hex: "#7ca0ff", desc: "Periwinkle electric glow & active states" },
    { name: "Signal Orange", hex: "#ff3300", desc: "High-voltage accent & error highlights" },
    { name: "Electric Violet", hex: "#4a00ff", desc: "Founder pitch accent" },
  ];

  const typography = [
    { level: "Hero Display H1", spec: "font-normal text-5xl / 7xl (Geist Sans)", sample: "Public speaking coaching." },
    { level: "Section Heading H2", spec: "font-normal text-3xl / 4xl (tracking-tight)", sample: "Your next big moment deserves practice." },
    { level: "Card Title H3", spec: "font-medium text-xl", sample: "Priya Sharma — Former Partner & Pitch Coach" },
    { level: "Monospace Meta", spec: "font-mono text-xs (JetBrains Mono)", sample: "01 · COURSES · INDIVIDUAL COACHING · 14+ YRS EXP" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-[#273044] bg-[#121828] text-[#f4f6ff] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#273044] bg-[#0b0f1b] px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-[#f4f6ff]">
              ArticulateX Official Design Tokens (Midnight Blue)
            </h2>
            <p className="text-xs font-mono text-[#aab3c7]">
              Extracted from articulatex.in: dark atmospheric theme, Geist &amp; JetBrains Mono.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#aab3c7] hover:bg-[#182035] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[80vh] overflow-y-auto p-6 space-y-6">
          {/* Colors */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#7ca0ff] mb-3">
              1. Color Palette Tokens
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {colors.map((c) => (
                <div
                  key={c.hex}
                  onClick={() => copyHex(c.hex)}
                  className="group cursor-pointer rounded-2xl border border-[#273044] bg-[#0b0f1b] p-3 transition-all hover:border-[#7ca0ff]/60"
                >
                  <div
                    className="h-10 w-full rounded-xl mb-2.5 shadow-inner border border-white/10 flex items-center justify-center text-white"
                    style={{ backgroundColor: c.hex }}
                  >
                    {copiedToken === c.hex ? (
                      <Check className="h-4 w-4 drop-shadow text-white" />
                    ) : (
                      <Copy className="h-3 w-3 opacity-0 group-hover:opacity-80 transition-opacity drop-shadow text-white" />
                    )}
                  </div>
                  <div className="text-xs font-semibold text-[#f4f6ff]">{c.name}</div>
                  <div className="font-mono text-[10px] text-[#aab3c7] flex items-center justify-between mt-0.5">
                    <span>{c.hex}</span>
                    {copiedToken === c.hex && (
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    )}
                  </div>
                  <div className="text-[10px] text-[#aab3c7]/60 line-clamp-1 mt-1">
                    {c.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Scale */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#7ca0ff] mb-3">
              2. Typography System (Geist + JetBrains Mono)
            </h3>
            <div className="rounded-2xl border border-[#273044] divide-y divide-[#273044] bg-[#0b0f1b]">
              {typography.map((t) => (
                <div key={t.level} className="p-3.5">
                  <div className="flex items-center justify-between text-xs text-[#aab3c7] mb-1">
                    <span className="font-semibold text-[#f4f6ff]">{t.level}</span>
                    <span className="font-mono text-[10px] text-[#7ca0ff]">{t.spec}</span>
                  </div>
                  <div className="text-[#f4f6ff] text-sm">{t.sample}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons and Badges */}
          <div>
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#7ca0ff] mb-3">
              3. Interactive Components
            </h3>
            <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl border border-[#273044] bg-[#0b0f1b]">
              <button className="rounded-full bg-[#f4f6ff] px-5 py-2 text-xs font-semibold text-[#0b0f1b] hover:bg-white shadow-lg">
                Primary White Pill
              </button>
              <button className="rounded-full border border-[#273044] bg-[#182035] px-5 py-2 text-xs font-medium text-[#f4f6ff] hover:bg-[#202b44]">
                Frosted Dark Glass
              </button>
              <span className="rounded-full border border-[#7ca0ff]/40 bg-[#7ca0ff]/10 px-3 py-1 font-mono text-[11px] text-[#7ca0ff]">
                Active Filter
              </span>
              <span className="rounded-full border border-[#ff3300]/40 bg-[#ff3300]/10 px-3 py-1 font-mono text-[11px] text-[#ff3300]">
                Signal Orange
              </span>
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] text-emerald-400">
                Available Slots
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-[#273044] bg-[#0b0f1b] px-6 py-3">
          <button
            onClick={onClose}
            className="rounded-full bg-[#f4f6ff] px-5 py-2 text-xs font-semibold text-[#0b0f1b] hover:bg-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
