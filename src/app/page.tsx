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
  ArrowUpRight,
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

  // Practice switcher tab (like articulatex.in)
  const [activePersona, setActivePersona] = useState<"founder" | "leader" | "professional">(
    "founder"
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
    <div className="min-h-screen flex flex-col bg-[#0b0f1b] text-[#f4f6ff] selection:bg-[#7ca0ff]/30 selection:text-white">
      <Navbar
        onQuickBook={() => {
          const first = mentors[0];
          if (first) handleOpenBooking(first);
        }}
        onOpenDesignSystem={() => setIsDesignTokensOpen(true)}
      />

      {/* Atmospheric Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Subtle radial glow */}
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[650px] rounded-full bg-gradient-to-tr from-[#7ca0ff]/15 via-[#aa8cff]/10 to-transparent blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#273044] bg-[#121828]/80 px-4 py-1.5 font-mono text-xs text-[#aab3c7] backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 rounded-full bg-[#7ca0ff] animate-pulse" />
            <span>Courses &bull; Individual coaching &bull; Team workshops</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.02] max-w-5xl mx-auto">
            Public speaking{" "}
            <span className="text-[#7ca0ff]">coaching.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#aab3c7] max-w-2xl mx-auto leading-relaxed">
            Live 1:1 public speaking coaching with industry mentors, for
            professionals, founders, teams and students. From Um to Unmissable.
          </p>

          {/* Dual Pill Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#mentors-directory"
              className="inline-flex items-center gap-2 rounded-full bg-[#f4f6ff] px-7 py-3.5 text-sm font-semibold text-[#0b0f1b] shadow-xl transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Mentors</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <button
              onClick={() => handleOpenBooking(mentors[0])}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-[#f4f6ff] backdrop-blur-md transition-all hover:bg-white/10"
            >
              <Video className="h-4 w-4 text-[#7ca0ff]" />
              <span>Book Free Demo Class ↗</span>
            </button>
          </div>

          {/* Location radar dots (from articulatex.in) */}
          <div className="mt-14 flex items-center justify-center gap-6 sm:gap-10 font-mono text-[11px] text-[#aab3c7]/60 tracking-wider uppercase">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              MUMBAI
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7ca0ff]" />
              LONDON
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#aa8cff]" />
              NEW YORK
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              SINGAPORE
            </span>
          </div>
        </div>
      </section>

      {/* Signature Bento Cards (Exact styling from articulatex.in) */}
      <section className="py-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 01: Signal Orange */}
          <div className="rounded-3xl bg-[#ff3300] p-6 text-white flex flex-col justify-between min-h-[220px] shadow-2xl transition-transform hover:-translate-y-1">
            <div className="font-mono text-xs opacity-80">01 / PRESENCE</div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                Executive presence
              </h3>
              <p className="text-xs opacity-90 mt-2 leading-relaxed">
                Walk into boardrooms and high-stakes meetings with unshakeable authority.
              </p>
            </div>
          </div>

          {/* Card 02: Electric Violet */}
          <div className="rounded-3xl bg-[#4a00ff] p-6 text-white flex flex-col justify-between min-h-[220px] shadow-2xl transition-transform hover:-translate-y-1">
            <div className="font-mono text-xs opacity-80">02 / FUNDRAISING</div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                The founder pitch
              </h3>
              <p className="text-xs opacity-90 mt-2 leading-relaxed">
                Tear apart dry slides and pitch vision with investor-grade conviction.
              </p>
            </div>
          </div>

          {/* Card 03: Inverted White Ink */}
          <div className="rounded-3xl bg-[#f4f6ff] p-6 text-[#0b0f1b] flex flex-col justify-between min-h-[220px] shadow-2xl transition-transform hover:-translate-y-1">
            <div className="font-mono text-xs text-[#0b0f1b]/60">03 / MASTERY</div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                Speak with clarity
              </h3>
              <p className="text-xs text-[#0b0f1b]/70 mt-2 leading-relaxed">
                Eliminate filler words (&apos;um&apos;, &apos;like&apos;) and master diaphragmatic breathing.
              </p>
            </div>
          </div>

          {/* Card 04: Dark Midnight Surface */}
          <div className="rounded-3xl border border-[#273044] bg-[#121828] p-6 text-[#f4f6ff] flex flex-col justify-between min-h-[220px] shadow-2xl transition-transform hover:-translate-y-1">
            <div className="font-mono text-xs text-[#7ca0ff]">04 / STAGE</div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                Leading the room
              </h3>
              <p className="text-xs text-[#aab3c7] mt-2 leading-relaxed">
                Captivate hundreds in auditoriums without relying on slide crutches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Practice Switcher: Founder · Team leader · Professional */}
      <section className="py-12 border-y border-[#273044] bg-[#111525]/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#7ca0ff]">
                What you practise
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-[#f4f6ff] mt-1">
                Customized for your stage of leadership
              </h2>
            </div>

            {/* Persona Switcher Tabs */}
            <div className="inline-flex rounded-full border border-[#273044] bg-[#0b0f1b] p-1 text-xs font-mono">
              <button
                onClick={() => setActivePersona("founder")}
                className={`rounded-full px-4 py-2 transition-all ${
                  activePersona === "founder"
                    ? "bg-[#f4f6ff] text-[#0b0f1b] font-bold shadow-sm"
                    : "text-[#aab3c7] hover:text-white"
                }`}
              >
                Founder
              </button>
              <button
                onClick={() => setActivePersona("leader")}
                className={`rounded-full px-4 py-2 transition-all ${
                  activePersona === "leader"
                    ? "bg-[#f4f6ff] text-[#0b0f1b] font-bold shadow-sm"
                    : "text-[#aab3c7] hover:text-white"
                }`}
              >
                Team Leader
              </button>
              <button
                onClick={() => setActivePersona("professional")}
                className={`rounded-full px-4 py-2 transition-all ${
                  activePersona === "professional"
                    ? "bg-[#f4f6ff] text-[#0b0f1b] font-bold shadow-sm"
                    : "text-[#aab3c7] hover:text-white"
                }`}
              >
                Professional
              </button>
            </div>
          </div>

          {/* Dynamic Persona Content */}
          <div className="rounded-3xl border border-[#273044] bg-[#121828] p-8 shadow-xl">
            {activePersona === "founder" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-[#f4f6ff]">
                    Investor Pitch Decks
                  </h4>
                  <p className="text-xs text-[#aab3c7] mt-1.5 leading-relaxed">
                    Convert dense traction metrics and technical architecture into an emotional hook in the first 90 seconds.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#f4f6ff]">
                    Tough Partner Q&amp;A
                  </h4>
                  <p className="text-xs text-[#aab3c7] mt-1.5 leading-relaxed">
                    How to respond when VC partners challenge your unit economics without sounding defensive.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#f4f6ff]">
                    All-Hands &amp; Vision
                  </h4>
                  <p className="text-xs text-[#aab3c7] mt-1.5 leading-relaxed">
                    Rally engineering, product, and sales around ambitious quarterly OKRs with inspirational cadence.
                  </p>
                </div>
              </div>
            )}

            {activePersona === "leader" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-[#f4f6ff]">
                    Boardroom Alignment
                  </h4>
                  <p className="text-xs text-[#aab3c7] mt-1.5 leading-relaxed">
                    Deliver bottom-line-up-front (BLUF) recommendations in 3 minutes so directors make instant decisions.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#f4f6ff]">
                    Cross-Functional Influence
                  </h4>
                  <p className="text-xs text-[#aab3c7] mt-1.5 leading-relaxed">
                    Gain consensus across product, engineering, and finance without relying on formal hierarchical authority.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#f4f6ff]">
                    Crisis Communication
                  </h4>
                  <p className="text-xs text-[#aab3c7] mt-1.5 leading-relaxed">
                    Keep your team calm, focused, and steady when handling outages, delayed ship dates, or restructuring.
                  </p>
                </div>
              </div>
            )}

            {activePersona === "professional" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-[#f4f6ff]">
                    High-Stakes Interviews
                  </h4>
                  <p className="text-xs text-[#aab3c7] mt-1.5 leading-relaxed">
                    Ace Staff+, Director, and VP behavioral and architecture interviews with structured, crisp storytelling.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#f4f6ff]">
                    Eliminating Stage Fright
                  </h4>
                  <p className="text-xs text-[#aab3c7] mt-1.5 leading-relaxed">
                    Master proven somatic breathing exercises to reset your nervous system 60 seconds before speaking.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#f4f6ff]">
                    Conquering Monotone &amp; Fillers
                  </h4>
                  <p className="text-xs text-[#aab3c7] mt-1.5 leading-relaxed">
                    Break habitual filler words and speak with warm vocal variety and intentional pauses.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Mentor Directory Section */}
      <section
        id="mentors-directory"
        className="py-16 sm:py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#7ca0ff] mb-2">
              <Users className="h-3.5 w-3.5" />
              <span>Discover Your Mentor</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal text-[#f4f6ff] tracking-tight">
              Your next big moment deserves{" "}
              <span className="text-[#aab3c7]">practice.</span>
            </h2>
            <p className="text-sm text-[#aab3c7] mt-2 max-w-xl">
              Browse vetted communication coaches with deep industry backgrounds.
              Every mentor offers a free 30-minute diagnostic session.
            </p>
          </div>
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
          /* Empty State */
          <div className="rounded-3xl border border-dashed border-[#273044] bg-[#121828] p-12 text-center shadow-2xl max-w-xl mx-auto my-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0b0f1b] text-[#7ca0ff] mb-4">
              <SearchX className="h-7 w-7" />
            </div>
            <h3 className="text-lg font-semibold text-[#f4f6ff]">
              No mentors match your exact filters
            </h3>
            <p className="text-xs text-[#aab3c7] mt-1.5 max-w-md mx-auto leading-relaxed">
              We couldn&apos;t find any coaches matching that filter combination. Try
              resetting or searching broader keywords like &ldquo;Pitching&rdquo; or
              &ldquo;Executive&rdquo;.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f6ff] px-5 py-2.5 text-xs font-semibold text-[#0b0f1b] shadow-md hover:bg-white transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Testimonials & Core Philosophy Statement */}
      <section id="testimonials" className="border-t border-[#273044] bg-[#111525]/70 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl text-[#7ca0ff] font-serif leading-none block mb-4">
            &ldquo;
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-normal text-[#f4f6ff] leading-tight tracking-tight">
            The goal isn&apos;t to sound like everyone else. —{" "}
            <span className="text-[#7ca0ff]">It&apos;s to be unmistakably you.</span>
          </h2>
          <p className="text-sm font-mono text-[#aab3c7] mt-6">
            Real outcomes from verified learners
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
            <div className="rounded-3xl border border-[#273044] bg-[#121828] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[#aab3c7] leading-relaxed italic mb-4">
                  &ldquo;Priya rebuilt our pitch narrative from the ground up. We had been
                  struggling to convey our technical defensibility. We closed our $2.4M seed
                  round three weeks later.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#273044]">
                <div className="relative h-9 w-9 rounded-full overflow-hidden bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Karan M."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#f4f6ff]">Karan Malhotra</h4>
                  <p className="text-[10px] font-mono text-[#aab3c7]/60">Founder, Kinetix AI (YC S24)</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#273044] bg-[#121828] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[#aab3c7] leading-relaxed italic mb-4">
                  &ldquo;Marcus took my 40-slide academic research presentation and turned it
                  into a keynote that received a standing ovation at Web Summit. I didn&apos;t
                  know I had that presence inside me.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#273044]">
                <div className="relative h-9 w-9 rounded-full overflow-hidden bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
                    alt="Dr. Elena R."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#f4f6ff]">Dr. Elena Rostova</h4>
                  <p className="text-[10px] font-mono text-[#aab3c7]/60">Chief Science Officer, NeuraBiome</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#273044] bg-[#121828] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-[#aab3c7] leading-relaxed italic mb-4">
                  &ldquo;I used to run out of breath and freeze during executive town halls.
                  Kavita diagnosed my diaphragmatic breath pattern in 10 minutes. The difference
                  was immediate.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#273044]">
                <div className="relative h-9 w-9 rounded-full overflow-hidden bg-slate-800">
                  <Image
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
                    alt="Rohan G."
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#f4f6ff]">Rohan Gupta</h4>
                  <p className="text-[10px] font-mono text-[#aab3c7]/60">Product Lead, Swiggy</p>
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
