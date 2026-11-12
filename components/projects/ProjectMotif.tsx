import type { CSSProperties } from 'react'
import type { ProjectTheme } from '../../src/content/projects'

/* ════════════════════════════════════════════════════════════════════
   PROJECT MOTIFS — the artwork, brought to life

   Each EDGE team page is built around its own piece of art from the
   deck, full bleed, and this is the layer that moves inside it. The
   motifs are not generic ornament: they are registered to the picture.

   Every registered motif draws in ART_W × ART_H — the artwork's own
   pixel space. The scene plate is sized to exactly that aspect ratio,
   so an SVG with this viewBox lands on the thing it is pointing at: a
   HUD box on the actual robot arm, a map node on the actual walkway,
   an orbit centred on the actual sun.

   All of it is decorative — the wrapper is aria-hidden and
   pointer-events: none, nothing carries information, and
   `prefers-reduced-motion` parks every piece (end of globals.css).

   Pure SVG + CSS. No canvas, no animation library, no image bytes, and
   no randomness, so the server and the client render the same markup.
   ════════════════════════════════════════════════════════════════════ */

const ART_W = 1400
const ART_H = 787
const ART_BOX = `0 0 ${ART_W} ${ART_H}`

/** Inline CSS custom properties, which React's types do not cover. */
const vars = (v: Record<string, string | number>) => v as CSSProperties

export default function ProjectMotif({ theme }: { theme: ProjectTheme }) {
  return (
    <div className="motif" data-motif={theme} aria-hidden="true">
      {theme === 'lantern' && <Lanternflies />}
      {theme === 'worldmodel' && <Orbits />}
      {theme === 'heartbeat' && <SignalRead />}
      {theme === 'jarvis' && <Hud />}
      {theme === 'advisor' && <CampusRoutes />}
    </div>
  )
}

/* ── PROJECT LANTERN ─────────────────────────────────────────────────
   The art is a swarm: flat teal lanternflies on near-black, one of
   them lit scarlet. So the page keeps swarming — live flies crawl over
   the still ones in the picture, drawn in the same teal, and a few
   startle and flash the scarlet that the lit one is wearing.

   Over the top, the other half of the brief: slow scarlet blooms
   opening where a sighting would spread from.
   ─────────────────────────────────────────────────────────────────── */

type FlySpec = {
  x: number       // start, % of the plate
  y: number
  w: number       // body length, px
  r: number       // heading, deg
  dx: number      // distance travelled along that heading, px
  t: number       // seconds for the trip
  d: number       // start delay, seconds
  flick?: boolean // flashes its hindwings
}

const FLIES: FlySpec[] = [
  { x: 2,  y: 64, w: 50, r: -5,   dx: 340,  t: 30, d: 0,  flick: true },
  { x: 80, y: 13, w: 34, r: 171,  dx: -250, t: 38, d: 4 },
  { x: 31, y: 85, w: 27, r: 9,    dx: 210,  t: 25, d: 9 },
  { x: 71, y: 70, w: 42, r: -151, dx: -190, t: 43, d: 2,  flick: true },
  { x: 11, y: 24, w: 23, r: 26,   dx: 165,  t: 28, d: 15 },
  { x: 93, y: 50, w: 31, r: 194,  dx: -205, t: 34, d: 7 },
  { x: 45, y: 7,  w: 21, r: -17,  dx: 145,  t: 32, d: 19 },
  { x: 60, y: 93, w: 36, r: -169, dx: -230, t: 40, d: 12, flick: true },
]

/** Where a sighting opens up and spreads from. */
const BLOOMS = [
  { x: 74, y: 30, s: 1,    d: 0 },
  { x: 88, y: 64, s: 0.72, d: 3.4 },
  { x: 57, y: 18, s: 0.55, d: 6.8 },
]

