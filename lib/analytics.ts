declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    cookieConsent?: {
      open: () => void
      status: () => 'accepted' | 'rejected' | null
      onAccept: (fn: () => void) => void
    }
  }
}

// window.gtag only exists after the visitor accepts cookies (public/cookie-consent.js),
// so events are silently skipped until then.
export function trackEvent(eventName: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}
