import Link from 'next/link'
import { Workshop } from '../../lib/learning'
import { Arrow } from './StudioLayout'

export function TopicArt({ topic }: { topic: string }) {
  return (
    <div className={`st-topic-art st-art-${topic}`} aria-hidden="true">
      {topic === 'computer-vision' || topic === 'neural-networks' ? (
        <div className="st-art-pixels">
          {Array.from({ length: 64 }, (_, i) => (
            <i
              key={i}
              style={{
                opacity:
                  (i % 8 > 1 &&
                    i % 8 < 6 &&
                    (Math.floor(i / 8) === 1 || Math.floor(i / 8) === 4)) ||
                  (i % 8 === 2 && i > 8 && i < 56)
                    ? 1
                    : 0.12,
              }}
            />
          ))}
          <span className="st-art-window" />
        </div>
      ) : topic === 'working-with-data' || topic === 'sql' ? (
        <div className="st-art-table">
          <span>Name</span>
          <span>Age</span>
          <span>Adult</span>
          <span>Amy</span>
          <span>12</span>
          <span>0</span>
          <span>Joseph</span>
          <span>18</span>
          <span className="st-table-accent">1</span>
          <span>Rebecca</span>
          <span>19</span>
          <span className="st-table-accent">1</span>
        </div>
      ) : topic === 'research-assistants' ? (
        <div className="st-art-rag">
          <span>your question</span>
          <i />
          <div>
            <b>01</b>
            <b>02</b>
            <b>03</b>
          </div>
          <i />
          <span>an answer with context</span>
        </div>
      ) : (
        <div className="st-art-code">
          <span>
            {topic === 'python-basics'
              ? 'for idea in curiosity:'
              : topic === 'sentiment-analysis'
                ? '“not bad, actually.”'
                : 'shape → structure'}
          </span>
          <strong>
            {topic === 'python-basics'
              ? '    build(idea)'
              : topic === 'sentiment-analysis'
                ? 'context matters.'
                : '{ possibilities }'}
          </strong>
        </div>
      )}
    </div>
  )
}

export function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <article className="st-workshop-card">
      <Link href={`/learn/${workshop.slug}`} className="st-card-link">
        <TopicArt topic={workshop.slug} />
        <div className="st-card-body">
          <div className="st-card-meta">
            <span>{workshop.track} · {workshop.vertical}</span>
            <span>
              {workshop.interactive ? 'Try it here' : 'Workshop guide'}{' '}
              <Arrow diagonal />
            </span>
          </div>
          <h3>{workshop.title}</h3>
          <p>{workshop.description}</p>
          <div className="st-card-foot">
            <span>{workshop.level}</span>
            <span>~{workshop.time} read + explore</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
