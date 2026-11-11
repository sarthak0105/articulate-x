"use client";

import { useEffect, useRef } from "react";

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
  { text: "DIAPHRAGM", theta: Math.PI * 0.75, phi: Math.PI * 0.15 },
  { text: "CADENCE", theta: Math.PI * 0.5, phi: Math.PI * 0.65 },
  { text: "RESONANCE", theta: Math.PI * 0.3, phi: Math.PI * 1.15 },
  { text: "AUDIT", theta: Math.PI * 0.7, phi: Math.PI * 1.6 },
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
      // Refined smaller radius
      const radius = Math.min(rect.width, rect.height) * 0.38;

      const rotY = time * 0.3;
      const rotX = Math.sin(time * 0.15) * 0.1 + 0.08;

      // 1. Subtle 3D latitude grid rings (high transparency)
      const rings = [-0.65, -0.35, 0, 0.35, 0.65];
      rings.forEach((ringY) => {
        const ringRadius = radius * Math.cos(Math.asin(ringY));
        const ringZOffset = radius * ringY;

        ctx.beginPath();
        for (let a = 0; a <= Math.PI * 2; a += 0.08) {
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
        // Clear, crisp latitude grid rings
        ctx.strokeStyle = "rgba(18, 18, 18, 0.22)";
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // 2. 3D Rotating Coaching Words (crisp and visible)
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
        const scale = 0.75 + depth * 0.5;
        // Crisp visible alpha: depth scales from 0.2 up to 0.95
        const alpha = Math.max(0.2, depth * 0.95);

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
          ctx.font = `700 11px "JetBrains Mono", monospace`;
          ctx.fillStyle = `rgba(18, 18, 18, ${pw.alpha})`;
          ctx.fillText(pw.text, 0, 0);

          ctx.beginPath();
          ctx.arc(0, 8, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(18, 18, 18, ${pw.alpha * 0.75})`;
          ctx.fill();
        } else {
          ctx.font = `600 10px "JetBrains Mono", monospace`;
          ctx.fillStyle = `rgba(18, 18, 18, ${pw.alpha * 0.85})`;
          ctx.fillText(pw.text, 0, 0);
        }

        ctx.restore();
      });

      // 3. Central Core Point
      ctx.beginPath();
      ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(18, 18, 18, 0.45)";
      ctx.fill();

      time += 0.01;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
      {/* Outer Rotating Subtle Orbital Circles */}
      <div className="absolute inset-0 m-auto w-[88%] h-[88%] rounded-full border border-dashed border-foreground/25 animate-[spin_90s_linear_infinite]" />
      <div className="absolute inset-0 m-auto w-[74%] h-[74%] rounded-full border border-foreground/15 animate-[spin_60s_linear_infinite_reverse]" />

      {/* Pure 3D Canvas Sphere */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
        aria-hidden="true"
      />
    </div>
  );
}
