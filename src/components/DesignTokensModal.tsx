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
    { name: "Background (Warm Paper)", hex: "oklch(0.985 0.002 90)", desc: "Warm editorial white page background" },
    { name: "Foreground (Charcoal Ink)", hex: "oklch(0.12 0.01 60)", desc: "Primary deep black typography & black pill CTA" },
    { name: "Card Surface", hex: "oklch(1 0 0)", desc: "Crisp white card and elevated surfaces" },
    { name: "Border / Hairline", hex: "oklch(0.88 0.01 90)", desc: "Hairline architectural grid and card borders" },
    { name: "Muted Text", hex: "oklch(0.45 0.02 60)", desc: "Editorial secondary text and metadata" },
    { name: "Secondary Surface", hex: "oklch(0.96 0.005 90)", desc: "Discreet secondary tag chips and input background" },
    { name: "Live Indicator", hex: "#10b981", desc: "Emerald live booking status indicator" },
    { name: "Star Rating", hex: "#f59e0b", desc: "Warm amber verified rating star" },
  ];

  const typography = [
    { level: "Hero Display H1", spec: "font-bold text-[clamp(2.75rem,7.5vw,5.75rem)] (Instrument Sans)", sample: "Master high-stakes speaking." },
    { level: "Section Heading H2", spec: "font-bold text-3xl / 5xl (Instrument Sans)", sample: "World-Class Communication Coaches." },
    { level: "Card Title H3", spec: "font-bold text-xl / 2xl (Instrument Sans)", sample: "Kavita Krishnan — Executive Voice Coach" },
    { level: "Monospace Meta", spec: "font-mono text-xs (JetBrains Mono)", sample: "[01] / MEDIA & ENTERTAINMENT · 13+ YRS EXP" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-foreground/40 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-foreground/15 bg-card text-foreground shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-foreground/10 bg-secondary/50 px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Editorial Minimalist Design System
            </h2>
            <p className="text-xs font-mono text-muted-foreground">
              Warm paper palette, Instrument Serif, JetBrains Mono &amp; architectural hairlines.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[75vh] overflow-y-auto p-6 space-y-6">
          {/* Palette Grid */}
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Color Tokens
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {colors.map((c) => (
                <div
                  key={c.name}
                  onClick={() => copyHex(c.hex)}
                  className="flex items-center justify-between rounded-xl border border-foreground/10 bg-background p-3 hover:border-foreground/30 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-8 w-8 rounded-lg border border-foreground/15 shadow-sm"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div>
                      <h4 className="text-xs font-medium text-foreground">{c.name}</h4>
                      <p className="text-[10px] text-muted-foreground">{c.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                    <span>{c.hex}</span>
                    {copiedToken === c.hex ? (
                      <Check className="h-3 w-3 text-emerald-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Typography Scale */}
          <div className="border-t border-foreground/10 pt-5">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Typography Scale (Instrument Serif &amp; JetBrains Mono)
            </h3>
            <div className="space-y-3">
              {typography.map((t) => (
                <div
                  key={t.level}
                  className="rounded-xl border border-foreground/10 bg-background p-3.5 space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span className="font-semibold text-foreground">{t.level}</span>
                    <span>{t.spec}</span>
                  </div>
                  <p className="text-sm text-foreground/90 font-bold pt-1">{t.sample}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
