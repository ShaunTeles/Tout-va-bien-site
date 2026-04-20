import { HorizontalCanvas } from '@/components/HorizontalCanvas'
import { SpinCircle } from '@/components/SpinCircle'
import Nav from '@/components/Nav'
import SocialIcons from '@/components/SocialIcons'
import { HeroPanel } from '@/components/HeroPanel'
import { MenuPanel } from '@/components/MenuPanel'
import { SpecialtyPanel } from '@/components/SpecialtyPanel'
import { AboutPanel } from '@/components/AboutPanel'
import content from '@/lib/content'

export default function Home() {
  return (
    <div id="site-wrapper">
      <HorizontalCanvas>
        <HeroPanel hero={content.hero} />
        <MenuPanel menu={content.menu} specialty={content.specialty} />
        <SpecialtyPanel specialty={content.specialty} />
        <AboutPanel about={content.about} />
      </HorizontalCanvas>
      <Nav
        logoSrc={content.nav.logoSrc}
        logoAlt={content.nav.logoAlt}
        links={content.nav.links}
      />
      <SocialIcons
        instagramUrl={content.nav.instagram}
        facebookUrl={content.nav.facebook}
      />
      <SpinCircle imageSrc={content.spinCircle.imageSrc} imageAlt={content.spinCircle.imageAlt} />
    </div>
  )
}
