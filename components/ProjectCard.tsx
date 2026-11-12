import React from 'react'

type ProjectCardProps = {
  title: string
  description: string
  leaders?: string[]
  thumbColorA?: string
  thumbColorB?: string
}

function makeThumbDataUrl({
  colorA,
  colorB,
  title,
}: {
  colorA: string
  colorB: string
  title: string
}) {
  const safeTitle = title.replace(/[<>&"]/g, '')
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="240" height="160" viewBox="0 0 240 160">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${colorA}"/>
        <stop offset="1" stop-color="${colorB}"/>
      </linearGradient>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix type="matrix" values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 0.12 0"/>
      </filter>
    </defs>
    <rect width="240" height="160" rx="16" fill="url(#g)"/>
    <rect width="240" height="160" rx="16" filter="url(#grain)" opacity="0.35"/>
    <circle cx="56" cy="52" r="28" fill="rgba(255,255,255,0.18)"/>
    <text x="22" y="118" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, monospace" font-size="14" fill="rgba(255,255,255,0.9)">${safeTitle.slice(
    0,
    26
  )}</text>
  </svg>
  `.trim()

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

export default function ProjectCard({
  title,
  description,
  leaders = [],
  thumbColorA = '#2563EB',
  thumbColorB = '#0EA5E9',
}: ProjectCardProps) {
  const thumbSrc = makeThumbDataUrl({
    colorA: thumbColorA,
    colorB: thumbColorB,
    title,
  })

  const leadersText = leaders.length ? leaders.join(' · ') : 'TBD'

  return (
    <article className="project-card" tabIndex={0} aria-label={`Project: ${title}`}>
      <div className="project-card__top">
        <img className="project-card__thumb" src={thumbSrc} alt={`${title} thumbnail`} />
        <div className="project-card__body">
          <h3 className="project-card__title">{title}</h3>
          <p className="project-card__description">{description}</p>
          <div className="project-card__leaders">
            <div className="project-card__leaders-label">Project Leaders</div>
            <div className="project-card__leaders-names">{leadersText}</div>
          </div>
        </div>
      </div>
    </article>
  )
}
