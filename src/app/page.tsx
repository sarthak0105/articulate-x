"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  SearchX,
  RotateCcw,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MentorCard } from "@/components/MentorCard";
import { FilterBar } from "@/components/FilterBar";
import { BookingModal } from "@/components/BookingModal";
import { AnimatedSphere } from "@/components/AnimatedSphere";
import {
  mentors,
  getUniqueIndustries,
  getUniqueFocusAreas,
  getUniqueLanguages,
  filterMentors,
} from "@/lib/mentors";
import { Mentor } from "@/types";

const rotatingWords = ["boardrooms", "pitching", "keynotes", "all-hands", "interviews"];

export function MethodDiagram1() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-28 text-foreground transition-all duration-300">
      <defs>
        <style>{`
          @keyframes radarPulse {
            0% { transform: scale(0.94); opacity: 0.45; stroke-dashoffset: 0; }
            50% { transform: scale(1.06); opacity: 0.95; stroke-dashoffset: 16; }
            100% { transform: scale(0.94); opacity: 0.45; stroke-dashoffset: 32; }
          }
          @keyframes coreBreathe {
            0%, 100% { r: 15px; fill-opacity: 0.08; }
            50% { r: 18px; fill-opacity: 0.22; }
          }
          @keyframes arrowPulse {
            0%, 100% { transform: translateX(0); opacity: 0.65; }
            50% { transform: translateX(5px); opacity: 1; }
          }
          @keyframes scanLine1 {
            0%, 100% { stroke-dashoffset: 32; opacity: 0.3; }
            50% { stroke-dashoffset: 0; opacity: 1; }
          }
          @keyframes scanLine2 {
            0%, 100% { stroke-dashoffset: 24; opacity: 0.2; }
            50% { stroke-dashoffset: 0; opacity: 0.85; }
          }
          @keyframes scanLine3 {
            0%, 100% { stroke-dashoffset: 16; opacity: 0.1; }
            50% { stroke-dashoffset: 0; opacity: 0.65; }
          }
          .d1-ring {
            transform-origin: 50px 60px;
            animation: radarPulse 3.5s ease-in-out infinite;
          }
          .d1-core {
            animation: coreBreathe 3.5s ease-in-out infinite;
          }
          .d1-arrow {
            animation: arrowPulse 2s ease-in-out infinite;
          }
          .d1-line-1 {
            stroke-dasharray: 32;
            animation: scanLine1 2.8s ease-in-out infinite;
          }
          .d1-line-2 {
            stroke-dasharray: 24;
            animation: scanLine2 2.8s ease-in-out infinite 0.4s;
          }
          .d1-line-3 {
            stroke-dasharray: 16;
            animation: scanLine3 2.8s ease-in-out infinite 0.8s;
          }
        `}</style>
      </defs>
      {/* Outer Radar Diagnostic Ring */}
      <circle cx="50" cy="60" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="d1-ring" />
      {/* Core Vocal Chamber */}
      <circle cx="50" cy="60" r="16" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" className="d1-core" />
      <circle cx="50" cy="60" r="4" fill="currentColor" />
      
      {/* Transition Arrow with Kinetic Motion */}
      <g className="d1-arrow">
        <line x1="82" y1="60" x2="128" y2="60" stroke="currentColor" strokeWidth="1.5" />
        <polygon points="126,56 134,60 126,64" fill="currentColor" />
      </g>
      
      {/* Structured Diagnostic Sheet with Active Scanning Lines */}
      <rect x="140" y="36" width="46" height="48" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="148" y1="50" x2="178" y2="50" stroke="currentColor" strokeWidth="1.5" className="d1-line-1" strokeLinecap="round" />
      <line x1="148" y1="60" x2="170" y2="60" stroke="currentColor" strokeWidth="1.5" className="d1-line-2" strokeLinecap="round" />
      <line x1="148" y1="70" x2="162" y2="70" stroke="currentColor" strokeWidth="1.5" className="d1-line-3" strokeLinecap="round" />
    </svg>
  );
}

