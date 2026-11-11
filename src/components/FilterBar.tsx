"use client";

import { Search, X, RotateCcw } from "lucide-react";
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
    <div className="space-y-5">
      {/* Search Input & Secondary Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search mentors by name, firm, or focus (e.g. 'Priya', 'pitch', 'VC')..."
            className="w-full rounded-xl border border-foreground/15 bg-background py-2.5 pl-10 pr-9 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none transition-colors font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
              aria-label="Clear search input"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Secondary Select Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Industry */}
          <select
            value={selectedIndustry}
            onChange={(e) => onIndustryChange(e.target.value)}
            className="rounded-xl border border-foreground/15 bg-background px-3 py-2.5 text-xs font-mono text-foreground focus:border-foreground focus:outline-none cursor-pointer"
          >
            <option value="All">All Industries</option>
            {industries.map((ind) => (
              <option key={ind} value={ind} className="bg-background text-foreground">
                {ind}
              </option>
            ))}
          </select>

          {/* Language */}
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="rounded-xl border border-foreground/15 bg-background px-3 py-2.5 text-xs font-mono text-foreground focus:border-foreground focus:outline-none cursor-pointer"
          >
            <option value="All">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang} className="bg-background text-foreground">
                {lang}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) =>
              onSortByChange(e.target.value as "recommended" | "rating" | "experience")
            }
            className="rounded-xl border border-foreground/15 bg-background px-3 py-2.5 text-xs font-mono text-foreground focus:border-foreground focus:outline-none cursor-pointer"
          >
            <option value="recommended">Featured</option>
            <option value="rating">Top Rated (★ 5.0)</option>
            <option value="experience">Experience</option>
          </select>
        </div>
      </div>

      {/* 1-Click Horizontal Focus Area Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onFocusAreaChange("All")}
          className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-mono transition-all ${
            selectedFocusArea === "All"
              ? "border border-foreground bg-secondary text-foreground font-semibold shadow-sm"
              : "border border-foreground/15 bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30"
          }`}
        >
          All Focus Areas
        </button>

        {focusAreas.map((fa) => {
          const isSelected = selectedFocusArea === fa;
          return (
            <button
              key={fa}
              onClick={() => onFocusAreaChange(isSelected ? "All" : fa)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-mono transition-all ${
                isSelected
                  ? "border border-foreground bg-secondary text-foreground font-semibold shadow-sm"
                  : "border border-foreground/15 bg-card text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {fa}
            </button>
          );
        })}
      </div>

      {/* Results Count & Clear Button */}
      <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-1">
        <div>
          Showing <span className="font-semibold text-foreground">{filteredCount}</span> of{" "}
          {totalCount} mentors
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs text-foreground hover:underline transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
