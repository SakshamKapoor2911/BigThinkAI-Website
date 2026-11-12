/* ── Event date helpers ───────────────────────────────────────────────
   Events carry a plain 'YYYY-MM-DD'. Parse it as local time (not UTC) so
   an event never shows up a day early for visitors behind GMT.

   Nothing here reads the clock on its own: "today" is always passed in,
   because the site is statically generated and a build-time Date would
   freeze on whatever day it was last deployed.
   ─────────────────────────────────────────────────────────────────── */

export function parseDay(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

/** "Nov 23" */
export function shortDate(iso: string) {
  const d = parseDay(iso)
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`
}

/** "Mon · Nov 23" */
export function longDate(iso: string) {
  const d = parseDay(iso)
  return `${DAYS[d.getDay()]} · ${MONTHS[d.getMonth()]} ${d.getDate()}`
}

/** Days from today to the event. Null until the client knows "today". */
export function daysAway(iso: string, today: Date | null) {
  if (today === null) return null
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return Math.round((parseDay(iso).getTime() - start.getTime()) / 86400000)
}

/** A human flag for anything inside the next week. Null if it is further out. */
export function whenLabel(delta: number | null) {
  if (delta === null) return null
  if (delta === 0) return 'Happening today'
  if (delta === 1) return 'Tomorrow'
  if (delta > 0 && delta <= 7) return `In ${delta} days`
  return null
}

/** "In 14 days" / "Today" / "Passed" — used on team pages for milestones. */
export function countdownLabel(delta: number | null) {
  if (delta === null) return null
  if (delta < 0) return 'Passed'
  if (delta === 0) return 'Today'
  if (delta === 1) return '1 day out'
  return `${delta} days out`
}
