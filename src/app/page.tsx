"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  SearchX,
  RotateCcw,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MentorCard } from "@/components/MentorCard";
import { FilterBar } from "@/components/FilterBar";
import { BookingModal } from "@/components/BookingModal";
import { DesignTokensModal } from "@/components/DesignTokensModal";
import { AnimatedSphere } from "@/components/AnimatedSphere";
import {
  mentors,
  getUniqueIndustries,
  getUniqueFocusAreas,
  getUniqueLanguages,
  filterMentors,
} from "@/lib/mentors";
import { Mentor } from "@/types";

const rotatingWords = ["pitching", "keynotes", "boardrooms", "all-hands", "interviews"];

export function MethodDiagram1() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-28 text-foreground opacity-70">
      <circle cx="50" cy="60" r="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="50" cy="60" r="16" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
      <line x1="78" y1="60" x2="130" y2="60" stroke="currentColor" strokeWidth="1.5" />
      <polygon points="128,56 138,60 128,64" fill="currentColor" />
      <rect x="140" y="36" width="48" height="48" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="148" y1="52" x2="180" y2="52" stroke="currentColor" strokeWidth="1.5" />
      <line x1="148" y1="60" x2="172" y2="60" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
      <line x1="148" y1="68" x2="164" y2="68" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    </svg>
  );
}

export function MethodDiagram2() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-28 text-foreground opacity-70">
      <path d="M 20 60 Q 60 15 100 60 T 180 60" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 20 60 Q 60 90 100 60 T 180 60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
      <circle cx="100" cy="60" r="5" fill="currentColor" />
      <line x1="100" y1="20" x2="100" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      <circle cx="60" cy="37" r="3" fill="currentColor" />
      <circle cx="140" cy="37" r="3" fill="currentColor" />
    </svg>
  );
}

export function MethodDiagram3() {
  return (
    <svg viewBox="0 0 200 120" className="w-full h-28 text-foreground opacity-70">
      <polygon points="100,20 160,95 40,95" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <polygon points="100,45 135,90 65,90" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="20" r="4" fill="currentColor" />
      <circle cx="160" cy="95" r="4" fill="currentColor" />
      <circle cx="40" cy="95" r="4" fill="currentColor" />
      <line x1="100" y1="20" x2="100" y2="95" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
    </svg>
  );
}

