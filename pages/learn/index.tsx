import { useState } from 'react'
import { WORKSHOPS, Track } from '../../lib/learning'
import { Eyebrow, StudioLayout } from '../../components/studio/StudioLayout'
import { WorkshopCard } from '../../components/studio/WorkshopCard'

const tracks: ('All topics' | Track)[] = [
  'All topics',
  'Foundations',
  'Vision',
  'Language & agents',
  'Advanced',
]
export default function Learn() {
  const [track, setTrack] = useState<string>('All topics')
  const [search, setSearch] = useState('')
  const workshops = WORKSHOPS.filter(
    (workshop) =>
      (track === 'All topics' || workshop.track === track) &&
      `${workshop.title} ${workshop.description} ${workshop.track}`
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  )
  return (
    <StudioLayout title="Learn — BigTh!nkAI" active="learn">
      <section className="st-page-heading st-container">
        <Eyebrow>THE PYONEERS WORKSHOP LIBRARY</Eyebrow>
        <h1>
          Your next idea
          <br />
          <em>starts here.</em>
        </h1>
        <p>
          Follow your curiosity. Try a mini lab, work through a notebook, or
          revisit a workshop at your own pace.
        </p>
        <div className="st-library-intro">
          <span>
            <i className="st-status-dot" /> {WORKSHOPS.length} selected starting
            points
          </span>
          <span>Open notebooks · Workshop slides · Recordings</span>
        </div>
      </section>
      <section className="st-container st-library-list">
        <div className="st-library-tools">
          <div
            className="st-topic-filters"
            role="group"
            aria-label="Filter workshops by topic"
          >
            {tracks.map((topic) => (
              <button
                key={topic}
                aria-pressed={track === topic}
                onClick={() => setTrack(topic)}
              >
                {topic}
              </button>
            ))}
          </div>
          <label className="st-search">
            <span className="st-sr-only">Search workshops</span>
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <circle cx="10" cy="10" r="6" />
              <path d="m15 15 5 5" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Something you’re curious about…"
            />
          </label>
        </div>
        <p className="st-result-count" aria-live="polite">
          {workshops.length} workshop{workshops.length === 1 ? '' : 's'} to
          explore
        </p>
        <div className="st-workshop-grid">
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop.slug} workshop={workshop} />
          ))}
        </div>
        {!workshops.length && (
          <div className="st-empty">
            <h2>No matches this time.</h2>
            <p>Try a different topic or a shorter search.</p>
            <button
              className="st-button st-button-primary"
              onClick={() => {
                setSearch('')
                setTrack('All topics')
              }}
            >
              Show all workshops
            </button>
          </div>
        )}
        <p className="st-archive-note">
          A growing collection from our workshops. Reading and exploration times
          are estimates; the original notebooks may need extra setup.
        </p>
      </section>
    </StudioLayout>
  )
}
