/* ============================================================
   TOUT VA BIEN — SCRIPT
   - Populates content from content.js
   - Horizontal scroll (wheel + drag)
   - Spin circle rotation
   - Nav link scroll-to-panel
   - Scroll position dots
   ============================================================ */

(function () {
  "use strict";

  /* ── POPULATE CONTENT ── */
  function populateContent() {
    const c = CONTENT;

    /* Nav */
    document.getElementById("logoImg").src = c.nav.logoSrc;
    document.getElementById("logoImg").alt = c.nav.logoAlt;

    const navLinks = document.getElementById("navLinks");
    c.nav.links.forEach(link => {
      const li = document.createElement("li");
      const a  = document.createElement("a");
      a.textContent = link.label;
      a.href = "#";
      a.dataset.target = link.target;
      li.appendChild(a);
      navLinks.appendChild(li);
    });

    document.getElementById("instagramLink").href = c.nav.instagram;
    document.getElementById("facebookLink").href  = c.nav.facebook;

    /* Hero */
    document.getElementById("heroHeading").textContent      = c.hero.heading;
    document.getElementById("heroWhatsNewTitle").textContent = c.hero.whatsNewTitle;
    document.getElementById("heroWhatsNewBody").textContent  = c.hero.whatsNewBody;

    /* Menu – Coffee */
    document.getElementById("coffeeHeading").textContent      = c.menu.coffeeHeading;
    document.getElementById("coffeeOfTheDayLabel").textContent = c.menu.coffeeOfTheDayLabel;
    document.getElementById("coffeeOfTheDay").textContent      = c.menu.coffeeOfTheDay;
    populateList("coffeeList", c.menu.coffeeItems);

    /* Menu – Tea */
    document.getElementById("teaHeading").textContent       = c.menu.teaHeading;
    document.getElementById("specialtyTeasLabel").textContent = c.menu.specialtyTeasLabel;
    document.getElementById("otherTeasLabel").textContent    = c.menu.otherTeasLabel;
    populateList("specialtyTeasList", c.menu.specialtyTeas);
    populateList("otherTeasList",     c.menu.otherTeas);

    /* Menu – JPN Teas */
    document.getElementById("jpnTeasHeading").textContent = c.menu.jpnTeasHeading;
    populateList("jpnTeasList", c.menu.jpnTeas);

    /* Menu – Drinks */
    document.getElementById("drinksHeading").textContent = c.menu.drinksHeading;
    populateList("drinksList", c.menu.drinks);

    /* Menu – large word + coffee image */
    document.getElementById("menuLargeWord").textContent = c.menu.largeCoffeeWord;
    setImg("coffeeImage", c.menu.coffeeImageSrc, c.menu.coffeeImageAlt);

    /* Specialty */
    setImg("cotdImage", c.specialty.coffeeOfTheDayImage, c.specialty.coffeeOfTheDayName);
    document.getElementById("cotdName").textContent = c.specialty.coffeeOfTheDayName;
    document.getElementById("cotdType").textContent = c.specialty.coffeeOfTheDayType;
    document.getElementById("bensaName").textContent = c.specialty.bensaName;
    document.getElementById("bensaType").textContent = c.specialty.bensaType;

    document.getElementById("icedDrinksHeading").textContent  = c.specialty.icedDrinksHeading;
    document.getElementById("lemonadesHeading").textContent   = c.specialty.lemonadesHeading;
    populateList("icedDrinksList",  c.specialty.icedDrinks);
    populateList("lemonadesList",   c.specialty.lemonades);

    setImg("cafeImage",  c.specialty.cafeImageSrc,  c.specialty.cafeImageAlt);
    setImg("cafeImage2", c.specialty.cafeImage2Src, c.specialty.cafeImage2Alt);

    /* About */
    document.getElementById("aboutHeading").textContent       = c.about.heading;
    document.getElementById("aboutWhatsNewTitle").textContent  = c.about.whatsNewTitle;
    document.getElementById("aboutWhatsNewBody").textContent   = c.about.whatsNewBody;
    setImg("aboutImg1", c.about.image1Src, c.about.image1Alt);
    setImg("aboutImg2", c.about.image2Src, c.about.image2Alt);
    setImg("aboutImg3", c.about.image3Src, c.about.image3Alt);

    /* Spin circle */
    setImg("spinCircleImg", c.spinCircle.imageSrc, c.spinCircle.imageAlt);
  }

  function populateList(id, items) {
    const ul = document.getElementById(id);
    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  }

  function setImg(id, src, alt) {
    const el = document.getElementById(id);
    if (el) { el.src = src; el.alt = alt || ""; }
  }

  /* ── HORIZONTAL SCROLL ── */
  const container = document.getElementById("scrollContainer");

  // Convert vertical mousewheel to horizontal scroll
  container.addEventListener("wheel", function (e) {
    e.preventDefault();
    container.scrollLeft += e.deltaY !== 0 ? e.deltaY : e.deltaX;
  }, { passive: false });

  // Drag-to-scroll
  let isDragging   = false;
  let startX       = 0;
  let startScrollL = 0;

  container.addEventListener("mousedown", function (e) {
    isDragging   = true;
    startX       = e.pageX;
    startScrollL = container.scrollLeft;
    container.classList.add("dragging");
  });

  window.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    const dx = e.pageX - startX;
    container.scrollLeft = startScrollL - dx;
  });

  window.addEventListener("mouseup", function () {
    isDragging = false;
    container.classList.remove("dragging");
  });

  /* ── SPIN CIRCLE ── */
  const spinCircle = document.getElementById("spinCircle");
  let rotation    = 0;
  let lastScrollL = 0;

  container.addEventListener("scroll", function () {
    const current = container.scrollLeft;
    const delta   = current - lastScrollL;
    // CW on scroll right (+), CCW on scroll left (-)
    rotation  += delta * 0.15;
    lastScrollL = current;
    spinCircle.style.transform = `rotate(${rotation}deg)`;
    updateDots();
  });

  /* ── NAV LINK SCROLL ── */
  document.getElementById("navLinks").addEventListener("click", function (e) {
    const a = e.target.closest("a[data-target]");
    if (!a) return;
    e.preventDefault();
    const target = document.getElementById(a.dataset.target);
    if (!target) return;
    // scrollLeft of the panel's left edge
    container.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
  });

  /* ── SCROLL DOTS ── */
  const panels = ["panel-hero", "panel-menu", "panel-specialty", "panel-about"];

  // Build dots
  const dotsWrap = document.createElement("div");
  dotsWrap.className = "scroll-dots";
  panels.forEach((id, i) => {
    const dot = document.createElement("div");
    dot.className = "scroll-dot" + (i === 0 ? " active" : "");
    dot.dataset.panel = id;
    dotsWrap.appendChild(dot);
  });
  document.body.appendChild(dotsWrap);

  function updateDots() {
    const mid = container.scrollLeft + container.clientWidth / 2;
    let activeId = panels[0];
    panels.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetLeft <= mid) activeId = id;
    });
    document.querySelectorAll(".scroll-dot").forEach(d => {
      d.classList.toggle("active", d.dataset.panel === activeId);
    });
  }

  /* ── KEYBOARD NAVIGATION ── */
  document.addEventListener("keydown", function (e) {
    const step = container.clientWidth * 0.8;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      container.scrollBy({ left: step, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      container.scrollBy({ left: -step, behavior: "smooth" });
    }
  });

  /* ── INIT ── */
  populateContent();

})();
