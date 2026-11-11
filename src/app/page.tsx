"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Users,
  SearchX,
  RotateCcw,
  Video,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
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
    <div className="min-h-screen flex flex-col bg-[#0b0f1b] text-[#f8fafc]">
      <Navbar
        onQuickBook={() => {
          const first = mentors[0];
          if (first) handleOpenBooking(first);
        }}
        onOpenDesignSystem={() => setIsDesignTokensOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 border-b border-[#1c2438]">
        {/* Subtle radial aura */}
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[600px] rounded-full bg-[#7ca0ff]/10 blur-[130px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Subtle Category Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#222b3e] bg-[#121828] px-4 py-1.5 text-xs text-[#94a3b8] mb-8 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7ca0ff]" />
            <span>Live 1:1 Public Speaking Coaching &bull; Industry Mentors</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.08] text-[#f8fafc]">
            Master high-stakes speaking with{" "}
            <span className="text-[#7ca0ff]">world-class mentors.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#94a3b8] max-w-2xl mx-auto leading-relaxed">
            Personalized, live 1:1 coaching with former partners, keynote speakers, and
            executives. Eliminate hesitation, command attention, and speak with authentic
            conviction. From Um to Unmissable.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#mentors-directory"
              className="inline-flex items-center gap-2 rounded-full bg-[#f8fafc] px-7 py-3 text-sm font-semibold text-[#0b0f1b] shadow-lg transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Find Your Mentor</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-full border border-[#222b3e] bg-[#121828] px-6 py-3 text-sm font-medium text-[#cbd5e1] hover:text-white hover:border-[#33415c] transition-colors"
            >
              <span>How 1:1 Coaching Works</span>
            </a>
          </div>

          {/* Trust Metrics Bar */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-[#1c2438] max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-2xl font-semibold text-[#f8fafc]">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span>4.98</span>
              </div>
              <p className="text-xs text-[#8290ab] mt-1">Average Mentor Rating</p>
            </div>

            <div className="text-center">
              <div className="text-2xl font-semibold text-[#f8fafc]">
                1,200+
              </div>
              <p className="text-xs text-[#8290ab] mt-1">1:1 Coaching Sessions</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-2xl font-semibold text-emerald-400">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <span>100% Free</span>
              </div>
              <p className="text-xs text-[#8290ab] mt-1">Initial 30-min Diagnostic</p>
            </div>
          </div>
        </div>
      </section>

      {/* The 3-Step Method Section */}
      <section id="how-it-works" className="py-20 border-b border-[#1c2438] bg-[#0e1424]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7ca0ff]">
              The Method
            </span>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#f8fafc] mt-1 tracking-tight">
              A structured rehearsal loop built for high stakes
            </h2>
            <p className="text-sm text-[#94a3b8] mt-2">
              Unlike generic courses, every session is live, conversational, and tailored to
              your actual speaking deadline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-[#222b3e] bg-[#121828] p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#7ca0ff]">01 / DIAGNOSTIC</span>
                <h3 className="text-lg font-semibold text-[#f8fafc] mt-3 mb-2">
                  Live 30-min Assessment
                </h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Your mentor analyzes vocal pacing, cognitive structuring, and subconscious
                  filler words under live simulated pressure.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#222b3e] bg-[#121828] p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#7ca0ff]">02 / REHEARSAL</span>
                <h3 className="text-lg font-semibold text-[#f8fafc] mt-3 mb-2">
                  Targeted Dry Runs
                </h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Practice your upcoming investor pitch, keynote, or leadership interview with
                  real-time feedback on every pause, gesture, and answer.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#222b3e] bg-[#121828] p-7 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#7ca0ff]">03 / MASTERY</span>
                <h3 className="text-lg font-semibold text-[#f8fafc] mt-3 mb-2">
                  Personalized Roadmap
                </h3>
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Leave with actionable speech frameworks, diaphragmatic breathing routines,
                  and permanent communication confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Mentor Directory Section */}
      <section
        id="mentors-directory"
        className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7ca0ff]">
            Mentor Directory
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#f8fafc] mt-1 tracking-tight">
            Find the right mentor for your goals
          </h2>
          <p className="text-sm text-[#94a3b8] mt-2">
            Browse verified mentors with proven track records in your industry. Every mentor
            offers a free 30-minute diagnostic session.
          </p>
        </div>

        {/* Filter Bar */}
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

        {/* Mentors Grid or Clean Empty State */}
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
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-[#222b3e] bg-[#121828] p-12 text-center max-w-lg mx-auto my-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#0b0f1b] text-[#7ca0ff] mb-4">
              <SearchX className="h-6 w-6" />
            </div>
            <h3 className="text-base font-semibold text-[#f8fafc]">
              No mentors match your selected criteria
            </h3>
            <p className="text-xs text-[#8290ab] mt-1.5 max-w-sm mx-auto leading-relaxed">
              Try adjusting your focus area or industry filter, or search for broader keywords.
            </p>
            <div className="mt-6 flex items-center justify-center">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#f8fafc] px-5 py-2.5 text-xs font-semibold text-[#0b0f1b] hover:bg-white transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset all filters</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Verified Outcomes & Testimonials */}
      <section id="testimonials" className="py-20 border-t border-[#1c2438] bg-[#0e1424]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7ca0ff]">
            Learner Stories
          </span>
          <h2 className="text-2xl sm:text-4xl font-normal text-[#f8fafc] mt-2 tracking-tight">
            &ldquo;The goal isn&apos;t to sound like someone else. It&apos;s to be unmistakably you.&rdquo;
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            <div className="rounded-2xl border border-[#222b3e] bg-[#121828] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[#cbd5e1] leading-relaxed italic mb-4">
                  &ldquo;Priya rebuilt our pitch narrative from the ground up. We had been
                  struggling to convey our defensibility. We closed our $2.4M seed round three
                  weeks later.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#1c2438]">
                <div className="relative h-9 w-9 rounded-full overflow-hidden bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Karan M."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#f8fafc]">Karan Malhotra</h4>
                  <p className="text-[11px] text-[#8290ab]">Founder, Kinetix AI (YC S24)</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#222b3e] bg-[#121828] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[#cbd5e1] leading-relaxed italic mb-4">
                  &ldquo;Marcus turned my 40-slide academic research presentation into a
                  keynote that received a standing ovation at Web Summit. The feedback on my
                  delivery was incredible.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#1c2438]">
                <div className="relative h-9 w-9 rounded-full overflow-hidden bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                    alt="Dr. Elena R."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#f8fafc]">Dr. Elena Rostova</h4>
                  <p className="text-[11px] text-[#8290ab]">Chief Science Officer, NeuraBiome</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#222b3e] bg-[#121828] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[#cbd5e1] leading-relaxed italic mb-4">
                  &ldquo;I used to lose my breath and freeze during executive town halls.
                  Kavita diagnosed my diaphragmatic breath pattern in 10 minutes. The difference
                  was immediate.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#1c2438]">
                <div className="relative h-9 w-9 rounded-full overflow-hidden bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                    alt="Rohan G."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#f8fafc]">Rohan Gupta</h4>
                  <p className="text-[11px] text-[#8290ab]">Product Lead, Swiggy</p>
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
