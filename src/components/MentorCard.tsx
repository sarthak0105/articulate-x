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
    <article className="group relative flex flex-col justify-between rounded-2xl border border-foreground/10 bg-card p-6 lg:p-7 shadow-sm hover:shadow-2xl transition-all duration-400 hover-lift hover:border-foreground/30">
      {/* Top Section */}
      <div>
        {/* Full-width Editorial Portrait */}
        <div className="relative w-full aspect-[16/11] overflow-hidden rounded-xl bg-secondary mb-5 border border-foreground/5">
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
          </Link>

          {/* Overlaid Editorial Metadata Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-background/90 backdrop-blur-md border border-foreground/10 px-3 py-1 text-[11px] font-mono text-foreground shadow-sm">
              <span className="font-semibold text-foreground">{indexString}</span>
              <span className="text-foreground/40">/</span>
              <span>{mentor.industry}</span>
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-background/90 backdrop-blur-md border border-foreground/10 px-2.5 py-1 text-[11px] font-mono text-foreground shadow-sm">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              <span className="font-semibold">{mentor.rating.toFixed(2)}</span>
              <span className="text-muted-foreground text-[10px]">({mentor.reviewCount})</span>
            </span>
          </div>
        </div>

        {/* Discipline & Tenure Header */}
        <div className="flex items-center justify-between font-mono text-xs text-muted-foreground tracking-widest uppercase mb-1.5">
          <span>{mentor.focusAreas[0]}</span>
          <span className="text-[11px]">{mentor.experienceYears}+ yrs exp</span>
        </div>

        {/* Name in Editorial Serif */}
        <Link
          href={`/mentors/${mentor.id}`}
          className="block group-hover:text-foreground/80 transition-colors focus:outline-none"
        >
          <h3 className="font-display text-3xl tracking-tight text-foreground">
            {mentor.name}
          </h3>
        </Link>

        {/* Role & Company */}
        <p className="text-xs text-muted-foreground font-sans mt-1 line-clamp-1">
          {mentor.title} <span className="text-foreground/20">·</span> {mentor.company}
        </p>

        {/* Authentic Philosophy / Bio Quote */}
        <p className="mt-3.5 text-sm font-serif italic text-foreground/80 leading-relaxed line-clamp-2">
          &ldquo;{mentor.shortIntro}&rdquo;
        </p>

        {/* Focus Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {mentor.focusAreas.slice(0, 2).map((fa) => (
            <span
              key={fa}
              className="inline-flex items-center rounded-md border border-foreground/10 bg-secondary/80 px-2.5 py-1 text-[11px] font-mono text-foreground/75"
            >
              {fa}
            </span>
          ))}
        </div>

        {/* Spoken Languages */}
        <div className="mt-4 flex items-center justify-between text-xs font-mono text-muted-foreground">
          <span>Languages</span>
          <span className="text-foreground font-medium">{mentor.languages.join(", ")}</span>
        </div>
      </div>

      {/* Card Footer: Scheduling & Actions */}
      <div className="pt-5 mt-6 border-t border-foreground/10">
        <div className="flex items-center justify-between font-mono text-xs mb-4">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-foreground/70" />
            <span className="text-foreground/60">Next:</span>
            <span className="text-foreground font-medium">{nextSlotFormatted}</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            30-Min Demo
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/mentors/${mentor.id}`}
            className="flex-1 text-center py-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            View Profile
          </Link>

          <button
            onClick={() => onBookDemo(mentor)}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-medium text-background hover:bg-foreground/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm"
          >
            <span>Book Demo</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </article>
  );
}