export function MethodDiagram2() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-28 text-foreground transition-all duration-300">
      <defs>
        <style>{`
          @keyframes waveResonance1 {
            0%, 100% {
              d: path("M 24 60 C 50 20, 75 20, 100 60 C 125 100, 150 100, 176 60");
            }
            50% {
              d: path("M 24 60 C 50 36, 75 36, 100 60 C 125 84, 150 84, 176 60");
            }
          }
          @keyframes waveResonance2 {
            0%, 100% {
              d: path("M 24 60 C 50 100, 75 100, 100 60 C 125 20, 150 20, 176 60");
            }
            50% {
              d: path("M 24 60 C 50 84, 75 84, 100 60 C 125 36, 150 36, 176 60");
            }
          }
          @keyframes peakNode1 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(12px); }
          }
          @keyframes peakNode2 {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
          @keyframes centerPing {
            0% { r: 4px; opacity: 1; }
            50% { r: 10px; opacity: 0; }
            100% { r: 4px; opacity: 0; }
          }
          @keyframes plumbBreathe {
            0%, 100% { opacity: 0.25; stroke-dashoffset: 0; }
            50% { opacity: 0.75; stroke-dashoffset: 8; }
          }
          .d2-wave-live-1 {
            animation: waveResonance1 3.6s ease-in-out infinite;
          }
          .d2-wave-live-2 {
            animation: waveResonance2 3.6s ease-in-out infinite;
          }
          .d2-node-live-1 {
            animation: peakNode1 3.6s ease-in-out infinite;
          }
          .d2-node-live-2 {
            animation: peakNode2 3.6s ease-in-out infinite;
          }
          .d2-center-halo {
            animation: centerPing 2.2s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          .d2-plumb-axis {
            stroke-dasharray: 3 3;
            animation: plumbBreathe 3s ease-in-out infinite;
          }
        `}</style>
      </defs>

      {/* Vertical Plumb Axis */}
      <line x1="100" y1="16" x2="100" y2="104" stroke="currentColor" strokeWidth="1.2" className="d2-plumb-axis" />

      {/* Primary Resonant Speech Wave */}
      <path
        d="M 24 60 C 50 20, 75 20, 100 60 C 125 100, 150 100, 176 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        className="d2-wave-live-1"
      />

      {/* Counter-Harmonic Wave (Dashed) */}
      <path
        d="M 24 60 C 50 100, 75 100, 100 60 C 125 20, 150 20, 176 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeDasharray="4 4"
        opacity="0.5"
        strokeLinecap="round"
        className="d2-wave-live-2"
      />

      {/* Peak Frequency Node 1 (Upper Crest) */}
      <g className="d2-node-live-1">
        <circle cx="62" cy="30" r="3.5" fill="currentColor" />
        <circle cx="62" cy="30" r="7" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      </g>

      {/* Central Equilibrium Node with Radar Pulse */}
      <circle cx="100" cy="60" r="4.5" fill="currentColor" />
      <circle cx="100" cy="60" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.2" className="d2-center-halo" />

      {/* Peak Frequency Node 2 (Right Crest in Counter-Wave) */}
      <g className="d2-node-live-2">
        <circle cx="138" cy="42" r="3.5" fill="currentColor" />
        <circle cx="138" cy="42" r="7" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      </g>
    </svg>
  );
}

