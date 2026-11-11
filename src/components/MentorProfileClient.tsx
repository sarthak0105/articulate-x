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
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar onQuickBook={() => setIsBookingModalOpen(true)} />

      {/* Breadcrumb / Back Link */}
      <div className="border-b border-slate-200/80 bg-white py-3.5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to all mentors</span>
          </Link>
        </div>
      </div>

      {/* Main Profile Layout */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column (2 Cols): Bio, Background, Specialisms, Reviews */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mentor Hero Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative h-28 w-28 sm:h-36 sm:w-36 shrink-0 overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-slate-100">
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
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200">
                        <Sparkles className="h-3 w-3" />
                        {mentor.badge}
                      </span>
                    )}
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                      {mentor.industry}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {mentor.experienceYears}+ years experience
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {mentor.name}
                  </h1>

                  <p className="text-sm font-semibold text-slate-700 mt-1">
                    {mentor.title}
                  </p>
                  <p className="text-xs text-slate-500">{mentor.company}</p>

                  {/* Rating / Sessions */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                      <span>{mentor.rating.toFixed(2)}</span>
                      <span className="text-slate-400 font-normal">
                        ({mentor.reviewCount} verified reviews)
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-600">
                      <Award className="h-4 w-4 text-slate-400" />
                      <span>{mentor.sessionsDelivered}+ 1:1 sessions completed</span>
                    </div>

                    <div className="flex items-center gap-1 text-slate-600">
                      <Globe className="h-4 w-4 text-slate-400" />
                      <span>Languages: {mentor.languages.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Short Intro Hook */}
              <div className="mt-6 rounded-xl bg-blue-50/60 p-4 border border-blue-100 text-sm text-blue-950 font-medium leading-relaxed italic">
                &ldquo;{mentor.shortIntro}&rdquo;
              </div>
            </div>

            {/* Specialisms & Focus Areas */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 uppercase tracking-wider text-xs">
                Coaching Focus Areas &amp; Specialisms
              </h2>

              <div className="flex flex-wrap gap-2">
                {mentor.focusAreas.map((fa) => (
                  <span
                    key={fa}
                    className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800 border border-blue-200/80"
                  >
                    {fa}
                  </span>
                ))}
              </div>

              <div className="pt-2">
                <h3 className="text-xs font-semibold uppercase text-slate-500 mb-2">
                  Specialized Modules:
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {mentor.specialisms.map((spec) => (
                    <li key={spec} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* In-depth Biography & Industry Background */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  About {mentor.name}
                </h2>
                <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                  {mentor.bio.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Industry Background &amp; Credentials
                </h3>
                <p className="text-sm text-slate-700 font-medium leading-relaxed">
                  {mentor.industryBackground}
                </p>
              </div>

              {/* Coaching Pillars */}
              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                  Signature Coaching Pillars
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {mentor.coachingPillars.map((pillar, i) => (
                    <div
                      key={pillar.title}
                      className="rounded-xl border border-slate-100 bg-slate-50/60 p-4"
                    >
                      <span className="font-mono text-xs font-bold text-blue-600">
                        0{i + 1}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-1 mb-1">
                        {pillar.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Learner Reviews Section */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Learner Reviews ({mentor.reviews.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Feedback from verified founders, executives, and professionals.
                  </p>
                </div>

                <div className="flex items-center gap-1 font-bold text-slate-900 text-sm">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                  <span>{mentor.rating.toFixed(2)} / 5.0</span>
                </div>
              </div>

              <div className="space-y-4">
                {mentor.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-white">
                          <Image
                            src={rev.avatar}
                            alt={rev.author}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">
                            {rev.author}
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            {rev.role} &bull; {rev.company}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {rev.date}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      &ldquo;{rev.comment}&rdquo;
                    </p>

                    <div className="flex items-center gap-1 text-[11px] text-blue-700 font-medium">
                      <span className="rounded bg-blue-100/70 px-2 py-0.5">
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
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md space-y-5">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200 mb-2">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Free 30-min Demo Session
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  Book 1:1 Demo with {mentor.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Diagnostics, filler word analysis, and personalized coaching roadmap.
                </p>
              </div>

              {/* Next slot callout */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-blue-600" />
                    Next Earliest Slot:
                  </span>
                  <span className="font-bold text-slate-900">
                    {nextSlotDate}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-blue-600" />
                    Slot Time:
                  </span>
                  <span className="font-bold text-slate-900">
                    {nextSlotTime} (IST)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Video className="h-3.5 w-3.5 text-emerald-600" />
                    Platform:
                  </span>
                  <span className="font-semibold text-slate-700">
                    Live Google Meet
                  </span>
                </div>
              </div>

              {/* What happens in the demo */}
              <div className="space-y-2 text-xs">
                <span className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
                  Included in your Free Demo:
                </span>
                <ul className="space-y-1.5 text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Real-time voice &amp; pacing diagnostic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Feedback on your upcoming pitch or talk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Custom roadmap tailored to your timeline</span>
                  </li>
                </ul>
              </div>

              {/* Primary CTA */}
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-md hover:bg-blue-700 transition-all active:scale-98"
              >
                <span>Book Free 1:1 Demo</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <p className="text-center text-[11px] text-slate-400">
                No credit card required &bull; 100% confidential
              </p>
            </div>

            {/* Need Help Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <span>Not sure which mentor is right?</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Our coaching advisor can match you with the right industry mentor in under 5 minutes.
              </p>
              <a
                href="mailto:support@articulatex.in"
                className="inline-block text-blue-600 font-semibold hover:underline text-[11px]"
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
