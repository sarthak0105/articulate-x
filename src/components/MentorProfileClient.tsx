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
    <div className="min-h-screen flex flex-col bg-[#090d16] text-[#f4f6ff] noise-overlay selection:bg-[#7ca0ff]/30 selection:text-white">
      <Navbar onQuickBook={() => setIsBookingModalOpen(true)} />

      {/* Breadcrumb Header */}
      <div className="pt-28 sm:pt-32 pb-4 border-b border-[#232d42]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link
            href="/#mentors-directory"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#94a3b8] hover:text-[#f4f6ff] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>&larr; Back to faculty directory</span>
          </Link>
        </div>
      </div>

      {/* Main Profile Layout */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Column (2 Cols): Bio, Specialisms, Background, Reviews */}
          <div className="lg:col-span-2 space-y-10">
            {/* Mentor Overview Card */}
            <div className="rounded-2xl border border-[#232d42] bg-[#111624] p-8 shadow-xl">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-2xl border border-[#232d42] bg-[#090d16]">
                  <Image
                    src={mentor.photo}
                    alt={mentor.name}
                    fill
                    priority
                    sizes="(max-width: 640px) 112px, 128px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs">
                    {mentor.badge && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#162138] border border-[#273a62] px-2.5 py-0.5 text-[11px] font-medium text-[#7ca0ff]">
                        <ShieldCheck className="h-3 w-3" />
                        <span>{mentor.badge}</span>
                      </span>
                    )}
                    <span className="rounded-md bg-[#0c101a] border border-[#232d42] px-2.5 py-0.5 text-[11px] text-[#94a3b8]">
                      {mentor.industry}
                    </span>
                    <span className="text-[11px] text-[#8290ab]">
                      {mentor.experienceYears}+ yrs exp
                    </span>
                  </div>

                  <h1 className="font-display text-3xl sm:text-4xl tracking-tight text-[#f4f6ff]">
                    {mentor.name}
                  </h1>

                  <p className="text-sm text-[#94a3b8] mt-1 font-sans">
                    {mentor.title} <span className="text-white/30">·</span> {mentor.company}
                  </p>

                  {/* Rating / Social Proof */}
                  <div className="mt-5 flex flex-wrap items-center gap-5 text-xs font-mono text-[#8290ab] pt-4 border-t border-[#232d42]">
                    <div className="flex items-center gap-1 font-medium text-[#f4f6ff]">
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
              <div className="mt-8 rounded-xl bg-[#0c101a] border border-[#232d42] p-5 font-serif italic text-sm text-[#cbd5e1] leading-relaxed">
                &ldquo;{mentor.shortIntro}&rdquo;
              </div>
            </div>

            {/* Coaching Focus Areas & Specialisms */}
            <div className="rounded-2xl border border-[#232d42] bg-[#111624] p-8 shadow-xl space-y-5">
              <span className="font-mono text-xs tracking-widest text-[#7ca0ff] uppercase block">
                // Focus Areas &amp; Specialisms
              </span>

              <div className="flex flex-wrap gap-2">
                {mentor.focusAreas.map((fa) => (
                  <span
                    key={fa}
                    className="rounded-lg bg-[#162138] border border-[#273a62] px-3.5 py-1.5 text-xs font-mono text-[#9db7ff]"
                  >
                    {fa}
                  </span>
                ))}
              </div>

              <div className="pt-3">
                <h3 className="font-mono text-xs text-[#8290ab] uppercase tracking-wider mb-3">
                  Core Diagnostic Modules:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans text-[#cbd5e1]">
                  {mentor.specialisms.map((spec) => (
                    <li key={spec} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Biography & Industry Track Record */}
            <div className="rounded-2xl border border-[#232d42] bg-[#111624] p-8 shadow-xl space-y-6">
              <div>
                <span className="font-mono text-xs tracking-widest text-[#7ca0ff] uppercase block mb-3">
                  // Leadership Background
                </span>
                <div className="space-y-4 text-sm text-[#94a3b8] leading-relaxed font-sans">
                  {mentor.bio.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#232d42] pt-6">
                <span className="font-mono text-xs tracking-widest text-[#7ca0ff] uppercase block mb-2">
                  // Executive Pedigree
                </span>
                <p className="text-sm text-[#cbd5e1] leading-relaxed font-sans font-medium">
                  {mentor.industryBackground}
                </p>
              </div>

              {/* Signature Pillars */}
              <div className="border-t border-[#232d42] pt-6">
                <span className="font-mono text-xs tracking-widest text-[#7ca0ff] uppercase block mb-4">
                  // Signature Coaching Methodology
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {mentor.coachingPillars.map((pillar, i) => (
                    <div
                      key={pillar.title}
                      className="rounded-xl border border-[#232d42] bg-[#0c101a] p-5"
                    >
                      <span className="font-mono text-xs font-bold text-[#7ca0ff]">
                        0{i + 1}
                      </span>
                      <h4 className="font-display text-base text-[#f4f6ff] mt-2 mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-[#8290ab] leading-relaxed font-sans">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learner Reviews */}
            <div className="rounded-2xl border border-[#232d42] bg-[#111624] p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-2xl text-[#f4f6ff]">
                    Learner Feedback ({mentor.reviews.length})
                  </h2>
                  <p className="text-xs font-mono text-[#8290ab] mt-1">
                    Verified ratings from founders, executives, and leaders.
                  </p>
                </div>

                <div className="flex items-center gap-1 font-mono font-semibold text-sm text-[#f4f6ff]">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span>{mentor.rating.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                {mentor.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-xl border border-[#232d42] bg-[#0c101a] p-6 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative h-9 w-9 overflow-hidden rounded-full border border-[#232d42] bg-[#111624]">
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
                          <p className="text-[11px] font-mono text-[#8290ab]">
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
                        <span className="text-[10px] font-mono text-[#8290ab]">
                          {rev.date}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs font-serif italic text-[#cbd5e1] leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>

                    <div className="text-[11px] font-mono text-[#7ca0ff]">
                      Focus: {rev.focusTopic}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (1 Col): Sticky Concierge Booking Card */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="rounded-2xl border border-[#232d42] bg-[#111624] p-7 shadow-2xl space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[11px] font-mono text-emerald-400 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Free 30-min Diagnostic
                </span>
                <h3 className="font-display text-2xl text-[#f4f6ff] leading-tight">
                  Book 1:1 Demo with {mentor.name}
                </h3>
                <p className="text-xs text-[#8290ab] mt-1 font-sans">
                  Vocal diagnostic, pacing analysis, and customized rehearsal roadmap.
                </p>
              </div>

              {/* Next slot callout */}
              <div className="rounded-xl border border-[#232d42] bg-[#0c101a] p-4 space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#8290ab] flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#7ca0ff]" />
                    Earliest Slot:
                  </span>
                  <span className="font-semibold text-[#f4f6ff]">
                    {nextSlotDate}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8290ab] flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#7ca0ff]" />
                    Time (IST):
                  </span>
                  <span className="font-semibold text-[#f4f6ff]">
                    {nextSlotTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8290ab] flex items-center gap-1.5">
                    <Video className="h-3.5 w-3.5 text-emerald-400" />
                    Format:
                  </span>
                  <span className="text-[#cbd5e1]">
                    Private Google Meet
                  </span>
                </div>
              </div>

              {/* What happens in the 30-min demo */}
              <div className="space-y-2 text-xs font-sans">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#8290ab] block mb-2">
                  What is included:
                </span>
                <ul className="space-y-2 text-[#94a3b8]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Real-time analysis on speech pace and filler words</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Live slide-by-slide feedback on your upcoming talk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Customized coaching roadmap tailored to your timeline</span>
                  </li>
                </ul>
              </div>

              {/* Primary CTA */}
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#f4f6ff] py-3.5 text-sm font-medium text-[#090d16] shadow-xl hover:bg-white hover:scale-[1.02] transition-all active:scale-98"
              >
                <span>Book Free Diagnostic</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-center font-mono text-[10px] text-[#8290ab]">
                No credit card required &bull; 100% confidential
              </p>
            </div>

            {/* Questions Help Card */}
            <div className="rounded-2xl border border-[#232d42] bg-[#111624] p-6 text-xs text-[#94a3b8] space-y-2.5">
              <div className="flex items-center gap-2 font-semibold text-[#f4f6ff]">
                <MessageSquare className="h-4 w-4 text-[#7ca0ff]" />
                <span>Need guidance selecting a mentor?</span>
              </div>
              <p className="leading-relaxed text-[11px] font-sans">
                Our admissions advisors will match you with the right coach for your exact deadline.
              </p>
              <a
                href="mailto:support@articulatex.in"
                className="inline-block text-[#7ca0ff] font-mono text-xs hover:underline pt-1"
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
