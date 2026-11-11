"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  SearchX,
  RotateCcw,
  Video,
  CheckCircle2,
  Calendar,
  Layers,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MentorCard } from "@/components/MentorCard";
import { FilterBar } from "@/components/FilterBar";
import { BookingModal } from "@/components/BookingModal";
import { DesignTokensModal } from "@/components/DesignTokensModal";
import {
  mentors,
  getUniqueIndustries,
  getUniqueFocusAreas,
  getUniqueLanguages,
  filterMentors,
} from "@/lib/mentors";
import { Mentor } from "@/types";

export default function HomePage() {
  // Filter States
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const [selectedFocusArea, setSelectedFocusArea] = useState<string>("All");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"recommended" | "rating" | "experience">(
    "recommended"
  );

  // Modals
  const [selectedMentorForBooking, setSelectedMentorForBooking] =
    useState<Mentor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isDesignTokensOpen, setIsDesignTokensOpen] = useState(false);

  // Filter options lists
  const industries = useMemo(() => getUniqueIndustries(), []);
  const focusAreas = useMemo(() => getUniqueFocusAreas(), []);
  const languages = useMemo(() => getUniqueLanguages(), []);

  // Filtered mentors list
  const filteredMentors = useMemo(() => {
    return filterMentors({
      industry: selectedIndustry,
      focusArea: selectedFocusArea,
      language: selectedLanguage,
      search: searchQuery,
      sortBy,
    });
  }, [selectedIndustry, selectedFocusArea, selectedLanguage, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedIndustry("All");
    setSelectedFocusArea("All");
    setSelectedLanguage("All");
    setSearchQuery("");
    setSortBy("recommended");
  };

  const handleOpenBooking = (mentor: Mentor) => {
    setSelectedMentorForBooking(mentor);
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar
        onQuickBook={() => {
          const first = mentors[0];
          if (first) handleOpenBooking(first);
        }}
        onOpenDesignSystem={() => setIsDesignTokensOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200/80 bg-white py-16 sm:py-20 lg:py-24">
        {/* Decorative background grid and gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
              <span>Articulate X &bull; From Um to Unmissable</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
              Live 1:1 public speaking coaching with{" "}
              <span className="text-blue-600 underline decoration-blue-200 decoration-wavy underline-offset-4">
                industry mentors
              </span>
              .
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Sessions are live, never recorded lectures. Every learner gets a
              personalized plan designed for their role, whether pitching
              investors, addressing a boardroom, or speaking at a conference.
            </p>

            {/* Quick CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#mentors-directory"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-98"
              >
                <span>Find Your Mentor</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <button
                onClick={() => handleOpenBooking(mentors[0])}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Video className="h-4 w-4 text-emerald-600" />
                <span>Book Instant 30-min Demo</span>
              </button>

              <button
                onClick={() => setIsDesignTokensOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 px-3 py-2"
              >
                <Layers className="h-4 w-4 text-slate-400" />
                <span>View Design System Tokens</span>
              </button>
            </div>

            {/* Social Proof Stats */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
              <div>
                <div className="flex items-center gap-1 text-slate-900 font-extrabold text-2xl">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-500" />
                  <span>4.96</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Average Mentor Rating</p>
              </div>

              <div>
                <div className="text-slate-900 font-extrabold text-2xl">
                  1,200+
                </div>
                <p className="text-xs text-slate-500 mt-0.5">1:1 Coaching Hours</p>
              </div>

              <div>
                <div className="text-slate-900 font-extrabold text-2xl">
                  $120M+
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Raised by Coached Founders</p>
              </div>

              <div>
                <div className="flex items-center gap-1 text-emerald-600 font-extrabold text-2xl">
                  <ShieldCheck className="h-6 w-6" />
                  <span>100% Free</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">First 30-min Diagnostic</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-14 border-b border-slate-200/70 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              Simple 3-Step Journey
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
              How You Move From Um to Unmissable
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-mono font-bold text-base mb-4">
                01
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                Discover Your Industry Mentor
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter by your industry (VC, Tech, Consulting, Finance) and target focus area
                (pitching, executive presence, keynote, interviews).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-mono font-bold text-base mb-4">
                02
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                30-min Diagnostic Demo Session
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Book a live video slot. In 30 minutes, your mentor analyzes your speaking pace,
                filler words, and provides instant, actionable coaching.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-mono font-bold text-base mb-4">
                03
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2">
                Personalized Coaching Plan
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive a tailored action plan built around your real upcoming deadlines:
                investor pitches, town halls, or keynotes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Mentor Directory Section */}
      <section
        id="mentors-directory"
        className="py-14 sm:py-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              <Users className="h-3.5 w-3.5" />
              <span>Find A Mentor</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Mentor Directory &amp; Demo Booking
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Browse vetted communication coaches with deep industry backgrounds.
              Every mentor offers a free 30-minute demo.
            </p>
          </div>
        </div>

        {/* Filter Bar Component */}
        <div className="mb-8">
          <FilterBar
            industries={industries}
            focusAreas={focusAreas}
            languages={languages}
            selectedIndustry={selectedIndustry}
            selectedFocusArea={selectedFocusArea}
            selectedLanguage={selectedLanguage}
            searchQuery={searchQuery}
            sortBy={sortBy}
            totalCount={mentors.length}
            filteredCount={filteredMentors.length}
            onIndustryChange={setSelectedIndustry}
            onFocusAreaChange={setSelectedFocusArea}
            onLanguageChange={setSelectedLanguage}
            onSearchChange={setSearchQuery}
            onSortByChange={setSortBy}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Mentors Grid or Empty State */}
        {filteredMentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onBookDemo={handleOpenBooking}
              />
            ))}
          </div>
        ) : (
          /* Empty State (Optional #4 in requirements) */
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm max-w-xl mx-auto my-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-4">
              <SearchX className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No mentors match your exact filters
            </h3>
            <p className="text-xs text-slate-500 mt-1.5 max-w-md mx-auto leading-relaxed">
              We couldn&apos;t find any coaches matching your specific combination of
              industry, focus area, or keyword. Try resetting some filters or searching for
              broader terms like &ldquo;Pitching&rdquo; or &ldquo;Executive&rdquo;.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Testimonials / Learner Outcomes */}
      <section id="testimonials" className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Verified Learner Outcomes
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              &ldquo;From Um to Unmissable&rdquo; in Action
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Hear from founders, directors, and researchers who transformed their presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                  &ldquo;Priya rebuilt our pitch narrative from the ground up. We had been
                  struggling to convey our technical defensibility. We closed our $2.4M seed
                  round three weeks later.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                <div className="relative h-9 w-9 rounded-full overflow-hidden bg-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Karan M."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Karan Malhotra</h4>
                  <p className="text-[11px] text-slate-500">Founder, Kinetix AI (YC S24)</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                  &ldquo;Marcus took my 40-slide academic research presentation and turned it
                  into a keynote that received a standing ovation at Web Summit. I didn&apos;t
                  know I had that presence inside me.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                <div className="relative h-9 w-9 rounded-full overflow-hidden bg-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                    alt="Dr. Elena R."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Dr. Elena Rostova</h4>
                  <p className="text-[11px] text-slate-500">Chief Science Officer, NeuraBiome</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                  &ldquo;I used to run out of breath and freeze during executive town halls.
                  Kavita diagnosed my diaphragmatic breath pattern in 10 minutes. The difference
                  was immediate.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                <div className="relative h-9 w-9 rounded-full overflow-hidden bg-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                    alt="Rohan G."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Rohan Gupta</h4>
                  <p className="text-[11px] text-slate-500">Product Lead, Swiggy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Booking Modal */}
      <BookingModal
        mentor={selectedMentorForBooking}
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      {/* Design System & Tokens Inspector */}
      <DesignTokensModal
        isOpen={isDesignTokensOpen}
        onClose={() => setIsDesignTokensOpen(false)}
      />

      <Footer />
    </div>
  );
}
