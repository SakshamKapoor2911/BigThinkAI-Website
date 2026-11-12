import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Navigation from '../../components/Navigation'
import SiteFooter from '../../components/SiteFooter'
import ProjectMotif from '../../components/projects/ProjectMotif'
import { CLUB, LINKS, EVENTS, PILLARS } from '../../src/content/club'
import {
  PROJECTS,
  projectById,
  projectNeighbours,
} from '../../src/content/projects'
import { longDate, daysAway, countdownLabel } from '../../src/lib/dates'

/* One page per EDGE project, generated at build time from PROJECTS.

   The page is built around the project's own artwork: the hero is that
   picture, full bleed, graded to the palette taken out of it, with a
   motif moving inside it that is registered to the picture's own pixel
   space. `data-team` is the switch — it swaps the whole scene.

   The AUDIENCE here is a corporate partner, not a student looking for a
   team. So the page leads with sector, stage and what the work is aimed
   at; the brief argues why it matters outside the club; and the one CTA
   is a conversation with us. "Skills you'll learn", skill grading and the
   application funnel are gone entirely — one quiet line at the foot of
   the Work-with-us card is all the student path needs. */

type Props = { slug: string }

export default function ProjectPage({ slug }: Props) {
  const project = projectById(slug) ?? PROJECTS[0]
  const { prev, next } = projectNeighbours(project.id)

  const milestones = EVENTS.filter((e) => e.projectId === project.id).sort((a, b) =>
    a.date.localeCompare(b.date)
  )

  // How EDGE teams operate, read off the programme slide in club.ts rather
  // than retyped here, so the two cannot drift apart.
  const howItRuns = PILLARS.find((pillar) => pillar.name === 'EDGE')?.facts ?? []

  const partnerMail = `mailto:${CLUB.email}?subject=${encodeURIComponent(
    `Partnering on ${project.name}`
  )}`

  // Resolved after mount — the page is static, so a build-time "today"
  // would freeze on the day it was last deployed.
  const [today, setToday] = useState<Date | null>(null)
  useEffect(() => setToday(new Date()), [])

  return (
    <>
      <Head>
        <title>{`${project.name} · ${CLUB.name}`}</title>
        <meta
          name="description"
          content={`${project.name}. ${project.sector}. ${project.blurb} Built by a student team at ${CLUB.name}, ${CLUB.school}.`}
        />
      </Head>

      <div className="page film-grain proj" data-team={project.theme}>
        <Navigation />

        <main>
          {/* ════════ THE SCENE ════════
              The artwork, full bleed, with the team's motif alive inside
              it. The plate is sized to the art's exact aspect ratio so
              the motif's coordinates land on the art. */}
          <header className="proj-hero">
            <div className="scene">
              <div className="scene__plate">
                <Image
                  className="scene__art"
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="100vw"
                  priority
                />
                <div className="scene__grade" aria-hidden="true" />
                <ProjectMotif theme={project.theme} />
              </div>
              <div className="scene__scrim" aria-hidden="true" />
            </div>

            <div className="shell proj-hero__inner">
              <a className="proj-back" href="/projects">
                <span aria-hidden="true">←</span> All projects
              </a>

              <h1 className="proj-hero__name">{project.name}</h1>
              <p className="proj-hero__blurb">{project.blurb}</p>

              <div className="proj-chips">
                <span className="proj-chip proj-chip--lead">{project.sector}</span>
                <span className="proj-chip">
                  <span className="proj-chip__key">Stage</span>
                  <span className="proj-chip__val">{project.stage}</span>
                </span>
                <span className="proj-chip">
                  <span className="proj-chip__key">Aimed at</span>
                  <span className="proj-chip__val">{project.target}</span>
                </span>
              </div>

              <div className="proj-hero__cta">
                <a className="btn btn-primary" href={partnerMail}>
                  Talk to us about this{' '}
                  <span className="arrow" aria-hidden="true">→</span>
                </a>
                {project.demo && (
                  <a className="btn btn-ghost" href={project.demo.href}>
                    {project.demo.label}{' '}
                    <span className="arrow" aria-hidden="true">→</span>
                  </a>
                )}
                <a className="btn btn-ghost" href="#brief">
                  Read the brief
                </a>
              </div>
            </div>
          </header>

          {/* ════════ THE BRIEF ════════ */}
          <section className="section proj-brief" id="brief">
            <div className="shell">
              <div className="section-head">
                <p className="kicker">The brief</p>
                <h2 className="section-title">What we&apos;re building</h2>
                <span className="hatch" aria-hidden="true" />
              </div>

              <div className="proj-grid">
                <div className="proj-main">
                  <p className="proj-desc">{project.description}</p>

                  <div className="proj-why">
                    <p className="proj-why__key">Why it matters</p>
                    <p className="proj-why__text">{project.why}</p>
                  </div>

                  <div className="proj-goal">
                    <p className="proj-goal__key">Deliverable</p>
                    <p className="proj-goal__text">{project.goal}</p>
                  </div>

                  {howItRuns.length > 0 && (
                    <div className="proj-runs">
                      <p className="proj-runs__key">How the team runs</p>
                      <ul className="proj-runs__list">
                        {howItRuns.map((fact) => (
                          <li key={fact}>{fact}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <aside className="proj-aside">
                  <div className="proj-card">
                    <p className="field__label">Technical approach</p>
                    <ul className="skills">
                      {project.skills.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>

                  {milestones.length > 0 && (
                    <div className="proj-card">
                      <p className="field__label">Milestones</p>
                      <ul className="mstones">
                        {milestones.map((e) => {
                          const delta = daysAway(e.date, today)
                          const count = countdownLabel(delta)
                          return (
                            <li
                              className="mstone"
                              key={e.id}
                              data-past={delta !== null && delta < 0}
                            >
                              <span className="mstone__date">{longDate(e.date)}</span>
                              <span className="mstone__title">{e.title}</span>
                              {count && <span className="mstone__count">{count}</span>}
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}

                  {/* The one ask on the page, and it is aimed at a partner. */}
                  <div className="proj-card proj-card--cta">
                    <p className="field__label">Work with us</p>
                    <p className="proj-card__note">
                      Bring a problem or a dataset, sponsor compute, mentor the team, or
                      ask for a walkthrough.
                    </p>
                    <a className="btn btn-primary" href={partnerMail}>
                      Get in touch <span className="arrow" aria-hidden="true">→</span>
                    </a>
                    <p className="proj-card__alt">
                      UMD student? EDGE intake is called in{' '}
                      <a href={LINKS.discord} target="_blank" rel="noopener noreferrer">
                        Discord
                      </a>
                      .
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          {/* ════════ THE OTHER FOUR ════════ */}
          <section className="section proj-siblings">
            <div className="shell">
              <div className="section-head">
                <p className="kicker">Keep going</p>
                <h2 className="section-title">Other projects</h2>
                <span className="hatch" aria-hidden="true" />
              </div>

              <div className="pager">
                {prev && (
                  <a className="pager__link" data-team={prev.theme} href={`/projects/${prev.id}`}>
                    <span className="pager__art" aria-hidden="true">
                      <Image src={prev.image} alt="" fill sizes="(max-width: 620px) 100vw, 50vw" />
                    </span>
                    <span className="pager__text">
                      <span className="pager__dir">
                        <span aria-hidden="true">←</span> Previous
                      </span>
                      <span className="pager__name">{prev.name}</span>
                      <span className="pager__blurb">{prev.blurb}</span>
                    </span>
                  </a>
                )}
                {next && (
                  <a
                    className="pager__link pager__link--next"
                    data-team={next.theme}
                    href={`/projects/${next.id}`}
                  >
                    <span className="pager__art" aria-hidden="true">
                      <Image src={next.image} alt="" fill sizes="(max-width: 620px) 100vw, 50vw" />
                    </span>
                    <span className="pager__text">
                      <span className="pager__dir">
                        Next <span aria-hidden="true">→</span>
                      </span>
                      <span className="pager__name">{next.name}</span>
                      <span className="pager__blurb">{next.blurb}</span>
                    </span>
                  </a>
                )}
              </div>

              <p className="proj-siblings__all">
                <a className="btn btn-ghost" href="/projects">
                  All five projects <span className="arrow" aria-hidden="true">→</span>
                </a>
              </p>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: PROJECTS.map((p) => ({ params: { slug: p.id } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : ''
  if (!projectById(slug)) return { notFound: true }
  return { props: { slug } }
}
