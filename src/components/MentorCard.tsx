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
  // Find the earliest slot
  const nextSlot = mentor.availableSlots[0];
  const nextSlotTime = nextSlot ? `${nextSlot.formattedDate}, ${nextSlot.slots[0]}` : "Next week";

  return (
    <article
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500"
      aria-label={`Mentor profile for ${mentor.name}`}
    >
      {/* Top Section: Avatar, Badge, Header */}
      <div>
        <div className="flex items-start gap-4">
          <div className="relative h-18 w-18 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-inner">
            <Image
              src={mentor.photo}
              alt={mentor.name}
              fill
              sizes="(max-width: 768px) 72px, 72px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {mentor.badge && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200/70">
                  <Sparkles className="h-3 w-3" />
                  {mentor.badge}
                </span>
              )}
              <span className="text-xs text-slate-500 font-medium">
                {mentor.experienceYears}+ yrs exp
              </span>
            </div>

            <Link
              href={`/mentors/${mentor.id}`}
              className="group/link block text-lg font-bold text-slate-900 transition-colors hover:text-blue-600 focus:outline-none"
            >
              <h3 className="truncate">{mentor.name}</h3>
            </Link>

            <p className="truncate text-xs font-medium text-slate-600 mt-0.5">
              {mentor.title}
            </p>
            <p className="truncate text-xs text-slate-400 font-normal">
              {mentor.company}
            </p>
          </div>
        </div>

        {/* Rating and Social Proof */}
        <div className="mt-4 flex items-center justify-between border-y border-slate-100 py-2 text-xs">
          <div className="flex items-center gap-1 font-semibold text-slate-900">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
            <span>{mentor.rating.toFixed(2)}</span>
            <span className="text-slate-400 font-normal">
              ({mentor.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-500">
            <Award className="h-3.5 w-3.5 text-slate-400" />
            <span>{mentor.sessionsDelivered}+ 1:1 sessions</span>
          </div>
        </div>

        {/* Short Bio Hook */}
        <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-2">
          &ldquo;{mentor.shortIntro}&rdquo;
        </p>

        {/* Tags: Focus Areas & Industry */}
        <div className="mt-4 space-y-2">
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
              {mentor.industry}
            </span>
            {mentor.focusAreas.slice(0, 2).map((fa) => (
              <span
                key={fa}
                className="rounded-md bg-blue-50/70 px-2 py-0.5 text-[11px] font-medium text-blue-700 border border-blue-100"
              >
                {fa}
              </span>
            ))}
            {mentor.focusAreas.length > 2 && (
              <span className="rounded-md bg-slate-50 px-1.5 py-0.5 text-[11px] font-medium text-slate-400">
                +{mentor.focusAreas.length - 2}
              </span>
            )}
          </div>

          {/* Languages */}
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <Globe className="h-3 w-3 text-slate-400" />
            <span>Coaches in:</span>
            <span className="font-medium text-slate-700">
              {mentor.languages.join(", ")}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
          <div className="flex items-center gap-1 text-emerald-700 font-medium">
            <Calendar className="h-3.5 w-3.5 text-emerald-600" />
            <span>Next slot:</span>
            <span className="font-semibold">{nextSlotTime}</span>
          </div>
          <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
            Free Demo
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/mentors/${mentor.id}`}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 active:scale-98"
          >
            View Profile
          </Link>
          <button
            onClick={() => onBookDemo(mentor)}
            className="inline-flex items-center justify-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-98"
          >
            <span>Book Free Demo</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </article>
  );
}
