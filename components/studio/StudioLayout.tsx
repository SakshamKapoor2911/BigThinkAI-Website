import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

export const COMMUNITY_URL = 'https://terplink.umd.edu/organization/bigthinkai'

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M4 12h15m-6-6 6 6-6 6'} />
    </svg>
  )
}

export function StudioLayout({
  children,
  title = 'BigTh!nkAI — A place to learn, a reason to build.',
  active = '',
}: {
  children: ReactNode
  title?: string
  active?: string
}) {
  const [open, setOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  return (
    <div className="studio">
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Explore hands-on AI workshops, interactive mini labs, and student projects with BigTh!nkAI at the University of Maryland."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <a className="st-skip" href="#content">
        Skip to content
      </a>
      <header className="st-header st-container">
        <Link href="/" className="st-brand" aria-label="BigThinkAI home">
          <span className="st-brand-mark" aria-hidden="true">
            ✳
          </span>
          <span>
            BigTh!nk<span className="st-brand-ai">AI</span>
            <small>UNIVERSITY OF MARYLAND</small>
          </span>
        </Link>
        <button
          ref={menuButton}
          className="st-menu-button"
          aria-expanded={open}
          aria-controls="studio-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <nav
          id="studio-menu"
          className={open ? 'st-nav is-open' : 'st-nav'}
          aria-label="Main navigation"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setOpen(false)
              menuButton.current?.focus()
            }
          }}
        >
          <Link
            href="/learn"
            aria-current={active === 'learn' ? 'page' : undefined}
          >
            Learn
          </Link>
          <Link
            href="/projects"
            aria-current={active === 'projects' ? 'page' : undefined}
          >
            Projects
          </Link>
          <Link href="/#about">The club</Link>
          <a
            href={COMMUNITY_URL}
            target="_blank"
            rel="noreferrer"
            className="st-nav-join"
          >
            Find your people <Arrow diagonal />
          </a>
        </nav>
      </header>
      <main id="content">{children}</main>
      <footer className="st-footer st-container">
        <div>
          <Link href="/" className="st-footer-brand">
            BigTh!nkAI<span>✳</span>
          </Link>
          <p>Student-run. Curiosity-led. Built together.</p>
        </div>
        <div className="st-footer-links">
          <Link href="/learn">Workshop library</Link>
          <Link href="/projects">EDGE projects</Link>
          <a href={COMMUNITY_URL} target="_blank" rel="noreferrer">
            TerpLink <Arrow diagonal />
          </a>
        </div>
        <p className="st-copyright">
          University of Maryland, College Park
          <br />© {new Date().getFullYear()} BigTh!nkAI
        </p>
      </footer>
    </div>
  )
}

export function Reveal({
  children,
  className = '',
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = ref.current
    if (!element || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.dataset.revealed = 'true'
          observer.disconnect()
        }
      },
      { threshold: 0.08 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return (
    <div id={id} ref={ref} className={`st-reveal ${className}`}>
      {children}
    </div>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="st-eyebrow">{children}</p>
}
