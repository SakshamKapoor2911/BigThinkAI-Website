# Agent 4 — Bento Cards & Motion

Status: ✅ Implemented (demo + component + docs)

## What I implemented

- `components/BentoCard.tsx` — a flexible `BentoCard` component with variants: `content`, `gallery`, and `featured`.
  - Visuals: soft card lift, top-edge inset highlight, carved bottom rim, media area with rounded corners.
  - Magnetic cursor tracking: pointer-based transform calculations with a rAF throttle.
  - Framer Motion integration: when `framer-motion` is installed the component will use its `motion.div` spring animation for smoother physics; otherwise the component gracefully falls back to CSS transforms.
  - Accessibility: respects `prefers-reduced-motion` and disables transforms when requested.

- `pages/bento.tsx` — interactive demo page showcasing three variants, motion controls (reduced-motion toggle + intensity slider), and a short performance/accessibility checklist.

- Styles: added `.bento-card` styles to `src/styles/globals.css` (rim, media, lift, reduced-motion-safe rules).

## How to run & test

1. Ensure project dependencies are installed (this repo may not include `framer-motion` yet):

   - To get the enhanced motion behavior, run:
     ```bash
     npm install framer-motion
     # or
     yarn add framer-motion
     ```

2. Start the dev server (your usual Next.js command):

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open `/bento` in the browser and interact with the cards. Toggle `prefers-reduced-motion` in OS or use the quick checkbox on the page.

## Acceptance criteria (done)

- [x] `BentoCard` component built with visual layers (rim, carve, shadow)
- [x] Magnetic cursor tracking implemented with rAF throttle
- [x] Framer Motion used if available; component falls back when not installed
- [x] Demo page with motion settings and perf notes
- [x] Reduced-motion support

## Notes & Next steps

- Performance: the current hover motion uses transforms and rAF to avoid layout thrashing. When adding many cards simultaneously, consider moving pointer smoothing into a single shared manager to reduce listeners.

- Unit tests / snapshots: not included here (repo has no test harness configured). If you want, I can add simple Jest + React Testing Library tests and a smoke test that ensures the `BentoCard` renders variants.

- Polishing: add Framer Motion motion presets, lift variants for `featured`, and small Framer Motion layout transitions for list reordering.

If you'd like, I'll open a branch named `agent/4-bento` and create a PR with these changes and a Vercel preview. 👍
