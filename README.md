# ArticulateX

> **From Um to Unmissable.**  
> Live 1:1 public speaking, vocal acoustics, and executive presence coaching for founders, leaders, and operators.

---

## ⚡ Overview

**ArticulateX** connects professionals preparing for high-stakes moments — pitch decks, keynotes, boardrooms, and media appearances — with elite public speaking coaches. 

The application provides an intuitive discovery experience and an interactive, 3-step booking flow designed for conversion and clarity.

---

## ✨ Key Features

### 1. Coach Directory & Multi-Facet Filtering
- **Multi-Category Filter Engine:** Real-time filtering by **Domain** (*Pitching, Executive Presence, Keynotes, Media*), **Industry Background** (*Tech, VC, Consulting, Media*), and **Language**.
- **Live Search & Sort:** Instant query filtering by coach name, bio, and company. Sort by *Featured*, *Highest Rated*, or *Experience*.
- **Active Filter Chips:** One-click removal chips and quick reset state.
- **Empty State Feedback:** Clear recovery paths and suggestions when no coaches match search criteria.

### 2. Comprehensive Coach Profiles (`/mentors/[id]`)
- **Static Pre-rendering:** Powered by Next.js `generateStaticParams()` for sub-second page loads.
- **Coach Pedigree & Credentials:** High-resolution portrait, verified credentials, signature coaching pillars, and verified student testimonials.
- **Direct 30-Min Demo Action:** Prominently placed booking triggers with next-available slot preview.

### 3. Interactive 3-Step Booking Experience
- **Step 1 — Speaking Context & Goals:** Captures current role, target timeline, high-stakes goals, and validated contact details.
- **Step 2 — Date & Time Slot Selection:** Interactive date chips, time slots, and a built-in conflict simulation toggle to test unavailable slot edge cases gracefully.
- **Step 3 — Instant Confirmation & Logistics:** Confetti celebration, unique reservation ID, meeting link, and **Add to Google Calendar** 1-click sync.

### 4. Design Craft & Accessibility (a11y)
- **Palette & Typography:** Warm paper editorial aesthetic with high-contrast text and clean modern sans-serif typography (`Instrument Sans`).
- **Full Keyboard Navigation:** Complete tab indexing, modal focus trapping, and `ESC` dismissal.
- **Mobile Responsive:** Adaptive drawers, touch-friendly tap targets (minimum 44×44px), and sticky mobile CTA triggers.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Effects:** Canvas Confetti

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or later
- npm, pnpm, or yarn

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/sarthak0105/articulate-x.git
cd articulate-x

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```
