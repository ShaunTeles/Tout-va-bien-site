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

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const scrollTarget = isMobile
      ? (document.getElementById('site-wrapper') ?? ctx?.containerRef?.current)
      : ctx?.containerRef?.current

    if (!scrollTarget) return

    let rotation = 0
    let lastScroll = 0

    const handleScroll = () => {
      const current = isMobile
        ? (document.getElementById('site-wrapper')?.scrollTop ?? 0)
        : (ctx?.containerRef?.current?.scrollLeft ?? 0)
      const delta = current - lastScroll
      rotation += delta * 0.15
      lastScroll = current
      if (circleRef.current) {
        circleRef.current.style.transform = `rotate(${rotation}deg)`
      }
    }

    scrollTarget.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      scrollTarget.removeEventListener('scroll', handleScroll)
    }
  }, [ctx])

  return (
    <div className="spin-circle" id="spinCircle" aria-hidden="true" ref={circleRef}>
      <Image src={imageSrc} alt={imageAlt ?? ""} width={80} height={80} />
    </div>
  )
}
