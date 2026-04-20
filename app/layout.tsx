import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tout va bien — coffee and tea room',
  description: 'Speciality coffee and tea room in Prague\'s Vinohrady neighbourhood.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
