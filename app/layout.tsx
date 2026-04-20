import type { Metadata } from 'next'
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
