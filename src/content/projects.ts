/* EDGE teams, 2026–2027.
   Descriptions, skills and goals are transcribed from the BigThinkAI intro
   deck; the partner framing is ours. Artwork is exported from the same deck into /public/projects.

   This data is a PARTNER-FACING showcase — it exists to show companies
   what the club builds, not to recruit students. So sector / stage /
   target / why are written for someone evaluating the work, and nothing
   here grades a project by how hard it is to join.

   Order here is display order — the first entry is what loads selected on
   the home page, and the order the team pages link through. Boldest leads. */

/* ── Team personality ────────────────────────────────────────────────
   Every team has its own page at /projects/<id>, and every page looks
   like the thing it is about. `theme` is the single key that drives it:
   the page accent, the chrome, and which ambient motif moves behind the
   title — lanternflies crawling, particles diverging from their
   prediction, a waveform with real silence in it, a HUD locking onto
   parts, a prerequisite graph resolving node by node.

   Defined in two places, both keyed off this string:
     · components/projects/ProjectMotif.tsx  — the motif itself
     · src/styles/globals.css, .proj[data-theme='…']  — accent + chrome
   ──────────────────────────────────────────────────────────────────── */
export type ProjectTheme =
  | 'lantern'
  | 'worldmodel'
  | 'heartbeat'
  | 'jarvis'
  | 'advisor'

export type Project = {
  /** Also the URL: /projects/<id> */
  id: string
  name: string
  /** Short form for the home-page rail, where space is tight. */
  railLabel: string
  theme: ProjectTheme
  image: string
  imageAlt: string
  /** One line, in the team's own voice, for the top of its page. */
  blurb: string
  description: string
  /** The field a partner would file this under. Two or three words. */
  sector: string
  /** Where the work actually is: Scoping, Building, Submitting, Deployed. */
  stage: string
  /** The external thing it is aimed at — a venue, a demo, a deployment. */
  target: string
  /** Why it matters outside the club. Written for a partner, not a recruit. */
  why: string
  /** A page on this site showing the work itself. Only some teams have one. */
  demo?: { href: string; label: string }
  /** The technical approach — methods and stack the team works in. */
  skills: string[]
  goal: string
}

