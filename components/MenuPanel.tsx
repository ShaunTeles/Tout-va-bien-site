// Note: iced drinks and lemonades columns are visually part of this panel
// but their data comes from the specialty section of content — see drinks-col CSS.

import { CafeContent } from '@/lib/content'

interface MenuPanelProps {
  menu: CafeContent['menu']
  specialty: CafeContent['specialty']
}

export function MenuPanel({ menu, specialty }: MenuPanelProps) {
  return (
    <section className="panel panel--menu" id="panel-menu">

      {/* Coffee column */}
      <div className="menu-col menu-col--coffee">
        <h2 className="menu-heading">{menu.coffeeHeading}</h2>
        <ul className="menu-list" id="coffeeList">
          {menu.coffeeItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <div className="menu-subgroup">
          <p className="menu-label-bold">{menu.coffeeOfTheDayLabel}</p>
          <p className="body-text">{menu.coffeeOfTheDay}</p>
        </div>
      </div>

      {/* Tea column */}
      <div className="menu-col menu-col--tea">
        <h2 className="menu-heading">{menu.teaHeading}</h2>
        <div className="menu-subgroup">
          <p className="menu-label-bold">{menu.specialtyTeasLabel}</p>
          <ul className="menu-list">
            {menu.specialtyTeas.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="menu-subgroup">
          <p className="menu-label-bold">{menu.otherTeasLabel}</p>
          <ul className="menu-list">
            {menu.otherTeas.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* JPN Teas column */}
      <div className="menu-col menu-col--jpn">
        <h2 className="menu-heading">{menu.jpnTeasHeading}</h2>
        <ul className="menu-list">
          {menu.jpnTeas.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Drinks column */}
      <div className="menu-col menu-col--drinks">
        <h2 className="menu-heading">{menu.drinksHeading}</h2>
        <ul className="menu-list">
          {menu.drinks.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Iced drinks column */}
      <div className="drinks-col drinks-col--iced">
        <h2 className="menu-heading">{specialty.icedDrinksHeading}</h2>
        <ul className="menu-list">
          {specialty.icedDrinks.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Lemonades column */}
      <div className="drinks-col drinks-col--lemonades">
        <h2 className="menu-heading">{specialty.lemonadesHeading}</h2>
        <ul className="menu-list">
          {specialty.lemonades.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Coffee pour image — bottom of panel */}
      <div className="menu-coffee-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={menu.coffeeImageSrc} alt={menu.coffeeImageAlt} />
        <div className="menu-large-word">{menu.largeCoffeeWord}</div>
      </div>

    </section>
  )
}
