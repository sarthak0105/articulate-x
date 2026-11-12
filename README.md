# Articulate X — Design & Frontend Assignment
**Candidate:** Sarthak Bhandari  
**Assignment Objective:** Design and build the end-to-end *"Find a Mentor and Book a Demo"* flow for **Articulate X** (*From Um to Unmissable*).

---

## 🔗 Key Deliverables & Links

* 🎨 **Figma Design File (Desktop & Mobile):** [View Figma Design File](https://www.figma.com/design/pXrLqtp7rKK2eQXZgMdpGY)
* 🗺️ **FigJam User Flow Diagram:** [View FigJam Flowchart](https://www.figma.com/board/GRVcxtFpixAcnAjGryKznE)
* 💻 **GitHub Repository:** [https://github.com/sarthak0105/articulate-x](https://github.com/sarthak0105/articulate-x)
* 🚀 **Tech Stack:** Next.js 16 (App Router) • React 19 • TypeScript • Tailwind CSS • Lucide Icons • Canvas Confetti

---

## 🌟 Implemented Features

### 1. Mentor Directory with Real-Time Filtering
* **Multi-Filter System:** Real-time client-side filtering by **Industry** (VC, Tech, Consulting, Finance, Healthcare, Media), **Focus Area** (Pitching, Executive Presence, Keynotes, Interviews, etc.), and **Language** (English, Hindi, Spanish, French, Mandarin).
* **Live Search & Sort:** Search across mentor names, companies, and specialisms with instant clear. Sort by *Recommended / Featured*, *Highest Rating (★ 5.0)*, or *Experience (Years)*.
* **Active Filter Badges:** One-click removal pills for active filters plus a global "Reset all" button.
* **Empty State Handling:** When no mentors match the filter combinations, a helpful empty state displays with suggestions and a reset action.

### 2. Mentor Profile Page (`/mentors/[id]`)
* **Static Pre-rendering:** Powered by Next.js `generateStaticParams()` for optimal performance and SEO.
* **Comprehensive Profile Content:** High-res portrait, verified mentor badges, industry credentials, 3 signature coaching pillars, and student reviews.
* **Sticky 30-min Free Demo Callout:** Displays next available date and slot time in local timezone (IST).

### 3. Interactive 3-Step Booking Flow (Modal & Routed)
* **Step 1: Self-Assessment & Diagnostic Form:**
  * Learner's current role selection.
  * Primary speaking goal (Pitching, Executive Presence, Keynote, Interviews).
  * Upcoming event timeline (2 weeks, 1 month, ongoing).
  * Challenge description textarea.
  * Contact info (Full Name, Work/Personal Email, Phone) with inline validation.
* **Step 2: Date & Slot Picker:**
  * Day selection tabs with slot counters.
  * Interactive morning/afternoon/evening time slot chips.
  * **Simulated Slot Error State:** Built-in interactive toggle to test edge case when a slot is no longer available.
* **Step 3: Confirmation Screen:**
  * Confetti celebration on confirmed booking.
  * Booking ID (e.g. `#AX-665318`).
  * Google Meet 1:1 video session preview.
  * Summary of self-assessment goals.
  * **Add to Google Calendar** integration (pre-populated event title, description, and link).

### 4. Accessibility (a11y) & Design Craft
* **Visible Focus States:** Enhanced `focus-visible` rings on all interactive elements.
* **Keyboard Navigable:** Full modal keyboard trapping and ESC key dismissal.
* **Design System Inspector:** One-click header pill opening the token palette (Colors, Typography scale, Button variants, Badges).

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
http://localhost:3000

# 4. Production build
npm run build
npm run start
```
