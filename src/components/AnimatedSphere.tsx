"use client";

import { useEffect, useRef } from "react";
import { Mic, Sparkles, Target, ShieldCheck } from "lucide-react";

interface SphereWord {
  text: string;
  theta: number; // polar angle [0, PI]
  phi: number;   // azimuthal angle [0, 2*PI]
  isKey?: boolean;
}

const COACHING_TERMS: SphereWord[] = [
  { text: "EXECUTIVE PRESENCE", theta: Math.PI * 0.35, phi: 0, isKey: true },
  { text: "VOICE ACOUSTICS", theta: Math.PI * 0.65, phi: Math.PI * 0.45, isKey: true },
  { text: "PITCH & FUNDRAISE", theta: Math.PI * 0.4, phi: Math.PI * 0.9, isKey: true },
  { text: "KEYNOTES & TEDx", theta: Math.PI * 0.6, phi: Math.PI * 1.35, isKey: true },
  { text: "GRAVITAS", theta: Math.PI * 0.25, phi: Math.PI * 1.7, isKey: true },
  { text: "DIAPHRAGMATIC BREATH", theta: Math.PI * 0.75, phi: Math.PI * 0.15 },
  { text: "TONAL CADENCE", theta: Math.PI * 0.5, phi: Math.PI * 0.65 },
  { text: "RESONANCE", theta: Math.PI * 0.3, phi: Math.PI * 1.15 },
  { text: "HESITATION AUDIT", theta: Math.PI * 0.7, phi: Math.PI * 1.6 },
  { text: "STORYTELLING", theta: Math.PI * 0.5, phi: Math.PI * 1.95 },
  { text: "1:1 REHEARSAL", theta: Math.PI * 0.2, phi: Math.PI * 0.55 },
  { text: "MODULATION", theta: Math.PI * 0.8, phi: Math.PI * 1.05 },
];

export function AnimatedSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

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
      const radius = Math.min(rect.width, rect.height) * 0.44;

      // Rotational angles
      const rotY = time * 0.35;
      const rotX = Math.sin(time * 0.2) * 0.15 + 0.1;

      // 1. Draw subtle 3D latitude grid rings
      const rings = [-0.6, -0.3, 0, 0.3, 0.6];
      rings.forEach((ringY) => {
        const ringRadius = radius * Math.cos(Math.asin(ringY));
        const ringZOffset = radius * ringY;

        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.08) {
          const x = ringRadius * Math.cos(a + rotY);
          const z = ringRadius * Math.sin(a + rotY);
          const y = ringZOffset;

          // Rotate around X
          const newY = y * Math.cos(rotX) - z * Math.sin(rotX);
          const finalZ = y * Math.sin(rotX) + z * Math.cos(rotX);

          const screenX = centerX + x;
          const screenY = centerY + newY;

          if (a === 0) {
            ctx.moveTo(screenX, screenY);
          } else {
            ctx.lineTo(screenX, screenY);
          }
        }
        ctx.strokeStyle = "rgba(18, 18, 18, 0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // 2. Project and render 3D ArticulateX words
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
        // Base sphere coords
        const x = Math.sin(term.theta) * Math.cos(term.phi + rotY);
        const z = Math.sin(term.theta) * Math.sin(term.phi + rotY);
        const y = Math.cos(term.theta);

        // Rotate around X
        const newY = y * Math.cos(rotX) - z * Math.sin(rotX);
        const finalZ = y * Math.sin(rotX) + z * Math.cos(rotX);

        // Perspective scale & alpha
        const depth = (finalZ + 1) / 2; // [0, 1]
        const scale = 0.75 + depth * 0.55;
        const alpha = Math.max(0.06, depth * 0.95);

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

      // Sort by Z for proper depth occlusions
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

          // Subtle dot marker under key terms
          ctx.beginPath();
          ctx.arc(0, 9, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(18, 18, 18, ${pw.alpha * 0.6})`;
          ctx.fill();
        } else {
          ctx.font = `500 10px "JetBrains Mono", monospace`;
          ctx.fillStyle = `rgba(18, 18, 18, ${pw.alpha * 0.65})`;
          ctx.fillText(pw.text, 0, 0);
        }

        ctx.restore();
      });

      // 3. Central Anchor Core
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(18, 18, 18, 0.4)";
      ctx.fill();

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
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer Rotating Architectural Celestial Ring */}
      <div className="absolute inset-0 m-auto w-[92%] h-[92%] rounded-full border border-dashed border-foreground/15 animate-[spin_80s_linear_infinite] pointer-events-none" />
      <div className="absolute inset-0 m-auto w-[78%] h-[78%] rounded-full border border-foreground/10 animate-[spin_50s_linear_infinite_reverse] pointer-events-none" />

      {/* Floating ArticulateX Hero Badges Anchored around the Rotating Sphere */}
      <div className="absolute top-[8%] right-[12%] z-20 animate-float pointer-events-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/95 backdrop-blur-md px-3.5 py-1.5 shadow-sm text-xs font-mono text-foreground hover:border-foreground/40 transition-colors">
          <Mic className="h-3.5 w-3.5 text-foreground/80" />
          <span className="font-semibold">1:1 Live Vocal Audit</span>
        </div>
      </div>

      <div
        className="absolute bottom-[16%] left-[4%] z-20 animate-float pointer-events-auto"
        style={{ animationDelay: "1.8s" }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/95 backdrop-blur-md px-3.5 py-1.5 shadow-sm text-xs font-mono text-foreground hover:border-foreground/40 transition-colors">
          <Sparkles className="h-3.5 w-3.5 text-foreground/80" />
          <span className="font-semibold">Executive Presence &amp; Gravitas</span>
        </div>
      </div>

      <div
        className="absolute top-[28%] left-[2%] z-20 animate-float pointer-events-auto"
        style={{ animationDelay: "0.9s" }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/95 backdrop-blur-md px-3.5 py-1.5 shadow-sm text-xs font-mono text-foreground hover:border-foreground/40 transition-colors">
          <ShieldCheck className="h-3.5 w-3.5 text-foreground/80" />
          <span className="font-semibold">100% Vetted Faculty</span>
        </div>
      </div>

      <div
        className="absolute bottom-[24%] right-[4%] z-20 animate-float pointer-events-auto"
        style={{ animationDelay: "2.7s" }}
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/95 backdrop-blur-md px-3.5 py-1.5 shadow-sm text-xs font-mono text-foreground hover:border-foreground/40 transition-colors">
          <Target className="h-3.5 w-3.5 text-foreground/80" />
          <span className="font-semibold">Pitch &amp; Keynote Dry Runs</span>
        </div>
      </div>

      {/* 3D Canvas Sphere */}
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
        style={{ display: "block" }}
        aria-hidden="true"
      />
    </div>
  );
}
