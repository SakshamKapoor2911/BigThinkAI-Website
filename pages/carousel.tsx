'use client';

import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Carousel from '../components/Carousel';

interface FeatureCard {
  title: string;
  subtitle: string;
  description: string;
  color: string;
}

const features: FeatureCard[] = [
  {
    title: 'EDGE Projects',
    subtitle: 'Applied Machine Learning',
    description: 'Multi-quarter, team-led projects exploring real-world ML applications. From autonomous data labeling to campus dashboards, build practical systems and ship real impact.',
    color: 'from-blue-500/20',
  },
  {
    title: 'Pyoneer Workshops',
    subtitle: 'Hands-on ML Curriculum',
    description: 'Beginner to advanced Python and ML workshops. Weekly hands-on sessions with exercises, notebooks, and recorded sessions. Learn by building.',
    color: 'from-green-500/20',
  },
  {
    title: 'Bitcamp Hackathon',
    subtitle: 'Weekend Innovation Sprint',
    description: 'Intensive 24-48 hour hackathons to prototype AI projects, collaborate across teams, and compete for mentorship prizes and recognition.',
    color: 'from-yellow-500/20',
  },
  {
    title: 'Research Spotlight',
    subtitle: 'Student-Led Exploration',
    description: 'Peer-reviewed research groups diving deep into cutting-edge ML topics. Present your findings, publish papers, and contribute to the field.',
    color: 'from-purple-500/20',
  },
];

export default function CarouselDemo() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="page film-grain">
      <Navigation />

      <main className="shell" style={{ paddingBlock: '8rem 5rem' }}>
        {/* Header */}
        <div className="section-head">
          <p className="kicker">Spec / Component</p>
          <h1 className="h1-display">Carousel</h1>
          <span className="hatch" aria-hidden="true" />
          <p className="section-lede">
            Demo of the <code>Carousel</code> component: auto-play, keyboard, touch, and
            reduced-motion behavior.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          autoPlay={true}
          autoPlayInterval={6000}
          showIndicators={true}
          showControls={true}
          onSlideChange={(index) => setCurrentSlide(index)}
        >
          {features.map((feature) => (
            <div key={feature.title} className="carousel-card">
              <p className="carousel-card__subtitle">{feature.subtitle}</p>
              <h2 className="carousel-card__title">{feature.title}</h2>
              <p className="carousel-card__desc">{feature.description}</p>
            </div>
          ))}
        </Carousel>

        {/* Info Section */}
        <section className="pillars" style={{ marginTop: '3rem' }}>
          <div className="pillar">
            <h3 className="pillar__name">Features</h3>
            <ul className="skills">
              <li>Auto-play with pause-on-hover</li>
              <li>Keyboard navigation (← →)</li>
              <li>Touch/swipe support for mobile</li>
              <li>Indicator dots for quick nav</li>
              <li>Full ARIA accessibility labels</li>
              <li>Reduced motion support</li>
            </ul>
          </div>

          <div className="pillar">
            <h3 className="pillar__name">Current Slide</h3>
            <p>
              You&apos;re viewing slide <strong>{currentSlide + 1}</strong> of <strong>{features.length}</strong>
            </p>
            <div>
              <div className="font-semibold">{features[currentSlide]?.title}</div>
              <p className="pillar__desc">{features[currentSlide]?.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Instructions */}
        <section className="card" style={{ marginTop: '2rem' }}>
          <h3 className="h2-display">How to Interact</h3>
          <div className="pillars" style={{ border: 0, background: 'transparent' }}>
            <div>
              <strong className="pillar__index">Mouse</strong>
              <p className="pillar__desc">Use the left/right arrow buttons or click the dots below to navigate. Hover to pause auto-play.</p>
            </div>
            <div>
              <strong className="pillar__index">Keyboard</strong>
              <p className="pillar__desc">Press Arrow Left/Right keys to navigate when the carousel has focus.</p>
            </div>
            <div>
              <strong className="pillar__index">Touch</strong>
              <p className="pillar__desc">Swipe left or right on your mobile device to slide between initiatives.</p>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section style={{ marginTop: '2rem' }}>
          <h3 className="h2-display">Usage Example</h3>
          <div className="card" style={{ overflowX: 'auto' }}>
            <pre style={{ margin: 0, fontSize: '0.8rem' }}>{`import Carousel from '@/components/Carousel';

export default function Page() {
  return (
    <Carousel 
      autoPlay={true}
      autoPlayInterval={5000}
      showIndicators={true}
      showControls={true}
      onSlideChange={(index) => console.log(index)}
    >
      <div>Slide 1</div>
      <div>Slide 2</div>
      <div>Slide 3</div>
    </Carousel>
  );
}`}</pre>
          </div>
        </section>
      </main>
    </div>
  );
}
