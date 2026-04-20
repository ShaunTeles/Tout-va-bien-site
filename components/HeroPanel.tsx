import { CafeContent } from '@/lib/content'

interface HeroPanelProps {
  hero: CafeContent['hero']
}

export function HeroPanel({ hero }: HeroPanelProps) {
  return (
    <section className="panel panel--hero" id="panel-hero">
      <div className="hero-text">
        <h1 className="hero-heading">{hero.heading}</h1>
        <div className="hero-whats-new">
          <h3 className="sub-head">{hero.whatsNewTitle}</h3>
          <p className="body-text">{hero.whatsNewBody}</p>
        </div>
      </div>
    </section>
  )
}
