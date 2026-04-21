'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { NavLink } from '@/lib/content'

interface NavProps {
  logoSrc: string
  logoAlt: string
  links: NavLink[]
}

function scrollToPanel(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = window.matchMedia('(max-width: 767px)').matches
  if (isMobile) {
    const wrapper = document.getElementById('site-wrapper')
    if (!wrapper) return
    wrapper.scrollTo({ top: target.offsetTop, behavior: prefersReduced ? 'auto' : 'smooth' })
  } else {
    const container = document.getElementById('scrollContainer')
    if (!container) return
    container.scrollTo({ left: target.offsetLeft, behavior: prefersReduced ? 'auto' : 'smooth' })
  }
}

export default function Nav({ logoSrc, logoAlt, links }: NavProps) {
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToPanel('panel-hero')
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    scrollToPanel(target)
  }

  return (
    <nav id="nav">
      <a
        href="#panel-hero"
        className="nav-logo"
        id="navLogo"
        aria-label="Tout va bien home"
        onClick={handleLogoClick}
      >
        <Image src={logoSrc} alt={logoAlt} id="logoImg" width={160} height={38} />
      </a>
      <ul className="nav-links" id="navLinks">
        {links.map((link) => (
          <li key={link.target}>
            <a
              href={"#" + link.target}
              data-target={link.target}
              onClick={(e) => handleLinkClick(e, link.target)}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <Link href="/book">Book</Link>
        </li>
      </ul>
    </nav>
  )
}
