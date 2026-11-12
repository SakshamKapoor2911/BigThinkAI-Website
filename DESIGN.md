# BigThinkAI Club Website - Design System

This document outlines the visual identity and UI specifications for the BigThinkAI university club website, following the "Alabaster Minimalism" aesthetic.

## About — Who we are
BigThinkAI is a student-run club focused on applied machine learning, research, and community learning. We organize cross-disciplinary projects (EDGE), hands-on workshops (Pyoneer), hackathons (Bitcamp), speaker series, and student-led research groups. Our goal is to build practical AI projects, teach skills, and create pathways from coursework to real-world impact.

## Contact & Socials
- **Email:** `contact@bigthinkai.org` (replace with club address)
- **Twitter / X:** `@bigthinkai`
- **Instagram:** `@bigthinkai`
- **LinkedIn:** `BigThinkAI Club`
- **GitHub:** `github.com/bigthinkai`

> Replace these handles with the official club accounts where needed. These are used across header/footer, social meta tags, and share cards.

## Featured Projects & Workshops
Highlight key recurring programs on the homepage and in the Projects carousel:
- **EDGE Projects** — multi-quarter, team-led projects exploring applied ML and system-building. Showcase project cards with status, tech tags, and short blurbs.
- **Pyoneer Workshops** — a curriculum of beginner→advanced Python & ML workshops (hands-on notebooks, exercises, and recordings).
- **Bitcamp / Hackathon Series** — intensive weekend events for prototyping and networking; include a carousel slide spotlighting past winners and themes.
- **Other Highlights** — Research Spotlight, Community Events, Mentorship Program.

Notes: the homepage should include a responsive carousel (card-based) to cycle through featured initiatives (EDGE, Pyoneer, Bitcamp, Research) with primary CTAs to join or learn more.

## Prototype & Feedback
I'll vibe-code a working prototype and deploy it to Vercel. Once the preview link is up, I will post the Vercel URL here so everyone can review and give feedback. Include a short feedback form link in the demo for quick iterations.

## 1. Aesthetic Vision
The design is inspired by high-quality print and paper ("Alabaster Minimalism"). It emphasizes extreme clarity, generous whitespace, and tactile textures that make the digital interface feel physical.

## 1. Aesthetic Vision
The design is inspired by high-quality print and paper ("Alabaster Minimalism"). It emphasizes extreme clarity, generous whitespace, and tactile textures that make the digital interface feel physical.

## 2. Core Color Palette
| Role | HSL | Hex | Description |
| :--- | :--- | :--- | :--- |
| **Background** | `hsl(0 0% 98.4%)` | `#FBFBFB` | Alabaster / Off-white |
| **Foreground** | `hsl(0 0% 10.2%)` | `#1A1A1A` | Near Black (Soft Text) |
| **Primary (Accent)** | `hsl(217 91% 60%)` | `#3B82F6` | **Vibrant Blue** (Theme highlight) |
| **Card** | `hsl(0 0% 100%)` | `#FFFFFF` | Pure White |
| **Muted** | `hsl(0 0% 96%)` | `#F5F5F5` | Secondary backgrounds |
| **Border** | `hsl(0 0% 90%)` | `#E6E6E6` | Subtle separators |

## 3. Typography
Hierarchical typography using a mix of modern and classic typefaces:
- **Sans-serif:** `Geist Sans` (Primary UI, body text, buttons)
- **Monospace:** `Geist Mono` (Meta tags, dates, technical labels)
- **Serif:** `Newsreader` (Headings, quotes, editorial accents)

## 4. Visual Textures
### A. Dot Grid
A subtle pattern applied to the global background to provide scale and structure.
- **Pattern:** `radial-gradient(circle, rgba(0, 0, 0, 0.015) 1px, transparent 1px)`
- **Size:** `10px 10px`

### B. Film Grain
A persistent overlay to mimic physical paper grain.
- **Opacity:** `0.035`
- **Z-Index:** Top-level (pointer-events-none)

## 5. UI Components & Motion
### Glassmorphism (Navigation)
- **Style:** Pill-shaped floating bar.
- **Properties:** `backdrop-filter: blur(40px)`, `border: 0.5px solid rgba(0, 0, 0, 0.08)`.
- **Interaction:** Scales down on scroll (0.96 for minor, 0.94 for deep scroll).

### Premium "Bento" Cards
- **Construction:** Pure white background with complex layering:
    - Soft outer lift (shadow).
    - Inset top-edge rim (light highlight).
    - Inset carved edge (inner dark rim).
- **Interaction:** Magnetic effect using cursor tracking (Framer Motion).

## 6. Project-Specific Elements
- **Logo Integration:** The primary blue should be used for the logo and key interactive elements.
- **Layout:** A grid-heavy "Bento" layout for showcasing club sections: Projects, Events, Research, and Community.