export const PROJECTS: Project[] = [
  {
    id: 'project-lantern',
    name: 'Project Lantern',
    railLabel: 'Project Lantern',
    theme: 'lantern',
    image: '/projects/lantern.jpg',
    imageAlt: 'Spotted lanternfly',
    blurb: 'Find the lanternflies. Then work out where they are going next.',
    description:
      'Lanternflies are tearing through Maryland’s vineyards and orchards, and detection is still people filing sightings by hand. We automate it: find them, track the spread, predict where they hit next.',
    sector: 'Agriculture · Invasive species',
    stage: 'Scoping',
    target: 'Field detection & spread forecasting',
    why:
      'Growers and agencies work off scattered hand-filed sightings. Detection plus a forecast gives them a map they can act on before an infestation sets in.',
    skills: [
      'Object detection & computer vision',
      'Edge / on-device model deployment',
      'Dataset curation & annotation',
      'Spatiotemporal forecasting',
      'Geospatial data & GIS',
      'Data pipelines from public sources',
      'Model evaluation against real-world ground truth',
    ],
    goal: 'Detect lanternflies early, predict where they spread.',
  },
  {
    id: 'world-model-benchmark',
    name: 'World Model Benchmark',
    railLabel: 'World Model',
    theme: 'worldmodel',
    image: '/projects/worldmodel.jpg',
    imageAlt: 'A figure watching an orbital system',
    blurb:
      'Does the model actually know physics, or does it only look like it does?',
    description:
      'We’re building the first world model benchmark that measures with particle-level ground truth instead of a VLM’s opinion, to find out where world models stop being physics engines.',
    sector: 'AI evaluation · World models',
    stage: 'Building',
    target: 'WACV 2027 workshop paper',
    why:
      'Anyone deploying a world model needs to know where its physics stops holding. Today’s evaluations ask another model for an opinion. Particle-level ground truth gives a number you can hold a system to.',
    skills: [
      'Video & vision-language models',
      'World model evaluation',
      'Multimodal AI',
      'Temporal reasoning',
      'Physical / causal reasoning',
      'Benchmark & dataset design',
      'Model evaluation & metrics',
      'Experimental research',
    ],
    goal: 'Submit to the WACV 2027 workshop, due 11/23.',
  },
  {
    id: 'heartbeat-challenge',
    name: 'HEARTBEAT Challenge',
    railLabel: 'HEARTBEAT',
    theme: 'heartbeat',
    image: '/projects/heartbeat.jpg',
    imageAlt: 'A face dissolving into a waveform',
    blurb:
      'Audio agents that know when to speak, when to act, and when to stay quiet.',
    description:
      'Audio agents that know when to speak, when to act, and when to stay quiet. We train on live conversation and environmental sound, then compete in the HEARTBEAT ICASSP 2027 Challenge.',
    sector: 'Audio AI · Conversational agents',
    stage: 'Building',
    target: 'ICASSP 2027 challenge entry',
    demo: { href: '/heartbeat', label: 'See the results' },
    why:
      'Voice products fail in the same place: they talk over people and miss the room. Knowing when to stay quiet is what makes an audio agent usable, and it is what this challenge measures.',
    skills: [
      'Audio & speech AI',
      'Audio event detection',
      'Multimodal / acoustic ML',
      'Transformer & foundation models',
      'Temporal sequence modeling',
      'Model training & fine-tuning',
      'AI agent decision-making',
      'Evaluation & benchmarking',
      'Real-time AI systems',
    ],
    goal: 'Submit to either track of the challenge, due 12/11.',
  },
  {
    id: 'assembly-jarvis',
    name: 'Assembly Jarvis',
    railLabel: 'Assembly Jarvis',
    theme: 'jarvis',
    image: '/projects/jarvis.jpg',
    imageAlt: 'A workshop with robotic arms mid-assembly',
    blurb:
      'An assistant that watches you build and talks you through it, all on your own device.',
    description:
      'A local multimodal assistant that watches a physical assembly and guides each step. It identifies parts, answers questions, tracks progress, and catches mistakes in real time. The camera feed and the model never leave the device.',
    sector: 'Industrial AI · On-device multimodal',
    stage: 'Building',
    target: 'Live on-device demo',
    why:
      'Guided assembly, field service and training all want an assistant that can see the work. Keeping the camera and the model on-device makes that possible where streaming video off-site is not: a factory floor, or anywhere footage cannot leave the building.',
    skills: [
      'Multimodal AI / Vision-Language Models (VLMs)',
      'Local LLM & VLM deployment',
      'Computer vision & object recognition',
      'Visual state tracking',
      'Voice / speech interfaces',
      'Prompt engineering & tool use',
      'AI agents & task planning',
      'Real-time AI systems',
    ],
    goal: 'Demo a working multimodal system in real time.',
  },
  {
    id: 'umd-ai-advisor',
    name: 'UMD AI Advisor',
    railLabel: 'UMD AI Advisor',
    theme: 'advisor',
    image: '/projects/advisor.jpg',
    imageAlt: 'McKeldin Library and the UMD mall',
    blurb:
      'Every UMD requirement, prerequisite and catalog page, in one conversation.',
    description:
      'UMD’s requirements, prerequisites and catalog pages are scattered across dozens of sites. We turn them into one conversation: what you can take, how prerequisites chain, what a multi-semester plan looks like. RAG grounds every answer in official pages, not the model’s memory.',
    sector: 'Applied RAG · Institutional knowledge',
    stage: 'Building',
    target: 'Deployed tool, 100 students',
    why:
      'The hard part is not the chat interface. It is grounding answers in scattered, frequently changing documents without inventing a requirement. Same shape for any organization sitting on policy pages.',
    skills: [
      'Retrieval-Augmented Generation (RAG)',
      'LLM prompting & response generation',
      'Web scraping & data preprocessing',
      'Embeddings & vector databases',
      'Knowledge graphs / prerequisite graphs',
      'Information retrieval & ranking',
      'Building an end-to-end AI application',
      'UI / chatbot development',
    ],
    goal: 'A deployed system 100 students use to get information quickly.',
  },
]

/** Look a team up by its URL segment. */
export function projectById(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id)
}

/** The team before and after this one, wrapping, for page-to-page paging. */
export function projectNeighbours(id: string) {
  const i = PROJECTS.findIndex((p) => p.id === id)
  if (i < 0) return { prev: undefined, next: undefined }
  const len = PROJECTS.length
  return {
    prev: PROJECTS[(i - 1 + len) % len],
    next: PROJECTS[(i + 1) % len],
  }
}
