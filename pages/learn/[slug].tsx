import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { WORKSHOPS, Workshop } from '../../lib/learning'
import {
  Arrow,
  Eyebrow,
  StudioLayout,
} from '../../components/studio/StudioLayout'
import KernelLab from '../../components/studio/KernelLab'
import DataLab from '../../components/studio/DataLab'

export const getStaticPaths: GetStaticPaths = () => ({
  paths: WORKSHOPS.map((workshop) => ({ params: { slug: workshop.slug } })),
  fallback: false,
})
export const getStaticProps: GetStaticProps = ({ params }) => {
  const workshop = WORKSHOPS.find((item) => item.slug === params?.slug)
  return workshop ? { props: { workshop } } : { notFound: true }
}

export default function WorkshopPage({ workshop }: { workshop: Workshop }) {
  const [active, setActive] = useState('understand')
  const hasLab = Boolean(workshop.interactive)
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    setActive('understand')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-100px 0px -45% 0px', threshold: 0 },
    )
    document
      .querySelectorAll('[data-lesson-section]')
      .forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [workshop.slug])
  const steps = [
    ['understand', 'Get the idea'],
    ...(hasLab ? [['experiment', 'Try it yourself']] : []),
    ['continue', 'Keep exploring'],
  ]
  return (
    <StudioLayout title={`${workshop.title} — BigTh!nkAI`} active="learn">
      <div className="st-container st-lesson">
        <Link href="/learn" className="st-back-link">
          ← Back to the library
        </Link>
        <header className="st-lesson-header">
          <Eyebrow>{workshop.track} · {workshop.vertical} / A PYONEERS FIELD NOTE</Eyebrow>
          <h1>{workshop.title}</h1>
          <p>{workshop.description}</p>
          <div className="st-lesson-meta">
            <span>{workshop.level}</span>
            <span>~{workshop.time} read + explore</span>
            <span>
              {hasLab ? 'An interactive mini lab' : 'A guided starting point'}
            </span>
          </div>
        </header>
        <div className="st-lesson-layout">
          <aside className="st-lesson-rail">
            <Eyebrow>IN THIS WORKSHOP</Eyebrow>
            <nav aria-label="Lesson chapters">
              {steps.map(([id, label], i) => (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={active === id ? 'step' : undefined}
                >
                  <span>0{i + 1}</span>
                  {label}
                  <span className="st-step-indicator">↗</span>
                </a>
              ))}
            </nav>
            <div className="st-rail-note">
              <span>BRING WITH YOU</span>
              <p>{workshop.prerequisite}</p>
            </div>
          </aside>
          <div className="st-lesson-body">
            <section id="understand" data-lesson-section>
              <Eyebrow>01 / GET THE IDEA</Eyebrow>
              <h2>
                A few moving parts.
                <br />
                <em>One useful idea.</em>
              </h2>
              <div className="st-concept-list">
                {workshop.concepts.map(([heading, text], i) => (
                  <article key={heading}>
                    <span>0{i + 1}</span>
                    <div>
                      <h3>{heading}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div className="st-takeaway">
                <span>THE THING TO TAKE AWAY</span>
                <p>{workshop.takeaway}</p>
              </div>
              <a
                href={hasLab ? '#experiment' : '#continue'}
                className="st-plain-link"
              >
                {hasLab
                  ? 'Let’s make it tangible'
                  : 'Open the original materials'}{' '}
                <span>↓</span>
              </a>
            </section>
            {hasLab && (
              <section id="experiment" data-lesson-section>
                <Eyebrow>02 / TRY IT YOURSELF</Eyebrow>
                <h2>
                  {workshop.slug === 'computer-vision'
                    ? 'Change the filter. See the difference.'
                    : workshop.slug === 'sql'
                      ? 'Make the question your own.'
                      : 'A little table. A useful question.'}
                </h2>
                {workshop.slug === 'computer-vision' ? (
                  <KernelLab expanded />
                ) : (
                  <DataLab sql={workshop.slug === 'sql'} />
                )}
                <a href="#continue" className="st-plain-link">
                  Take it into the notebook <Arrow />
                </a>
              </section>
            )}
            <section id="continue" data-lesson-section>
              <Eyebrow>0{hasLab ? '3' : '2'} / KEEP EXPLORING</Eyebrow>
              <h2>
                Your turn.
                <br />
                <em>Make it your own.</em>
              </h2>
              <p>
                The original Pyoneers materials are here when you want to go
                further. Open the student notebook and make a copy to save your
                experiments.
              </p>
              <div className="st-resource-links">
                <a href={workshop.notebook} target="_blank" rel="noreferrer">
                  <span className="st-resource-icon">⌘</span>
                  <span>
                    <strong>Open the notebook</strong>
                    <small>Continue in Google Colab</small>
                  </span>
                  <Arrow diagonal />
                </a>
                {workshop.slides && (
                  <a href={workshop.slides} target="_blank" rel="noreferrer">
                    <span className="st-resource-icon">▤</span>
                    <span>
                      <strong>Revisit the slides</strong>
                      <small>The workshop’s original explanation</small>
                    </span>
                    <Arrow diagonal />
                  </a>
                )}
                {workshop.recording && (
                  <a href={workshop.recording} target="_blank" rel="noreferrer">
                    <span className="st-resource-icon">▷</span>
                    <span>
                      <strong>Watch the recording</strong>
                      <small>From the workshop archive</small>
                    </span>
                    <Arrow diagonal />
                  </a>
                )}
              </div>
              <p className="st-source-note">
                Adapted from BigTh!nkAI’s {workshop.sourceTitle} workshop
                materials. Original resources open on Google; access and setup
                requirements may vary.
              </p>
              <Link href="/learn" className="st-button st-button-dark">
                Find your next idea <Arrow />
              </Link>
            </section>
          </div>
        </div>
      </div>
    </StudioLayout>
  )
}
