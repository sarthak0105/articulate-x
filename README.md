# ArticulateX

Live 1:1 public speaking, vocal acoustics, and executive presence coaching for founders, leaders, and operators.

## Quick Links

- Live Deployment: [https://articulate-x.vercel.app](https://articulate-x.vercel.app/)
- Figma Design: [ArticulateX Figma Project](https://www.figma.com/design/3OBUO9kwc6THpBYe09Oa1Z/ArticulateX-Assesment?node-id=0-1&t=2hlMLIziOdIYUSaJ-1)

---

## Overview

ArticulateX helps professionals prepare for high-stakes speaking scenarios such as pitch presentations, keynotes, board meetings, and media interviews. The platform includes a searchable mentor directory and a three-step booking flow to schedule diagnostic demo sessions.

---

## Features

### 1. Coach Directory and Filtering
- Multi-category filtering: Filter coaches by domain (Pitching, Executive Presence, Keynotes, Media), industry background (Tech, VC, Consulting, Media), and language.
- Live search and sorting: Instant search across coach names, bios, and backgrounds. Sort by featured, highest rated, or experience.
- Active filter chips: Individual filter tags with one-click removal and a full reset option.
- Clear empty states: Helpful guidance and quick reset when no mentors match the current filters.

### 2. Mentor Profiles (`/mentors/[id]`)
- Static pre-rendering: Uses Next.js `generateStaticParams()` for fast page loading.
- Detailed credentials: Coach background, core coaching focus areas, verified ratings, and learner reviews.
- Direct booking CTA: Sticky desktop card and floating mobile trigger displaying the next available demo slot.

### 3. Three-Step Booking Modal
- Step 1 (Context and Goals): Collects role, target timeline, speaking focus areas, and contact information with validation.
- Step 2 (Date and Time Selection): Day selection tabs, interactive time slot chips, and an interactive slot conflict simulation to test edge-case handling.
- Step 3 (Confirmation): Booking summary, calendar invite generation (Google Calendar sync), and session details.

### 4. Accessibility and Interaction Design
- Keyboard navigation: Full tab navigation, modal focus lock, and escape key closing.
- Accessible contrast and sizing: Readable typography, clear focus rings, and touch targets sized for mobile devices.
- Responsive layout: Dedicated mobile navigation drawer and adaptive grid views.

---

## Tech Stack

- Framework: Next.js 16 (App Router)
- Frontend: React 19, TypeScript
- Styling: Tailwind CSS
- Icons: Lucide React
- Visual Effects: Canvas Confetti

---

## Getting Started

### Prerequisites
- Node.js 18.17 or higher
- npm, pnpm, or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sarthak0105/articulate-x.git
cd articulate-x

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build the application
npm run build

# Start the production build locally
npm run start
```
