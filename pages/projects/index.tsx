import Head from 'next/head'
import Image from 'next/image'
import Navigation from '../../components/Navigation'
import SiteFooter from '../../components/SiteFooter'
import { CLUB, LINKS } from '../../src/content/club'
import { PROJECTS } from '../../src/content/projects'

/* The index of the five EDGE projects, written for someone outside the
   club (a company, a lab, a sponsor) deciding whether any of this is
   worth a conversation. The home page keeps the interactive dossier and
   the student intake; this page and the five it links to are the
   showcase, so nothing here gates on skill level or applications.

   One ask, repeated once: talk to us. */

const WAYS = [
  {
    key: 'Bring a problem',
    note: 'A question you want answered, or a dataset that needs a team on it.',
  },
  {
    key: 'Back the build',
    note: 'Compute, API credits, hardware, or a submission fee.',
  },
  {
    key: 'Spend an hour with a team',
    note: 'Review an approach, sit in on a build session, or take a walkthrough.',
  },
] as const

export default function ProjectsIndex() {
  const partnerMail = `mailto:${CLUB.email}?subject=${encodeURIComponent(
    `Partnering with ${CLUB.name}`
  )}`

  return (
    <>
      <Head>
        <title>{`Projects 2026–2027 · ${CLUB.name}`}</title>
        <meta
          name="description"
          content={`Five AI projects built by student teams at ${CLUB.name}, ${CLUB.school}. Invasive-species detection, world model evaluation, audio agents, on-device assistance, applied RAG.`}
        />
      </Head>

      <div className="page film-grain">
        <Navigation />

        <main>
          <section className="section index-head">
            <div className="shell">
              <div className="section-head">
                <p className="kicker">EDGE · 2026–2027</p>
                <h1 className="section-title">The Projects</h1>
                <span className="hatch" aria-hidden="true" />
              </div>

              <div className="team-cards">
                {PROJECTS.map((p, i) => (
                  <a
                    className="team-card"
                    key={p.id}
                    data-team={p.theme}
                    href={`/projects/${p.id}`}
                  >
                    <span className="team-card__art">
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        priority={i < 2}
                      />
                    </span>

                    <span className="team-card__body">
                      <span className="team-card__num">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="team-card__name">{p.name}</span>
                      <span className="team-card__sector">{p.sector}</span>
                      <span className="team-card__blurb">{p.blurb}</span>
                      <span className="team-card__foot">
                        <span className="team-card__stage">
                          <span className="team-card__dot" aria-hidden="true" />
                          {p.target}
                        </span>
                        <span className="team-card__go">
                          Read the brief <span className="arrow" aria-hidden="true">→</span>
                        </span>
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              {/* The partner ask, stated plainly and only once. */}
              <div className="ways">
                <p className="field__label ways__label">Ways to work with us</p>
                <ul className="ways__list">
                  {WAYS.map((w) => (
                    <li className="way" key={w.key}>
                      <span className="way__key">{w.key}</span>
                      <span className="way__note">{w.note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="index-foot">
                <a className="btn btn-primary" href={partnerMail}>
                  Get in touch <span className="arrow" aria-hidden="true">→</span>
                </a>
                <a className="btn btn-ghost" href="/#what-we-do">
                  About {CLUB.name}
                </a>
                <a
                  className="btn btn-ghost"
                  href={LINKS.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Students: join the Discord
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
