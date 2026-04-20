'use client'

import { useRef, useCallback, createContext, useContext, useEffect } from 'react'

/* ── Scroll context — lets Nav/SpinCircle access scroll state without prop-drilling ── */
interface ScrollContextValue {
  scrollToPanel: (id: string) => void
  containerRef: React.RefObject<HTMLDivElement | null>
}

export const ScrollContext = createContext<ScrollContextValue | null>(null)

export function useScrollContext(): ScrollContextValue | null {
  const ctx = useContext(ScrollContext)
  if (process.env.NODE_ENV === 'development' && !ctx) {
    console.warn('useScrollContext called outside HorizontalCanvas provider')
  }
  return ctx
}

/* ── HorizontalCanvas ── */
interface HorizontalCanvasProps {
  children?: React.ReactNode
}

export function HorizontalCanvas({ children }: HorizontalCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  /* ── Scroll to a panel by its DOM id ── */
  const scrollToPanel = useCallback((id: string) => {
    const container = containerRef.current
    if (!container) return
    const target = document.getElementById(id)
    if (!target) return
    container.scrollTo({ left: target.offsetLeft, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    /* ── Wheel → horizontal scroll ── */
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      container.scrollLeft += e.deltaY !== 0 ? e.deltaY : e.deltaX
    }

    /* ── Drag to scroll ── */
    let isDragging = false
    let startX = 0
    let startScrollL = 0

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      startX = e.pageX
      startScrollL = container.scrollLeft
      container.classList.add('dragging')
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const dx = e.pageX - startX
      container.scrollLeft = startScrollL - dx
    }

    const handleMouseUp = () => {
      isDragging = false
      container.classList.remove('dragging')
    }

    /* ── Arrow key navigation ── */
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = container.clientWidth * 0.8
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        container.scrollBy({ left: step, behavior: 'smooth' })
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        container.scrollBy({ left: -step, behavior: 'smooth' })
      }
    }

    const handleMouseLeave = () => {
      if (isDragging) {
        isDragging = false
        container.classList.remove('dragging')
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('mousedown', handleMouseDown)
    container.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('mousedown', handleMouseDown)
      container.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <ScrollContext.Provider value={{ scrollToPanel, containerRef }}>
      <main
        className="scroll-container"
        id="scrollContainer"
        ref={containerRef}
      >
        <div className="canvas">{children}</div>
      </main>
    </ScrollContext.Provider>
  )
}