export function MethodDiagram3() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-28 text-foreground transition-all duration-300">
      <defs>
        <style>{`
          @keyframes coreGeometricBreathe {
            0%, 100% {
              transform: scale(0.93);
              fill-opacity: 0.08;
            }
            50% {
              transform: scale(1.07);
              fill-opacity: 0.22;
            }
          }
          @keyframes vertexHaloPing {
            0% { r: 4px; opacity: 0.85; }
            60% { r: 12px; opacity: 0; }
            100% { r: 4px; opacity: 0; }
          }
          @keyframes laserTravel {
            0% { cy: 22px; opacity: 0; }
            15% { opacity: 1; }
            85% { opacity: 1; }
            100% { cy: 95px; opacity: 0; }
          }
          @keyframes plumbDash {
            0% { stroke-dashoffset: 0; opacity: 0.3; }
            50% { stroke-dashoffset: 16; opacity: 0.75; }
            100% { stroke-dashoffset: 32; opacity: 0.3; }
          }
          .d3-core-triangle {
            transform-box: fill-box;
            transform-origin: center;
            animation: coreGeometricBreathe 3.6s ease-in-out infinite;
          }
          .d3-vertex-halo-1 {
            animation: vertexHaloPing 2.6s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          .d3-vertex-halo-2 {
            animation: vertexHaloPing 2.6s cubic-bezier(0, 0, 0.2, 1) infinite 0.85s;
          }
          .d3-vertex-halo-3 {
            animation: vertexHaloPing 2.6s cubic-bezier(0, 0, 0.2, 1) infinite 1.7s;
          }
          .d3-laser-dot {
            animation: laserTravel 2.6s ease-in-out infinite;
          }
          .d3-plumb-axis {
            stroke-dasharray: 4 4;
            animation: plumbDash 3s linear infinite;
          }
        `}</style>
      </defs>

      {/* Central Axis Alignment Plumb */}
      <line x1="100" y1="20" x2="100" y2="95" stroke="currentColor" strokeWidth="1.2" className="d3-plumb-axis" />

      {/* Kinetic Alignment Laser Dot */}
      <circle cx="100" cy="22" r="2.2" fill="currentColor" className="d3-laser-dot" />

      {/* Solid Structural Outer Triangle (Crisp & Intact) */}
      <polygon
        points="100,20 160,95 40,95"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />

      {/* Inner Geometric Breathing Core */}
      <polygon
        points="100,48 136,89 64,89"
        fill="currentColor"
        fillOpacity="0.08"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        className="d3-core-triangle"
      />

      {/* Vertex 1: Apex Top (Leadership / Gravitas) */}
      <circle cx="100" cy="20" r="4" fill="currentColor" />
      <circle cx="100" cy="20" r="4" fill="none" stroke="currentColor" strokeWidth="1.2" className="d3-vertex-halo-1" />

      {/* Vertex 2: Base Right (Audience Connection) */}
      <circle cx="160" cy="95" r="4" fill="currentColor" />
      <circle cx="160" cy="95" r="4" fill="none" stroke="currentColor" strokeWidth="1.2" className="d3-vertex-halo-2" />

      {/* Vertex 3: Base Left (Rhetorical Foundation) */}
      <circle cx="40" cy="95" r="4" fill="currentColor" />
      <circle cx="40" cy="95" r="4" fill="none" stroke="currentColor" strokeWidth="1.2" className="d3-vertex-halo-3" />
    </svg>
  );
}