export default function HomePage() {
  const [wordIndex, setWordIndex] = useState(0);

  // Rotating words effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

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
    <main className="relative min-h-screen overflow-x-hidden noise-overlay bg-background text-foreground">
      <Navbar
        onQuickBook={() => {
          const first = mentors[0];
          if (first) handleOpenBooking(first);
        }}
        onOpenDesignSystem={() => setIsDesignTokensOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden pt-36 pb-20 border-b border-foreground/10">
        {/* Animated ASCII Canvas Sphere in the background */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[550px] lg:w-[800px] lg:h-[800px] opacity-40 pointer-events-none">
          <AnimatedSphere />
        </div>

        {/* Subtle grid lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {[...Array(6)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute h-px bg-foreground/10"
              style={{
                top: `${16.6 * (i + 1)}%`,
                left: 0,
                right: 0,
              }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute w-px bg-foreground/10"
              style={{
                left: `${10 * (i + 1)}%`,
                top: 0,
                bottom: 0,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          {/* Eyebrow */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground">
              <span className="w-8 h-px bg-foreground/30" />
              The 1:1 Executive Speaking Platform
            </span>
          </div>

          {/* Monumental Headline */}
          <div className="max-w-4xl mb-8">
            <h1 className="text-[clamp(3.2rem,8.5vw,7.5rem)] font-display leading-[0.92] tracking-tight text-foreground">
              Master high-stakes
              <br />
              speaking for{" "}
              <span className="text-stroke font-display italic">
                {rotatingWords[wordIndex]}
              </span>
              .
            </h1>
          </div>

          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-12 font-sans">
            Personalized, rigorous 1:1 coaching with former venture partners, TEDx curators,
            and executive broadcasters. Eliminate hesitation, command attention, and speak
            with unmistakable presence.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#mentors-directory"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/30 bg-background hover:bg-secondary px-8 py-4 text-sm font-medium text-foreground shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Explore Faculty</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background px-7 py-4 text-sm font-mono text-foreground hover:bg-foreground/5 hover:border-foreground transition-all"
            >
              <span>The 3-Step Method</span>
            </a>
          </div>

          {/* Metrics Ticker */}
          <div className="mt-24 pt-10 border-t border-foreground/10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <span className="font-mono text-xs text-muted-foreground uppercase block mb-1">
                Sessions Delivered
              </span>
              <span className="font-display text-4xl lg:text-5xl text-foreground">12,400+</span>
            </div>
            <div>
              <span className="font-mono text-xs text-muted-foreground uppercase block mb-1">
                Average Rating
              </span>
              <div className="flex items-center gap-2">
                <span className="font-display text-4xl lg:text-5xl text-foreground">4.99</span>
                <Star className="h-5 w-5 fill-amber-500 text-amber-500" />
              </div>
            </div>
            <div>
              <span className="font-mono text-xs text-muted-foreground uppercase block mb-1">
                Founder Retention
              </span>
              <span className="font-display text-4xl lg:text-5xl text-foreground">98%</span>
            </div>
            <div>
              <span className="font-mono text-xs text-muted-foreground uppercase block mb-1">
                Initial Diagnostic
              </span>
              <span className="font-display text-4xl lg:text-5xl text-foreground">Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* The 3-Step Method Section */}
      <section id="how-it-works" className="py-28 lg:py-36 border-b border-foreground/10 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="max-w-3xl mb-16 lg:mb-20">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
              <span className="w-8 h-px bg-foreground/30" />
              The Architecture
            </span>
            <h2 className="font-display text-4xl lg:text-6xl tracking-tight text-foreground">
              A structured rehearsal loop built for real pressure.
            </h2>
            <p className="text-lg text-muted-foreground mt-4 leading-relaxed font-sans">
              Unlike generic public speaking courses, every session is private, conversational,
              and engineered around your exact upcoming presentation or pitch.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 rounded-2xl overflow-hidden">
            <div className="bg-card p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase block mb-4">
                  01 / DIAGNOSTIC
                </span>
                <h3 className="font-display text-3xl text-foreground mb-3">
                  30-Min Vocal & Cognitive Audit
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 font-sans">
                  Your coach evaluates subconscious hesitation markers, vocal pacing, tone
                  modulation, and executive posture under simulated scrutiny.
                </p>
              </div>
              <MethodDiagram1 />
            </div>

            <div className="bg-card p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase block mb-4">
                  02 / REHEARSAL
                </span>
                <h3 className="font-display text-3xl text-foreground mb-3">
                  Targeted High-Stakes Dry Runs
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 font-sans">
                  Rehearse slide-by-slide or answer-by-answer. Receive immediate feedback on
                  pregnant pauses, body language, and Q&amp;A deflection tactics.
                </p>
              </div>
              <MethodDiagram2 />
            </div>

            <div className="bg-card p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase block mb-4">
                  03 / MASTERY
                </span>
                <h3 className="font-display text-3xl text-foreground mb-3">
                  Permanent Speech Frameworks
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-8 font-sans">
                  Leave with customized rhetorical scaffolds, diaphragmatic breathing routines,
                  and authentic leadership gravitas that stays with you forever.
                </p>
              </div>
              <MethodDiagram3 />
            </div>
          </div>
        </div>
      </section>

      {/* Main Mentor Directory Section */}
      <section
        id="mentors-directory"
        className="py-28 lg:py-36 max-w-7xl mx-auto px-6 lg:px-12 w-full"
      >
        <div className="max-w-3xl mb-14">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-4">
            <span className="w-8 h-px bg-foreground/30" />
            Faculty &amp; Mentors
          </span>
          <h2 className="font-display text-4xl lg:text-6xl tracking-tight text-foreground">
            World-Class Communication Coaches
          </h2>
          <p className="text-lg text-muted-foreground mt-3 font-sans">
            Every mentor has vetted industry experience in leadership, investment, or media.
            Select your discipline to begin with a complimentary 30-minute diagnostic session.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mb-14">
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

        {/* Mentors Grid */}
        {filteredMentors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMentors.map((mentor, idx) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                index={idx + 1}
                onBookDemo={handleOpenBooking}
              />
            ))}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="rounded-2xl border border-dashed border-foreground/20 bg-card p-12 text-center max-w-lg mx-auto my-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground mb-4">
              <SearchX className="h-6 w-6" />
            </div>
            <h3 className="font-display text-2xl text-foreground">
              No mentors match your selected filters
            </h3>
            <p className="text-xs font-mono text-muted-foreground mt-2 max-w-sm mx-auto leading-relaxed">
              Try adjusting your focus area or industry filter, or search for broader keywords.
            </p>
            <div className="mt-6 flex items-center justify-center">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 rounded-full border border-foreground/30 bg-background hover:bg-secondary px-5 py-2.5 text-xs font-mono text-foreground shadow-sm transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset all filters</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Verified Outcomes & Editorial Testimonials */}
      <section id="testimonials" className="py-28 lg:py-36 border-t border-foreground/10 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-16">
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              Proven Outcomes
            </span>
            <div className="flex-1 h-px bg-foreground/10" />
            <span className="font-mono text-xs text-foreground">
              Verified Feedback
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-foreground/10 bg-card p-8 lg:p-10 flex flex-col justify-between hover-lift shadow-sm">
              <div>
                <span className="font-mono text-xs text-foreground uppercase block mb-3 font-semibold">
                  + Raised $2.4M Seed Round
                </span>
                <p className="font-serif italic text-base lg:text-lg text-foreground/90 leading-relaxed mb-6">
                  &ldquo;Priya rebuilt our pitch narrative from the ground up. We had been
                  struggling to convey our defensibility. We closed our round three weeks
                  later.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-foreground/10">
                <div className="relative h-11 w-11 rounded-full overflow-hidden bg-secondary shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Karan M."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">Karan Malhotra</h4>
                  <p className="text-xs font-mono text-muted-foreground">Founder, Kinetix AI (YC S24)</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-card p-8 lg:p-10 flex flex-col justify-between hover-lift shadow-sm">
              <div>
                <span className="font-mono text-xs text-foreground uppercase block mb-3 font-semibold">
                  + Standing Ovation at Web Summit
                </span>
                <p className="font-serif italic text-base lg:text-lg text-foreground/90 leading-relaxed mb-6">
                  &ldquo;Marcus turned my 40-slide academic research presentation into a
                  keynote that commanded 4,000 attendees. The feedback was extraordinary.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-foreground/10">
                <div className="relative h-11 w-11 rounded-full overflow-hidden bg-secondary shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                    alt="Dr. Elena R."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">Dr. Elena Rostova</h4>
                  <p className="text-xs font-mono text-muted-foreground">Chief Science Officer, NeuraBiome</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-foreground/10 bg-card p-8 lg:p-10 flex flex-col justify-between hover-lift shadow-sm">
              <div>
                <span className="font-mono text-xs text-foreground uppercase block mb-3 font-semibold">
                  + Mastered Executive Town Halls
                </span>
                <p className="font-serif italic text-base lg:text-lg text-foreground/90 leading-relaxed mb-6">
                  &ldquo;I used to lose my breath and freeze during executive reviews. Kavita
                  diagnosed my diaphragmatic breath pattern in 10 minutes. The shift was
                  immediate.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4 border-t border-foreground/10">
                <div className="relative h-11 w-11 rounded-full overflow-hidden bg-secondary shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                    alt="Rohan G."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-foreground">Rohan Gupta</h4>
                  <p className="text-xs font-mono text-muted-foreground">Product Lead, Swiggy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Editorial Call to Action */}
      <section className="py-28 lg:py-36 border-t border-foreground/10 bg-background text-center">
        <div className="max-w-4xl mx-auto px-6">
          <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase block mb-4">
            // Begin Your Transformation
          </span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl text-foreground tracking-tight mb-6">
            Ready to command your next stage?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 font-sans leading-relaxed">
            Book a complimentary 30-minute diagnostic session with any of our verified faculty
            mentors. Zero pressure, pure actionable insight.
          </p>
          <button
            onClick={() => {
              const first = mentors[0];
              if (first) handleOpenBooking(first);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-foreground/30 bg-background hover:bg-secondary px-8 py-4 text-sm font-medium text-foreground shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Book Your Free Diagnostic</span>
            <ArrowRight className="h-4 w-4" />
          </button>
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
    </main>
  );
}
