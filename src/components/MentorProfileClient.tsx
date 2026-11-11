"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Award,
  Globe,
  Calendar,
  CheckCircle2,
  Video,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { Mentor } from "@/types";

interface MentorProfileClientProps {
  mentor: Mentor;
}

export function MentorProfileClient({ mentor }: MentorProfileClientProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const nextSlot = mentor.availableSlots[0];
  const nextSlotDate = nextSlot
    ? `${nextSlot.dayOfWeek}, ${nextSlot.formattedDate}`
    : "Next available";
  const nextSlotTime = nextSlot ? nextSlot.slots[0] : "10:00 AM";

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f1b] text-[#f4f6ff]">
      <Navbar onQuickBook={() => setIsBookingModalOpen(true)} />

      {/* Top spacing for fixed floating navbar */}
      <div className="pt-24 sm:pt-28 pb-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#273044] bg-[#121828] px-4 py-1.5 font-mono text-xs text-[#aab3c7] hover:text-[#f4f6ff] hover:border-[#7ca0ff]/40 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to all mentors</span>
          </Link>
        </div>
      </div>

      {/* Main Profile Layout */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column (2 Cols): Bio, Background, Specialisms, Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mentor Hero Card */}
            <div className="rounded-3xl border border-[#273044] bg-[#121828] p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative h-28 w-28 sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-3xl border border-[#273044] bg-[#0b0f1b]">
                  <Image
                    src={mentor.photo}
                    alt={mentor.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 112px, 144px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {mentor.badge && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#7ca0ff]/40 bg-[#7ca0ff]/10 px-2.5 py-0.5 font-mono text-[11px] text-[#7ca0ff]">
                        <Sparkles className="h-3 w-3" />
                        {mentor.badge}
                      </span>
                    )}
                    <span className="rounded-full border border-[#273044] bg-[#0b0f1b] px-2.5 py-0.5 font-mono text-[11px] text-[#aab3c7]">
                      {mentor.industry}
                    </span>
                    <span className="font-mono text-[11px] text-[#aab3c7]/70">
                      {mentor.experienceYears}+ yrs exp
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-4xl font-normal tracking-tight text-[#f4f6ff]">
                    {mentor.name}
                  </h1>

                  <p className="text-sm font-medium text-[#7ca0ff] mt-1">
                    {mentor.title}
                  </p>
                  <p className="text-xs font-mono text-[#aab3c7]/70">{mentor.company}</p>

                  {/* Rating / Sessions */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-[#f4f6ff]">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold">{mentor.rating.toFixed(2)}</span>
                      <span className="text-[#aab3c7]/60">
                        ({mentor.reviewCount} reviews)
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[#aab3c7]">
                      <Award className="h-4 w-4 text-[#7ca0ff]" />
                      <span>{mentor.sessionsDelivered}+ 1:1 sessions</span>
                    </div>

                    <div className="flex items-center gap-1 text-[#aab3c7]">
                      <Globe className="h-4 w-4 text-[#7ca0ff]" />
                      <span>{mentor.languages.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Short Intro Hook */}
              <div className="mt-6 rounded-2xl border border-[#273044] bg-[#0b0f1b] p-4 text-sm text-[#f4f6ff] leading-relaxed italic">
                &ldquo;{mentor.shortIntro}&rdquo;
              </div>
            </div>

            {/* Specialisms & Focus Areas */}
            <div className="rounded-3xl border border-[#273044] bg-[#121828] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#7ca0ff]">
                Coaching Focus Areas &amp; Specialisms
              </h2>

              <div className="flex flex-wrap gap-2">
                {mentor.focusAreas.map((fa) => (
                  <span
                    key={fa}
                    className="rounded-full border border-[#7ca0ff]/30 bg-[#7ca0ff]/10 px-3 py-1 font-mono text-xs text-[#7ca0ff]"
                  >
                    {fa}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <h3 className="font-mono text-[11px] uppercase text-[#aab3c7] mb-2.5">
                  Core Coaching Modules:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#aab3c7]">
                  {mentor.specialisms.map((spec) => (
                    <li key={spec} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* In-depth Biography & Industry Background */}
            <div className="rounded-3xl border border-[#273044] bg-[#121828] p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <h2 className="font-mono text-[11px] uppercase tracking-wider text-[#aab3c7] mb-2">
                  About {mentor.name}
                </h2>
                <div className="space-y-3 text-sm text-[#aab3c7] leading-relaxed">
                  {mentor.bio.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#273044] pt-6">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#aab3c7] mb-2">
                  Industry Background &amp; Track Record
                </h3>
                <p className="text-sm text-[#f4f6ff] leading-relaxed font-medium">
                  {mentor.industryBackground}
                </p>
              </div>

              {/* Coaching Pillars */}
              <div className="border-t border-[#273044] pt-6">
                <h3 className="font-mono text-[11px] uppercase tracking-wider text-[#aab3c7] mb-4">
                  Signature Coaching Pillars
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {mentor.coachingPillars.map((pillar, i) => (
                    <div
                      key={pillar.title}
                      className="rounded-2xl border border-[#273044] bg-[#0b0f1b] p-4"
                    >
                      <span className="font-mono text-xs font-bold text-[#7ca0ff]">
                        0{i + 1}
                      </span>
                      <h4 className="text-xs font-semibold text-[#f4f6ff] mt-1 mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-[11px] text-[#aab3c7] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learner Reviews Section */}
            <div className="rounded-3xl border border-[#273044] bg-[#121828] p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-[#f4f6ff]">
                    Learner Reviews ({mentor.reviews.length})
                  </h2>
                  <p className="text-xs font-mono text-[#aab3c7]">
                    Feedback from verified founders, executives, and leaders.
                  </p>
                </div>

                <div className="flex items-center gap-1 font-mono text-sm text-[#f4f6ff]">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>{mentor.rating.toFixed(2)} / 5.0</span>
                </div>
              </div>

              <div className="space-y-4">
                {mentor.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-2xl border border-[#273044] bg-[#0b0f1b] p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#273044] bg-[#121828]">
                          <Image
                            src={rev.avatar}
                            alt={rev.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-[#f4f6ff]">
                            {rev.author}
                          </h4>
                          <p className="text-[11px] font-mono text-[#aab3c7]/70">
                            {rev.role} &bull; {rev.company}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-0.5 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-amber-400" />
                          ))}
                        </div>
                        <span className="font-mono text-[10px] text-[#aab3c7]/60">
                          {rev.date}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#aab3c7] leading-relaxed italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>

                    <div className="flex items-center gap-1 font-mono text-[10px] text-[#7ca0ff]">
                      <span className="rounded-full border border-[#7ca0ff]/30 bg-[#7ca0ff]/10 px-2.5 py-0.5">
                        Focus: {rev.focusTopic}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (1 Col): Sticky Booking Box */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="rounded-3xl border border-[#273044] bg-[#121828] p-6 shadow-2xl space-y-5">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 font-mono text-[11px] font-semibold text-emerald-400 mb-2">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Free 30-min Demo Session
                </span>
                <h3 className="text-xl font-normal text-[#f4f6ff] leading-tight">
                  Book 1:1 Demo with {mentor.name}
                </h3>
                <p className="text-xs font-mono text-[#aab3c7] mt-1">
                  Diagnostics, filler word analysis, and personalized coaching roadmap.
                </p>
              </div>

              {/* Next slot callout */}
              <div className="rounded-2xl border border-[#273044] bg-[#0b0f1b] p-4 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#aab3c7] flex items-center gap-1.5 font-mono text-[11px]">
                    <Calendar className="h-3.5 w-3.5 text-[#7ca0ff]" />
                    Next Earliest:
                  </span>
                  <span className="font-bold text-[#f4f6ff]">
                    {nextSlotDate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#aab3c7] flex items-center gap-1.5 font-mono text-[11px]">
                    <Clock className="h-3.5 w-3.5 text-[#7ca0ff]" />
                    Slot Time:
                  </span>
                  <span className="font-bold text-[#f4f6ff]">
                    {nextSlotTime} (IST)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#aab3c7] flex items-center gap-1.5 font-mono text-[11px]">
                    <Video className="h-3.5 w-3.5 text-emerald-400" />
                    Session:
                  </span>
                  <span className="font-mono text-[#f4f6ff]">
                    Google Meet 1:1
                  </span>
                </div>
              </div>

              {/* What happens in the demo */}
              <div className="space-y-2 text-xs">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#aab3c7]">
                  What happens in 30 minutes:
                </span>
                <ul className="space-y-2 text-[#aab3c7]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Real-time voice &amp; pacing diagnostic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Live feedback on your upcoming talk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Personalized roadmap tailored to your timeline</span>
                  </li>
                </ul>
              </div>

              {/* Primary CTA: Solid White Pill */}
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#f4f6ff] py-3 text-sm font-semibold text-[#0b0f1b] shadow-xl hover:bg-white hover:scale-[1.02] transition-all active:scale-98"
              >
                <span>Book Free 1:1 Demo ↗</span>
              </button>

              <p className="text-center font-mono text-[10px] text-[#aab3c7]/60">
                No credit card required &bull; 100% confidential
              </p>
            </div>

            {/* Need Help Card */}
            <div className="rounded-3xl border border-[#273044] bg-[#121828] p-5 text-xs text-[#aab3c7] space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#f4f6ff]">
                <MessageSquare className="h-4 w-4 text-[#7ca0ff]" />
                <span>Not sure which mentor is right?</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Our admissions advisor can match you with the right industry mentor in under 5 minutes.
              </p>
              <a
                href="mailto:support@articulatex.in"
                className="inline-block text-[#7ca0ff] font-mono text-[11px] hover:underline"
              >
                Contact Admissions Advisor ↗
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Booking Modal */}
      <BookingModal
        mentor={mentor}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
