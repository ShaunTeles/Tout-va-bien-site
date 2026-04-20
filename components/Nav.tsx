'use client'

import Image from 'next/image'
import { useScrollContext } from './HorizontalCanvas'
import type { NavLink } from '@/lib/content'

interface NavProps {
  logoSrc: string
  logoAlt: string
  links: NavLink[]
}

export default function Nav({ logoSrc, logoAlt, links }: NavProps) {
  const ctx = useScrollContext()

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
      </ul>
    </nav>
  )
}
