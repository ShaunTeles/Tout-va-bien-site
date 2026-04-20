'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useScrollContext } from './HorizontalCanvas'

interface SpinCircleProps {
  imageSrc: string
  imageAlt?: string
}

export function SpinCircle({ imageSrc, imageAlt }: SpinCircleProps) {
  const circleRef = useRef<HTMLDivElement>(null)
  const ctx = useScrollContext()

  useEffect(() => {
    /* Respect prefers-reduced-motion */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const container = ctx?.containerRef?.current
    if (!container) return

    let rotation = 0
    let lastScrollL = 0

    const handleScroll = () => {
      const current = container.scrollLeft
      const delta = current - lastScrollL
      rotation += delta * 0.15
      lastScrollL = current
      if (circleRef.current) {
        circleRef.current.style.transform = `rotate(${rotation}deg)`
      }
    }

    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [ctx])

  return (
    <div className="spin-circle" id="spinCircle" aria-hidden="true" ref={circleRef}>
      <Image src={imageSrc} alt={imageAlt ?? ""} width={80} height={80} />
    </div>
  )
}
