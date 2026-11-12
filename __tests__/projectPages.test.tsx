import React from 'react'
import { render, screen } from '@testing-library/react'
import ProjectPage, { getStaticPaths, getStaticProps } from '../pages/projects/[slug]'
import { PROJECTS, projectNeighbours } from '../src/content/projects'
import { CLUB, LINKS } from '../src/content/club'

const lantern = PROJECTS[0]

describe('EDGE project pages', () => {
  test('one static path per team, and the slug is the project id', async () => {
    const result = await getStaticPaths({})
    const slugs = result.paths.map((p) => (typeof p === 'string' ? p : String(p.params.slug)))
    expect(slugs).toEqual(PROJECTS.map((p) => p.id))
  })

  test('an unknown slug is a 404 rather than a silent fallback', async () => {
    const res = await getStaticProps({ params: { slug: 'not-a-team' } })
    expect(res).toEqual({ notFound: true })
  })

  test('renders the project name, its one-liner and its deliverable', () => {
    render(<ProjectPage slug={lantern.id} />)
    expect(screen.getByRole('heading', { level: 1, name: lantern.name })).toBeInTheDocument()
    expect(screen.getByText(lantern.blurb)).toBeInTheDocument()
    expect(screen.getByText(lantern.goal)).toBeInTheDocument()
    expect(screen.getByText(lantern.skills[0])).toBeInTheDocument()
  })

  /* These pages are the partner-facing showcase. The three tests below are
     the guard on that: they fail if the student recruiting funnel creeps
     back onto them. */

  test('the hero leads with what a partner scans for', () => {
    render(<ProjectPage slug={lantern.id} />)
    expect(screen.getByText(lantern.sector)).toBeInTheDocument()
    expect(screen.getByText(lantern.stage)).toBeInTheDocument()
    expect(screen.getByText(lantern.target)).toBeInTheDocument()
    expect(screen.getByText(lantern.why)).toBeInTheDocument()
  })

  test('the page asks for a conversation, not an application', () => {
    render(<ProjectPage slug={lantern.id} />)
    const asks = screen.getAllByRole('link', { name: /talk to us|get in touch/i })
    expect(asks.length).toBeGreaterThan(0)
    for (const ask of asks) {
      expect(ask).toHaveAttribute('href', expect.stringContaining(`mailto:${CLUB.email}`))
    }
    // no route into the intake form from a partner page
    expect(
      screen.queryByRole('link', { name: new RegExp(LINKS.edgeApplication, 'i') })
    ).toBeNull()
    expect(document.querySelector(`a[href="${LINKS.edgeApplication}"]`)).toBeNull()
  })

  test('nothing grades the project by how hard it is to join', () => {
    const { container } = render(<ProjectPage slug="project-lantern" />)
    expect(screen.queryByText(/skill\s*l(vl|evel)/i)).toBeNull()
    expect(screen.queryByText(/skills you.ll learn/i)).toBeNull()
    expect(screen.queryByText(/beginner|intermediate|advanced/i)).toBeNull()
    // Lantern's level was the loudest of the five ("???")
    expect(container.textContent).not.toContain('???')
  })

  test('the hero is built on the artwork, and the motif rides the same plate', () => {
    const { container } = render(<ProjectPage slug={lantern.id} />)
    const plate = container.querySelector('.scene__plate')
    expect(plate).toBeInTheDocument()
    // the art and the motif have to share the plate, or the motif's
    // coordinates stop landing on the thing in the picture
    expect(plate!.querySelector('.scene__art')).toBeInTheDocument()
    expect(plate!.querySelector('.motif')).toBeInTheDocument()
    // the artwork appears once, in the scene — not again in the brief
    // (next/image rewrites src, so go by the alt text it carries)
    expect(screen.getAllByAltText(lantern.imageAlt)).toHaveLength(1)
    expect(plate!.querySelector('img')).toHaveAttribute('alt', lantern.imageAlt)
  })

  test('the ambient motif is decorative only — hidden from assistive tech', () => {
    const { container } = render(<ProjectPage slug={lantern.id} />)
    const motif = container.querySelector('.motif')
    expect(motif).toHaveAttribute('aria-hidden', 'true')
    expect(motif).toHaveAttribute('data-motif', lantern.theme)
    // and the page itself carries the team key that drives the accent
    expect(container.querySelector('.proj')).toHaveAttribute('data-team', lantern.theme)
  })

  test('every project links on to the next and back to the index', () => {
    render(<ProjectPage slug={lantern.id} />)
    const { next } = projectNeighbours(lantern.id)
    expect(screen.getByRole('link', { name: /all projects/i })).toHaveAttribute('href', '/projects')
    expect(
      screen.getByRole('link', { name: new RegExp(`next.*${next!.name}`, 'is') })
    ).toHaveAttribute('href', `/projects/${next!.id}`)
  })

  test('paging wraps, so no team is a dead end', () => {
    const first = projectNeighbours(PROJECTS[0].id)
    const last = projectNeighbours(PROJECTS[PROJECTS.length - 1].id)
    expect(first.prev).toBe(PROJECTS[PROJECTS.length - 1])
    expect(last.next).toBe(PROJECTS[0])
  })
})
