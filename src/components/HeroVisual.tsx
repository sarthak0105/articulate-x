"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Mic, Volume2, Activity, CheckCircle2, Sparkles } from "lucide-react";

interface SphereWord {
  text: string;
  theta: number;
  phi: number;
  isKey?: boolean;
}

const COACHING_TERMS: SphereWord[] = [
  { text: "EXECUTIVE PRESENCE", theta: Math.PI * 0.35, phi: 0, isKey: true },
  { text: "VOICE ACOUSTICS", theta: Math.PI * 0.65, phi: Math.PI * 0.45, isKey: true },
  { text: "PITCH & FUNDRAISE", theta: Math.PI * 0.4, phi: Math.PI * 0.9, isKey: true },
  { text: "KEYNOTES & TEDx", theta: Math.PI * 0.6, phi: Math.PI * 1.35, isKey: true },
  { text: "GRAVITAS", theta: Math.PI * 0.25, phi: Math.PI * 1.7, isKey: true },
  { text: "DIAPHRAGM", theta: Math.PI * 0.75, phi: Math.PI * 0.15 },
  { text: "CADENCE", theta: Math.PI * 0.5, phi: Math.PI * 0.65 },
  { text: "RESONANCE", theta: Math.PI * 0.3, phi: Math.PI * 1.15 },
  { text: "AUDIT", theta: Math.PI * 0.7, phi: Math.PI * 1.6 },
  { text: "STORYTELLING", theta: Math.PI * 0.5, phi: Math.PI * 1.95 },
];

