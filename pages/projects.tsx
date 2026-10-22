import Link from 'next/link'
import {
  Arrow,
  COMMUNITY_URL,
  Eyebrow,
  Reveal,
  StudioLayout,
} from '../components/studio/StudioLayout'

const directions = [
  {
    category: 'LANGUAGE & AGENTS',
    title: 'Recommendations with a reason.',
    description:
      'Explore how retrieval, preferences, and agent workflows can help someone make a more informed choice.',
    tags: ['Recommender systems', 'Agents'],
    href: '/learn/research-assistants',
    mark: '↗',
  },
  {
    category: 'VISION & INTERACTION',
    title: 'Interfaces that see.',
    description:
      'Connect visual features to interactive experiences, from tracking colors to recognizing objects.',
    tags: ['Computer vision', 'Interactive systems'],
    href: '/learn/computer-vision',
    mark: '◉',
  },
  {
    category: 'DATA & SYSTEMS',
    title: 'A better answer to a small question.',
    description:
      'Start with a real question, understand the data behind it, and build something useful around the result.',
    tags: ['Data exploration', 'Applied ML'],
    href: '/learn/sql',
    mark: '⊞',
  },
]

export default function Projects() {
  return (
    <StudioLayout title="Build together — BigTh!nkAI" active="projects">
      <section className="st-page-heading st-container">
        <Eyebrow>EDGE / THE PROJECT INCUBATOR</Eyebrow>
        <h1>
          Good questions.
          <br />
          <em>Better together.</em>
        </h1>
        <p>
          Take an idea beyond a notebook. EDGE brings students together to
          explore practical AI systems over a semester.
        </p>
        <a
          className="st-button st-button-primary"
          href={COMMUNITY_URL}
          target="_blank"
          rel="noreferrer"
        >
          Ask about getting involved <Arrow diagonal />
        </a>
      </section>
      <Reveal className="st-container st-project-intro">
        <div>
          <Eyebrow>ROOM TO EXPLORE</Eyebrow>
          <h2>
            What could you
            <br />
            <em>build with a team?</em>
          </h2>
        </div>
        <p>
          These are directions to spark a conversation. The club shares current
          cohort, project, and application details through its community
          channels.
        </p>
      </Reveal>
      <section className="st-container st-project-grid">
        {directions.map((direction, i) => (
          <article
            key={direction.title}
            className={`st-project-card st-project-${i}`}
          >
            <div className="st-project-symbol" aria-hidden="true">
              {direction.mark}
            </div>
            <Eyebrow>{direction.category}</Eyebrow>
            <h2>{direction.title}</h2>
            <p>{direction.description}</p>
            <div className="st-tags">
              {direction.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <Link href={direction.href} className="st-plain-link">
              Start with a related workshop <Arrow />
            </Link>
          </article>
        ))}
      </section>
      <Reveal className="st-container st-project-process">
        <Eyebrow>AN IDEA BECOMES A PROJECT</Eyebrow>
        <div>
          {[
            [
              '01',
              'Find a question',
              'Start with something you want to understand or improve.',
            ],
            [
              '02',
              'Build a small version',
              'Turn the idea into something you can test and explain.',
            ],
            [
              '03',
              'Share what you learned',
              'Show the work, discuss the tradeoffs, and keep iterating.',
            ],
          ].map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </StudioLayout>
  )
}
