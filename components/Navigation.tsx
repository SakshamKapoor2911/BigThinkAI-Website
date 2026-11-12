import { useEffect, useRef, useState } from 'react'

const LINKS = [
  { href: '/#mission', label: 'Mission' },
  { href: '/#what-we-do', label: 'What We Do' },
  { href: '/#projects', label: 'EDGE Projects' },
  { href: '/heartbeat', label: 'Heartbeat' },
  { href: '/#whats-next', label: "What's Next" },
  { href: '/#join', label: 'Join' },
]

export const DISCORD_URL = 'https://discord.gg/CC6ZQ4cnkn'

export default function Navigation() {
  const navRef = useRef<HTMLElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Condense the bar once the page has moved off the hero.
  useEffect(() => {
    let frame = 0
    function read() {
      frame = 0
      setScrolled((window.scrollY || document.documentElement.scrollTop) > 24)
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  // Escape and click-outside close the mobile menu.
  useEffect(() => {
    if (!open) return

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    function onDocClick(e: MouseEvent) {
      const nav = navRef.current
      const target = e.target as Node | null
      if (nav && target && !nav.contains(target)) setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onDocClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onDocClick)
    }
  }, [open])

  return (
    <nav
      ref={navRef}
      className="site-nav"
      role="navigation"
      aria-label="Main navigation"
      data-open={open}
      data-scrolled={scrolled}
    >
      <a className="brand" href="/#top" aria-label="BigThink AI home">
        BigThink<span className="brand__big">AI</span>
      </a>

      <ul className="site-links" id="main-menu">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <a
            className="nav-cta"
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Discord
          </a>
        </li>
      </ul>

      <button
        ref={toggleRef}
        type="button"
        className="nav-toggle"
        aria-controls="main-menu"
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((s) => !s)}
      >
        <span className="hamburger" aria-hidden="true" />
      </button>
    </nav>
  )
}