export function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const [activeMetric, setActiveMetric] = useState<number>(0);

  // Rotate through telemetry highlights
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 3);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // 3D Wireframe & Word Sphere Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const radius = Math.min(rect.width, rect.height) * 0.42;

      const rotY = time * 0.35;
      const rotX = Math.sin(time * 0.2) * 0.12 + 0.08;

      // Latitude Rings
      const rings = [-0.6, -0.3, 0, 0.3, 0.6];
      rings.forEach((ringY) => {
        const ringRadius = radius * Math.cos(Math.asin(ringY));
        const ringZOffset = radius * ringY;

        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.09) {
          const x = ringRadius * Math.cos(a + rotY);
          const z = ringRadius * Math.sin(a + rotY);
          const y = ringZOffset;

          const newY = y * Math.cos(rotX) - z * Math.sin(rotX);
          const screenX = centerX + x;
          const screenY = centerY + newY;

          if (a === 0) {
            ctx.moveTo(screenX, screenY);
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
        ctx.strokeStyle = "rgba(18, 18, 18, 0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // 3D Words Projection
      const projectedWords: {
        text: string;
        x: number;
        y: number;
        z: number;
        scale: number;
        alpha: number;
        isKey?: boolean;
      }[] = [];

      COACHING_TERMS.forEach((term) => {
        const x = Math.sin(term.theta) * Math.cos(term.phi + rotY);
        const z = Math.sin(term.theta) * Math.sin(term.phi + rotY);
        const y = Math.cos(term.theta);

        const newY = y * Math.cos(rotX) - z * Math.sin(rotX);
        const finalZ = y * Math.sin(rotX) + z * Math.cos(rotX);

        const depth = (finalZ + 1) / 2;
        const scale = 0.75 + depth * 0.55;
        const alpha = Math.max(0.08, depth * 0.9);

        projectedWords.push({
          text: term.text,
          x: centerX + x * radius,
          y: centerY + newY * radius,
          z: finalZ,
          scale,
          alpha,
          isKey: term.isKey,
        });
      });

      projectedWords.sort((a, b) => a.z - b.z);

      projectedWords.forEach((pw) => {
        ctx.save();
        ctx.translate(pw.x, pw.y);
        ctx.scale(pw.scale, pw.scale);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (pw.isKey) {
          ctx.font = `600 11px "JetBrains Mono", monospace`;
          ctx.fillStyle = `rgba(18, 18, 18, ${pw.alpha})`;
          ctx.fillText(pw.text, 0, 0);

          ctx.beginPath();
          ctx.arc(0, 9, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(18, 18, 18, ${pw.alpha * 0.6})`;
          ctx.fill();
        } else {
          ctx.font = `500 10px "JetBrains Mono", monospace`;
          ctx.fillStyle = `rgba(18, 18, 18, ${pw.alpha * 0.6})`;
          ctx.fillText(pw.text, 0, 0);
        }

        ctx.restore();
      });

      time += 0.012;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="relative w-full max-w-xl mx-auto aspect-square flex items-center justify-center">
      {/* 3D Wireframe Sphere in the background */}
      <div className="absolute inset-0 w-full h-full opacity-60 pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ display: "block" }}
          aria-hidden="true"
        />
      </div>

      {/* Outer Rotating Architectural Celestial Ring */}
      <div className="absolute inset-0 m-auto w-[94%] h-[94%] rounded-full border border-dashed border-foreground/15 animate-[spin_80s_linear_infinite] pointer-events-none" />
      <div className="absolute inset-0 m-auto w-[82%] h-[82%] rounded-full border border-foreground/10 animate-[spin_50s_linear_infinite_reverse] pointer-events-none" />

      {/* Main Foreground Architectural Card: Speech Diagnostic Console */}
      <div className="relative z-10 w-full max-w-[420px] rounded-3xl border border-foreground/15 bg-card/95 backdrop-blur-xl p-6 sm:p-7 shadow-2xl transition-all hover:border-foreground/30 hover-lift">
        {/* Console Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-foreground/10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 rounded-full bg-foreground/80 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-foreground tracking-tight">
              1:1 Acoustic Speech Diagnostic
            </span>
          </div>
          <span className="rounded-full border border-foreground/15 bg-secondary/80 px-2.5 py-0.5 text-[10px] font-mono font-medium text-foreground">
            LIVE SESSION
          </span>
        </div>

        {/* Live Coach Snippet */}
        <div className="mt-4 flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-foreground/10 bg-secondary">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
              alt="Priya Sharma"
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-foreground truncate">
                Priya Sharma
              </h4>
              <span className="text-[10px] font-mono text-muted-foreground">
                Partner &amp; Voice Lead
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground truncate font-sans mt-0.5">
              Coaching session with YC S24 Founder
            </p>
          </div>
        </div>

        {/* Real-Time Acoustic Waveform Bars */}
        <div className="mt-5 rounded-2xl border border-foreground/10 bg-secondary/50 p-4">
          <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-muted-foreground">
            <div className="flex items-center gap-1.5 text-foreground">
              <Volume2 className="h-3.5 w-3.5" />
              <span className="font-semibold">Vocal Frequency Spectrum</span>
            </div>
            <span>85Hz &mdash; 255Hz</span>
          </div>

          {/* Equalizer Frequency Bars Animation */}
          <div className="flex items-end justify-between h-14 gap-1.5 px-1">
            {[45, 75, 30, 90, 60, 100, 70, 85, 40, 95, 65, 80, 50, 70, 90, 60, 40, 75].map(
              (height, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-foreground/80 rounded-full transition-all duration-300"
                  style={{
                    height: `${height}%`,
                    animation: `pulseHeight 1.4s ease-in-out infinite alternate`,
                    animationDelay: `${idx * 0.08}s`,
                  }}
                />
              )
            )}
          </div>
        </div>

        {/* Telemetry Metrics Row */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          <div
            className={`rounded-xl border p-2.5 text-center transition-all ${
              activeMetric === 0
                ? "border-foreground bg-secondary/80 shadow-sm"
                : "border-foreground/10 bg-background"
            }`}
          >
            <span className="block text-[10px] font-mono text-muted-foreground uppercase">
              Pacing
            </span>
            <span className="text-xs font-bold text-foreground font-mono mt-0.5 block">
              138 WPM
            </span>
            <span className="text-[9px] text-muted-foreground">Controlled</span>
          </div>

          <div
            className={`rounded-xl border p-2.5 text-center transition-all ${
              activeMetric === 1
                ? "border-foreground bg-secondary/80 shadow-sm"
                : "border-foreground/10 bg-background"
            }`}
          >
            <span className="block text-[10px] font-mono text-muted-foreground uppercase">
              Resonance
            </span>
            <span className="text-xs font-bold text-foreground font-mono mt-0.5 block">
              96% Deep
            </span>
            <span className="text-[9px] text-muted-foreground">Diaphragm</span>
          </div>

          <div
            className={`rounded-xl border p-2.5 text-center transition-all ${
              activeMetric === 2
                ? "border-foreground bg-secondary/80 shadow-sm"
                : "border-foreground/10 bg-background"
            }`}
          >
            <span className="block text-[10px] font-mono text-muted-foreground uppercase">
              Fillers
            </span>
            <span className="text-xs font-bold text-foreground font-mono mt-0.5 block">
              0.0%
            </span>
            <span className="text-[9px] text-muted-foreground">Zero mumbling</span>
          </div>
        </div>

        {/* Live Feedback Quote */}
        <div className="mt-4 rounded-xl border border-foreground/10 bg-background p-3 text-left">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground mb-1">
            <CheckCircle2 className="h-3 w-3 text-foreground" />
            <span className="font-semibold text-foreground">Diagnostic Result:</span>
          </div>
          <p className="text-xs text-foreground/85 font-sans leading-relaxed">
            &ldquo;Eliminated throat constriction in 10 minutes. Pitch delivery now projects unmistakable executive gravitas.&rdquo;
          </p>
        </div>
      </div>

      {/* Floating Orbital Badges anchored around the card */}
      <div className="hidden sm:block absolute -top-3 -right-4 z-20 animate-float">
        <div className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/95 backdrop-blur-md px-3.5 py-1.5 shadow-md text-xs font-mono text-foreground">
          <Mic className="h-3.5 w-3.5 text-foreground/80" />
          <span className="font-bold">1:1 Live Rehearsal</span>
        </div>
      </div>

      <div
        className="hidden sm:block absolute -bottom-3 -left-4 z-20 animate-float"
        style={{ animationDelay: "1.8s" }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/95 backdrop-blur-md px-3.5 py-1.5 shadow-md text-xs font-mono text-foreground">
          <Sparkles className="h-3.5 w-3.5 text-foreground/80" />
          <span className="font-bold">Keynote &amp; Pitch Blueprint</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulseHeight {
          0% {
            transform: scaleY(0.35);
          }
          100% {
            transform: scaleY(1.05);
          }
        }
      `}</style>
    </div>
  );
}
