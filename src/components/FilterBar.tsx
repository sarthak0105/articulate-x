"use client";

import { Search, X, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Industry, FocusArea, Language } from "@/types";

interface FilterBarProps {
  industries: Industry[];
  focusAreas: FocusArea[];
  languages: Language[];
  selectedIndustry: string;
  selectedFocusArea: string;
  selectedLanguage: string;
  searchQuery: string;
  sortBy: "recommended" | "rating" | "experience";
  totalCount: number;
  filteredCount: number;
  onIndustryChange: (val: string) => void;
  onFocusAreaChange: (val: string) => void;
  onLanguageChange: (val: string) => void;
  onSearchChange: (val: string) => void;
  onSortByChange: (val: "recommended" | "rating" | "experience") => void;
  onResetFilters: () => void;
}

export function FilterBar({
  industries,
  focusAreas,
  languages,
  selectedIndustry,
  selectedFocusArea,
  selectedLanguage,
  searchQuery,
  sortBy,
  totalCount,
  filteredCount,
  onIndustryChange,
  onFocusAreaChange,
  onLanguageChange,
  onSearchChange,
  onSortByChange,
  onResetFilters,
}: FilterBarProps) {
  const hasActiveFilters =
    selectedIndustry !== "All" ||
    selectedFocusArea !== "All" ||
    selectedLanguage !== "All" ||
    searchQuery.trim() !== "";

  return (
    <div className="w-full rounded-3xl border border-[#273044] bg-[#121828] p-5 shadow-xl space-y-4">
      {/* Top Row: Search Input + Sort Selection */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <label htmlFor="search-input" className="sr-only">
            Search mentors
          </label>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#aab3c7]/60" />
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by mentor name, firm, topic (e.g. 'Priya', 'pitch', 'VC')..."
            className="w-full rounded-full border border-[#273044] bg-[#0b0f1b] py-2.5 pl-10 pr-9 text-xs sm:text-sm text-[#f4f6ff] placeholder:text-[#aab3c7]/40 focus:border-[#7ca0ff] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#aab3c7] hover:text-[#f4f6ff] p-0.5"
              aria-label="Clear search input"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="sort-select" className="text-xs font-mono text-[#aab3c7]">
            Sort:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) =>
              onSortByChange(e.target.value as "recommended" | "rating" | "experience")
            }
            className="rounded-full border border-[#273044] bg-[#0b0f1b] px-3.5 py-2 text-xs font-medium text-[#f4f6ff] shadow-sm focus:border-[#7ca0ff] focus:outline-none cursor-pointer"
          >
            <option value="recommended">Featured Mentors</option>
            <option value="rating">Highest Rated (★ 5.0)</option>
            <option value="experience">Years of Experience</option>
          </select>
        </div>
      </div>

      {/* Middle Row: Primary Filter Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {/* Industry Filter */}
        <div>
          <label
            htmlFor="filter-industry"
            className="block text-[11px] font-mono uppercase tracking-wider text-[#aab3c7] mb-1.5"
          >
            Industry
          </label>
          <select
            id="filter-industry"
            value={selectedIndustry}
            onChange={(e) => onIndustryChange(e.target.value)}
            className={`w-full rounded-2xl border px-3 py-2 text-xs font-medium focus:border-[#7ca0ff] focus:outline-none transition-colors cursor-pointer ${
              selectedIndustry !== "All"
                ? "border-[#7ca0ff] bg-[#182035] text-[#7ca0ff] font-semibold"
                : "border-[#273044] bg-[#0b0f1b] text-[#f4f6ff]"
            }`}
          >
            <option value="All">All Industries</option>
            {industries.map((ind) => (
              <option key={ind} value={ind} className="bg-[#121828] text-[#f4f6ff]">
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Focus Area Filter */}
        <div>
          <label
            htmlFor="filter-focus"
            className="block text-[11px] font-mono uppercase tracking-wider text-[#aab3c7] mb-1.5"
          >
            Focus Area
          </label>
          <select
            id="filter-focus"
            value={selectedFocusArea}
            onChange={(e) => onFocusAreaChange(e.target.value)}
            className={`w-full rounded-2xl border px-3 py-2 text-xs font-medium focus:border-[#7ca0ff] focus:outline-none transition-colors cursor-pointer ${
              selectedFocusArea !== "All"
                ? "border-[#7ca0ff] bg-[#182035] text-[#7ca0ff] font-semibold"
                : "border-[#273044] bg-[#0b0f1b] text-[#f4f6ff]"
            }`}
          >
            <option value="All">All Focus Areas</option>
            {focusAreas.map((fa) => (
              <option key={fa} value={fa} className="bg-[#121828] text-[#f4f6ff]">
                {fa}
              </option>
            ))}
          </select>
        </div>

        {/* Language Filter */}
        <div>
          <label
            htmlFor="filter-language"
            className="block text-[11px] font-mono uppercase tracking-wider text-[#aab3c7] mb-1.5"
          >
            Language
          </label>
          <select
            id="filter-language"
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className={`w-full rounded-2xl border px-3 py-2 text-xs font-medium focus:border-[#7ca0ff] focus:outline-none transition-colors cursor-pointer ${
              selectedLanguage !== "All"
                ? "border-[#7ca0ff] bg-[#182035] text-[#7ca0ff] font-semibold"
                : "border-[#273044] bg-[#0b0f1b] text-[#f4f6ff]"
            }`}
          >
            <option value="All">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang} className="bg-[#121828] text-[#f4f6ff]">
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bottom Bar: Active Filters Badges + Results Counter + Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#273044]/70 pt-3 text-xs">
        <div className="flex items-center gap-2 font-mono text-[#aab3c7]">
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#7ca0ff]" />
          <span>
            Showing <strong className="text-[#f4f6ff]">{filteredCount}</strong> of{" "}
            {totalCount} mentors
          </span>
          {filteredCount === 0 && (
            <span className="text-[#ff3300] font-semibold">(No matches found)</span>
          )}
        </div>

        {/* Active Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {selectedIndustry !== "All" && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#7ca0ff]/40 bg-[#7ca0ff]/10 px-3 py-0.5 font-mono text-[11px] text-[#7ca0ff]">
              Industry: {selectedIndustry}
              <button
                onClick={() => onIndustryChange("All")}
                className="hover:text-white p-0.5"
                aria-label="Remove industry filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {selectedFocusArea !== "All" && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#7ca0ff]/40 bg-[#7ca0ff]/10 px-3 py-0.5 font-mono text-[11px] text-[#7ca0ff]">
              Focus: {selectedFocusArea}
              <button
                onClick={() => onFocusAreaChange("All")}
                className="hover:text-white p-0.5"
                aria-label="Remove focus area filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {selectedLanguage !== "All" && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#7ca0ff]/40 bg-[#7ca0ff]/10 px-3 py-0.5 font-mono text-[11px] text-[#7ca0ff]">
              Lang: {selectedLanguage}
              <button
                onClick={() => onLanguageChange("All")}
                className="hover:text-white p-0.5"
                aria-label="Remove language filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-[#aab3c7] hover:text-[#f4f6ff] font-mono text-[11px] ml-1 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              Reset all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
