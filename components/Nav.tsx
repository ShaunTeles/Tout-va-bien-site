'use client'

import { useScrollToPanel } from './HorizontalCanvas'
import type { NavLink } from '@/lib/content'

interface NavProps {
  logoSrc: string
  logoAlt: string
  links: NavLink[]
}

export default function Nav({ logoSrc, logoAlt, links }: NavProps) {
  const ctx = useScrollToPanel()

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    ctx?.scrollToPanel('panel-hero')
  }

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    ctx?.scrollToPanel(target)
  }

  return (
    <nav id="nav">
      <a
        href="#"
        className="nav-logo"
        id="navLogo"
        aria-label="Tout va bien home"
        onClick={handleLogoClick}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt={logoAlt} id="logoImg" />
      </a>
      <ul className="nav-links" id="navLinks">
        {links.map((link) => (
          <li key={link.target}>
            <a
              href="#"
              data-target={link.target}
              onClick={(e) => handleLinkClick(e, link.target)}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
