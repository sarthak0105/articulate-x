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
    <div className="space-y-4">
      {/* Search Bar & Secondary Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8290ab]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by mentor name, firm, or focus (e.g. 'Priya', 'pitch', 'VC')..."
            className="w-full rounded-xl border border-[#222b3e] bg-[#121828] py-2.5 pl-10 pr-9 text-xs sm:text-sm text-[#f8fafc] placeholder:text-[#8290ab] focus:border-[#7ca0ff] focus:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8290ab] hover:text-[#f8fafc] p-0.5"
              aria-label="Clear search input"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Secondary Filters: Industry, Language & Sort */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Industry */}
          <select
            value={selectedIndustry}
            onChange={(e) => onIndustryChange(e.target.value)}
            className="rounded-xl border border-[#222b3e] bg-[#121828] px-3 py-2.5 text-xs text-[#cbd5e1] focus:border-[#7ca0ff] focus:outline-none cursor-pointer"
          >
            <option value="All">All Industries</option>
            {industries.map((ind) => (
              <option key={ind} value={ind} className="bg-[#121828] text-[#f8fafc]">
                {ind}
              </option>
            ))}
          </select>

          {/* Language */}
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="rounded-xl border border-[#222b3e] bg-[#121828] px-3 py-2.5 text-xs text-[#cbd5e1] focus:border-[#7ca0ff] focus:outline-none cursor-pointer"
          >
            <option value="All">All Languages</option>
            {languages.map((lang) => (
              <option key={lang} value={lang} className="bg-[#121828] text-[#f8fafc]">
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
            className="rounded-xl border border-[#222b3e] bg-[#121828] px-3 py-2.5 text-xs text-[#cbd5e1] focus:border-[#7ca0ff] focus:outline-none cursor-pointer"
          >
            <option value="recommended">Featured First</option>
            <option value="rating">Top Rated (★ 5.0)</option>
            <option value="experience">Experience</option>
          </select>
        </div>
      </div>

      {/* Horizontal Focus Area Pills Rail (1-Click Filters) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onFocusAreaChange("All")}
          className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
            selectedFocusArea === "All"
              ? "bg-[#f8fafc] text-[#0b0f1b] shadow-sm"
              : "border border-[#222b3e] bg-[#121828] text-[#94a3b8] hover:text-[#f8fafc] hover:border-[#33415c]"
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
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                isSelected
                  ? "bg-[#7ca0ff] text-[#0b0f1b] font-semibold shadow-sm"
                  : "border border-[#222b3e] bg-[#121828] text-[#94a3b8] hover:text-[#f8fafc] hover:border-[#33415c]"
              }`}
            >
              {fa}
            </button>
          );
        })}
      </div>

      {/* Results Count & Clear All */}
      <div className="flex items-center justify-between text-xs text-[#8290ab] pt-1">
        <div>
          Showing <span className="font-semibold text-[#f8fafc]">{filteredCount}</span> of{" "}
          {totalCount} mentors
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs text-[#7ca0ff] hover:text-[#9db7ff] transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
