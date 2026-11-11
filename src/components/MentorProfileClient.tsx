"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Globe,
  Calendar,
  Clock,
  Video,
  ArrowRight,
  ShieldCheck,
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
    <div className="min-h-screen flex flex-col bg-background text-foreground noise-overlay">
      <Navbar onQuickBook={() => setIsBookingModalOpen(true)} />

      {/* Breadcrumb Navigation */}
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
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left Column (2 Cols): Clean Editorial Profile */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Overview Card */}
            <div className="rounded-2xl border border-foreground/10 bg-card p-8 lg:p-10 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Clean Portrait Image */}
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
                  {/* Subtle Meta Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs">
                    <span className="rounded-md bg-secondary/80 border border-foreground/10 px-2.5 py-0.5 text-[11px] text-foreground font-medium">
                      {mentor.industry}
                    </span>
                    <span className="text-[11px] text-muted-foreground font-normal">
                      {mentor.experienceYears}+ yrs exp
                    </span>
                  </div>

                  {/* Bold Mentor Name */}
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                    {mentor.name}
                  </h1>

                  {/* Light Subtitle & Company */}
                  <p className="text-sm sm:text-base font-normal text-muted-foreground mt-1.5 font-sans leading-relaxed">
                    {mentor.title} <span className="text-foreground/20">&bull;</span> {mentor.company}
                  </p>

                  {/* Rating & Social Proof */}
                  <div className="mt-4 flex flex-wrap items-center gap-6 text-xs font-mono text-muted-foreground pt-4 border-t border-foreground/10">
                    <div className="flex items-center gap-1.5 font-sans">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                      <span className="font-bold text-foreground">{mentor.rating.toFixed(2)}</span>
                      <span className="text-muted-foreground font-normal">
                        ({mentor.reviewCount} verified reviews)
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 font-sans font-normal text-muted-foreground">
                      <Globe className="h-3.5 w-3.5 text-foreground/60" />
                      <span>Coaches in: {mentor.languages.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Natural Value Proposition (Light Text) */}
              <p className="mt-6 pt-6 border-t border-foreground/10 text-base text-foreground/85 font-normal leading-relaxed font-sans">
                {mentor.shortIntro}
              </p>
            </div>

            {/* Background & Executive Pedigree Section */}
            <div className="rounded-2xl border border-foreground/10 bg-card p-8 lg:p-10 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-foreground mb-3">
                  Background &amp; Pedigree
                </h2>
                <div className="space-y-4 text-sm sm:text-base font-normal text-muted-foreground leading-relaxed font-sans">
                  {mentor.bio.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Track Record Callout */}
              <div className="pt-4 border-t border-foreground/10">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                  Executive Track Record
                </span>
                <p className="text-sm sm:text-base font-bold text-foreground leading-relaxed font-sans">
                  {mentor.industryBackground}
                </p>
              </div>

              {/* Focus Areas Tags */}
              <div className="pt-4 border-t border-foreground/10">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-2.5">
                  Coaching Focus Areas
                </span>
                <div className="flex flex-wrap gap-2">
                  {mentor.focusAreas.map((fa) => (
                    <span
                      key={fa}
                      className="rounded-lg bg-secondary/80 border border-foreground/10 px-3 py-1 text-xs font-mono text-foreground font-medium"
                    >
                      {fa}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Verified Learner Reviews Section */}
            <div className="rounded-2xl border border-foreground/10 bg-card p-8 lg:p-10 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-foreground/10">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-foreground">
                    Verified Reviews ({mentor.reviews.length})
                  </h2>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    Ratings from founders and executives.
                  </p>
                </div>

                <div className="flex items-center gap-1 font-mono font-bold text-sm text-foreground">
                  <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                  <span>{mentor.rating.toFixed(2)}</span>
                </div>
              </div>

              {/* Reviews List (Light Readable Text with Bold Names) */}
              <div className="space-y-4">
                {mentor.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-xl border border-foreground/10 bg-secondary/30 p-5 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-foreground">
                          {rev.author}
                        </h3>
                        <p className="text-[11px] font-mono text-muted-foreground font-normal">
                          {rev.role} &bull; {rev.company}
                        </p>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-500" />
                        ))}
                      </div>
                    </div>

                    <p className="text-sm font-normal text-foreground/80 leading-relaxed font-sans">
                      &ldquo;{rev.comment}&rdquo;
                    </p>

                    <div className="text-[11px] font-mono text-muted-foreground pt-1">
                      Focus: <span className="text-foreground font-medium">{rev.focusTopic}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (1 Col): Simplified Sticky Demo Booking Card */}
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="rounded-2xl border border-foreground/15 bg-card p-7 lg:p-8 shadow-sm space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground block mb-2 font-normal">
                  Free 1:1 Diagnostic
                </span>
                <h3 className="text-2xl font-bold text-foreground leading-tight">
                  Book 1:1 Demo
                </h3>
                <p className="text-xs sm:text-sm font-normal text-muted-foreground mt-1.5 font-sans leading-relaxed">
                  30-minute private diagnostic session with {mentor.name}. Live vocal analysis and customized speech roadmap.
                </p>
              </div>

              {/* Session Logistics (Clean 3-column row) */}
              <div className="grid grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 rounded-xl overflow-hidden">
                <div className="bg-background p-3 text-center">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground block mb-0.5 font-normal">
                    Date
                  </span>
                  <div className="flex items-center justify-center gap-1 text-xs font-bold text-foreground">
                    <Calendar className="h-3 w-3 text-foreground/60" />
                    <span>{nextSlot ? nextSlot.formattedDate : "Nov 12"}</span>
                  </div>
                </div>

                <div className="bg-background p-3 text-center">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground block mb-0.5 font-normal">
                    Time
                  </span>
                  <div className="flex items-center justify-center gap-1 text-xs font-bold text-foreground">
                    <Clock className="h-3 w-3 text-foreground/60" />
                    <span>{nextSlotTime}</span>
                  </div>
                </div>

                <div className="bg-background p-3 text-center">
                  <span className="font-mono text-[10px] uppercase text-muted-foreground block mb-0.5 font-normal">
                    Format
                  </span>
                  <div className="flex items-center justify-center gap-1 text-xs font-bold text-foreground">
                    <Video className="h-3 w-3 text-foreground/60" />
                    <span>1:1 Meet</span>
                  </div>
                </div>
              </div>

              {/* Outline Booking Action Button */}
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-foreground/30 bg-background hover:bg-secondary px-6 py-3.5 text-xs font-medium text-foreground transition-all shadow-sm active:scale-[0.98]"
              >
                <span>Select Demo Slot</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              {/* Minimal Reassurance */}
              <div className="pt-2 text-center">
                <p className="text-[11px] font-mono text-muted-foreground font-normal">
                  100% Free &bull; No credit card required
                </p>
              </div>
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