## 7. Advanced Design Refinements ✅
Small, targeted changes that elevate the aesthetic from “Great” to **World-Class**.

### A. Refine the Blue (Electric yet Printed)
- **Primary Action:** Consider moving from `#3B82F6` to **`#2563EB`** (Tailwind Blue-600) or **`#0055FF`** (International Klein Blue) for stronger contrast on Alabaster.
- **Primary Gradient / Depth:** Use a subtle linear gradient for primary buttons or hero accents to give printed-density:
  - From: `#2563EB` → To: `#1E40AF` (deep indigo) for depth.
- **AI Glow:** Use a soft diffuse shadow on interactive primary elements to simulate an energetic glow while remaining elegant:

```css
box-shadow: 0 4px 20px rgba(37, 99, 235, 0.28); /* Soft electric blue glow */
```

### B. Complementary "Semantic" Colors (Ink Shades)
- **Error / Overdue:** Prefer Crimson Ink (`#BE123C` or `#9F1239`) to avoid bright harsh red on off-white.
- **Warning / Due Soon:** Use Amber/Ochre (`#B45309`) rather than neon orange.
- **Success / Done:** Use Emerald (`#047857`) for a confident, ink-like success color.
- **Accessibility:** Ensure contrast ratios remain AA/AAA where necessary; document token usage for each UI state.

### C. Typography Nuance (The "University" Feel)
- Use `Newsreader` **Italic** for small kicker text or subtitles above major headlines.
- Use serif headings with sans body for a clear editorial hierarchy.

> Example (design note): Use serif italic kicker above page titles to add authority: *Research Division* → **Generative Adversarial Networks**

## 8. Recommended Tech Stack 🔧
A modern, high-fidelity stack that supports Server Components, performant styling, and expressive motion.

| Layer | Technology | Why? |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15 (App Router)** | Server Components + latest routing patterns for performance. |
| **Styling** | **Tailwind CSS v4** | Utility-first, easy theming with CSS variables and tokens. |
| **Components** | **shadcn/ui** | Unstyled components that adapt cleanly to the design system (radius control to 0.9rem). |
| **Animation** | **Framer Motion** | Spring physics for magnetic cards and smooth layout transitions. |
| **Smooth Scroll** | **Lenis** | Natural scroll momentum for a tactile, paper-like feel. |
| **Icons** | **Phosphor** / **Lucide** | Thin/light icon weights that read well on Alabaster backgrounds. |
| **Fonts** | **next/font (Next/Font)** | `swap` strategy to avoid layout shift and deliver Geist + Newsreader reliably. |

## 9. Implementation Notes & Suggested Changes
Actionable guidance to align the codebase with the design tokens above.

- **Replace hardcoded Tailwind colors** (e.g., `bg-blue-600`, `text-red-600`, `text-orange-600`) with CSS variables in `globals.css` (e.g., `--color-primary`, `--color-destructive`, `--color-warning`).
- **Soften borders** using opacity or subtler tones (e.g., `border-gray-200/60` or `border-rose-100`), avoid high-contrast separators.
- **Inject Serif for headlines** where editorial weight is needed (e.g., dashboard header).

### Example (for design reference only)
Below is a design-focused example you can add as a reference in the doc. Keep actual implementation in code files to next steps.

```tsx
/* Dashboard Header — design reference */
<div className="mb-8 flex items-end justify-between border-b border-gray-200/60 pb-6">
  <div>
    <h1 className="text-3xl font-serif font-medium text-gray-900 tracking-tight mb-2">Commitments</h1>
    <p className="text-gray-500 font-sans text-sm tracking-wide uppercase opacity-80">BigThinkAI • Spring Semester 2026</p>
  </div>
  <button className="group relative overflow-hidden bg-primary text-white text-sm font-medium py-2.5 px-5 rounded-full transition-all duration-300 shadow-lg" aria-label="New Entry">
    <span className="relative z-10 flex items-center gap-2">
      {/* Icon */}
      New Entry
    </span>
  </button>
</div>
```

> Note: The above references use `bg-primary` / `--color-primary` to emphasize using variables instead of raw Tailwind classes.

## 10. Next Steps ➡️
1. Approve these refinements and the stack choices.
2. I can then update `tailwind.config.ts` to add the custom colors and fonts, and add CSS tokens to `globals.css`.
3. Implement motion (Framer Motion), Lenis scrolling, and update components like `BentoCard` and `Navigation` to use the new tokens and behaviors.

If you confirm, I’ll proceed to implement the changes in the codebase (Tailwind config, `globals.css`, and components) in a focused PR. 👍

---

## 11. Parallelizable Coding Tasks (assignable to agents) 🔧
These tasks are intentionally parallelizable. Create a branch per agent (e.g., `agent/1-tokens`) and open a PR with a Vercel preview when the task is ready.

