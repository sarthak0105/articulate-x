"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  User,
  Mail,
  Phone,
  Briefcase,
  Target,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  CalendarPlus,
  RefreshCw,
} from "lucide-react";
import { Mentor, BookingAssessment } from "@/types";

interface BookingModalProps {
  mentor: Mentor | null;
  isOpen: boolean;
  onClose: () => void;
}

const ROLES = [
  "Founder / CEO",
  "Engineering / Tech Leader",
  "Product Manager / Director",
  "Strategy & Management Consultant",
  "Finance / Investment Professional",
  "Student / Early Career",
  "Other Professional",
];

const GOALS = [
  "Pitching to Investors & Fundraising",
  "Executive Presence & Boardroom Meetings",
  "Keynote, Conference & TEDx Stage Talk",
  "High-Stakes Job & Leadership Interviews",
  "Eliminating Fillers ('Um', 'Like') & Stage Fright",
  "Technical Demos & Simplification",
];

const TIMELINES = [
  "In the next 2 weeks (Urgent)",
  "Within 1 month",
  "Within 2-3 months",
  "No specific deadline (Ongoing Growth)",
];

export function BookingModal({ mentor, isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State - Step 1: Self-Assessment
  const [assessment, setAssessment] = useState<BookingAssessment>({
    currentRole: "Founder / CEO",
    primaryGoal: "Pitching to Investors & Fundraising",
    upcomingEventTimeline: "Within 1 month",
    challengeDescription: "",
    fullName: "",
    email: "",
    phone: "",
  });

  // Errors State
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Step 2: Date & Slot Selection
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [slotError, setSlotError] = useState<string | null>(null);
  const [simulateSlotTaken, setSimulateSlotTaken] = useState(false);

  // Reset or initialize when opened
  useEffect(() => {
    if (isOpen && mentor) {
      setStep(1);
      setErrors({});
      setSlotError(null);
      setSelectedDateIndex(0);
      const initialSlot = mentor.availableSlots[0]?.slots[0] || "";
      setSelectedSlot(initialSlot);
    }
  }, [isOpen, mentor]);

  // Esc key listener for accessibility
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mentor) return null;

  const activeDateObj = mentor.availableSlots[selectedDateIndex] || mentor.availableSlots[0];

  // Validation for Step 1
  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};

    if (!assessment.fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }

    if (!assessment.email.trim()) {
      errs.email = "Work or personal email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(assessment.email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!assessment.phone.trim()) {
      errs.phone = "Phone number is required for SMS reminders.";
    } else if (assessment.phone.length < 8) {
      errs.phone = "Please enter a valid phone number.";
    }

    if (!assessment.currentRole) {
      errs.currentRole = "Please select your role.";
    }

    if (!assessment.primaryGoal) {
      errs.primaryGoal = "Please select your primary speaking goal.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleConfirmBooking = () => {
    if (!selectedSlot) {
      setSlotError("Please choose an available time slot.");
      return;
    }

    // Check simulated "slot taken" error state (Optional requirement in brief)
    if (simulateSlotTaken) {
      setSlotError(
        "Oops! That slot was just booked by another learner. Please select an alternate slot."
      );
      return;
    }

    setSlotError(null);
    setStep(3);

    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }
  };

  // Helper to generate Google Calendar Event URL
  const generateGoogleCalendarUrl = () => {
    if (!activeDateObj || !selectedSlot) return "#";
    const title = encodeURIComponent(
      `Articulate X 1:1 Public Speaking Demo with ${mentor.name}`
    );
    const details = encodeURIComponent(
      `Free 30-min 1:1 Public Speaking Coaching Demo Session with ${mentor.name} (${mentor.title}).\n\nGoal: ${assessment.primaryGoal}\nRole: ${assessment.currentRole}\nMeeting Link: https://meet.google.com/art-x-${mentor.id.slice(0, 4)}`
    );
    const location = encodeURIComponent("Google Meet (Live 1:1 Video)");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              <Image
                src={mentor.photo}
                alt={mentor.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2
                id="booking-modal-title"
                className="text-base font-bold text-slate-900 leading-tight"
              >
                Book Free 1:1 Demo with {mentor.name}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                30-min personalized public speaking diagnostics &bull; No credit card needed
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stepper Progress Indicator */}
        <div className="border-b border-slate-100 bg-white px-6 py-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <div
              className={`flex items-center gap-1.5 ${
                step >= 1 ? "text-blue-600 font-bold" : ""
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                  step >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                1
              </span>
              <span>Self-Assessment</span>
            </div>

            <div className="h-0.5 w-12 bg-slate-200" />

            <div
              className={`flex items-center gap-1.5 ${
                step >= 2 ? "text-blue-600 font-bold" : ""
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                  step >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                2
              </span>
              <span>Date &amp; Slot</span>
            </div>

            <div className="h-0.5 w-12 bg-slate-200" />

            <div
              className={`flex items-center gap-1.5 ${
                step === 3 ? "text-emerald-600 font-bold" : ""
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                  step === 3
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                3
              </span>
              <span>Confirmation</span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="max-h-[75vh] overflow-y-auto p-6">
          {/* STEP 1: SELF-ASSESSMENT */}
          {step === 1 && (
            <form onSubmit={handleProceedToStep2} className="space-y-5">
              <div className="rounded-xl bg-blue-50/60 p-3.5 border border-blue-100 text-xs text-blue-900 leading-relaxed">
                <strong>Why this self-assessment?</strong> Articulate X sessions are
                customized for your upcoming speaking context. Your mentor will review
                these answers before your demo session.
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="user-role"
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  <Briefcase className="h-3.5 w-3.5 text-blue-600" />
                  Your Current Role
                </label>
                <select
                  id="user-role"
                  value={assessment.currentRole}
                  onChange={(e) =>
                    setAssessment({ ...assessment, currentRole: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Primary Goal */}
              <div>
                <label
                  htmlFor="user-goal"
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  <Target className="h-3.5 w-3.5 text-blue-600" />
                  Primary Speaking Goal
                </label>
                <select
                  id="user-goal"
                  value={assessment.primaryGoal}
                  onChange={(e) =>
                    setAssessment({ ...assessment, primaryGoal: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                >
                  {GOALS.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Upcoming Event Timeline */}
              <div>
                <label
                  htmlFor="event-timeline"
                  className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  <Calendar className="h-3.5 w-3.5 text-blue-600" />
                  Upcoming Event / Timeline
                </label>
                <select
                  id="event-timeline"
                  value={assessment.upcomingEventTimeline}
                  onChange={(e) =>
                    setAssessment({
                      ...assessment,
                      upcomingEventTimeline: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none"
                >
                  {TIMELINES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Challenge Description */}
              <div>
                <label
                  htmlFor="challenge-desc"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Biggest speaking hurdle (Optional)
                </label>
                <textarea
                  id="challenge-desc"
                  rows={2}
                  value={assessment.challengeDescription}
                  onChange={(e) =>
                    setAssessment({
                      ...assessment,
                      challengeDescription: e.target.value,
                    })
                  }
                  placeholder="e.g. 'I speak too fast when nervous', 'Investors interrupt and I get flustered', or 'I want to eliminate fillers'..."
                  className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Contact Information */}
              <div className="border-t border-slate-100 pt-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Your Contact Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label
                      htmlFor="user-fullname"
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        id="user-fullname"
                        type="text"
                        value={assessment.fullName}
                        onChange={(e) =>
                          setAssessment({ ...assessment, fullName: e.target.value })
                        }
                        placeholder="e.g. Sarthak B."
                        className={`w-full rounded-xl border py-2 pl-9 pr-3 text-sm focus:outline-none ${
                          errors.fullName
                            ? "border-red-400 bg-red-50/30 text-red-900"
                            : "border-slate-200 bg-white text-slate-900 focus:border-blue-500"
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-[11px] text-red-500 font-medium">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="user-email"
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      Work / Personal Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        id="user-email"
                        type="email"
                        value={assessment.email}
                        onChange={(e) =>
                          setAssessment({ ...assessment, email: e.target.value })
                        }
                        placeholder="sarthak@example.com"
                        className={`w-full rounded-xl border py-2 pl-9 pr-3 text-sm focus:outline-none ${
                          errors.email
                            ? "border-red-400 bg-red-50/30 text-red-900"
                            : "border-slate-200 bg-white text-slate-900 focus:border-blue-500"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-red-500 font-medium">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="user-phone"
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        id="user-phone"
                        type="tel"
                        value={assessment.phone}
                        onChange={(e) =>
                          setAssessment({ ...assessment, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className={`w-full rounded-xl border py-2 pl-9 pr-3 text-sm focus:outline-none ${
                          errors.phone
                            ? "border-red-400 bg-red-50/30 text-red-900"
                            : "border-slate-200 bg-white text-slate-900 focus:border-blue-500"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-[11px] text-red-500 font-medium">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-all active:scale-98"
                >
                  <span>Select Date &amp; Time</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: DATE & TIME PICKER */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Choose your preferred 30-min demo slot
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  All times shown in your local timezone (IST, GMT+5:30).
                </p>
              </div>

              {/* Date Tabs */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  1. Select Date
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {mentor.availableSlots.map((d, idx) => {
                    const isSelected = selectedDateIndex === idx;
                    return (
                      <button
                        key={d.date}
                        type="button"
                        onClick={() => {
                          setSelectedDateIndex(idx);
                          setSelectedSlot(d.slots[0] || "");
                          setSlotError(null);
                        }}
                        className={`flex flex-col items-center justify-center rounded-xl p-3 border transition-all text-center ${
                          isSelected
                            ? "border-blue-600 bg-blue-50/70 text-blue-900 shadow-sm ring-1 ring-blue-500"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-[11px] font-medium text-slate-500 uppercase">
                          {d.dayOfWeek}
                        </span>
                        <span className="text-base font-bold mt-0.5">
                          {d.formattedDate}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-semibold mt-1">
                          {d.slots.length} slots
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slots Grid */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                  2. Select Time Slot
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {activeDateObj.slots.map((s) => {
                    const isSlotSelected = selectedSlot === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setSelectedSlot(s);
                          setSlotError(null);
                        }}
                        className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 px-3 text-xs font-semibold transition-all ${
                          isSlotSelected
                            ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                            : "border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-blue-50/30"
                        }`}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        <span>{s}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slot Error Banner (e.g. Slot no longer available - Requirement 4) */}
              {slotError && (
                <div className="flex items-start gap-2.5 rounded-xl bg-red-50 p-3.5 border border-red-200 text-xs text-red-800">
                  <AlertTriangle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{slotError}</p>
                    <p className="text-[11px] text-red-600 mt-0.5">
                      Please pick another slot or date above to proceed.
                    </p>
                  </div>
                </div>
              )}

              {/* Optional Demo Helper: Toggle Simulated Slot Conflict */}
              <div className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-3.5 w-3.5 text-slate-500" />
                  <span>
                    Simulate &quot;Slot no longer available&quot; error state:
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simulateSlotTaken}
                    onChange={(e) => setSimulateSlotTaken(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-red-500"></div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition-all active:scale-98"
                >
                  <span>Confirm Free Demo</span>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CONFIRMATION SCREEN */}
          {step === 3 && (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200 mb-2">
                  Booking Confirmed &bull; ID: #AX-{Math.floor(100000 + Math.random() * 900000)}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  You&apos;re All Set, {assessment.fullName}!
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                  A calendar invite and Google Meet link have been sent to{" "}
                  <strong className="text-slate-800">{assessment.email}</strong>.
                </p>
              </div>

              {/* Booking Summary Card */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 text-left space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200/80">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
                    <Image
                      src={mentor.photo}
                      alt={mentor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {mentor.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {mentor.title} &bull; {mentor.company}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[11px]">Date</span>
                      <strong className="text-slate-900">
                        {activeDateObj.dayOfWeek}, {activeDateObj.formattedDate}, 2026
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[11px]">Time</span>
                      <strong className="text-slate-900">
                        {selectedSlot} (30 mins)
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[11px]">Platform</span>
                      <strong className="text-slate-900">
                        Google Meet (Live 1:1 Video)
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-slate-500 block text-[11px]">Primary Focus</span>
                      <strong className="text-slate-900 truncate block max-w-[180px]">
                        {assessment.primaryGoal}
                      </strong>
                    </div>
                  </div>
                </div>

                {assessment.challengeDescription && (
                  <div className="pt-2 border-t border-slate-200/60 text-xs">
                    <span className="text-slate-500 block text-[11px]">Note for Mentor:</span>
                    <p className="text-slate-700 italic">
                      &ldquo;{assessment.challengeDescription}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={generateGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors"
                >
                  <CalendarPlus className="h-4 w-4" />
                  Add to Google Calendar
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto rounded-xl border border-slate-200 px-6 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  Done &amp; Return to Directory
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
