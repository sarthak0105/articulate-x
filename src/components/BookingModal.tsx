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

  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};

    if (!assessment.fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }

    if (!assessment.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(assessment.email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!assessment.phone.trim()) {
      errs.phone = "Phone number is required.";
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

    if (simulateSlotTaken) {
      setSlotError(
        "That slot was just booked by another learner. Please select an alternate slot."
      );
      return;
    }

    setSlotError(null);
    setStep(3);

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#273044] bg-[#121828] text-[#f4f6ff] shadow-2xl transition-all">
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-[#273044] bg-[#0b0f1b]/90 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-[#273044] bg-[#121828]">
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
                className="text-base font-semibold text-[#f4f6ff] leading-tight"
              >
                Book 1:1 Demo with {mentor.name}
              </h2>
              <p className="text-xs font-mono text-[#aab3c7] mt-0.5">
                30-min live diagnostic &bull; Free demo session
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#aab3c7] hover:bg-[#182035] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="border-b border-[#273044]/80 bg-[#121828] px-6 py-2.5">
          <div className="flex items-center justify-between text-xs font-mono text-[#aab3c7]">
            <div
              className={`flex items-center gap-1.5 ${
                step >= 1 ? "text-[#7ca0ff] font-bold" : ""
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                  step >= 1
                    ? "bg-[#7ca0ff] text-[#0b0f1b] font-bold"
                    : "bg-[#182035] text-[#aab3c7]"
                }`}
              >
                1
              </span>
              <span>Self-Assessment</span>
            </div>

            <div className="h-px w-10 bg-[#273044]" />

            <div
              className={`flex items-center gap-1.5 ${
                step >= 2 ? "text-[#7ca0ff] font-bold" : ""
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                  step >= 2
                    ? "bg-[#7ca0ff] text-[#0b0f1b] font-bold"
                    : "bg-[#182035] text-[#aab3c7]"
                }`}
              >
                2
              </span>
              <span>Date &amp; Slot</span>
            </div>

            <div className="h-px w-10 bg-[#273044]" />

            <div
              className={`flex items-center gap-1.5 ${
                step === 3 ? "text-emerald-400 font-bold" : ""
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                  step === 3
                    ? "bg-emerald-400 text-[#0b0f1b] font-bold"
                    : "bg-[#182035] text-[#aab3c7]"
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
              <div className="rounded-2xl border border-[#273044] bg-[#0b0f1b] p-4 text-xs text-[#aab3c7] leading-relaxed">
                <strong className="text-[#f4f6ff]">Why this assessment?</strong> Your
                mentor reviews your goals, upcoming events, and challenges to tailor the
                rehearsal directly to your real speaking context.
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="user-role"
                  className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#aab3c7] mb-1.5"
                >
                  <Briefcase className="h-3.5 w-3.5 text-[#7ca0ff]" />
                  Your Role
                </label>
                <select
                  id="user-role"
                  value={assessment.currentRole}
                  onChange={(e) =>
                    setAssessment({ ...assessment, currentRole: e.target.value })
                  }
                  className="w-full rounded-2xl border border-[#273044] bg-[#0b0f1b] px-3.5 py-2.5 text-xs text-[#f4f6ff] focus:border-[#7ca0ff] focus:outline-none"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r} className="bg-[#121828] text-[#f4f6ff]">
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Goal */}
              <div>
                <label
                  htmlFor="user-goal"
                  className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#aab3c7] mb-1.5"
                >
                  <Target className="h-3.5 w-3.5 text-[#7ca0ff]" />
                  Primary Speaking Goal
                </label>
                <select
                  id="user-goal"
                  value={assessment.primaryGoal}
                  onChange={(e) =>
                    setAssessment({ ...assessment, primaryGoal: e.target.value })
                  }
                  className="w-full rounded-2xl border border-[#273044] bg-[#0b0f1b] px-3.5 py-2.5 text-xs text-[#f4f6ff] focus:border-[#7ca0ff] focus:outline-none"
                >
                  {GOALS.map((g) => (
                    <option key={g} value={g} className="bg-[#121828] text-[#f4f6ff]">
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              {/* Timeline */}
              <div>
                <label
                  htmlFor="event-timeline"
                  className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[#aab3c7] mb-1.5"
                >
                  <Calendar className="h-3.5 w-3.5 text-[#7ca0ff]" />
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
                  className="w-full rounded-2xl border border-[#273044] bg-[#0b0f1b] px-3.5 py-2.5 text-xs text-[#f4f6ff] focus:border-[#7ca0ff] focus:outline-none"
                >
                  {TIMELINES.map((t) => (
                    <option key={t} value={t} className="bg-[#121828] text-[#f4f6ff]">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hurdle */}
              <div>
                <label
                  htmlFor="challenge-desc"
                  className="block text-[11px] font-mono uppercase tracking-wider text-[#aab3c7] mb-1.5"
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
                  placeholder="e.g. 'I speak too fast under pressure', 'I rely on slides as a crutch', or 'I want to eliminate fillers'..."
                  className="w-full rounded-2xl border border-[#273044] bg-[#0b0f1b] p-3 text-xs text-[#f4f6ff] placeholder:text-[#aab3c7]/30 focus:border-[#7ca0ff] focus:outline-none"
                />
              </div>

              {/* Contact info */}
              <div className="border-t border-[#273044]/80 pt-4 space-y-3">
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-[#f4f6ff]">
                  Your Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label
                      htmlFor="user-fullname"
                      className="block text-[11px] font-mono text-[#aab3c7] mb-1"
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#aab3c7]/60" />
                      <input
                        id="user-fullname"
                        type="text"
                        value={assessment.fullName}
                        onChange={(e) =>
                          setAssessment({ ...assessment, fullName: e.target.value })
                        }
                        placeholder="Sarthak Bhandari"
                        className={`w-full rounded-xl border py-2 pl-9 pr-3 text-xs focus:outline-none ${
                          errors.fullName
                            ? "border-[#ff3300] bg-[#ff3300]/10 text-white"
                            : "border-[#273044] bg-[#0b0f1b] text-[#f4f6ff] focus:border-[#7ca0ff]"
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 font-mono text-[10px] text-[#ff3300]">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="user-email"
                      className="block text-[11px] font-mono text-[#aab3c7] mb-1"
                    >
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#aab3c7]/60" />
                      <input
                        id="user-email"
                        type="email"
                        value={assessment.email}
                        onChange={(e) =>
                          setAssessment({ ...assessment, email: e.target.value })
                        }
                        placeholder="sarthak@example.com"
                        className={`w-full rounded-xl border py-2 pl-9 pr-3 text-xs focus:outline-none ${
                          errors.email
                            ? "border-[#ff3300] bg-[#ff3300]/10 text-white"
                            : "border-[#273044] bg-[#0b0f1b] text-[#f4f6ff] focus:border-[#7ca0ff]"
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 font-mono text-[10px] text-[#ff3300]">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="user-phone"
                      className="block text-[11px] font-mono text-[#aab3c7] mb-1"
                    >
                      Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#aab3c7]/60" />
                      <input
                        id="user-phone"
                        type="tel"
                        value={assessment.phone}
                        onChange={(e) =>
                          setAssessment({ ...assessment, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className={`w-full rounded-xl border py-2 pl-9 pr-3 text-xs focus:outline-none ${
                          errors.phone
                            ? "border-[#ff3300] bg-[#ff3300]/10 text-white"
                            : "border-[#273044] bg-[#0b0f1b] text-[#f4f6ff] focus:border-[#7ca0ff]"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 font-mono text-[10px] text-[#ff3300]">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#273044]">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-[#273044] px-4 py-2 text-xs font-medium text-[#aab3c7] hover:bg-[#182035] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f6ff] px-5 py-2 text-xs font-semibold text-[#0b0f1b] hover:bg-white hover:scale-[1.02] transition-all"
                >
                  <span>Select Slot</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: DATE & TIME PICKER */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-[#f4f6ff]">
                  Select your 30-min live demo slot
                </h3>
                <p className="text-xs font-mono text-[#aab3c7] mt-0.5">
                  Times shown in your local timezone (IST, GMT+5:30).
                </p>
              </div>

              {/* Date Tabs */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#aab3c7] mb-2">
                  1. Date
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
                        className={`flex flex-col items-center justify-center rounded-2xl p-3 border transition-all text-center ${
                          isSelected
                            ? "border-[#7ca0ff] bg-[#7ca0ff]/15 text-[#f4f6ff] shadow-lg ring-1 ring-[#7ca0ff]"
                            : "border-[#273044] bg-[#0b0f1b] text-[#aab3c7] hover:border-[#7ca0ff]/40"
                        }`}
                      >
                        <span className="font-mono text-[10px] text-[#aab3c7]/60 uppercase">
                          {d.dayOfWeek}
                        </span>
                        <span className="text-base font-bold mt-0.5 text-[#f4f6ff]">
                          {d.formattedDate}
                        </span>
                        <span className="font-mono text-[10px] text-emerald-400 mt-1">
                          {d.slots.length} slots
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slots Grid */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#aab3c7] mb-2">
                  2. Time Slot
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
                        className={`flex items-center justify-center gap-1.5 rounded-full border py-2.5 px-3 text-xs font-mono font-medium transition-all ${
                          isSlotSelected
                            ? "border-[#7ca0ff] bg-[#7ca0ff] text-[#0b0f1b] font-bold shadow-md"
                            : "border-[#273044] bg-[#0b0f1b] text-[#f4f6ff] hover:border-[#7ca0ff]/40"
                        }`}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        <span>{s}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Slot Error Banner */}
              {slotError && (
                <div className="flex items-start gap-2.5 rounded-2xl bg-[#ff3300]/10 p-3.5 border border-[#ff3300]/40 text-xs text-[#ff3300]">
                  <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{slotError}</p>
                    <p className="text-[11px] text-[#ff3300]/80 mt-0.5">
                      Please pick another slot or date above to proceed.
                    </p>
                  </div>
                </div>
              )}

              {/* Simulated Slot Conflict */}
              <div className="flex items-center justify-between rounded-2xl border border-dashed border-[#273044] bg-[#0b0f1b] p-3 text-xs text-[#aab3c7]">
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <RefreshCw className="h-3.5 w-3.5 text-[#7ca0ff]" />
                  <span>Simulate &quot;Slot no longer available&quot; state:</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simulateSlotTaken}
                    onChange={(e) => setSimulateSlotTaken(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-[#273044] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#ff3300]"></div>
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#273044]">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#273044] px-4 py-2 text-xs font-medium text-[#aab3c7] hover:bg-[#182035] transition-colors"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f6ff] px-6 py-2.5 text-xs font-semibold text-[#0b0f1b] hover:bg-white hover:scale-[1.02] transition-all"
                >
                  <span>Confirm Booking</span>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CONFIRMATION SCREEN */}
          {step === 3 && (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-8 ring-emerald-500/5">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] font-semibold text-emerald-400 mb-2">
                  Demo Confirmed &bull; ID: #AX-{Math.floor(100000 + Math.random() * 900000)}
                </span>
                <h3 className="text-xl font-bold text-[#f4f6ff]">
                  You&apos;re Confirmed, {assessment.fullName}!
                </h3>
                <p className="text-xs text-[#aab3c7] max-w-md mx-auto mt-1">
                  A Google Meet calendar invite has been sent to{" "}
                  <strong className="text-[#f4f6ff]">{assessment.email}</strong>.
                </p>
              </div>

              {/* Booking Summary Card */}
              <div className="rounded-3xl border border-[#273044] bg-[#0b0f1b] p-5 text-left space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#273044]">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-[#273044] bg-[#121828]">
                    <Image
                      src={mentor.photo}
                      alt={mentor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#f4f6ff]">
                      {mentor.name}
                    </h4>
                    <p className="text-xs font-mono text-[#aab3c7]">
                      {mentor.title} &bull; {mentor.company}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-[#7ca0ff] shrink-0" />
                    <div>
                      <span className="font-mono text-[#aab3c7] block text-[10px]">Date</span>
                      <strong className="text-[#f4f6ff]">
                        {activeDateObj.dayOfWeek}, {activeDateObj.formattedDate}, 2026
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#7ca0ff] shrink-0" />
                    <div>
                      <span className="font-mono text-[#aab3c7] block text-[10px]">Time</span>
                      <strong className="text-[#f4f6ff]">
                        {selectedSlot} (30 mins)
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-mono text-[#aab3c7] block text-[10px]">Session</span>
                      <strong className="text-[#f4f6ff]">
                        Live Google Meet
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-[#7ca0ff] shrink-0" />
                    <div>
                      <span className="font-mono text-[#aab3c7] block text-[10px]">Primary Goal</span>
                      <strong className="text-[#f4f6ff] truncate block max-w-[180px]">
                        {assessment.primaryGoal}
                      </strong>
                    </div>
                  </div>
                </div>

                {assessment.challengeDescription && (
                  <div className="pt-2 border-t border-[#273044] text-xs">
                    <span className="font-mono text-[#aab3c7] block text-[10px]">Notes for mentor:</span>
                    <p className="text-[#f4f6ff] italic">
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#f4f6ff] px-6 py-2.5 text-xs font-semibold text-[#0b0f1b] hover:bg-white transition-all shadow-md"
                >
                  <CalendarPlus className="h-4 w-4" />
                  Add to Calendar
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto rounded-full border border-[#273044] px-6 py-2.5 text-xs font-medium text-[#aab3c7] hover:bg-[#182035] hover:text-[#f4f6ff] transition-colors"
                >
                  Return to Directory
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
