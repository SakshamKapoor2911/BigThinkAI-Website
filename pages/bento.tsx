import Head from 'next/head'
import { useState } from 'react'
import BentoCard from '../components/BentoCard'

type Project = {
  title: string
  description: string
  tags: string[]
  variant?: 'content' | 'gallery' | 'featured'
  colorA: string
  colorB: string
}

function makePlaceholderImageDataUrl(project: Pick<Project, 'title' | 'colorA' | 'colorB'>) {
  // Small inline SVG so `/bento` doesn't rely on missing JPG/PNG assets in `public/`.
  const safeTitle = project.title.replace(/[<>&"]/g, '')
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${project.colorA}"/>
        <stop offset="1" stop-color="${project.colorB}"/>
      </linearGradient>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 0.12 0"/>
      </filter>
    </defs>
    <rect width="800" height="500" fill="url(#g)"/>
    <rect width="800" height="500" filter="url(#grain)" opacity="0.35"/>
    <g fill="rgba(255,255,255,0.92)">
      <text x="50" y="120" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, monospace" font-size="20" font-weight="700" opacity="0.9">${safeTitle}</text>
    </g>
    <g opacity="0.18" stroke="rgba(255,255,255,0.9)" stroke-width="2">
      <path d="M50 280 H750"/>
      <path d="M120 340 H680"/>
    </g>
  </svg>
  `.trim()

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export default function BentoPage() {
  const [reduced, setReduced] = useState(false)
  const [intensity, setIntensity] = useState(18)

  const projects: Project[] = [
    {
      title: 'Vex Voodoo Recommendation Engine',
      description:
        'Builds an agent-based AI system that generates architecture recommendations by combining recommender systems with autonomous reasoning.',
      tags: ['multi-agent systems', 'recommender systems', 'AI architecture'],
      variant: 'content',
      colorA: '#2563EB',
      colorB: '#0EA5E9',
    },
    {
      title: 'Skin Lesion Analysis',
      description:
        'Uses JEPA-based self-supervised learning to align medical images and improve skin cancer diagnosis accuracy.',
      tags: ['self-supervised learning', 'medical AI', 'computer vision'],
      variant: 'gallery',
      colorA: '#DC2626',
      colorB: '#F97316',
    },
    {
      title: 'AI Dungeon Master',
      description:
        'Creates a real-time storytelling agent that adapts narratives dynamically based on player input and persistent world state.',
      tags: ['LLM agents', 'interactive systems', 'game AI'],
      variant: 'featured',
      colorA: '#6366F1',
      colorB: '#8B5CF6',
    },
    {
      title: 'Autonomous Warehouse Route Planner',
      description:
        'Trains reinforcement learning agents to optimize multi-robot navigation and logistics in warehouse environments.',
      tags: ['reinforcement learning', 'robotics', 'optimization'],
      variant: 'content',
      colorA: '#059669',
      colorB: '#22C55E',
    },
    {
      title: 'AI Medical Report Summarizer & Risk Flagger',
      description:
        'Develops an LLM-powered system to summarize complex medical reports and identify potential health risks using RAG and tool-augmented reasoning.',
      tags: ['NLP', 'LLMs', 'healthcare AI'],
      variant: 'gallery',
      colorA: '#B45309',
      colorB: '#F59E0B',
    },
  ]

  return (
    <>
      <Head>
        <title>Bento Card Demo · BigThinkAI</title>
      </Head>
      <main style={{ padding: '4rem', maxWidth: 1100, margin: '0 auto' }}>
        <h1 className="h1-serif">Bento Cards · Motion & Variants</h1>
        <p className="lead">Interactive demos of `BentoCard` with magnetic cursor tracking and visual variants. Toggle motion to test reduced-motion and performance behavior.</p>

        <section style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="checkbox" checked={reduced} onChange={(e) => setReduced(e.target.checked)} />
            <span>Simulate Reduced Motion</span>
          </label>

          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span>Intensity</span>
            <input type="range" min={6} max={36} value={intensity} onChange={(e) => setIntensity(Number(e.target.value))} />
            <span style={{ width: 48, textAlign: 'right' }}>{intensity}</span>
          </label>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <BentoCard
              key={p.title}
              variant={p.variant}
              title={p.title}
              subtitle={p.tags.join(' · ')}
              image={makePlaceholderImageDataUrl(p)}
              reducedMotion={reduced}
              intensity={intensity}
            >
              <p className="lead" style={{ margin: 0 }}>
                {p.description}
              </p>
            </BentoCard>
          ))}
        </div>

        <hr style={{ margin: '2.25rem 0' }} />

        <h2 className="h2-serif">Performance & Accessibility</h2>
        <p>Notes & acceptance criteria:</p>
        <ul>
          <li>Motion is disabled when <code>prefers-reduced-motion</code> is set (or when user toggles the control).</li>
          <li>Framer Motion is used if available; component gracefully falls back to CSS transforms for environments without the library.</li>
          <li>Perf budget: keep main animation work off main thread where possible and avoid layout-triggering style changes. Target <strong>60 FPS</strong> on modern hardware for the hover interactions.</li>
        </ul>

        <p style={{ marginTop: 24 }}><em>To test:</em> run the dev server then open <code>/bento</code>; use the toggle to simulate reduced motion and the range to change intensity.</p>
      </main>
    </>
  )
}
