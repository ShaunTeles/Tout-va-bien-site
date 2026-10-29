import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://toutvabien.cz'),
  title: {
    default: 'Tout va bien — Speciality coffee & tea room, Prague',
    template: '%s | Tout va bien'
  },
  description: 'Speciality coffee and tea room in Prague\'s Vinohrady neighbourhood. Curated single-origin coffees, rare Japanese and specialty teas, homemade treats, and a warm dog-friendly atmosphere.',
  keywords: ['speciality coffee Prague', 'tea room Prague', 'Vinohrady café', 'Prague coffee', 'specialty coffee', 'Japanese tea Prague', 'kavarna Praha', 'tout va bien'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://toutvabien.cz',
    siteName: 'Tout va bien',
    title: 'Tout va bien — Speciality coffee & tea room, Prague',
    description: 'Curated single-origin coffees, rare Japanese and specialty teas, and homemade treats in Prague\'s Vinohrady.',
    images: [{
      url: '/images/1-Cafe-interior.webp',
      width: 1200,
      height: 900,
      alt: 'Tout va bien café interior',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tout va bien — Speciality coffee & tea room, Prague',
    description: 'Curated single-origin coffees, rare Japanese and specialty teas, and homemade treats in Prague\'s Vinohrady.',
    images: ['/images/1-Cafe-interior.webp'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: 'Café Tout va bien',
  description: 'Speciality coffee and tea room in Prague\'s Vinohrady neighbourhood.',
  url: 'https://toutvabien.cz',
  servesCuisine: ['Coffee', 'Tea', 'Pastries'],
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Prague',
    addressRegion: 'Vinohrady',
    addressCountry: 'CZ',
  },
  sameAs: [
    'https://www.instagram.com/toutvabienprague/',
    'https://www.facebook.com/toutvabienprague/',
  ],
}

const cookieConsentConfig = `window.cookieConsentConfig = ${JSON.stringify({
  ga4: 'G-RRC08YYYH2',
  privacyUrl: '/privacy',
  text: {
    title: 'A small note on cookies',
    body: 'We use analytics cookies to see how people find the café online. They are only set if you accept.',
    accept: 'Accept',
    reject: 'No thanks',
    privacy: 'Privacy policy',
  },
  theme: {
    bg: '#fefffe',
    text: '#2b2b2b',
    muted: '#5b5b58',
    accent: '#2b2b2b',
    accentText: '#fefffe',
    border: '#fefffe',
    radius: '4px',
    buttonRadius: '2px',
    font: 'var(--font-body)',
  },
})}`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Cookie consent: config first, then the banner. The banner loads
            Google Analytics (G-RRC08YYYH2) itself, only after the visitor clicks Accept. */}
        <script dangerouslySetInnerHTML={{ __html: cookieConsentConfig }} />
        <Script src="/cookie-consent.js" strategy="afterInteractive" />
        <a href="#scrollContainer" className="skip-link">Skip to content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