function Lanternflies() {
  return (
    <>
      {BLOOMS.map((b, i) => (
        <span
          className="bloom"
          key={`bloom-${i}`}
          style={vars({ '--x': `${b.x}%`, '--y': `${b.y}%`, '--s': b.s, '--d': `${b.d}s` })}
        >
          <span className="bloom__ring" />
          <span className="bloom__ring" style={vars({ '--o': '1.6s' })} />
          <span className="bloom__core" />
        </span>
      ))}

      {FLIES.map((f, i) => (
        <span
          className="fly"
          key={`fly-${i}`}
          style={vars({
            '--x': `${f.x}%`,
            '--y': `${f.y}%`,
            '--w': `${f.w}px`,
            '--r': `${f.r}deg`,
            '--dx': `${f.dx}px`,
            '--t': `${f.t}s`,
            '--d': `${f.d}s`,
          })}
        >
          <Fly flick={f.flick} />
        </span>
      ))}

      {/* one perched on the frame, going nowhere, just breathing */}
      <span
        className="fly fly--perched"
        style={vars({ '--x': '87%', '--y': '82%', '--w': '58px', '--r': '-13deg' })}
      >
        <Fly flick />
      </span>
    </>
  )
}

function Fly({ flick }: { flick?: boolean }) {
  return (
    <svg
      className={`fly__svg${flick ? ' fly__svg--flick' : ''}`}
      viewBox="0 0 62 40"
      role="presentation"
    >
      {/* scarlet hindwings — folded away until it startles */}
      <g className="fly__hind">
        <path d="M14 18 C18 5 32 -1 49 4 C41 14 28 18 16 19 Z" />
        <path d="M14 22 C18 35 32 41 49 36 C41 26 28 22 16 21 Z" />
        <circle cx="27" cy="9" r="1.5" />
        <circle cx="36" cy="7" r="1.2" />
        <circle cx="27" cy="31" r="1.5" />
        <circle cx="36" cy="33" r="1.2" />
      </g>

      {/* legs, three a side, bent at the knee */}
      <g className="fly__legs">
        <path d="M44 9.5 L49.5 4.2 L55.5 2.2" />
        <path d="M33 7.6 L33.8 2.2 L30 0.4" />
        <path d="M22 11 L17.6 5.2 L11.5 2.8" />
        <path d="M44 30.5 L49.5 35.8 L55.5 37.8" />
        <path d="M33 32.4 L33.8 37.8 L30 39.6" />
        <path d="M22 29 L17.6 34.8 L11.5 37.2" />
      </g>

      {/* forewings, tented over the back */}
      <g className="fly__fore">
        <path d="M8 19.2 C11 11 19 7.4 29 7 C42 6.5 50 10.8 53 16.6 L53 19.2 Z" />
        <path d="M8 20.8 C11 29 19 32.6 29 33 C42 33.5 50 29.2 53 23.4 L53 20.8 Z" />
      </g>

      {/* the reticulated rear third */}
      <g className="fly__retic">
        <path d="M8 19.2 C9.2 14.6 12.4 11.4 16.4 9.6 L20 18.9 Z" />
        <path d="M8 20.8 C9.2 25.4 12.4 28.6 16.4 30.4 L20 21.1 Z" />
      </g>

      {/* the spots it is named for */}
      <g className="fly__spots">
        <circle cx="26" cy="12" r="1.6" />
        <circle cx="34" cy="11" r="1.5" />
        <circle cx="42" cy="13" r="1.3" />
        <circle cx="30" cy="16" r="1.1" />
        <circle cx="38.5" cy="16.2" r="0.95" />
        <circle cx="21.5" cy="15" r="0.9" />
        <circle cx="26" cy="28" r="1.6" />
        <circle cx="34" cy="29" r="1.5" />
        <circle cx="42" cy="27" r="1.3" />
        <circle cx="30" cy="24" r="1.1" />
        <circle cx="38.5" cy="23.8" r="0.95" />
        <circle cx="21.5" cy="25" r="0.9" />
      </g>

      {/* the seam where the wings meet, then thorax and head */}
      <rect className="fly__seam" x="8" y="19.2" width="45" height="1.6" rx="0.8" />
      <ellipse className="fly__thorax" cx="50" cy="20" rx="5" ry="3.1" />
      <circle className="fly__head" cx="56" cy="20" r="2.6" />
      <g className="fly__ant">
        <path d="M57.6 18.5 L61.4 15.2" />
        <path d="M57.6 21.5 L61.4 24.8" />
      </g>
    </svg>
  )
}

