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

export function MentorCard({ mentor, onBookDemo }: MentorCardProps) {
  const nextSlot = mentor.availableSlots[0];
  const nextSlotFormatted = nextSlot
    ? `${nextSlot.dayOfWeek}, ${nextSlot.formattedDate} · ${nextSlot.slots[0]}`
    : "Next available";

  // Filter out focus areas that duplicate words in the title
  const distinctFocusAreas = mentor.focusAreas
    .filter((fa) => !mentor.title.toLowerCase().includes(fa.toLowerCase()))
    .slice(0, 2);

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-foreground/10 bg-card p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover-lift">
      <div>
        {/* Unobstructed Portrait Photo (No awkward pills floating over the face) */}
        <Link
          href={`/mentors/${mentor.id}`}
          className="block relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-secondary mb-5 border border-foreground/5 focus:outline-none"
        >
          <Image
            src={mentor.photo}
            alt={mentor.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        </Link>

        {/* Minimal High-Signal Meta Row */}
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground mb-2">
          <div className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            <span className="font-semibold text-foreground">{mentor.rating.toFixed(2)}</span>
            <span className="text-muted-foreground text-[11px]">({mentor.reviewCount})</span>
          </div>
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {mentor.experienceYears}+ yrs exp
          </span>
        </div>

        {/* Name in Clean Bold Font */}
        <div className="mb-1">
          <Link
            href={`/mentors/${mentor.id}`}
            className="inline-block hover:opacity-80 transition-opacity focus:outline-none"
          >
            <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground">
              {mentor.name}
            </h3>
          </Link>
        </div>

        {/* Clean Title & Company */}
        <p className="text-xs text-muted-foreground font-sans line-clamp-1 mb-3">
          {mentor.title} <span className="text-foreground/20">·</span> {mentor.company}
        </p>

        {/* Minimal Bio Snippet (Natural prose, no artificial quotes or truncation) */}
        <p className="text-xs text-foreground/75 leading-relaxed line-clamp-2 font-sans mb-4">
          {mentor.shortIntro}
        </p>

        {/* Non-repetitive clean tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center rounded-md border border-foreground/10 bg-secondary/60 px-2 py-0.5 text-[11px] font-mono text-foreground/70">
            {mentor.industry}
          </span>
          {distinctFocusAreas.map((fa) => (
            <span
              key={fa}
              className="inline-flex items-center rounded-md border border-foreground/10 bg-secondary/60 px-2 py-0.5 text-[11px] font-mono text-foreground/70"
            >
              {fa}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Scheduling & Outline Action (No filled black buttons) */}
      <div className="pt-4 mt-6 border-t border-foreground/10">
        <div className="flex items-center justify-between font-mono text-xs text-muted-foreground mb-3.5">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-foreground/60" />
            <span className="text-foreground/80 font-medium">{nextSlotFormatted}</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            30-Min Demo
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href={`/mentors/${mentor.id}`}
            className="flex-1 text-center py-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            View Profile
          </Link>

          <button
            onClick={() => onBookDemo(mentor)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-foreground/30 bg-background hover:bg-secondary text-foreground px-4 py-2 text-xs font-medium transition-all shadow-sm active:scale-[0.98]"
          >
            <span>Book Demo</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </article>
  );
}
