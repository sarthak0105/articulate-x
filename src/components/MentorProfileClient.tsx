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
    <div className="min-h-screen flex flex-col bg-background text-foreground noise-overlay selection:bg-foreground selection:text-background">
      <Navbar onQuickBook={() => setIsBookingModalOpen(true)} />

      {/* Breadcrumb Header */}
      <div className="pt-28 sm:pt-32 pb-4 border-b border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Link
            href="/#mentors-directory"
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
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
            <div className="rounded-2xl border border-foreground/10 bg-card p-8 lg:p-10 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative h-28 w-28 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-2xl border border-foreground/10 bg-secondary">
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
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary border border-foreground/10 px-2.5 py-0.5 text-[11px] font-medium text-foreground">
                        <ShieldCheck className="h-3 w-3" />
                        <span>{mentor.badge}</span>
                      </span>
                    )}
                    <span className="rounded-md bg-secondary border border-foreground/10 px-2.5 py-0.5 text-[11px] text-muted-foreground">
                      {mentor.industry}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {mentor.experienceYears}+ yrs exp
                    </span>
                  </div>

                  <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground">
                    {mentor.name}
                  </h1>

                  <p className="text-base text-muted-foreground mt-1 font-sans">
                    {mentor.title} <span className="text-foreground/20">·</span> {mentor.company}
                  </p>

                  {/* Rating / Social Proof */}
                  <div className="mt-5 flex flex-wrap items-center gap-6 text-xs font-mono text-muted-foreground pt-4 border-t border-foreground/10">
                    <div className="flex items-center gap-1.5 font-medium text-foreground">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span>{mentor.rating.toFixed(2)}</span>
                      <span className="text-muted-foreground font-normal">
                        ({mentor.reviewCount} reviews)
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-foreground" />
                      <span>{mentor.sessionsDelivered}+ sessions completed</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Globe className="h-4 w-4 text-foreground" />
                      <span>Coaches in: {mentor.languages.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Short Intro Hook */}
              <div className="mt-8 rounded-xl bg-secondary/60 border border-foreground/10 p-5 font-serif italic text-base text-foreground/85 leading-relaxed">
                &ldquo;{mentor.shortIntro}&rdquo;
              </div>
            </div>

            {/* Coaching Focus Areas & Specialisms */}
            <div className="rounded-2xl border border-foreground/10 bg-card p-8 lg:p-10 shadow-sm space-y-6">
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block">
                // Focus Areas &amp; Specialisms
              </span>

              <div className="flex flex-wrap gap-2">
                {mentor.focusAreas.map((fa) => (
                  <span
                    key={fa}
                    className="rounded-lg bg-secondary border border-foreground/10 px-3.5 py-1.5 text-xs font-mono text-foreground font-medium"
                  >
                    {fa}
                  </span>
                ))}
              </div>

              <div className="pt-3">
                <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">
                  Core Diagnostic Modules:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm font-sans text-foreground/80">
                  {mentor.specialisms.map((spec) => (
                    <li key={spec} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-foreground/70 shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Biography & Industry Track Record */}
            <div className="rounded-2xl border border-foreground/10 bg-card p-8 lg:p-10 shadow-sm space-y-8">
              <div>
                <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-3">
                  // Leadership Background
                </span>
                <div className="space-y-4 text-base text-muted-foreground leading-relaxed font-sans">
                  {mentor.bio.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="border-t border-foreground/10 pt-6">
                <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-2">
                  // Executive Pedigree
                </span>
                <p className="text-base text-foreground leading-relaxed font-sans font-medium">
                  {mentor.industryBackground}
                </p>
              </div>

              {/* Signature Pillars */}
              <div className="border-t border-foreground/10 pt-6">
                <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4">
                  // Signature Coaching Methodology
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {mentor.coachingPillars.map((pillar, i) => (
                    <div
                      key={pillar.title}
                      className="rounded-xl border border-foreground/10 bg-secondary/40 p-5"
                    >
                      <span className="font-mono text-xs font-bold text-foreground">
                        0{i + 1}
                      </span>
                      <h4 className="font-display text-xl text-foreground mt-2 mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learner Reviews */}
            <div className="rounded-2xl border border-foreground/10 bg-card p-8 lg:p-10 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-display text-3xl text-foreground">
                    Learner Feedback ({mentor.reviews.length})
                  </h2>
                  <p className="text-xs font-mono text-muted-foreground mt-1">
                    Verified ratings from founders, executives, and leaders.
                  </p>
                </div>

                <div className="flex items-center gap-1 font-mono font-semibold text-sm text-foreground">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span>{mentor.rating.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                {mentor.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-xl border border-foreground/10 bg-secondary/30 p-6 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative h-9 w-9 overflow-hidden rounded-full border border-foreground/10 bg-card">
                          <Image
                            src={rev.avatar}
                            alt={rev.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-foreground">
                            {rev.author}
                          </h4>
                          <p className="text-[11px] font-mono text-muted-foreground">
                            {rev.role} &bull; {rev.company}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-amber-500" />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {rev.date}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm font-serif italic text-foreground/85 leading-relaxed">
                      &ldquo;{rev.comment}&rdquo;
                    </p>

                    <div className="text-[11px] font-mono text-foreground font-medium">
                      Focus: {rev.focusTopic}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (1 Col): Architectural Demo Booking Card */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="rounded-2xl border border-foreground/15 bg-card p-8 lg:p-9 shadow-lg space-y-7">
              {/* Card Header */}
              <div>
                <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-3">
                  // 1:1 DIAGNOSTIC RESERVATION
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-foreground leading-tight">
                  Book 1:1 Demo with {mentor.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 font-sans leading-relaxed">
                  Private 30-minute diagnostic session. Vocal analysis, pacing critique, and personal roadmap.
                </p>
              </div>

              {/* Architectural Session Logistics Grid */}
              <div className="grid grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 rounded-xl overflow-hidden">
                <div className="bg-background p-3.5 text-center">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground block mb-1">
                    Date
                  </span>
                  <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-foreground">
                    <Calendar className="h-3.5 w-3.5 text-foreground/70" />
                    <span>{nextSlot ? nextSlot.formattedDate : "Nov 12"}</span>
                  </div>
                </div>

                <div className="bg-background p-3.5 text-center">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground block mb-1">
                    Time
                  </span>
                  <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-foreground">
                    <Clock className="h-3.5 w-3.5 text-foreground/70" />
                    <span>{nextSlotTime}</span>
                  </div>
                </div>

                <div className="bg-background p-3.5 text-center">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground block mb-1">
                    Format
                  </span>
                  <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-foreground">
                    <Video className="h-3.5 w-3.5 text-foreground/70" />
                    <span>Meet 1:1</span>
                  </div>
                </div>
              </div>

              {/* Deliverables Blueprint */}
              <div className="space-y-3 pt-1 border-t border-foreground/10">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground block">
                  Session Blueprint:
                </span>
                <ul className="space-y-3 text-xs font-sans text-foreground/80">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-foreground shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block font-medium">Vocal Pacing Diagnostic</strong>
                      <span className="text-muted-foreground">Live acoustic analysis of tempo, breath patterns, and subconscious filler words.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-foreground shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block font-medium">Slide &amp; Pitch Rehearsal</strong>
                      <span className="text-muted-foreground">Slide-by-slide dry run of your actual upcoming presentation or investor pitch.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-foreground shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-foreground block font-medium">Actionable Coaching Framework</strong>
                      <span className="text-muted-foreground">Personalized rhetoric roadmap tailored to your speaking deadline.</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Primary Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-foreground/30 bg-background hover:bg-secondary text-foreground py-3.5 text-sm font-medium shadow-sm transition-all group"
                >
                  <span>Reserve Complimentary Demo</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>

                <div className="flex items-center justify-center gap-2 mt-3.5 text-xs font-mono text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5 text-foreground/70" />
                  <span>Complimentary 30-min diagnostic · No card required</span>
                </div>
              </div>
            </div>

            {/* Questions Help Card */}
            <div className="rounded-2xl border border-foreground/10 bg-card p-6 text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2 font-semibold text-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>Need advice choosing a coach?</span>
              </div>
              <p className="leading-relaxed text-xs font-sans text-muted-foreground">
                Our admissions advisors will match you with the right coach for your exact deadline.
              </p>
              <a
                href="mailto:support@articulatex.in"
                className="inline-block text-foreground font-mono text-xs hover:underline pt-1 font-medium"
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