export default function HomePage() {
  const [wordIndex, setWordIndex] = useState(0);

  // Rotating words effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  // Filter States
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [selectedFocusArea, setSelectedFocusArea] = useState<string>("All");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"recommended" | "rating" | "experience">(
    "recommended"
  );

  // Modals
  const [selectedMentorForBooking, setSelectedMentorForBooking] =
    useState<Mentor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Filter options lists
  const industries = useMemo(() => getUniqueIndustries(), []);
  const focusAreas = useMemo(() => getUniqueFocusAreas(), []);
  const languages = useMemo(() => getUniqueLanguages(), []);

  // Filtered mentors list
  const filteredMentors = useMemo(() => {
    return filterMentors({
      industry: selectedIndustry,
      focusArea: selectedFocusArea,
      language: selectedLanguage,
      search: searchQuery,
      sortBy,
    });
  }, [selectedIndustry, selectedFocusArea, selectedLanguage, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedIndustry("All");
    setSelectedFocusArea("All");
    setSelectedLanguage("All");
    setSearchQuery("");
    setSortBy("recommended");
  };

  const handleOpenBooking = (mentor: Mentor) => {
    setSelectedMentorForBooking(mentor);
    setIsBookingModalOpen(true);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay bg-background text-foreground">
      <Navbar
        onQuickBook={() => {
          const first = mentors[0];
          if (first) handleOpenBooking(first);
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-32 lg:pt-36 pb-20 border-b border-foreground/10">
        {/* Subtle architectural ambient background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full bg-secondary/80 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column (7 cols): Editorial Typography & Direct CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Commanding Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.04] mb-6">
                Master high-stakes
                <br />
                speaking for{" "}
                <span className="inline-flex items-baseline gap-2.5 relative">
                  <span className="inline-block relative">
                    <span
                      key={wordIndex}
                      className="inline-block relative z-10 text-foreground animate-word-roll font-extrabold"
                    >
                      {rotatingWords[wordIndex]}
                      {/* Dynamic kinetic sweep line */}
                      <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-foreground/20 rounded-full overflow-hidden">
                        <span className="absolute inset-y-0 h-full bg-foreground rounded-full animate-acoustic-sweep" />
                      </span>
                    </span>
                  </span>
                  {/* Dancing Voice Frequency Equalizer */}
                  <span
                    className="inline-flex items-end gap-[3px] h-6 px-1 align-baseline opacity-85"
                    title="Live speech acoustics"
                  >
                    <span
                      className="w-[3px] rounded-full bg-foreground animate-[waveBounce_1.1s_ease-in-out_infinite_0.1s]"
                      style={{ height: "8px" }}
                    />
                    <span
                      className="w-[3px] rounded-full bg-foreground animate-[waveBounce_1.4s_ease-in-out_infinite_0.3s]"
                      style={{ height: "20px" }}
                    />
                    <span
                      className="w-[3px] rounded-full bg-foreground animate-[waveBounce_1.0s_ease-in-out_infinite_0.15s]"
                      style={{ height: "14px" }}
                    />
                    <span
                      className="w-[3px] rounded-full bg-foreground animate-[waveBounce_1.5s_ease-in-out_infinite_0.4s]"
                      style={{ height: "22px" }}
                    />
                    <span
                      className="w-[3px] rounded-full bg-foreground animate-[waveBounce_1.2s_ease-in-out_infinite_0.25s]"
                      style={{ height: "10px" }}
                    />
                  </span>
                </span>
                .
              </h1>

              {/* Concise, High-Impact Value Proposition */}
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8 font-sans">
                Rigorous, private 1:1 vocal and executive presence coaching with former venture partners, TEDx curators, and stage directors. Eliminate hesitation, project effortless power, and command any room.
              </p>

              {/* Action CTAs with Interactive Micro-Animations */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="#mentors-directory"
                  className="group relative inline-flex items-center gap-2.5 rounded-full border border-foreground/30 bg-background hover:bg-secondary px-8 py-4 text-sm font-medium text-foreground shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                >
                  <span>Explore Faculty Mentors</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/30 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-foreground/60 border border-background"></span>
                  </span>
                </a>

                <a
                  href="#how-it-works"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-foreground/15 bg-card px-6 py-4 text-sm font-mono text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-foreground/30 transition-all duration-300"
                >
                  <span className="flex items-center gap-0.5">
                    <span className="w-0.5 h-2.5 bg-foreground/50 rounded-full transition-all duration-300 group-hover:h-3.5 group-hover:bg-foreground" />
                    <span className="w-0.5 h-4 bg-foreground/70 rounded-full transition-all duration-300 group-hover:h-2 group-hover:bg-foreground" />
                    <span className="w-0.5 h-2 bg-foreground/50 rounded-full transition-all duration-300 group-hover:h-4 group-hover:bg-foreground" />
                  </span>
                  <span>The 3-Step Method</span>
                </a>
              </div>

              {/* Trust Badge / Proof Stack */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-foreground/10 text-xs font-mono text-muted-foreground">
                <div className="flex -space-x-2.5 overflow-hidden">
                  {mentors.slice(0, 4).map((m) => (
                    <div
                      key={m.id}
                      className="inline-block relative h-8 w-8 rounded-full ring-2 ring-background overflow-hidden bg-secondary"
                    >
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-foreground font-sans">
                  <div className="flex items-center text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-500" />
                  </div>
                  <span className="font-semibold">4.99 / 5</span>
                  <span className="text-muted-foreground">
                    &bull; Trusted by 500+ leaders at Google, Swiggy, Sequoia &amp; YC
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Pure Rotating Globe Circle */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] lg:w-[480px] lg:h-[480px] flex items-center justify-center opacity-95">
                <AnimatedSphere />
              </div>
            </div>
          </div>

          {/* Metrics Ticker */}
          <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-foreground/10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <span className="font-mono text-[11px] sm:text-xs text-muted-foreground uppercase block mb-1">
                Sessions Delivered
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">12,400+</span>
            </div>
            <div>
              <span className="font-mono text-[11px] sm:text-xs text-muted-foreground uppercase block mb-1">
                Average Rating
              </span>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">4.99</span>
                <Star className="h-4 w-4 sm:h-5 sm:w-5 fill-amber-500 text-amber-500" />
              </div>
            </div>
            <div>
              <span className="font-mono text-[11px] sm:text-xs text-muted-foreground uppercase block mb-1">
                Founder Retention
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">98%</span>
            </div>
            <div>
              <span className="font-mono text-[11px] sm:text-xs text-muted-foreground uppercase block mb-1">
                Initial Diagnostic
              </span>
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* The 3-Step Method Section */}
      <section id="how-it-works" className="py-28 lg:py-36 border-b border-foreground/10 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-16 lg:mb-20">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
              <span className="w-8 h-px bg-foreground/30" />
              The Architecture
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
              A structured rehearsal loop built for real pressure.
            </h2>
            <p className="text-lg text-muted-foreground mt-4 leading-relaxed font-sans">
              Unlike generic public speaking courses, every session is private, conversational,
              and engineered around your exact upcoming presentation or pitch.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 rounded-2xl overflow-hidden shadow-sm">
            <div className="group bg-card p-8 lg:p-12 flex flex-col justify-between hover-lift transition-all duration-300">
              <div>
                <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase block mb-4 group-hover:text-foreground transition-colors">
                  01 / DIAGNOSTIC
                </span>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
                  30-Min Vocal & Cognitive Audit
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 font-sans">
                  Your coach evaluates subconscious hesitation markers, vocal pacing, tone
                  modulation, and executive posture under simulated scrutiny.
                </p>
              </div>
              <div className="pt-4 border-t border-foreground/5">
                <MethodDiagram1 />
              </div>
            </div>

            <div className="group bg-card p-8 lg:p-12 flex flex-col justify-between hover-lift transition-all duration-300">
              <div>
                <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase block mb-4 group-hover:text-foreground transition-colors">
                  02 / REHEARSAL
                </span>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
                  Targeted High-Stakes Dry Runs
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 font-sans">
                  Rehearse slide-by-slide or answer-by-answer. Receive immediate feedback on
                  pregnant pauses, body language, and Q&amp;A deflection tactics.
                </p>
              </div>
              <div className="pt-4 border-t border-foreground/5">
                <MethodDiagram2 />
              </div>
            </div>

            <div className="group bg-card p-8 lg:p-12 flex flex-col justify-between hover-lift transition-all duration-300">
              <div>
                <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase block mb-4 group-hover:text-foreground transition-colors">
                  03 / MASTERY
                </span>
                <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
                  Permanent Speech Frameworks
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 font-sans">
                  Leave with customized rhetorical scaffolds, diaphragmatic breathing routines,
                  and authentic leadership gravitas that stays with you forever.
                </p>
              </div>
              <div className="pt-4 border-t border-foreground/5">
                <MethodDiagram3 />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Mentor Directory Section */}
      <section
        id="mentors-directory"
        className="py-28 lg:py-36 max-w-7xl mx-auto px-6 lg:px-12 w-full"
      >
        <div className="max-w-3xl mb-14">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
            <span className="w-8 h-px bg-foreground/30" />
            Faculty &amp; Mentors
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
            World-Class Communication Coaches
          </h2>
          <p className="text-lg text-muted-foreground mt-3 font-sans">
            Every mentor has vetted industry experience in leadership, investment, or media.
            Select your discipline to begin with a complimentary 30-minute diagnostic session.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-14">
          <FilterBar
            industries={industries}
            focusAreas={focusAreas}
            languages={languages}
            selectedIndustry={selectedIndustry}
            selectedFocusArea={selectedFocusArea}
            selectedLanguage={selectedLanguage}
            searchQuery={searchQuery}
            sortBy={sortBy}
            totalCount={mentors.length}
            filteredCount={filteredMentors.length}
            onIndustryChange={setSelectedIndustry}
            onFocusAreaChange={setSelectedFocusArea}
            onLanguageChange={setSelectedLanguage}
            onSearchChange={setSearchQuery}
            onSortByChange={setSortBy}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Mentors Grid */}
        {filteredMentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMentors.map((mentor, idx) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                index={idx + 1}
                onBookDemo={handleOpenBooking}
              />
            ))}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="rounded-2xl border border-dashed border-foreground/20 bg-card p-12 text-center max-w-lg mx-auto my-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground mb-4">
              <SearchX className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">
              No mentors match your selected filters
            </h3>
            <p className="text-xs font-mono text-muted-foreground mt-2 max-w-sm mx-auto leading-relaxed">
              Try adjusting your focus area or industry filter, or search for broader keywords.
            </p>
            <div className="mt-6 flex items-center justify-center">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/30 bg-background hover:bg-secondary px-5 py-2.5 text-xs font-mono text-foreground shadow-sm transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset all filters</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Verified Outcomes & Editorial Testimonials */}
      <section id="testimonials" className="py-28 lg:py-36 border-t border-foreground/10 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Proven Outcomes
            </span>
            <div className="flex-1 h-px bg-foreground/10" />
            <span className="font-mono text-xs text-foreground">
              Verified Feedback
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-foreground/10 bg-card p-8 lg:p-10 flex flex-col justify-between hover-lift shadow-sm">
              <div>
                <span className="font-mono text-xs text-foreground uppercase block mb-3 font-semibold">
                  + Raised $2.4M Seed Round
                </span>
                <p className="text-base lg:text-lg text-foreground/90 leading-relaxed mb-6 font-normal">
                  &ldquo;Priya rebuilt our pitch narrative from the ground up. We had been
                  struggling to convey our defensibility. We closed our round three weeks
                  later.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-foreground/10">
                <div className="relative h-11 w-11 rounded-full overflow-hidden bg-secondary shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Karan M."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">Karan Malhotra</h4>
                  <p className="text-xs font-mono text-muted-foreground">Founder, Kinetix AI (YC S24)</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-card p-8 lg:p-10 flex flex-col justify-between hover-lift shadow-sm">
              <div>
                <span className="font-mono text-xs text-foreground uppercase block mb-3 font-semibold">
                  + Standing Ovation at Web Summit
                </span>
                <p className="text-base lg:text-lg text-foreground/90 leading-relaxed mb-6 font-normal">
                  &ldquo;Marcus turned my 40-slide academic research presentation into a
                  keynote that commanded 4,000 attendees. The feedback was extraordinary.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-foreground/10">
                <div className="relative h-11 w-11 rounded-full overflow-hidden bg-secondary shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                    alt="Dr. Elena R."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">Dr. Elena Rostova</h4>
                  <p className="text-xs font-mono text-muted-foreground">Chief Science Officer, NeuraBiome</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-card p-8 lg:p-10 flex flex-col justify-between hover-lift shadow-sm">
              <div>
                <span className="font-mono text-xs text-foreground uppercase block mb-3 font-semibold">
                  + Mastered Executive Town Halls
                </span>
                <p className="text-base lg:text-lg text-foreground/90 leading-relaxed mb-6 font-normal">
                  &ldquo;I used to lose my breath and freeze during executive reviews. Kavita
                  diagnosed my diaphragmatic breath pattern in 10 minutes. The shift was
                  immediate.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-foreground/10">
                <div className="relative h-11 w-11 rounded-full overflow-hidden bg-secondary shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                    alt="Rohan G."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">Rohan Gupta</h4>
                  <p className="text-xs font-mono text-muted-foreground">Product Lead, Swiggy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Editorial Call to Action */}
      <section className="py-28 lg:py-36 border-t border-foreground/10 bg-background text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4">
            // Begin Your Transformation
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-6">
            Ready to command your next stage?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 font-sans leading-relaxed">
            Book a complimentary 30-minute diagnostic session with any of our verified faculty
            mentors. Zero pressure, pure actionable insight.
          </p>
          <button
            onClick={() => {
              const first = mentors[0];
              if (first) handleOpenBooking(first);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/30 bg-background hover:bg-secondary px-8 py-4 text-sm font-medium text-foreground shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Book Your Free Diagnostic</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Interactive Booking Modal */}
      <BookingModal
        mentor={selectedMentorForBooking}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <Footer />
    </main>
  );
}
