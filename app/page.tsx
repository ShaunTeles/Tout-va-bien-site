import { HorizontalCanvas } from '@/components/HorizontalCanvas'
import { SpinCircle } from '@/components/SpinCircle'
import Nav from '@/components/Nav'
import SocialIcons from '@/components/SocialIcons'
import content from '@/lib/content'

export default function Home() {
  return (
    <div id="site-wrapper">
      <HorizontalCanvas>
        {/* Panels will be added in T4 */}
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