/* ── WORLD MODEL BENCHMARK ───────────────────────────────────────────
   The art is a figure watching an orbital system. So the page gives it
   a second set of orbits: the true one, and the one a model predicted.

   Each ring is a plain circle inside a group that is rotated and
   squashed — which is what an orbit seen on the tilt actually is — and
   the two groups turn at slightly different rates. They leave together,
   drift apart, and come back. That drift is the entire benchmark.

   Sun centre and tilt are read off the painting itself.
   ─────────────────────────────────────────────────────────────────── */

const SUN = { x: 783, y: 320 }

type OrbitSpec = {
  r: number        // radius before the squash
  squash: number   // how far over the orbit is tilted
  tilt: number     // deg, matched to the plane in the painting
  spin: number     // seconds for one lap
  kind: 'true' | 'pred'
  dot: number      // dot radius
}

const ORBITS: OrbitSpec[] = [
  { r: 250, squash: 0.27, tilt: 16, spin: 27, kind: 'true', dot: 7 },
  { r: 258, squash: 0.31, tilt: 20, spin: 23, kind: 'pred', dot: 7 },
  { r: 520, squash: 0.29, tilt: 17, spin: 52, kind: 'true', dot: 9 },
  { r: 548, squash: 0.34, tilt: 21, spin: 44, kind: 'pred', dot: 9 },
]

function Orbits() {
  return (
    <svg className="orbits" viewBox={ART_BOX} role="presentation">
      {ORBITS.map((o, i) => (
        <g
          key={i}
          transform={`translate(${SUN.x} ${SUN.y}) rotate(${o.tilt}) scale(1 ${o.squash})`}
        >
          {/* The ring and its body spin together. They have to live in
              the same group for the rotation to be about the orbit's
              centre: transform-box: fill-box measures the group's own
              bounding box, and the invisible square below is what makes
              that box symmetric about the centre. Without it the dot
              alone would drag the box sideways and the orbit would
              wobble. (A circle looks the same rotated; the dashed ring
              just sends its dashes travelling, which is a bonus.) */}
          <g
            className={`orbit__spin orbit__spin--${o.kind}`}
            style={vars({ '--spin': `${o.spin}s` })}
          >
            <rect
              className="orbit__box"
              x={-o.r - 40}
              y={-o.r - 40}
              width={o.r * 2 + 80}
              height={o.r * 2 + 80}
            />
            <circle
              className={`orbit__ring orbit__ring--${o.kind}`}
              cx="0"
              cy="0"
              r={o.r}
              vectorEffect="non-scaling-stroke"
            />
            {/* counter-squashed, so the body stays round on the tilt */}
            <g transform={`translate(${o.r} 0) scale(1 ${(1 / o.squash).toFixed(3)})`}>
              <circle
                className={`orbit__dot orbit__dot--${o.kind}`}
                r={o.dot}
                vectorEffect="non-scaling-stroke"
              />
            </g>
          </g>
        </g>
      ))}
    </svg>
  )
}

/* ── HEARTBEAT CHALLENGE ─────────────────────────────────────────────
   The art is already a waveform — a face shouting into one. Drawing a
   second waveform on top would just be noise, so the page makes the one
   that is there live: a read head sweeps the picture left to right, a
   meter answers it, and a ruler runs the length of the stream.
   ─────────────────────────────────────────────────────────────────── */

/* The two stretches where the painted waveform actually goes quiet,
   in the artwork's own coordinates. The reader marks them as it passes:
   the delays below are when the sweep reaches each one. */
const QUIET = [
  { x: 396, w: 136, y: 384, d: 3.1 },
  { x: 950, w: 74,  y: 384, d: 7.8 },
]

