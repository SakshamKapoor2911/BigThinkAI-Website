# Agent 1 — Design Tokens & Tailwind

This branch contains the initial token work for BigThinkAI.

Files added:
- `tailwind.config.ts` — Tailwind config mapping theme colors to CSS variables.
- `src/styles/globals.css` — CSS tokens and example utilities (`.btn-primary`, `.card`, `.kicker`).
- `design/TOKENS.md` — Token documentation and usage notes.
- `public/token-demo/index.html` — Minimal demo page to preview tokens and try theme toggles.

How to test locally

1. (Optional) If using a Next.js project, ensure Tailwind and PostCSS are configured and `tailwind.config.ts` is loaded by your build.
2. Open `public/token-demo/index.html` in a browser (or run a local static server, e.g. `npx http-server public`) to preview the token demo.
3. In the demo, use the primary color selector to switch `--color-primary` and verify the `.btn-primary` color and box-shadow update.
4. Toggle `[data-theme='dark']` using the 'Toggle Dark' button to verify dark token overrides.

Acceptance Criteria

- Tailwind color tokens resolve to CSS variables (see `tailwind.config.ts`).
- `globals.css` contains the token definitions and example utilities.
- The demo presents a simple, testable view for the tokens with a color picker and theme toggle.

Next steps

- If you want, I can push this branch to GitHub and open a PR with a Vercel preview request. I'll need write access or a repository to push to.
- Optionally, we can wire the demo into a Next page (`/design/tokens`) for an integrated preview.

---

## Status
- This work has been pushed to the repository `SakshamKapoor2911/BigThinkAI-Website` and merged into `master`.
- The temporary branch `agent/1-tokens` has been deleted (local and remote). The tokens and demo are available on `master`.

**Preview**: open `public/token-demo/index.html` from the repo or run a static server (e.g., `npx http-server public`) to view the interactive demo.
