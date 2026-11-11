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
  Clock,
  ArrowRight,
  MessageSquare,
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
    <div className="min-h-screen flex flex-col bg-[#0b0f1b] text-[#f8fafc]">
      <Navbar onQuickBook={() => setIsBookingModalOpen(true)} />

      {/* Breadcrumb Header */}
      <div className="pt-28 sm:pt-32 pb-4 border-b border-[#1c2438]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-[#94a3b8] hover:text-[#f8fafc] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to mentor directory</span>
          </Link>
        </div>
      </div>

      {/* Main Profile Layout */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column (2 Cols): Bio, Specialisms, Background, Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mentor Overview Card */}
            <div className="rounded-2xl border border-[#222b3e] bg-[#121828] p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-2xl border border-[#222b3e] bg-[#0b0f1b]">
                  <Image
                    src={mentor.photo}
                    alt={mentor.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 96px, 112px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {mentor.badge && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#18233a] border border-[#28385a] px-2.5 py-0.5 text-[11px] font-medium text-[#7ca0ff]">
                        <ShieldCheck className="h-3 w-3" />
                        <span>{mentor.badge}</span>
                      </span>
                    )}
                    <span className="rounded-md bg-[#0e1424] border border-[#1e2942] px-2.5 py-0.5 text-[11px] font-medium text-[#8290ab]">
                      {mentor.industry}
                    </span>
                    <span className="text-[11px] text-[#8290ab]">
                      {mentor.experienceYears}+ years exp
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f8fafc]">
                    {mentor.name}
                  </h1>

                  <p className="text-sm text-[#94a3b8] mt-1">
                    {mentor.title}
                  </p>
                  <p className="text-xs text-[#8290ab]">{mentor.company}</p>

                  {/* Rating / Social Proof */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#8290ab] pt-3 border-t border-[#1c2438]">
                    <div className="flex items-center gap-1 font-medium text-[#f8fafc]">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{mentor.rating.toFixed(2)}</span>
                      <span className="text-[#8290ab] font-normal">
                        ({mentor.reviewCount} reviews)
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Award className="h-3.5 w-3.5 text-[#7ca0ff]" />
                      <span>{mentor.sessionsDelivered}+ sessions completed</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Globe className="h-3.5 w-3.5 text-[#7ca0ff]" />
                      <span>Coaches in: {mentor.languages.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Short Intro Hook */}
              <div className="mt-6 rounded-xl bg-[#0e1424] border border-[#1e2942] p-4 text-xs sm:text-sm text-[#cbd5e1] leading-relaxed italic">
                &ldquo;{mentor.shortIntro}&rdquo;
              </div>
            </div>

            {/* Coaching Focus Areas & Specialisms */}
            <div className="rounded-2xl border border-[#222b3e] bg-[#121828] p-6 sm:p-8 shadow-xl space-y-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#7ca0ff]">
                Focus Areas &amp; Specialisms
              </h2>

              <div className="flex flex-wrap gap-2">
                {mentor.focusAreas.map((fa) => (
                  <span
                    key={fa}
                    className="rounded-lg bg-[#162138] border border-[#223356] px-3 py-1.5 text-xs font-medium text-[#9db7ff]"
                  >
                    {fa}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <h3 className="text-xs font-medium text-[#8290ab] uppercase tracking-wider mb-2.5">
                  Core Modules:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#cbd5e1]">
                  {mentor.specialisms.map((spec) => (
                    <li key={spec} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Biography & Industry Track Record */}
            <div className="rounded-2xl border border-[#222b3e] bg-[#121828] p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-[#7ca0ff] mb-3">
                  About {mentor.name}
                </h2>
                <div className="space-y-3 text-sm text-[#94a3b8] leading-relaxed">
                  {mentor.bio.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#1c2438] pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#7ca0ff] mb-2">
                  Leadership Background
                </h3>
                <p className="text-sm text-[#cbd5e1] leading-relaxed font-medium">
                  {mentor.industryBackground}
                </p>
              </div>

              {/* Signature Pillars */}
              <div className="border-t border-[#1c2438] pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#7ca0ff] mb-4">
                  Signature Coaching Pillars
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {mentor.coachingPillars.map((pillar, i) => (
                    <div
                      key={pillar.title}
                      className="rounded-xl border border-[#1e2942] bg-[#0e1424] p-4"
                    >
                      <span className="font-mono text-xs font-bold text-[#7ca0ff]">
                        0{i + 1}
                      </span>
                      <h4 className="text-xs font-semibold text-[#f8fafc] mt-1 mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-[11px] text-[#8290ab] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learner Reviews */}
            <div className="rounded-2xl border border-[#222b3e] bg-[#121828] p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-[#f8fafc]">
                    Learner Reviews ({mentor.reviews.length})
                  </h2>
                  <p className="text-xs text-[#8290ab]">
                    Verified feedback from founders, executives, and leaders.
                  </p>
                </div>

                <div className="flex items-center gap-1 font-semibold text-sm text-[#f8fafc]">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>{mentor.rating.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                {mentor.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-xl border border-[#1e2942] bg-[#0e1424] p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative h-9 w-9 overflow-hidden rounded-full border border-[#222b3e] bg-[#121828]">
                          <Image
                            src={rev.avatar}
                            alt={rev.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-[#f8fafc]">
                            {rev.author}
                          </h4>
                          <p className="text-[11px] text-[#8290ab]">
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
                        <span className="text-[10px] text-[#8290ab]">
                          {rev.date}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-[#cbd5e1] leading-relaxed italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>

                    <div className="text-[11px] text-[#7ca0ff] font-medium">
                      Focus: {rev.focusTopic}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (1 Col): Sticky Concierge Booking Card */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="rounded-2xl border border-[#222b3e] bg-[#121828] p-6 shadow-2xl space-y-5">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 mb-2">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Free 30-min Demo Session
                </span>
                <h3 className="text-lg font-semibold text-[#f8fafc] leading-tight">
                  Book 1:1 Demo with {mentor.name}
                </h3>
                <p className="text-xs text-[#8290ab] mt-1">
                  Diagnostics, pacing analysis, and personalized coaching roadmap.
                </p>
              </div>

              {/* Next slot callout */}
              <div className="rounded-xl border border-[#1e2942] bg-[#0e1424] p-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8290ab] flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#7ca0ff]" />
                    Next Earliest:
                  </span>
                  <span className="font-semibold text-[#f8fafc]">
                    {nextSlotDate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8290ab] flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#7ca0ff]" />
                    Slot Time:
                  </span>
                  <span className="font-semibold text-[#f8fafc]">
                    {nextSlotTime} (IST)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8290ab] flex items-center gap-1.5">
                    <Video className="h-3.5 w-3.5 text-emerald-400" />
                    Session:
                  </span>
                  <span className="text-[#cbd5e1]">
                    Live Google Meet
                  </span>
                </div>
              </div>

              {/* What happens in the 30-min demo */}
              <div className="space-y-2 text-xs">
                <span className="font-medium uppercase tracking-wider text-[#8290ab] text-[11px]">
                  What&apos;s included:
                </span>
                <ul className="space-y-1.5 text-[#94a3b8]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Live diagnostic on speech pace &amp; verbal fillers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Real-time feedback on your upcoming talk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Custom roadmap tailored to your timeline</span>
                  </li>
                </ul>
              </div>

              {/* Primary CTA */}
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#f8fafc] py-3 text-sm font-semibold text-[#0b0f1b] shadow-lg hover:bg-white hover:scale-[1.02] transition-all active:scale-98"
              >
                <span>Book Free 1:1 Demo</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-center text-[11px] text-[#8290ab]">
                No credit card required &bull; 100% confidential
              </p>
            </div>

            {/* Questions Help Card */}
            <div className="rounded-2xl border border-[#222b3e] bg-[#121828] p-5 text-xs text-[#94a3b8] space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#f8fafc]">
                <MessageSquare className="h-4 w-4 text-[#7ca0ff]" />
                <span>Need help choosing a mentor?</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Speak directly with an admissions advisor to find the right coach for your deadline.
              </p>
              <a
                href="mailto:support@articulatex.in"
                className="inline-block text-[#7ca0ff] font-medium hover:underline text-[11px]"
              >
                Contact Admissions Advisor &rarr;
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
