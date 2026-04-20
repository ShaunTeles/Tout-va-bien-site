'use client'

import { useEffect, useRef } from 'react'

interface SpinCircleProps {
  imageSrc: string
}

export function SpinCircle({ imageSrc }: SpinCircleProps) {
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    /* Respect prefers-reduced-motion */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const container = document.getElementById('scrollContainer')
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
  }, [])

  return (
    <div className="spin-circle" id="spinCircle" aria-hidden="true" ref={circleRef}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt="" />
    </div>
  )
}
