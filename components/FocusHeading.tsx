'use client'

import { useEffect } from 'react'

export default function FocusHeading() {
  useEffect(() => {
    const el = document.getElementById('unavailable-heading')
    if (el) {
      el.focus()
    }
  }, [])

  return null
}
