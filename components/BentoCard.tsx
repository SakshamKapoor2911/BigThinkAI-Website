import React, { useEffect, useRef, useState } from 'react'

type Variant = 'content' | 'gallery' | 'featured'

interface BentoCardProps {
  variant?: Variant
  title?: string
  subtitle?: string
  image?: string
  /**
   * Overrides the intensity of the magnetic transform. Used by the `/bento` demo.
   * If undefined, defaults to 18.
   */
  intensity?: number
  /**
   * Forces reduced-motion behavior (useful for demos/tests).
   * If undefined, uses the user's `prefers-reduced-motion` setting.
   */
  reducedMotion?: boolean
  children?: React.ReactNode
  className?: string
}

export default function BentoCard({
  variant = 'content',
  title,
  subtitle,
  image,
  intensity = 18,
  reducedMotion,
  children,
  className = '',
}: BentoCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const animRef = useRef<number | null>(null)
  const [motionModule, setMotionModule] = useState<any>(null)
  const [transformStyle, setTransformStyle] = useState<{ x: number; y: number; rx: number; ry: number; scale: number }>({ x: 0, y: 0, rx: 0, ry: 0, scale: 1 })

  useEffect(() => {
    // feature-detect framer-motion by attempting dynamic import (ssr-safe)
    let mounted = true
    ;(async () => {
      try {
        // @ts-ignore - gracefully handle environments where framer-motion is not installed
        const m = await import('framer-motion')
        if (mounted) setMotionModule(m)
      } catch (_err) {
        if (mounted) setMotionModule(null)
      }
    })()

    return () => {
      mounted = false
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const isReduced =
      typeof reducedMotion === 'boolean' ? reducedMotion : window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) return

    const elNode = el
    function onPointerMove(e: PointerEvent) {
      const rect = elNode!.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      // normalize
      const nx = dx / (rect.width / 2)
      const ny = dy / (rect.height / 2)
      // limit
      const rx = Math.max(-1, Math.min(1, -ny))
      const ry = Math.max(-1, Math.min(1, nx))

      // throttle with rAF
      if (animRef.current) cancelAnimationFrame(animRef.current)
      animRef.current = requestAnimationFrame(() => {
        setTransformStyle({ x: nx * intensity, y: ny * intensity, rx: rx * 6, ry: ry * 6, scale: 1.01 })
      })
    }

    function onLeave() {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      animRef.current = requestAnimationFrame(() => {
        setTransformStyle({ x: 0, y: 0, rx: 0, ry: 0, scale: 1 })
      })
    }

    elNode!.addEventListener('pointermove', onPointerMove)
    elNode!.addEventListener('pointerleave', onLeave)
    elNode!.addEventListener('pointercancel', onLeave)

    return () => {
      el.removeEventListener('pointermove', onPointerMove)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('pointercancel', onLeave)
    }
  }, [intensity, reducedMotion])

  const dataMag = motionModule ? 'true' : 'false' // hint if advanced motion is available

  const base = `bento-card ${className}`

  // Inline transform fallback for environments without framer-motion
  const fallbackStyle: React.CSSProperties = {
    transform: `perspective(900px) translate3d(${transformStyle.x / 4}px, ${transformStyle.y / 4}px, 0) rotateX(${transformStyle.rx}deg) rotateY(${transformStyle.ry}deg) scale(${transformStyle.scale})`
  }

  // Render
  return (
    <div ref={ref} className={base} data-variant={variant} data-magnetic={dataMag} aria-hidden={false}>
      <div className="bento-card__rim" aria-hidden="true" />

      {image ? (
        <div className="bento-card__media" style={motionModule ? undefined : fallbackStyle}>
          {motionModule ? (
            // Use the dynamically loaded motion.div for spring physics
            (() => {
              const MotionDiv = motionModule.motion.div
              return (
                <MotionDiv
                  style={{ width: '100%', height: '100%' }}
                  animate={{ x: transformStyle.x / 6, y: transformStyle.y / 6, rotateX: transformStyle.rx, rotateY: transformStyle.ry, scale: transformStyle.scale }}
                  transition={{ type: 'spring', stiffness: 220, damping: 26 }}
                >
                  <img src={image} alt={title ?? 'Bento media'} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </MotionDiv>
              )
            })()
          ) : (
            <img src={image} alt={title ?? 'Bento media'} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          )}
        </div>
      ) : null}

      <div className="bento-card__content">
        {title ? <div className="bento-card__title">{title}</div> : null}
        {subtitle ? <div className="bento-card__meta">{subtitle}</div> : null}
        <div style={{ marginTop: 8 }}>{children}</div>
      </div>
    </div>
  )
}
