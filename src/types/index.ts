export type Industry =
  | "Technology & AI"
  | "Venture Capital & Startups"
  | "Consulting & Strategy"
  | "Finance & Fintech"
  | "Healthcare & Biotech"
  | "Media & Entertainment";

export type FocusArea =
  | "Pitching & Fundraising"
  | "Executive Presence"
  | "Keynote & Storytelling"
  | "High-Stakes Interviews"
  | "Technical Communication"
  | "Crisis & Media Handling";

export type Language =
  | "English"
  | "Hindi"
  | "Spanish"
  | "French"
  | "Mandarin";

export interface Review {
  id: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  focusTopic: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: Industry;
  languages: Language[];
  focusAreas: FocusArea[];
  experienceYears: number;
  photo: string;
  badge?: string;
  shortIntro: string;
  bio: string[];
  industryBackground: string;
  specialisms: string[];
  coachingPillars: {
    title: string;
    description: string;
  }[];
  rating: number;
  reviewCount: number;
  sessionsDelivered: number;
  reviews: Review[];
  availableSlots: {
    date: string; // YYYY-MM-DD
    dayOfWeek: string; // "Thu", "Fri", etc.
    formattedDate: string; // "Nov 12"
    slots: string[]; // ["10:00 AM", "02:30 PM", "06:00 PM"]
  }[];
  featured?: boolean;
}

export interface BookingAssessment {
  currentRole: string;
  primaryGoal: string;
  upcomingEventTimeline: string;
  challengeDescription: string;
  fullName: string;
  email: string;
  phone: string;
}

export interface BookingRecord {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorTitle: string;
  mentorPhoto: string;
  date: string;
  formattedDate: string;
  slot: string;
  assessment: BookingAssessment;
  createdAt: string;
}
