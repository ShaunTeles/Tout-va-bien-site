/**
 * ============================================================
 *  TOUT VA BIEN — TYPED CONTENT
 *  Single source of truth for all site text and image paths.
 *  Edit values here; the TypeScript interface enforces shape.
 * ============================================================
 */

export interface NavLink {
  label: string;
  target: string;
}

export interface CafeContent {
  nav: {
    logoSrc: string;
    logoAlt: string;
    links: NavLink[];
    instagram: string;
    facebook: string;
  };

  hero: {
    heading: string;
    whatsNewTitle: string;
    whatsNewBody: string;
  };

  menu: {
    coffeeHeading: string;
    coffeeItems: string[];
    coffeeOfTheDayLabel: string;
    coffeeOfTheDay: string;

    teaHeading: string;
    specialtyTeasLabel: string;
    specialtyTeas: string[];
    otherTeasLabel: string;
    otherTeas: string[];

    jpnTeasHeading: string;
    jpnTeas: string[];

    drinksHeading: string;
    drinks: string[];

    largeCoffeeWord: string;

    coffeeImageSrc: string;
    coffeeImageAlt: string;
  };

  specialty: {
    coffeeOfTheDayImageSrc: string;
    coffeeOfTheDayName: string;
    coffeeOfTheDayType: string;

    bensaName: string;
    bensaType: string;
    bensaImageSrc: string;

    icedDrinksHeading: string;
    icedDrinks: string[];

    lemonadesHeading: string;
    lemonades: string[];

    cafeImageSrc: string;
    cafeImageAlt: string;
    cafeImage2Src: string;
    cafeImage2Alt: string;
  };

  about: {
    heading: string;
    whatsNewTitle: string;
    whatsNewBody: string;

    image1Src: string;
    image1Alt: string;
    image2Src: string;
    image2Alt: string;
    image3Src: string;
    image3Alt: string;
  };

  spinCircle: {
    imageSrc: string;
    imageAlt: string;
  };
}

const content: CafeContent = {

  /* ── NAV ── */
  nav: {
    logoSrc: "/images/Logo.png",
    logoAlt: "Tout va bien",
    links: [
      { label: "Menu",     target: "panel-menu"  },
      { label: "About Us", target: "panel-about" },
    ],
    instagram: "https://www.instagram.com/toutvabienprague/",
    facebook:  "https://www.facebook.com/toutvabienprague/",
  },

  /* ── HERO PANEL ── */
  hero: {
    heading: "Speciality coffee &\ntea room in Prague",
    whatsNewTitle: "Who we are",
    whatsNewBody:
      "Café Tout va bien is a cozy neighborhood café in Prague's Vinohrady, offering a warm, dog-friendly space for quality coffee, homemade treats, and easygoing everyday moments.",
  },

  /* ── MENU PANEL ── */
  menu: {
    coffeeHeading: "Coffee",
    coffeeItems: [
      "Espresso",
      "Macchiato",
      "Cappuccino",
      "Café Latte",
      "Flat White",
      "Espresso Tonic",
      "Espresso Tonic S Yuzu",
      "Americano",
      "Dirty Tea (Chai latte s espressem)",
      "Matcha Latte",
      "Kashmiri Chai (Pink chai)",
      "Filtrovaná Káva Batch Brew / Filter",
    ],
    coffeeOfTheDayLabel: "Coffee of the Day",
    coffeeOfTheDay:
      "Horká Čokoláda (Hot Chocolate — Ajala from Brno, Panama & Nicaragua dark 70%)",

    teaHeading: "Tea",
    specialtyTeasLabel: "Specialty Teas",
    specialtyTeas: [
      "Ming Jian Hong Cha — Taiwan",
      "Aryatara Golden Tips — Nepal",
      "Malayan Kalapiniforest — Nepal",
      "Koucha Tsuge Koushun",
      "Puttabong Flowery — India",
    ],
    otherTeasLabel: "Other Teas:",
    otherTeas: [
      "My Thai Organic Rooibos",
      "Sladký Yuzu Čaj (Sweet Yuzu Tea)",
      "Sladký Zázvorový Čaj",
      "Čerstvý Zázvorový Čaj (Fresh Ginger Tea)",
      "Čerstvý Mátový Čaj (Fresh Mint Tea)",
    ],

    jpnTeasHeading: "JPN Teas",
    jpnTeas: [
      "Kabu Sencha Yabukita",
      "Sencha Meiryoku",
      "Bancha Kagoshima",
      "Songbolin Si Ji Chun Mi Oolong",
      "Genmaicha",
      "Sencha Yabukita Kirishima Premium",
      "Gyokuro Saemidori",
      "Gyokuro Yabukita",
      "Hanaka Kuki Houji",
      "Yuzu Kukicha",
    ],

    drinksHeading: "Drinks",
    drinks: [
      "Dash Perlivá Voda (Sparkling Water San Benedetto)",
      "Proviant Limo",
      "Dobrý Material Limo",
      "Pago Džus 0.21 (Fresh Bottle Juice)",
      "Chai Latte",
      "Kashmiri Chai Latte",
    ],

    largeCoffeeWord: "Coffee", // decorative large background text on the menu panel

    coffeeImageSrc: "/images/coffee-pour.png",
    coffeeImageAlt: "Coffee pour",
  },

  /* ── SPECIALTY & DRINKS PANEL ── */
  specialty: {
    coffeeOfTheDayImageSrc: "/images/coffee-of-the-day.png",
    coffeeOfTheDayName: "Chelbesa Dhilgee | Etiopie",
    coffeeOfTheDayType: "Filtr",

    bensaName: "Bensa | Etiopie",
    bensaType: "Espresso",
    bensaImageSrc: "/images/white-coffee-of-the-day.png",

    icedDrinksHeading: "Iced Drinks",
    icedDrinks: [
      "Ledové Latte (Iced Latte / Double Shot)",
      "Ledové Chai / Kashmiri (Iced Chai Latte / Iced Kashmiri Chai)",
      "Ledové Americano (Iced Americano / Double Shot)",
      "Ledová Filtr (Filter Coffee of the Day)",
    ],

    lemonadesHeading: "Lemonades",
    lemonades: [
      "Yuzu Limonáda (Yuzu lemonade from South Korea)",
      "Zázvorová Limonáda (Ginger with honey lemonade)",
      "Citrusová Limonáda (Lime & lemon)",
      "Grapefruit Limonáda",
      "Korejská Švestková Limonáda (Korean plum lemonade)",
    ],

    cafeImageSrc:  "/images/cafe-interior.png",
    cafeImageAlt:  "Café interior",
    cafeImage2Src: "/images/cafe-detail.png",
    cafeImage2Alt: "Café detail",
  },

  /* ── ABOUT PANEL ── */
  about: {
    heading: "About us",
    whatsNewTitle: "Visit us",
    whatsNewBody:
      "Café Tout va bien is a cozy neighborhood café in Prague's Vinohrady, offering a warm, dog-friendly space for quality coffee, homemade treats, and easygoing everyday moments.",

    image1Src: "/images/1-Cafe-interior.png",
    image1Alt: "Café interior",
    image2Src: "/images/cafe-detail.png", // same as specialty.cafeImage2Src — replace with a distinct photo if available
    image2Alt: "Café detail",
    image3Src: "/images/Book-Fan.png",
    image3Alt: "Reading at the café",
  },

  /* ── SPIN CIRCLE ── */
  spinCircle: {
    imageSrc: "/images/spin-circle.png",
    imageAlt: "Tout va bien rotating logo",
  },
};

export { content as default };
