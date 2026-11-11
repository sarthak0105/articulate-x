"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Clock, ArrowRight, ShieldCheck } from "lucide-react";
import { Mentor } from "@/types";

interface MentorCardProps {
  mentor: Mentor;
  onBookDemo: (mentor: Mentor) => void;
}

export function MentorCard({ mentor, onBookDemo }: MentorCardProps) {
  const nextSlot = mentor.availableSlots[0];
  const nextSlotFormatted = nextSlot
    ? `${nextSlot.dayOfWeek}, ${nextSlot.formattedDate} · ${nextSlot.slots[0]}`
    : "Next available";

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-[#222b3e] bg-[#121828] p-6 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-[#33415c] hover:shadow-2xl">
      {/* Top Section */}
      <div>
        <div className="flex items-start gap-4">
          {/* Mentor Portrait */}
          <Link
            href={`/mentors/${mentor.id}`}
            className="relative h-16 w-16 sm:h-18 sm:w-18 shrink-0 overflow-hidden rounded-2xl border border-[#222b3e] bg-[#0b0f1b] transition-transform duration-300 group-hover:scale-105"
            tabIndex={-1}
            aria-hidden="true"
          >
            <Image
              src={mentor.photo}
              alt={mentor.name}
              fill
              sizes="(max-width: 768px) 72px, 72px"
              className="object-cover"
            />
          </Link>

          {/* Core Info */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              {mentor.badge && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#18233a] border border-[#28385a] px-2.5 py-0.5 text-[11px] font-medium text-[#7ca0ff]">
                  <ShieldCheck className="h-3 w-3" />
                  <span>{mentor.badge}</span>
                </span>
              )}
              <span className="text-[11px] text-[#8290ab]">
                {mentor.experienceYears}+ yrs
              </span>
            </div>

            <Link
              href={`/mentors/${mentor.id}`}
              className="group-hover:text-[#7ca0ff] transition-colors focus:outline-none"
            >
              <h3 className="text-base sm:text-lg font-semibold tracking-tight text-[#f8fafc] truncate">
                {mentor.name}
              </h3>
            </Link>

            <p className="text-xs text-[#94a3b8] truncate mt-0.5">
              {mentor.title}
            </p>
            <p className="text-[11px] text-[#8290ab] truncate">
              {mentor.company}
            </p>
          </div>
        </div>

        {/* Bio Narrative Snippet */}
        <p className="mt-4 text-xs leading-relaxed text-[#cbd5e1] line-clamp-2">
          &ldquo;{mentor.shortIntro}&rdquo;
        </p>

        {/* Curated Focus & Industry Tags */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="rounded-md bg-[#0e1424] border border-[#1e2942] px-2.5 py-1 text-[11px] font-medium text-[#8290ab]">
            {mentor.industry}
          </span>
          {mentor.focusAreas.slice(0, 2).map((fa) => (
            <span
              key={fa}
              className="rounded-md bg-[#162138] border border-[#223356] px-2.5 py-1 text-[11px] font-medium text-[#9db7ff]"
            >
              {fa}
            </span>
          ))}
        </div>

        {/* Quiet Social Proof & Language */}
        <div className="mt-4 flex items-center justify-between text-xs text-[#8290ab] border-t border-[#1a2233] pt-3">
          <div className="flex items-center gap-1 font-medium text-[#f8fafc]">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{mentor.rating.toFixed(2)}</span>
            <span className="text-[#8290ab] font-normal">
              ({mentor.reviewCount})
            </span>
          </div>

          <div className="text-[11px] text-[#8290ab]">
            Coaches in: <span className="text-[#cbd5e1]">{mentor.languages.join(", ")}</span>
          </div>
        </div>
      </div>

      {/* Footer: Next Slot + Single Clear Action */}
      <div className="mt-5 pt-4 border-t border-[#1e273b]">
        <div className="flex items-center justify-between text-xs mb-3.5">
          <div className="flex items-center gap-1.5 text-xs text-[#94a3b8]">
            <Clock className="h-3.5 w-3.5 text-[#7ca0ff]" />
            <span>Next:</span>
            <span className="text-[#f8fafc] font-medium">{nextSlotFormatted}</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-[#8290ab] font-medium">
            30-Min Demo
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/mentors/${mentor.id}`}
            className="flex-1 text-center py-2 text-xs font-medium text-[#94a3b8] hover:text-[#f8fafc] transition-colors"
          >
            View Profile
          </Link>

          <button
            onClick={() => onBookDemo(mentor)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#f8fafc] px-4 py-2.5 text-xs font-semibold text-[#0b0f1b] shadow-md transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Book Demo</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </article>
  );
}