1. **Agent 1 — Design Tokens & Tailwind**
   - Update `tailwind.config.ts` with `--color-*` variables and custom theme tokens.
   - Add CSS tokens in `globals.css` and provide token usage examples (buttons, text, borders).
   - Acceptance: working theme switch demo and documented tokens.
   - **Status (Agent 1):** implemented in workspace — added `tailwind.config.ts`, `src/styles/globals.css`, `design/TOKENS.md`, and a minimal demo at `public/token-demo/index.html` for quick validation. Next: create `agent/1-tokens` branch and open a PR with a Vercel preview when ready.

2. **Agent 2 — Typography & Fonts**
   - Integrate `Newsreader`, `Geist Sans`, and `Geist Mono` via `next/font` (swap strategy).
   - Add utility classes and examples for serif headings and sans body copy.
   - Acceptance: visual spec page with font pairings and fallback logic.
   - **Status (Agent 2):** implemented in workspace — added `src/fonts.ts`, `pages/_app.tsx`, `pages/fonts.tsx`, updated `src/styles/globals.css` and `tailwind.config.ts`. Preview the visual spec at `/fonts` once the dev server is running. Replace Inter/JetBrains Mono with Geist local fonts by adding licensed files to `public/fonts/` and updating `src/fonts.ts`.


3. **Agent 3 — Header / Navigation & Glassmorphism**
   - Implement pill-shaped floating nav with `backdrop-filter`, subtle border, and scroll scaling (0.96 / 0.94).
   - Ensure keyboard accessibility and mobile adaptation.
   - Acceptance: accessible header with animations and unit/smoke tests.
   - **Status (Agent 3):** **completed in workspace** — navigation component implemented at `components/Navigation.tsx` and integrated in `pages/index.tsx`. Added accessibility and mobile refinements (Escape-to-close, click-outside close), and **unit tests** at `components/__tests__/Navigation.test.tsx`. Branch `agent/3-navigation` is ready for review and PR.

4. **Agent 4 — Bento Cards & Motion**
   - Build `BentoCard` component (shadows, inset rim, carved edge) and magnetic cursor tracking with Framer Motion.
   - Provide variants for content, gallery, and featured states.
   - Acceptance: interactive demo page with motion settings and perf budget.
   - **Status (Agent 4):** **implemented in workspace** — added `components/BentoCard.tsx`, styles in `src/styles/globals.css`, and demo at `pages/bento.tsx`. Framer Motion is used when installed; the component falls back gracefully if it is not present.

5. **Agent 5 — Featured Projects Carousel & Content**
   - Implement responsive carousel (EDGE, Pyoneer, Bitcamp, Research) with content schema (static JSON or headless CMS).
   - Include ARIA roles and swipe support.
   - Acceptance: content-driven carousel with edit docs and demo slides.
   - **Status (Agent 5):** **not started** — no carousel implementation or content schema found in the repo.

> Tip: Keep PRs small and focused. Each agent should include a short README in the branch describing what was changed, how to test, and the acceptance criteria. Let's assign agents and start parallel work once you confirm — I can coordinate branches and review cycles.

---

## Dev Server — `npm run dev` (Errors & Action Items) ⚠️

During a local `npm run dev` run on Windows the dev server failed to compile with the following notable findings:

- **Critical build error (PostCSS / Tailwind):**
  - Message: "It looks like you're trying to use `tailwindcss` directly as a PostCSS plugin. The PostCSS plugin has moved to a separate package... install `@tailwindcss/postcss` and update your PostCSS configuration."
  - Symptom: Next.js returned **500** for `/` and the CSS pipeline failed to load `./src/styles/globals.css`.
  - Action items:
    1. Install the new PostCSS adapter for Tailwind: `npm install -D @tailwindcss/postcss`.
    2. Update `postcss.config.js` to use `@tailwindcss/postcss` as the plugin (or follow Tailwind's latest setup docs).
    3. Re-run `npm run dev` and confirm CSS compiles and pages load.

- **Next.js configuration warning:**
  - Message: `Unrecognized key(s) in object: 'swcMinify'` — remove or update `swcMinify` to match the installed Next.js version's config API.
  - Action item: Inspect `next.config.js`, remove deprecated/unrecognized keys or migrate to the current config schema.

- **Workspace root / lockfile warning:**
  - Message: Next.js inferred workspace root based on `package-lock.json` found at `C:\Users\Saksham Kapoor\package-lock.json`, and reported an extra lockfile in the project.
  - Action item: Either set `outputFileTracingRoot` in `next.config.js` to the project root or remove/move the extra lockfile to avoid root mis-detection.

- **Current status:** Dev server did not complete successfully due to the CSS/PostCSS error. After fixing the PostCSS/Tailwind setup, verify the other warnings are addressed and run a fresh `npm run dev` until the site compiles with no 500s.

If you want, I can open a branch (`fix/dev-postcss`) and implement the recommended changes (install package, update `postcss.config.js`, run and verify) and open a PR with notes. 👍
