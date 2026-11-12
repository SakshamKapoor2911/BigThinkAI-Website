# Typography — BigThinkAI

This document documents Agent 2 decisions and usage for typography.

## Fonts included (via `next/font`)
- **Newsreader** — Serif headings and kickers (weights 400, 600, 700)
- **Inter** — Substitute for Geist Sans (weights 300, 400, 600, 700)
- **JetBrains Mono** — Substitute for Geist Mono (weights 400, 700)

## Usage & Rules
- Apply fonts via the CSS variables injected by `next/font` (`--font-sans`, `--font-serif`, `--font-mono`). These are already populated in `_app.tsx`.
- Prefer serif for editorial headings and small kickers (`.kicker`, `.h1-serif`, `.h2-serif`). Use sans for UI, buttons, and body copy (`.font-sans`). Use mono for code and metadata (`.font-mono`).

## Local Geist fonts (optional)
- If you have Geist Sans / Geist Mono license files, place them in `public/fonts/` and uncomment the `geistSans` localFont block inside `src/fonts.ts`. Rebuild to apply.

## Acceptance Criteria
- Visual spec page exists at `/typography` showing heading, kicker, paragraph, buttons, and mono sample.
- CSS utilities for `h1-serif`, `h2-serif`, `.lead`, `.kicker-small`, and `.code-sample` exist in `src/styles/globals.css`.
- Documentation explains how to swap to local Geist fonts.

## How to test
1. Run the dev server: `npm run dev` (or `yarn dev`).
2. Open http://localhost:3000/typography and verify fonts render as expected. If Geist fonts are used locally, ensure files are present in `public/fonts`.

