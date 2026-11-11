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
    <div className="w-full rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm space-y-4">
      {/* Top Row: Search Input + Sort Selection */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <label htmlFor="search-input" className="sr-only">
            Search mentors by name, company, or specialty
          </label>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by mentor name, firm, topic (e.g. 'Priya', 'pitch', 'VC')..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              aria-label="Clear search input"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="sort-select" className="text-xs font-medium text-slate-500">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) =>
              onSortByChange(e.target.value as "recommended" | "rating" | "experience")
            }
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none cursor-pointer"
          >
            <option value="recommended">Recommended &amp; Featured</option>
            <option value="rating">Highest Rated (★ 5.0)</option>
            <option value="experience">Most Experienced (Yrs)</option>
          </select>
        </div>
      </div>

      {/* Middle Row: Primary Filter Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {/* Industry Filter */}
        <div>
          <label
            htmlFor="filter-industry"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
          >
            Industry
          </label>
          <select
            id="filter-industry"
            value={selectedIndustry}
            onChange={(e) => onIndustryChange(e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-xs font-medium focus:border-blue-500 focus:outline-none transition-colors cursor-pointer ${
              selectedIndustry !== "All"
                ? "border-blue-500 bg-blue-50/50 text-blue-900 font-semibold"
                : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            <option value="All">All Industries</option>
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Focus Area Filter */}
        <div>
          <label
            htmlFor="filter-focus"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
          >
            Focus Area
          </label>
          <select
            id="filter-focus"
            value={selectedFocusArea}
            onChange={(e) => onFocusAreaChange(e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-xs font-medium focus:border-blue-500 focus:outline-none transition-colors cursor-pointer ${
              selectedFocusArea !== "All"
                ? "border-blue-500 bg-blue-50/50 text-blue-900 font-semibold"
                : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            <option value="All">All Focus Areas</option>
            {focusAreas.map((fa) => (
              <option key={fa} value={fa}>
                {fa}
              </option>
            ))}
          </select>
        </div>

        {/* Language Filter */}
        <div>
          <label
            htmlFor="filter-language"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5"
          >
            Language
          </label>
          <select
            id="filter-language"
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className={`w-full rounded-xl border px-3 py-2 text-xs font-medium focus:border-blue-500 focus:outline-none transition-colors cursor-pointer ${
              selectedLanguage !== "All"
                ? "border-blue-500 bg-blue-50/50 text-blue-900 font-semibold"
                : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            <option value="All">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bottom Bar: Active Filters Badges + Results Counter + Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 text-xs">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">
            Showing {filteredCount} of {totalCount} mentors
          </span>
          {filteredCount === 0 && (
            <span className="text-red-500 font-medium">(No matches found)</span>
          )}
        </div>

        {/* Active Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {selectedIndustry !== "All" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100/70 px-2.5 py-0.5 font-medium text-blue-800">
              Industry: {selectedIndustry}
              <button
                onClick={() => onIndustryChange("All")}
                className="hover:text-blue-950 p-0.5"
                aria-label="Remove industry filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {selectedFocusArea !== "All" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100/70 px-2.5 py-0.5 font-medium text-blue-800">
              Focus: {selectedFocusArea}
              <button
                onClick={() => onFocusAreaChange("All")}
                className="hover:text-blue-950 p-0.5"
                aria-label="Remove focus area filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {selectedLanguage !== "All" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-100/70 px-2.5 py-0.5 font-medium text-blue-800">
              Lang: {selectedLanguage}
              <button
                onClick={() => onLanguageChange("All")}
                className="hover:text-blue-950 p-0.5"
                aria-label="Remove language filter"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 font-medium ml-1 transition-colors"
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
