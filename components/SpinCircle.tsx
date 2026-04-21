'use client'

import { useEffect, useRef } from 'react'

interface SpinCircleProps {
  imageSrc: string
  imageAlt?: string
}

export function SpinCircle({ imageSrc, imageAlt }: SpinCircleProps) {
  const circleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    /* Respect prefers-reduced-motion */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const mq = window.matchMedia('(max-width: 767px)')
    let rotation = 0
    let lastScroll = 0

    function attach() {
      const isMobile = mq.matches
      const scrollTarget = isMobile
        ? document.getElementById('site-wrapper')
        : document.getElementById('scrollContainer')

      if (!scrollTarget) return () => {}

      const handleScroll = () => {
        const current = isMobile
          ? (scrollTarget as HTMLElement).scrollTop
          : (scrollTarget as HTMLElement).scrollLeft
        const delta = current - lastScroll
        rotation += delta * 0.15
        lastScroll = current
        if (circleRef.current) {
          circleRef.current.style.transform = `rotate(${rotation}deg)`
        }
      }

      scrollTarget.addEventListener('scroll', handleScroll, { passive: true })
      return () => scrollTarget.removeEventListener('scroll', handleScroll)
    }

    let cleanup = attach()

    /* Re-attach when viewport crosses the mobile breakpoint */
    const handleMqChange = () => { cleanup(); cleanup = attach() }
    mq.addEventListener('change', handleMqChange)

    return () => {
      cleanup()
      mq.removeEventListener('change', handleMqChange)
    }
  }, [])

  return (
    <div className="spin-circle" id="spinCircle" aria-hidden="true" ref={circleRef}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt={imageAlt ?? ""} width={80} height={80} />
    </div>
  )
}
