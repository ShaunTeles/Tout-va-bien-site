import Image from 'next/image'
import { CafeContent } from '@/lib/content'

interface SpecialtyPanelProps {
  specialty: CafeContent['specialty']
}

export function SpecialtyPanel({ specialty }: SpecialtyPanelProps) {
  return (
    <section className="panel panel--specialty" id="panel-specialty">

      {/* Coffee of the Day card */}
      <div className="specialty-card">
        <p className="sub-head">{specialty.coffeeOfTheDayName}</p>
        <p className="body-text">{specialty.coffeeOfTheDayType}</p>
        <Image
          className="specialty-card__img"
          src={specialty.coffeeOfTheDayImageSrc}
          alt={specialty.coffeeOfTheDayName}
          width={160}
          height={210}
        />
      </div>

      {/* Bensa block */}
      <div className="bensa-block">
        <div className="bensa-text">
          <p className="sub-head">{specialty.bensaName}</p>
          <p className="body-text">{specialty.bensaType}</p>
        </div>
        <Image
          className="bensa-img"
          src={specialty.bensaImageSrc}
          alt={specialty.bensaName}
          width={0}
          height={0}
          sizes="(max-width: 768px) 100vw, 420px"
          style={{ width: '100%', height: '72vh', objectFit: 'contain', objectPosition: 'bottom center' }}
        />
      </div>

    </section>
  )
}
