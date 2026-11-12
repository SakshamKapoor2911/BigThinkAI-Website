# Design Tokens — BigThinkAI

This document lists the CSS tokens introduced by Agent 1. Use these in components and Tailwind via CSS variables.

## Core Tokens
- `--color-background` — Page background (Alabaster)
- `--color-foreground` — Primary text color
- `--color-primary` — Primary accent (refined blue `#2563EB`)
- `--color-primary-rgb` — RGB version for shadows (`37, 99, 235`)
- `--color-card` — Surface / card background
- `--color-muted` — Secondary UI backgrounds
- `--color-border` — Subtle separators

## Semantic Tokens
- `--color-destructive` — Error / overdue (crimson ink) `#BE123C`
- `--color-warning` — Warning / due soon `#B45309`
- `--color-success` — Success / done `#047857`

## Radius & Texture
- `--radius-bento` — Card radius (`0.9rem`)
- `--film-grain-opacity` — Film grain opacity (`0.035`)
- `--dot-grid-size` — Dot grid spacing (`10px`)

## Usage Notes
- Prefer `bg-primary` / `text-primary` in Tailwind by referring to `color.primary` defined in `tailwind.config.ts` (which maps to the var).
- For shadows that require the primary color use `rgba(var(--color-primary-rgb), .28)`.
- Keep tokens in `globals.css` and reference them in component-level CSS for consistency.

## Acceptance Criteria (Agent 1)
- Tailwind config reads colors from CSS variables and exposes `primary`, `foreground`, `background`, etc.
- `globals.css` contains tokens, example utilities (`.btn-primary`, `.card`, `.kicker`).
- A minimal visual demo (token switcher) exists under `public/token-demo/` for quick validation.
