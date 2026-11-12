import Head from 'next/head'
import Navigation from '../components/Navigation'

/* Type specimens. Companion to /typography, which documents the system. */
const SPECIMENS = [
  { size: '4rem', weight: 200, label: 'Display 200 / 64px' },
  { size: '2.5rem', weight: 200, label: 'Display 200 / 40px' },
  { size: '1.5rem', weight: 300, label: 'Display 300 / 24px' },
]

export default function FontsPage() {
  return (
    <div className="page film-grain">
      <Head>
        <title>Specimens · BigThink AI</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Navigation />

      <main className="shell" style={{ paddingBlock: '8rem 5rem' }}>
        <div className="section-head">
          <p className="kicker">Spec / Specimens</p>
          <h1 className="h1-display">Type Specimens</h1>
          <span className="hatch" aria-hidden="true" />
          <p className="section-lede">
            Josefin Sans for display, Oswald for labels, JetBrains Mono for everything
            else. See <a href="/typography">/typography</a> for how the system fits together.
          </p>
        </div>

        <section className="card" style={{ marginBottom: '1.5rem' }}>
          <p className="field__label">Display · Josefin Sans</p>
          {SPECIMENS.map((s) => (
            <div key={s.label} style={{ marginBottom: '1.75rem' }}>
              <p
                className="display"
                style={{ fontSize: s.size, fontWeight: s.weight, marginBottom: '0.4rem' }}
              >
                Think Big
              </p>
              <p style={{ color: 'var(--text-faint)', fontSize: '0.72rem', margin: 0 }}>
                {s.label}
              </p>
            </div>
          ))}
        </section>

        <section className="card" style={{ marginBottom: '1.5rem' }}>
          <p className="field__label">Label · Oswald</p>
          <p className="label" style={{ fontSize: '1.5rem', margin: '0 0 0.5rem' }}>
            Sector · Description · Deliverable
          </p>
          <p style={{ color: 'var(--text-faint)', fontSize: '0.72rem', margin: 0 }}>
            Oswald 600 / uppercase / 0.09em tracking
          </p>
        </section>

        <section className="card">
          <p className="field__label">Body · JetBrains Mono</p>
          <p style={{ marginTop: 0 }}>
            We&apos;re building the first world model benchmark that measures with
            particle-level ground truth instead of a VLM&apos;s opinion, to find out
            where world models stop being physics engines.
          </p>
          <p style={{ color: 'var(--text-faint)', fontSize: '0.72rem', margin: 0 }}>
            JetBrains Mono 400 / 15px / 1.75 line-height, the default on <code>body</code>
          </p>
        </section>
      </main>
    </div>
  )
}
