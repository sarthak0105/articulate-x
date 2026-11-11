"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight, Clock } from "lucide-react";
import { Mentor } from "@/types";

interface MentorCardProps {
  mentor: Mentor;
  index?: number;
  onBookDemo: (mentor: Mentor) => void;
}

export function MentorCard({ mentor, index = 1, onBookDemo }: MentorCardProps) {
  const nextSlot = mentor.availableSlots[0];
  const nextSlotFormatted = nextSlot
    ? `${nextSlot.dayOfWeek}, ${nextSlot.formattedDate} · ${nextSlot.slots[0]}`
    : "Next available";

  const indexString = String(index).padStart(2, "0");

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-[#232d42] bg-[#111624] overflow-hidden hover:border-[#7ca0ff]/40 shadow-xl transition-all duration-300 hover-lift">
      {/* Top Editorial Portrait Window */}
      <div>
        <div className="relative w-full aspect-[16/11] overflow-hidden bg-[#0a0e18]">
          <Link
            href={`/mentors/${mentor.id}`}
            className="block w-full h-full"
            tabIndex={-1}
            aria-hidden="true"
          >
            <Image
              src={mentor.photo}
              alt={mentor.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {/* Subtle bottom vignette to blend portrait smoothly into card surface */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111624] via-[#111624]/20 to-transparent pointer-events-none" />
          </Link>

          {/* Overlaid Glass Floating Metadata Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#090d16]/80 backdrop-blur-md border border-white/10 px-3 py-1 text-[11px] font-mono text-white/90 shadow-sm">
              <span className="text-[#7ca0ff] font-semibold">{indexString}</span>
              <span className="text-white/40">/</span>
              <span>{mentor.industry}</span>
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-[#090d16]/80 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[11px] font-mono text-amber-300 shadow-sm">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>{mentor.rating.toFixed(2)}</span>
              <span className="text-white/50 text-[10px]">({mentor.reviewCount})</span>
            </span>
          </div>
        </div>

        {/* Card Body Content */}
        <div className="p-6 pt-3">
          {/* Discipline & Tenure Header */}
          <div className="flex items-center justify-between font-mono text-xs text-[#7ca0ff] mb-1.5 tracking-wider uppercase">
            <span>{mentor.focusAreas[0]}</span>
            <span className="text-[#8290ab] text-[11px]">{mentor.experienceYears}+ yrs</span>
          </div>

          {/* Name in Editorial Serif */}
          <Link
            href={`/mentors/${mentor.id}`}
            className="block group-hover:text-[#9db7ff] transition-colors focus:outline-none"
          >
            <h3 className="font-display text-2xl tracking-tight text-[#f4f6ff] transition-colors">
              {mentor.name}
            </h3>
          </Link>

          {/* Role and Pedigree */}
          <p className="text-xs text-[#94a3b8] font-normal mt-0.5 line-clamp-1">
            {mentor.title} <span className="text-white/30">·</span> {mentor.company}
          </p>

          {/* Authentic Philosophy / Bio Quote */}
          <p className="mt-3 text-sm font-serif italic text-[#cbd5e1]/90 leading-relaxed line-clamp-2">
            &ldquo;{mentor.shortIntro}&rdquo;
          </p>

          {/* Focus Tags */}
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {mentor.focusAreas.slice(0, 2).map((fa) => (
              <span
                key={fa}
                className="inline-flex items-center rounded-md border border-[#232d42] bg-[#0c101a] px-2.5 py-1 text-[11px] font-mono text-[#a5b4fc]"
              >
                {fa}
              </span>
            ))}
          </div>

          {/* Languages supported */}
          <div className="mt-3.5 flex items-center justify-between text-[11px] font-mono text-[#8290ab]">
            <span>Languages</span>
            <span className="text-[#cbd5e1]">{mentor.languages.join(", ")}</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Scheduling & Action Button */}
      <div className="px-6 pb-6 pt-4 border-t border-[#1e273b] bg-[#0d121e]/50">
        <div className="flex items-center justify-between font-mono text-xs mb-4">
          <div className="flex items-center gap-1.5 text-[#94a3b8]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-white/50">Next:</span>
            <span className="text-[#f4f6ff] font-medium">{nextSlotFormatted}</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-[#8290ab] font-medium">
            30-Min Demo
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/mentors/${mentor.id}`}
            className="flex-1 text-center py-2 text-xs font-mono text-[#94a3b8] hover:text-[#f4f6ff] transition-colors"
          >
            View Profile
          </Link>

          <button
            onClick={() => onBookDemo(mentor)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#f4f6ff] px-4 py-2.5 text-xs font-medium text-[#090d16] shadow-md transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Book Demo</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </article>
  );
}
