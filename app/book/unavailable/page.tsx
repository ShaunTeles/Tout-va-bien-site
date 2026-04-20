import Link from 'next/link'
import FocusHeading from '@/components/FocusHeading'

export const metadata = {
  title: 'Reservations — Tout va bien',
}

export default function UnavailablePage() {
  return (
    <main className="book-page">
      <div className="book-unavailable">
        <FocusHeading />

        <h1
          id="unavailable-heading"
          className="book-heading"
          tabIndex={-1}
        >
          This feature isn&apos;t live yet
        </h1>

        <p className="book-unavailable-sub">
          Online booking isn&apos;t available at the moment. Please contact the
          café directly to reserve a table.
        </p>

        <div className="book-contacts">
          <a
            href="https://www.instagram.com/toutvabienprague/"
            className="book-contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram — @toutvabienprague
          </a>
          <a
            href="https://www.facebook.com/toutvabienprague/"
            className="book-contact-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook — Tout va bien Prague
          </a>
        </div>

        <p className="book-note">
          We&apos;re on Vinohrady, Prague — drop in and say hello.
        </p>

        <Link href="/#panel-hero" className="book-back-link">
          ← Back to the site
        </Link>
      </div>
    </main>
  )
}
