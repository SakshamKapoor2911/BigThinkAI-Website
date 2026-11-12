/* Centralized font loading via next/font.

   The type system mirrors the BigThinkAI deck:
   - Josefin Sans (thin, wide-tracked, uppercase) ....... display headings
   - Oswald (bold condensed) ........................... labels, kickers, buttons
   - JetBrains Mono .................................... body copy & technical text

   All three are variable fonts, so no `weight` array is needed — the full
   range is available and next/font self-hosts them (no layout shift, no
   external request at runtime).
*/

import { Josefin_Sans, Oswald, JetBrains_Mono } from 'next/font/google'

// Display — hero wordmark, section titles, project names. Always uppercase,
// always widely tracked. Thin weights (200/300) carry the brand.
export const josefin = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

// Label — kickers, skill-level tags, buttons, nav. Condensed and loud.
export const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-label',
  display: 'swap',
})

// Body — descriptions, mission copy, metadata. The deck sets everything
// technical in mono; so does the site.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})
