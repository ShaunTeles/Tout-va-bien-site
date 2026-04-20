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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="specialty-card__img"
          src={specialty.coffeeOfTheDayImageSrc}
          alt={specialty.coffeeOfTheDayName}
        />
      </div>

      {/* Bensa block */}
      <div className="bensa-block">
        <div className="bensa-text">
          <p className="sub-head">{specialty.bensaName}</p>
          <p className="body-text">{specialty.bensaType}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="bensa-img"
          src={specialty.bensaImageSrc}
          alt={specialty.bensaName}
        />
      </div>

    </section>
  )
}
