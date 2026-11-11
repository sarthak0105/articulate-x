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
    { name: "Brand Primary", hex: "#0F172A", desc: "Obsidian Slate / Headings & Dark Elements" },
    { name: "Brand Accent", hex: "#2563EB", desc: "Electric Blue / Primary CTA & Active states" },
    { name: "Accent Light", hex: "#EFF6FF", desc: "Soft Tint / Badges & active tabs" },
    { name: "Success / Live", hex: "#059669", desc: "Emerald / Slot availability & Confirmed state" },
    { name: "Amber / Rating", hex: "#F59E0B", desc: "Warm Amber / Star rating & accolades" },
    { name: "Neutral Surface", hex: "#FFFFFF", desc: "Crisp White / Elevated Cards" },
    { name: "Neutral Background", hex: "#F8FAFC", desc: "Subtle Gray / Canvas base" },
    { name: "Border Subtle", hex: "#E2E8F0", desc: "Card borders & dividers" },
  ];

  const typography = [
    { level: "Display Title (H1)", spec: "font-bold text-3xl / 4xl (tracking-tight)", sample: "Find Your Mentor & Speak Unmissably" },
    { level: "Section Heading (H2)", spec: "font-bold text-2xl (tracking-tight)", sample: "World-Class Communication Mentors" },
    { level: "Card Heading (H3)", spec: "font-bold text-lg", sample: "Priya Sharma — Former Partner & Pitch Coach" },
    { level: "Body Text", spec: "text-sm / font-normal (leading-relaxed)", sample: "Live 1:1 public speaking coaching tailored to your upcoming high-stakes speaking context." },
    { level: "Caption / Monospace", spec: "text-xs / font-medium uppercase", sample: "30-MIN FREE DEMO • 14+ YRS EXP" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Articulate X — Reusable Component &amp; Token System
            </h2>
            <p className="text-xs text-slate-500">
              Task 1 (Optional #5): Reusable styles, buttons, inputs, cards, type scale &amp; colors.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[80vh] overflow-y-auto p-6 space-y-6">
          {/* Colors */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              1. Color Tokens &amp; Contrast
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {colors.map((c) => (
                <div
                  key={c.hex}
                  onClick={() => copyHex(c.hex)}
                  className="group cursor-pointer rounded-xl border border-slate-200 p-2.5 transition-all hover:border-blue-400 hover:shadow-sm"
                >
                  <div
                    className="h-10 w-full rounded-lg mb-2 shadow-inner border border-black/5 flex items-center justify-center text-white"
                    style={{ backgroundColor: c.hex }}
                  >
                    {copiedToken === c.hex ? (
                      <Check className="h-4 w-4 drop-shadow text-white" />
                    ) : (
                      <Copy className="h-3 w-3 opacity-0 group-hover:opacity-80 transition-opacity drop-shadow text-white" />
                    )}
                  </div>
                  <div className="text-xs font-bold text-slate-900">{c.name}</div>
                  <div className="font-mono text-[10px] text-slate-500 flex items-center justify-between">
                    <span>{c.hex}</span>
                    {copiedToken === c.hex && (
                      <span className="text-emerald-600 font-semibold">Copied!</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                    {c.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Scale */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              2. Typography Scale (Geist Sans + Tabular Figures)
            </h3>
            <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 bg-slate-50/50">
              {typography.map((t) => (
                <div key={t.level} className="p-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold text-slate-700">{t.level}</span>
                    <span className="font-mono text-[11px] text-slate-400">{t.spec}</span>
                  </div>
                  <div className="text-slate-900 text-sm font-medium">{t.sample}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons and Badges */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              3. Interactive Components (Buttons &amp; Badges)
            </h3>
            <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white">
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700">
                Primary Button
              </button>
              <button className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800">
                Secondary Dark
              </button>
              <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                Outline Button
              </button>
              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-200/70">
                Featured Coach
              </span>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                Available Today
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-100 bg-slate-50 px-6 py-3">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
}
