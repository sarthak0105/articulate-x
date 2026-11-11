import mentorsData from "@/data/mentors.json";
import { Mentor, Industry, FocusArea, Language } from "@/types";

export const mentors: Mentor[] = mentorsData as Mentor[];

export function getAllMentors(): Mentor[] {
  return mentors;
}

export function getMentorById(id: string): Mentor | undefined {
  return mentors.find((m) => m.id === id);
}

export function getUniqueIndustries(): Industry[] {
  const industries = new Set<Industry>();
  mentors.forEach((m) => industries.add(m.industry));
  return Array.from(industries);
}

export function getUniqueFocusAreas(): FocusArea[] {
  const focusAreas = new Set<FocusArea>();
  mentors.forEach((m) => m.focusAreas.forEach((fa) => focusAreas.add(fa)));
  return Array.from(focusAreas);
}

export function getUniqueLanguages(): Language[] {
  const languages = new Set<Language>();
  mentors.forEach((m) => m.languages.forEach((lang) => languages.add(lang)));
  return Array.from(languages);
}

export interface FilterOptions {
  industry?: string;
  focusArea?: string;
  language?: string;
  search?: string;
  sortBy?: "recommended" | "rating" | "experience";
}

export function filterMentors(options: FilterOptions): Mentor[] {
  let result = [...mentors];

  if (options.industry && options.industry !== "All") {
    result = result.filter((m) => m.industry === options.industry);
  }

  if (options.focusArea && options.focusArea !== "All") {
    result = result.filter((m) => m.focusAreas.includes(options.focusArea as FocusArea));
  }

  if (options.language && options.language !== "All") {
    result = result.filter((m) => m.languages.includes(options.language as Language));
  }

  if (options.search && options.search.trim() !== "") {
    const q = options.search.toLowerCase().trim();
    result = result.filter(
      (m) =>
        m.name.toLowerCase().includes(q) ||
        m.title.toLowerCase().includes(q) ||
        m.company.toLowerCase().includes(q) ||
        m.industry.toLowerCase().includes(q) ||
        m.shortIntro.toLowerCase().includes(q) ||
        m.specialisms.some((s) => s.toLowerCase().includes(q)) ||
        m.focusAreas.some((fa) => fa.toLowerCase().includes(q))
    );
  }

  if (options.sortBy === "rating") {
    result.sort((a, b) => b.rating - a.rating);
  } else if (options.sortBy === "experience") {
    result.sort((a, b) => b.experienceYears - a.experienceYears);
  } else {
    // "recommended": featured first, then rating
    result.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.rating - a.rating;
    });
  }

  return result;
}