function SignalRead() {
  return (
    <>
      {/* the window being read right now, and its leading edge */}
      <span className="read">
        <span className="read__band" />
        <span className="read__head" />
      </span>

      {/* brackets that close around the silence as the reader finds it */}
      <svg className="quiets" viewBox={ART_BOX} role="presentation">
        {QUIET.map((q, i) => (
          <g className="quiet" key={i} style={vars({ '--d': `${q.d}s` })}>
            <path
              className="quiet__mark"
              d={`M${q.x + 14} ${q.y - 26} H${q.x} V${q.y + 26} H${q.x + 14}`}
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="quiet__mark"
              d={`M${q.x + q.w - 14} ${q.y - 26} H${q.x + q.w} V${q.y + 26} H${q.x + q.w - 14}`}
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="quiet__base"
              d={`M${q.x} ${q.y} H${q.x + q.w}`}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>
    </>
  )
}

/* ── ASSEMBLY JARVIS ─────────────────────────────────────────────────
   The art is a workshop: an arm, a half-built housing, a bench covered
   in stock and gears, a display on the wall. The page puts the
   assistant's own view over it — so the boxes are not floating
   anywhere, they are on those things. Every rectangle below is a real
   object in the painting.
   ─────────────────────────────────────────────────────────────────── */

type BoxSpec = {
  x: number
  y: number
  w: number
  h: number
  t: number     // seconds for lock → hold → release
  d: number
  tag: string
}

const BOXES: BoxSpec[] = [
  { x: 620,  y: 355, w: 200, h: 155, t: 9,  d: 0,   tag: 'Arm' },
  { x: 835,  y: 200, w: 205, h: 420, t: 11, d: 2.6, tag: 'Housing' },
  { x: 1125, y: 50,  w: 255, h: 245, t: 10, d: 5.2, tag: 'Display' },
  { x: 340,  y: 525, w: 240, h: 165, t: 12, d: 1.4, tag: 'Stock' },
  { x: 1130, y: 595, w: 230, h: 165, t: 9,  d: 7.1, tag: 'Gears' },
  { x: 215,  y: 600, w: 165, h: 135, t: 10, d: 3.8, tag: 'Clamp' },
  { x: 690,  y: 655, w: 175, h: 105, t: 8,  d: 6.3, tag: 'Parts' },
]

const BRACKET = 28

/** The four corner brackets of a box, as four path strings. */
function corners(b: BoxSpec) {
  const { x, y, w, h } = b
  const L = BRACKET
  return [
    `M${x} ${y + L} V${y} H${x + L}`,
    `M${x + w - L} ${y} H${x + w} V${y + L}`,
    `M${x + w} ${y + h - L} V${y + h} H${x + w - L}`,
    `M${x + L} ${y + h} H${x} V${y + h - L}`,
  ]
}

function Hud() {
  return (
    <svg className="hud" viewBox={ART_BOX} role="presentation">
      <g className="hud-scan">
        <rect className="hud-scan__wash" x="0" y={-150} width={ART_W} height="150" />
        <rect className="hud-scan__edge" x="0" y={-3} width={ART_W} height="3" />
      </g>

      {BOXES.map((b, i) => (
        <g
          className="hud-box"
          key={i}
          style={vars({ '--t': `${b.t}s`, '--d': `${b.d}s`, '--cx': `${b.x + b.w / 2}px`, '--cy': `${b.y + b.h / 2}px` })}
        >
          {corners(b).map((d, j) => (
            <path className="hud-box__corner" d={d} key={j} vectorEffect="non-scaling-stroke" />
          ))}
          <text className="hud-box__tag" x={b.x} y={b.y - 12}>
            {b.tag}
          </text>
        </g>
      ))}

      <g className="hud-reticle">
        <circle className="hud-reticle__ring" r="34" vectorEffect="non-scaling-stroke" />
        <path className="hud-reticle__cross" d="M0 -48 V-16 M0 16 V48 M-48 0 H-16 M16 0 H48" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  )
}

/* ── UMD AI ADVISOR ──────────────────────────────────────────────────
   The art is the mall in front of McKeldin, with students on every
   path. The page draws the thing the advisor is actually walking —
   a prerequisite chain — as a route network over those paths, and
   sends pulses up them to the library. Every node sits on a walkway,
   a bench cluster, the fountain or the steps in the painting.
   ─────────────────────────────────────────────────────────────────── */

const STOPS = {
  farLeft:    { x: 62,   y: 662 },
  leftPath:   { x: 178,  y: 578 },
  benchLeft:  { x: 302,  y: 692 },
  treeWalk:   { x: 392,  y: 582 },
  steps:      { x: 520,  y: 642 },
  fountain:   { x: 668,  y: 694 },
  library:    { x: 700,  y: 540 },
  rightWalk:  { x: 1000, y: 586 },
  benchRight: { x: 952,  y: 682 },
  rightPath:  { x: 1152, y: 578 },
  farRight:   { x: 1332, y: 690 },
} as const

type StopId = keyof typeof STOPS

/* Each edge is a stretch of walkway. Depth is how far along the chain
   the pulse has travelled, which also decides when a stop lights. */
const ROUTES: { from: StopId; to: StopId; depth: number }[] = [
  { from: 'farLeft',    to: 'leftPath',   depth: 0 },
  { from: 'benchLeft',  to: 'leftPath',   depth: 0 },
  { from: 'farRight',   to: 'rightPath',  depth: 0 },
  { from: 'benchRight', to: 'rightWalk',  depth: 0 },
  { from: 'leftPath',   to: 'treeWalk',   depth: 1 },
  { from: 'benchLeft',  to: 'steps',      depth: 1 },
  { from: 'rightPath',  to: 'rightWalk',  depth: 1 },
  { from: 'treeWalk',   to: 'steps',      depth: 2 },
  { from: 'fountain',   to: 'steps',      depth: 2 },
  { from: 'rightWalk',  to: 'fountain',   depth: 2 },
  { from: 'steps',      to: 'library',    depth: 3 },
  { from: 'fountain',   to: 'library',    depth: 3 },
]

const STOP_DEPTH: Record<StopId, number> = {
  farLeft: 0, benchLeft: 0, farRight: 0, benchRight: 0,
  leftPath: 1, rightPath: 1,
  treeWalk: 2, rightWalk: 2,
  steps: 3, fountain: 3,
  library: 4,
}

function CampusRoutes() {
  const paths = ROUTES.map((r) => {
    const a = STOPS[r.from]
    const b = STOPS[r.to]
    // bow each run a little, the way a path across a lawn actually goes
    const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.1
    const my = (a.y + b.y) / 2 + (b.x - a.x) * 0.06
    return { d: `M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`, depth: r.depth }
  })

  return (
    <svg className="routes" viewBox={ART_BOX} role="presentation">
      <g className="routes__base">
        {paths.map((p, i) => (
          <path d={p.d} key={`b-${i}`} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      <g className="routes__pulses">
        {paths.map((p, i) => (
          <path
            className="routes__pulse"
            d={p.d}
            pathLength={100}
            key={`p-${i}`}
            vectorEffect="non-scaling-stroke"
            style={vars({ '--d': `${p.depth * 1.15 + (i % 3) * 0.18}s` })}
          />
        ))}
      </g>

      <g className="routes__stops">
        {(Object.keys(STOPS) as StopId[]).map((id) => {
          const s = STOPS[id]
          const lit = STOP_DEPTH[id]
          return (
            <g key={id} style={vars({ '--d': `${lit * 1.15 + 0.9}s` })}>
              <circle className="stop__halo" cx={s.x} cy={s.y} r="20" />
              <circle className="stop__ring" cx={s.x} cy={s.y} r="11" vectorEffect="non-scaling-stroke" />
              <circle className="stop__core" cx={s.x} cy={s.y} r="4.5" />
              {id === 'library' && (
                <circle className="stop__goal" cx={s.x} cy={s.y} r="22" vectorEffect="non-scaling-stroke" />
              )}
            </g>
          )
        })}
      </g>
    </svg>
  )
}
