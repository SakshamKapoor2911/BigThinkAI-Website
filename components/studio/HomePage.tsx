import Link from 'next/link'
import { WORKSHOPS } from '../../lib/learning'
import {
  Arrow,
  COMMUNITY_URL,
  Eyebrow,
  Reveal,
  StudioLayout,
} from './StudioLayout'
import { WorkshopCard } from './WorkshopCard'
import KernelLab from './KernelLab'

export default function HomePage() {
  return (
    <StudioLayout>
      <section className="st-hero st-container">
        <div className="st-hero-copy">
          <Eyebrow>
            <span className="st-status-dot" /> AN AI CLUB FOR THE CURIOUS
          </Eyebrow>
          <h1>
            Big ideas.
            <br />
            Small steps.
            <br />
            <em>Real things.</em>
          </h1>
          <p>
            Explore AI, make sense of the moving parts, and build something with
            people who are figuring it out too.
          </p>
          <div className="st-hero-actions">
            <Link className="st-button st-button-primary" href="/learn">
              Find your first workshop <Arrow />
            </Link>
            <a className="st-plain-link" href="#about">
              Meet the club <span>↓</span>
            </a>
          </div>
          <span className="st-hero-note">
            You don’t need to know everything to get started.
          </span>
        </div>
        <div className="st-hero-visual">
          <div className="st-visual-caption">
            <span>A SMALL IDEA TO PLAY WITH</span>
            <span>↓ TRY A FILTER</span>
          </div>
          <KernelLab />
          <p className="st-visual-footnote">
            <span>From our Computer Vision workshop</span>
            <Link href="/learn/computer-vision">
              How does it work? <Arrow diagonal />
            </Link>
          </p>
        </div>
      </section>
      <div className="st-values st-container">
        <span>
          <b>01</b> Learn by doing
        </span>
        <span>
          <b>02</b> Ask the “basic” question
        </span>
        <span>
          <b>03</b> Build with other people
        </span>
        <span className="st-values-last">
          ALL MAJORS. SHARED CURIOSITY. <span>✳</span>
        </span>
      </div>
      <Reveal className="st-library-section st-container" id="workshops">
        <div className="st-section-heading">
          <div>
            <Eyebrow>01 / THE LEARNING LIBRARY</Eyebrow>
            <h2>
              Less watching.
              <br />
              More <em>“oh, I get it.”</em>
            </h2>
          </div>
          <div className="st-section-aside">
            <p>
              Small explanations. Things to click.
              <br />
              Real notebooks to make your own.
            </p>
            <Link href="/learn" className="st-plain-link">
              Explore all workshops <Arrow />
            </Link>
          </div>
        </div>
        <div className="st-workshop-grid">
          {[WORKSHOPS[0], WORKSHOPS[1], WORKSHOPS[3]].map((workshop) => (
            <WorkshopCard key={workshop.slug} workshop={workshop} />
          ))}
        </div>
      </Reveal>
      <Reveal className="st-paths st-container">
        <Eyebrow>THERE IS MORE THAN ONE WAY IN</Eyebrow>
        <div className="st-path-grid">
          <Link href="/learn/python-basics">
            <span className="st-path-number">A</span>
            <div>
              <h3>“I’m completely new.”</h3>
              <p>Start with Python and build a little confidence.</p>
            </div>
            <Arrow />
          </Link>
          <Link href="/learn/computer-vision">
            <span className="st-path-number">B</span>
            <div>
              <h3>“I want to try something.”</h3>
              <p>Turn a tiny grid of numbers into a visual idea.</p>
            </div>
            <Arrow />
          </Link>
          <Link href="/projects">
            <span className="st-path-number">C</span>
            <div>
              <h3>“I want to build with a team.”</h3>
              <p>Explore what the EDGE program is about.</p>
            </div>
            <Arrow />
          </Link>
        </div>
      </Reveal>
      <Reveal className="st-about st-container" id="about">
        <div className="st-about-art" aria-hidden="true">
          <div className="st-orbit st-orbit-one" />
          <div className="st-orbit st-orbit-two" />
          <div className="st-orbit st-orbit-three" />
          <span className="st-orbit-center">✳</span>
          <span className="st-orbit-label st-label-one">a question</span>
          <span className="st-orbit-label st-label-two">a few people</span>
          <span className="st-orbit-label st-label-three">something new</span>
          <span className="st-art-caption">
            GOOD THINGS HAPPEN AT THE INTERSECTIONS.
          </span>
        </div>
        <div className="st-about-copy">
          <Eyebrow>02 / THE PEOPLE BEHIND THE PROJECTS</Eyebrow>
          <h2>
            AI is interesting.
            <br />
            <em>People make it better.</em>
          </h2>
          <p>
            We’re BigTh!nkAI, a student-run community at the University of
            Maryland. We learn across disciplines, ask questions together, and
            turn some of those questions into things that work.
          </p>
          <div className="st-programs">
            <div>
              <h3>
                Pyoneers <span>↗</span>
              </h3>
              <p>
                Hands-on workshops, shared notebooks, and room to experiment.
              </p>
            </div>
            <div>
              <h3>
                EDGE <span>↗</span>
              </h3>
              <p>
                Team projects that give an idea time, structure, and a few more
                perspectives.
              </p>
            </div>
          </div>
          <a
            href={COMMUNITY_URL}
            className="st-plain-link"
            target="_blank"
            rel="noreferrer"
          >
            Find us on TerpLink <Arrow diagonal />
          </a>
        </div>
      </Reveal>
      <Reveal className="st-community st-container">
        <div>
          <Eyebrow>YOUR NEXT STEP CAN BE A SMALL ONE</Eyebrow>
          <h2>
            Come curious.
            <br />
            <em>Leave with an idea.</em>
          </h2>
        </div>
        <div>
          <p>
            Try a workshop on your own, bring a question to the community, or
            find people to build with.
          </p>
          <a
            className="st-button st-button-primary"
            href={COMMUNITY_URL}
            target="_blank"
            rel="noreferrer"
          >
            Meet the community <Arrow diagonal />
          </a>
        </div>
      </Reveal>
    </StudioLayout>
  )
}
