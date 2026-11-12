Agent 3 — Header / Navigation & Glassmorphism

## What was implemented:
- `components/Navigation.tsx` — React component implementing:
  - Pill-shaped glassmorphism nav with `backdrop-filter: blur(40px)`
  - Scroll scaling (0.96 for 100-400px, 0.94 for >400px)
  - Mobile hamburger toggle with full accessibility
  - ARIA roles (`navigation`, `menubar`, `menuitem`)
  - Escape-to-close and click-outside-close for mobile UX
  - Built-in smoke test runner for quick validation
- `components/__tests__/Navigation.test.tsx` — Jest/RTL unit tests covering:
  - Navigation role and aria-label
  - Toggle expand/collapse behavior
  - Escape key closes menu
  - Scroll updates scale attributes
- `pages/index.tsx` — Single-page site with Navigation integrated
- `src/styles/globals.css` — Added `scroll-behavior: smooth;` for anchor links
- `jest.setup.ts` — Added `window.matchMedia` mock for JSDOM compatibility
- `jest.config.cjs` — Configured ts-jest with `jsx: 'react-jsx'` for TSX support

## How to test locally:
1. `npm install && npm run dev`
2. Open http://localhost:3000/ and verify the floating nav
3. Scroll down — nav should scale to 0.96 then 0.94
4. Click nav links — page should smoothly scroll to sections
5. Test mobile menu: resize window, click hamburger, press Escape

## Run unit tests:
```bash
npm test
```

## Acceptance criteria:
- ✅ Accessible header with ARIA roles
- ✅ Glassmorphism styling with backdrop-filter
- ✅ Scroll-based scaling animations
- ✅ Keyboard accessibility (Escape to close, focus management)
- ✅ Unit tests passing (4/4)
- ✅ Mobile responsive toggle

Branch: `agent/3-navigation`