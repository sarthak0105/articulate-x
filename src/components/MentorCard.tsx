"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Calendar, Globe, Sparkles, ArrowRight, Award } from "lucide-react";
import { Mentor } from "@/types";

interface MentorCardProps {
  mentor: Mentor;
  onBookDemo: (mentor: Mentor) => void;
}

export function MentorCard({ mentor, onBookDemo }: MentorCardProps) {
  const nextSlot = mentor.availableSlots[0];
  const nextSlotTime = nextSlot ? `${nextSlot.formattedDate}, ${nextSlot.slots[0]}` : "Next week";

  return (
    <article
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#273044] bg-[#121828] p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#7ca0ff]/50 hover:shadow-[0_12px_30px_rgba(124,160,255,0.08)] focus-within:ring-2 focus-within:ring-[#7ca0ff]"
      aria-label={`Mentor profile for ${mentor.name}`}
    >
      {/* Top Header */}
      <div>
        <div className="flex items-start gap-4">
          <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-2xl border border-[#273044] bg-[#0b0f1b]">
            <Image
              src={mentor.photo}
              alt={mentor.name}
              fill
              sizes="(max-width: 768px) 72px, 72px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              {mentor.badge && (
                <span className="inline-flex items-center gap-1 rounded-full border border-[#7ca0ff]/30 bg-[#7ca0ff]/10 px-2.5 py-0.5 font-mono text-[11px] text-[#7ca0ff]">
                  <Sparkles className="h-3 w-3" />
                  {mentor.badge}
                </span>
              )}
              <span className="font-mono text-[11px] text-[#aab3c7]/70">
                {mentor.experienceYears}+ yrs
              </span>
            </div>

            <Link
              href={`/mentors/${mentor.id}`}
              className="group/link block text-lg font-medium tracking-tight text-[#f4f6ff] transition-colors hover:text-[#7ca0ff] focus:outline-none"
            >
              <h3 className="truncate">{mentor.name}</h3>
            </Link>

            <p className="truncate text-xs font-normal text-[#aab3c7] mt-0.5">
              {mentor.title}
            </p>
            <p className="truncate text-[11px] text-[#aab3c7]/60 font-mono">
              {mentor.company}
            </p>
          </div>
        </div>

        {/* Rating and Social Proof */}
        <div className="mt-4 flex items-center justify-between border-y border-[#273044]/70 py-2.5 text-xs font-mono">
          <div className="flex items-center gap-1.5 font-medium text-[#f4f6ff]">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{mentor.rating.toFixed(2)}</span>
            <span className="text-[#aab3c7]/60 font-normal">
              ({mentor.reviewCount})
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#aab3c7]">
            <Award className="h-3.5 w-3.5 text-[#7ca0ff]" />
            <span>{mentor.sessionsDelivered}+ sessions</span>
          </div>
        </div>

        {/* Bio Hook */}
        <p className="mt-3.5 text-xs leading-relaxed text-[#aab3c7] line-clamp-2">
          &ldquo;{mentor.shortIntro}&rdquo;
        </p>

        {/* Tags: Focus Areas & Industry */}
        <div className="mt-4 space-y-2">
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full border border-[#273044] bg-[#0b0f1b] px-2.5 py-0.5 text-[11px] font-mono text-[#aab3c7]">
              {mentor.industry}
            </span>
            {mentor.focusAreas.slice(0, 2).map((fa) => (
              <span
                key={fa}
                className="rounded-full border border-[#7ca0ff]/20 bg-[#7ca0ff]/5 px-2.5 py-0.5 text-[11px] text-[#7ca0ff]"
              >
                {fa}
              </span>
            ))}
            {mentor.focusAreas.length > 2 && (
              <span className="rounded-full border border-[#273044] bg-[#0b0f1b] px-2 py-0.5 text-[11px] font-mono text-[#aab3c7]/60">
                +{mentor.focusAreas.length - 2}
              </span>
            )}
          </div>

          {/* Languages */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#aab3c7]/80">
            <Globe className="h-3 w-3 text-[#7ca0ff]" />
            <span>Languages:</span>
            <span className="font-mono text-[#f4f6ff]">
              {mentor.languages.join(", ")}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="mt-6 pt-4 border-t border-[#273044]/80">
        <div className="flex items-center justify-between text-xs mb-3.5">
          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
            <Calendar className="h-3.5 w-3.5 text-emerald-400" />
            <span>Next:</span>
            <span className="font-semibold text-[#f4f6ff]">{nextSlotTime}</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#aab3c7]/70">
            Free Demo
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <Link
            href={`/mentors/${mentor.id}`}
            className="inline-flex items-center justify-center rounded-full border border-[#273044] bg-[#182035]/60 px-3 py-2 text-xs font-medium text-[#f4f6ff] transition-all hover:bg-[#182035] hover:border-[#7ca0ff]/30 active:scale-98"
          >
            View Profile
          </Link>
          <button
            onClick={() => onBookDemo(mentor)}
            className="inline-flex items-center justify-center gap-1 rounded-full bg-[#f4f6ff] px-3 py-2 text-xs font-semibold text-[#0b0f1b] shadow-sm transition-all hover:bg-white hover:scale-[1.02] active:scale-98"
          >
            <span>Book Demo</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </article>
  );
}
