import { CafeContent } from '@/lib/content'

interface AboutPanelProps {
  about: CafeContent['about']
}

export function AboutPanel({ about }: AboutPanelProps) {
  return (
    <section className="panel panel--about" id="panel-about">

      {/* Rotated "About us" display text */}
      <div className="about-rotated-wrap">
        <h2 className="about-rotated-text">{about.heading}</h2>
      </div>

      {/* Images grid */}
      <div className="about-images">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="about-img about-img--1" src={about.image1Src} alt={about.image1Alt} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="about-img about-img--2" src={about.image2Src} alt={about.image2Alt} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="about-img about-img--3" src={about.image3Src} alt={about.image3Alt} />
      </div>

      {/* Body text */}
      <div className="about-body">
        <h3 className="sub-head">{about.whatsNewTitle}</h3>
        <p className="body-text">{about.whatsNewBody}</p>
      </div>

    </section>
  )
}
