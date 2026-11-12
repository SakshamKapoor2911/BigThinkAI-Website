import Head from 'next/head'
import Navigation from '../components/Navigation'

/* Internal spec page for the type system. Not linked from the site nav. */
export default function TypographySpec() {
  return (
    <div className="page film-grain">
      <Head>
        <title>Typography · BigThink AI</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Navigation />

      <main className="shell" style={{ paddingBlock: '8rem 5rem' }}>
        <div className="section-head">
          <p className="kicker">Spec / Typography</p>
          <h1 className="h1-display">The Type System</h1>
          <span className="hatch" aria-hidden="true" />
          <p className="section-lede">
            Three families, each with one job. All loaded through <code>next/font</code>,
            self-hosted, and exposed as CSS variables from <code>src/fonts.ts</code>.
          </p>
        </div>

        <div className="pillars">
          <article className="pillar">
            <span className="pillar__index">--font-display</span>
            <h2 className="pillar__name">Josefin Sans</h2>
            <p className="pillar__desc">
              Headings and the wordmark. Always uppercase, weight 200–300, tracked out
              to about 0.09em. This is the brand&apos;s voice.
            </p>
            <p className="display" style={{ fontSize: '2rem', marginTop: '0.5rem' }}>
              Think Big
            </p>
          </article>

          <article className="pillar">
            <span className="pillar__index">--font-label</span>
            <h2 className="pillar__name">Oswald</h2>
            <p className="pillar__desc">
              Kickers, skill-level tags, buttons, and nav. Condensed and bold so small
              text still reads as a label rather than prose.
            </p>
            <p className="label" style={{ fontSize: '1.15rem', marginTop: '0.5rem' }}>
              Skill lvl: <span style={{ color: 'var(--lvl-beginner)' }}>Beginner</span>
            </p>
          </article>

          <article className="pillar">
            <span className="pillar__index">--font-mono</span>
            <h2 className="pillar__name">JetBrains Mono</h2>
            <p className="pillar__desc">
              Body copy, descriptions, and metadata. The deck sets everything technical
              in monospace, and so does the site. It is the default on <code>body</code>.
            </p>
            <p style={{ marginTop: '0.5rem', color: 'var(--text-dim)' }}>
              To push beyond the frontier of AI.
            </p>
          </article>
        </div>

        <div className="card" style={{ marginTop: '2rem' }}>
          <h2 className="h2-display">Skill-level colors</h2>
          <ul className="skills">
            <li>
              <span style={{ color: 'var(--lvl-beginner)' }}>Beginner · var(--lvl-beginner)</span>
            </li>
            <li>
              <span style={{ color: 'var(--lvl-intermediate)' }}>Intermediate · var(--lvl-intermediate)</span>
            </li>
            <li>
              <span style={{ color: 'var(--lvl-advanced)' }}>Advanced · var(--lvl-advanced)</span>
            </li>
            <li>
              <span style={{ color: 'var(--text-faint)' }}>TBD · var(--text-faint)</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}
