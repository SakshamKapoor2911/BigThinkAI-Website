import { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Navigation from '../components/Navigation'
import SiteFooter from '../components/SiteFooter'
import {
  CLUB,
  LINKS,
  PILLARS,
  EDGE_PITCH,
  EVENTS,
  EVENT_KIND_LABEL,
  CADENCE,
  EDGE_APPLICATIONS_OPEN,
} from '../src/content/club'
import type { ClubEvent } from '../src/content/club'
import { PROJECTS } from '../src/content/projects'
import { shortDate, longDate, daysAway, whenLabel } from '../src/lib/dates'

export default function Home() {
  const [activeId, setActiveId] = useState(PROJECTS[0].id)
  const active = PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0]

  return (
    <>
      <Head>
        <title>BigThink AI · Think Big</title>
        <meta
          name="description"
          content={`${CLUB.name} is a student-run AI organization at the ${CLUB.school}. ${CLUB.mission}.`}
        />
      </Head>

      <div className="page film-grain" id="top">
        <Navigation />

        <main>
          {/* ════════ HERO ════════ */}
          <section className="hero">
            <div className="shell">
              <div className="hero__frame marks">
                <span className="marks-tr" aria-hidden="true" />
                <span className="marks-bl" aria-hidden="true" />

                <h1 className="hero__wordmark">BigThink AI</h1>

                <p className="hero__tagline">
                  <span className="crosshair" aria-hidden="true" />
                  <span className="hero__tagline-text">Think Big</span>
                  <span className="crosshair" aria-hidden="true" />
                </p>

                <div className="hero__cta">
                  <a
                    className="btn btn-primary"
                    href={LINKS.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join the Discord <span className="arrow" aria-hidden="true">→</span>
                  </a>
                  <a className="btn btn-ghost" href="#projects">
                    See EDGE Projects
                  </a>
                </div>

                <p className="hero__meta">
                  <span>{CLUB.school}</span>
                  <span>EDGE Teams 2026–2027</span>
                  <span>Open to all majors</span>
                </p>
              </div>
            </div>

            <a className="hero__scroll" href="#mission" aria-label="Scroll to mission">
              <span className="hero__scroll-line" aria-hidden="true" />
              Scroll
            </a>
          </section>

          {/* ════════ MISSION ════════ */}
          <section className="section" id="mission">
            <div className="shell">
              <div className="section-head">
                <p className="kicker">01 / Mission</p>
                <h2 className="section-title">Our Mission</h2>
                <span className="hatch" aria-hidden="true" />
              </div>

              <div className="mission">
                <p className="mission__statement">
                  To push <em>beyond the frontier</em> of AI.
                </p>
                <div className="mission__body">
                  <p>{CLUB.purpose}</p>
                  <p>
                    Workshops start non-technical and end technical. Build teams hand
                    students a project to own end to end.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ════════ WHAT WE DO ════════ */}
          <section className="section" id="what-we-do">
            <div className="shell">
              <div className="section-head">
                <p className="kicker">02 / Programs</p>
                <h2 className="section-title">What We Do</h2>
                <span className="hatch" aria-hidden="true" />
              </div>

              <div className="pillars">
                {PILLARS.map((p) => (
                  <article className="pillar" key={p.index}>
                    <span className="pillar__index">{p.index}</span>
                    <h3 className="pillar__name">{p.name}</h3>
                    <p className="pillar__desc">{p.desc}</p>
                    <ul className="pillar__facts">
                      {p.facts.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ════════ EDGE PROJECTS ════════ */}
          <section className="section" id="projects">
            <div className="shell">
              <div className="section-head">
                <p className="kicker">03 / EDGE Teams · 2026–2027</p>
                <h2 className="section-title">The Projects</h2>
                <span className="hatch" aria-hidden="true" />
                <p className="section-lede">
                  Pick a team for the short version, then open its page.
                </p>
              </div>

              <div className="dossier">
                <div className="rail" role="tablist" aria-label="EDGE project teams">
                  <div className="rail__head">
                    <span>Teams</span>
                  </div>
                  {PROJECTS.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      role="tab"
                      id={`tab-${p.id}`}
                      aria-selected={p.id === activeId}
                      aria-controls={`panel-${p.id}`}
                      className="rail__item"
                      data-team={p.theme}
                      onClick={() => setActiveId(p.id)}
                    >
                      <span className="rail__dot" aria-hidden="true" />
                      <span>{p.railLabel}</span>
                      <span className="rail__num" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </button>
                  ))}
                </div>

                <div
                  className="record"
                  id={`panel-${active.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${active.id}`}
                  data-team={active.theme}
                >
                  <div className="record__swap" key={active.id}>
                    <div className="record__media">
                      <Image
                        src={active.image}
                        alt={active.imageAlt}
                        fill
                        sizes="(max-width: 1000px) 100vw, 62vw"
                        priority={active.id === PROJECTS[0].id}
                      />
                      <div className="record__titlebox">
                        <h3 className="record__title">{active.name}</h3>
                        <p className="record__sector">{active.sector}</p>
                      </div>
                    </div>

                    <div className="record__body">
                      <div>
                        <p className="field__label">Description</p>
                        <p className="record__desc">{active.description}</p>
                        <div className="record__goal">
                          <p className="record__goal-text">
                            <strong>Deliverable:</strong> {active.goal}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="field__label">Technical approach</p>
                        <ul className="skills">
                          {active.skills.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="record__foot">
                      <a className="record__open" href={`/projects/${active.id}`}>
                        <span className="record__open-key">Team page</span>
                        <span className="record__open-name">
                          {active.name}{' '}
                          <span className="arrow" aria-hidden="true">→</span>
                        </span>
                      </a>
                      <span className="record__foot-note">
                        Full brief, milestones, and how to work with the team.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ════════ WHY EDGE ════════ */}
          <section className="section" id="why-edge">
            <div className="shell">
              <div className="section-head">
                <p className="kicker">04 / The Program</p>
                <h2 className="section-title">Inside EDGE</h2>
                <span className="hatch" aria-hidden="true" />
                <p className={`status${EDGE_APPLICATIONS_OPEN ? '' : ' status--closed'}`}>
                  <span className="status__dot" aria-hidden="true" />
                  {EDGE_APPLICATIONS_OPEN
                    ? 'Applications open'
                    : '2026–27 applications closed'}
                </p>
                <p className="section-note">
                  {EDGE_APPLICATIONS_OPEN
                    ? 'What a team signs up for, and what we look for.'
                    : 'Teams are set for this cycle. Here is what the next call will ask for. Intake is announced in Discord.'}
                </p>
              </div>

              <div className="facing">
                <div className="facing__col">
                  <h3 className="facing__title">What members get</h3>
                  <ul className="facing__list">
                    {EDGE_PITCH.why.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
                <div className="facing__col facing__col--want">
                  <h3 className="facing__title">What we look for</h3>
                  <ul className="facing__list">
                    {EDGE_PITCH.looking.map((w) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* ════════ WHAT'S NEXT ════════ */}
          <WhatsNext />

          {/* ════════ JOIN ════════ */}
          <section className="section join" id="join">
            <div className="shell">
              <h2 className="join__title">Are You Ready?</h2>
              <p className="join__lede">
                EDGE teams are set for 2026–27. Workshops run every week and they are
                open to everyone. Discord is where announcements land and where the
                next intake gets called.
              </p>

              <div className="doors">
                <a className="door door--primary" href={LINKS.discord} target="_blank" rel="noopener noreferrer">
                  <span className="door__kind">Start here</span>
                  <h3 className="door__name">
                    Discord <span className="arrow" aria-hidden="true">→</span>
                  </h3>
                  <p className="door__note">
                    Announcements, workshop material, and every team channel.
                  </p>
                </a>

                {EDGE_APPLICATIONS_OPEN ? (
                  <a
                    className="door"
                    href={LINKS.edgeApplication}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="door__kind">Applications open</span>
                    <h3 className="door__name">
                      Join an EDGE Team <span className="arrow" aria-hidden="true">→</span>
                    </h3>
                    <p className="door__note">
                      Join a build team and own a project end to end.
                    </p>
                  </a>
                ) : (
                  <a className="door" href="#projects">
                    <span className="door__kind">2026–27 cohort</span>
                    <h3 className="door__name">
                      EDGE Teams <span className="arrow" aria-hidden="true">→</span>
                    </h3>
                    <p className="door__note">
                      Closed for this cycle. See what the five teams are building.
                    </p>
                  </a>
                )}

                <a className="door" href={`mailto:${CLUB.email}`}>
                  <span className="door__kind">Partners &amp; sponsors</span>
                  <h3 className="door__name">
                    Work With Us <span className="arrow" aria-hidden="true">→</span>
                  </h3>
                  <p className="door__note">
                    Mentor a team, sponsor the club, or bring us a problem.
                  </p>
                </a>

                <a className="door" href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
                  <span className="door__kind">Follow</span>
                  <h3 className="door__name">
                    Instagram <span className="arrow" aria-hidden="true">→</span>
                  </h3>
                  <p className="door__note">
                    Event posts, recaps, and what the teams are shipping.
                  </p>
                </a>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  )
}

function WhatsNext() {
  // Resolved after mount: the page is statically generated, so build-time
  // "today" would go stale. Until then we render every event, dateless.
  const [today, setToday] = useState<Date | null>(null)
  useEffect(() => setToday(new Date()), [])

  const sorted = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date))
  const upcoming = today
    ? sorted.filter((e) => (daysAway(e.date, today) ?? 0) >= 0)
    : sorted

  const featured: ClubEvent | undefined =
    upcoming.find((e) => e.poster) ?? upcoming[0]
  const rest = upcoming.filter((e) => e.id !== featured?.id)

  const delta = featured ? daysAway(featured.date, today) : null
  const flag = whenLabel(delta)

  return (
    <section className="section" id="whats-next">
      <div className="shell">
        <div className="section-head">
          <p className="kicker">05 / Upcoming</p>
          <h2 className="section-title">What&apos;s Next</h2>
          <span className="hatch" aria-hidden="true" />
        </div>

        {featured && (
          <article className="feature">
            {featured.poster && (
              <div className="feature__poster">
                <Image
                  src={featured.poster}
                  alt={featured.posterAlt ?? `${featured.title} event poster`}
                  fill
                  sizes="(max-width: 760px) 320px, 340px"
                />
              </div>
            )}

            <div className="feature__body">
              {flag && (
                <p className={`when-flag${delta === 0 ? ' when-flag--today' : ''}`}>
                  <span className="when-flag__dot" aria-hidden="true" />
                  {flag}
                </p>
              )}

              <p className="feature__date">{longDate(featured.date)}</p>
              <h3 className="feature__title">{featured.title}</h3>

              <p className="feature__meta">
                <span>{EVENT_KIND_LABEL[featured.kind]}</span>
                {featured.time && <span>{featured.time}</span>}
                {featured.location && <span>{featured.location}</span>}
              </p>

              {featured.note && <p className="feature__note">{featured.note}</p>}

              <div className="feature__cta">
                <a
                  className="btn btn-ghost"
                  href={LINKS.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Details in Discord <span className="arrow" aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </article>
        )}

        {rest.length > 0 && (
          <div className="upcoming">
            {rest.map((e) => (
              <div
                key={e.id}
                className={`upcoming__row${
                  e.kind === 'deadline' ? ' upcoming__row--deadline' : ''
                }`}
              >
                <span className="upcoming__date">{shortDate(e.date)}</span>
                <h3 className="upcoming__title">{e.title}</h3>
                <p className="upcoming__note">
                  {e.note}
                  {e.location ? ` · ${e.location}` : ''}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="cadence">
          <span className="cadence__label">Every week</span>
          {CADENCE.map((c) => (
            <span className="cadence__item" key={c.what}>
              <strong>{c.what}</strong>
              {c.note}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
