Typography integration (Agent 2)

What I added:
- `src/fonts.ts` — centralizes `next/font` imports and exposes variables (`--font-sans`, `--font-serif`, `--font-mono`).
- `pages/fonts.tsx` — visual spec page showing heading, kicker, body, and monospace usage.
- `pages/_app.tsx` — applies the font variables to the app root using the `.variable` classes from `next/font`.
- Updated `src/styles/globals.css` — uses `var(--font-*)` in `font-family` and adds `.font-sans/.font-serif/.font-mono` helper classes.
- Updated `tailwind.config.ts` — uses `var(--font-*)` in the Tailwind `fontFamily` tokens.

Replacing with Geist fonts (licensed workflow):
1. Obtain `Geist Sans` and `Geist Mono` webfont files and add them to `public/fonts/`.
2. Uncomment and adapt the `localFont` example in `src/fonts.ts` to point to those files (map weights/styles).
3. Rebuild — CSS variables will now reflect the local Geist fonts.

Notes / decisions:
- `Inter` and `JetBrains Mono` are used as high-quality substitutes for development preview and are loaded from Google via `next/font/google`.
- All fonts use `display: 'swap'` to minimize layout shift.
- Acceptance criteria met: visual spec page, variables, fallback guidance, and tailwind integration.
