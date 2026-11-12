/* Club facts and links.
   Everything here comes from the BigThinkAI intro deck or the club's
   official listing — edit this file, not the components. */

export const CLUB = {
  name: 'BigThink AI',
  tagline: 'Think Big',
  mission: 'To push beyond the frontier of AI',
  school: 'University of Maryland',
  location: 'College Park, MD 20742',
  email: 'bigthinkai@gmail.com',
  purpose:
    'We take students from knowing nothing about AI to shipping something real.',
} as const

/* Intake state. EDGE applications for the 2026-27 cohort closed on 9/24.
   Flip this to true when the next cycle opens and the Join section switches
   from "closed, watch Discord" back to a live link to the form. */
export const EDGE_APPLICATIONS_OPEN: boolean = false

export const LINKS = {
  discord: 'https://discord.gg/CC6ZQ4cnkn',
  instagram: 'https://www.instagram.com/bigthinkai/',
  edgeApplication: 'https://forms.gle/Q5zeqbd2UFwzD5gV6',
  leadershipApplication: 'https://forms.gle/MMpdyPmkhaHidDHR6',
} as const

/* What the club runs, per the "What do we do?" slide. */
export const PILLARS = [
  {
    index: '01',
    name: 'Workshops',
    desc: 'Weekly, hands-on, no background needed.',
    facts: [
      'One hour, every week',
      'Non-technical → technical across the series',
      'Starter code provided for every session',
    ],
  },
  {
    index: '02',
    name: 'EDGE',
    desc: 'Semester-long team projects. Students own them end to end.',
    facts: [
      'Weekly one-hour build session',
      'Small teams, end-to-end development',
      'Ships a paper, a benchmark, or a deployed tool',
    ],
  },
  {
    index: '03',
    name: 'Events',
    desc: 'Talks, demos, and the people you build with.',
    facts: [
      'Speaker sessions and discussions',
      'Project demos and showcases',
      'Socials across teams',
    ],
  },
] as const

/* Why join EDGE / what we look for — from the recruitment slide. */
export const EDGE_PITCH = {
  why: [
    'A team of people who move fast',
    'Projects that solve real problems',
    'Full ownership, end to end',
    'Recognition for the work',
  ],
  looking: [
    'You ship end-to-end projects, fast',
    'You know the domain, or you ramp up quickly',
  ],
} as const

/* ── Upcoming events ──────────────────────────────────────────────
   Add an event here and it appears in "What's Next". The soonest one
   with a poster becomes the featured card; anything whose date has
   passed drops off the list on its own.

   date  — ISO 'YYYY-MM-DD', the day it happens (or is due)
   poster — optional 4:5 graphic in /public/events
   ─────────────────────────────────────────────────────────────── */

export type EventKind = 'workshop' | 'deadline' | 'speaker' | 'social'

export type ClubEvent = {
  id: string
  title: string
  date: string
  time?: string
  location?: string
  kind: EventKind
  poster?: string
  posterAlt?: string
  note?: string
  /** Project id from projects.ts — the date then also shows on that team's page. */
  projectId?: string
}

export const EVENT_KIND_LABEL: Record<EventKind, string> = {
  workshop: 'Workshop',
  deadline: 'Deadline',
  speaker: 'Speaker',
  social: 'Social',
}

export const EVENTS: ClubEvent[] = [
  {
    id: 'rl-workshop',
    title: 'Reinforcement Learning',
    date: '2026-10-07',
    time: '5:00–6:00 PM',
    location: 'ARM 0131',
    kind: 'workshop',
    poster: '/events/reinforcement-learning.jpg',
    posterAlt: 'Reinforcement Learning workshop poster',
    note: 'Agents, rewards, and trial and error. No background needed. Starter code provided.',
  },
  {
    id: 'wacv-submission',
    title: 'WACV Submission',
    date: '2026-11-23',
    kind: 'deadline',
    projectId: 'world-model-benchmark',
    note: 'World Model Benchmark targets the WACV 2027 workshop.',
  },
  {
    id: 'heartbeat-submission',
    title: 'HEARTBEAT Submission',
    date: '2026-12-11',
    kind: 'deadline',
    projectId: 'heartbeat-challenge',
    note: 'HEARTBEAT team submits to the ICASSP 2027 challenge.',
  },
]

/* What runs every week, regardless of what is on the calendar. */
export const CADENCE = [
  {
    what: 'Workshop',
    note: 'One hour, hands-on, open to everyone.',
  },
  {
    what: 'EDGE Build',
    note: 'One hour per team, every week of the semester.',
  },
] as const
