/*!
 * cookie-consent.js — one small, dependency-free cookie consent banner.
 *
 * Nothing that sets cookies (Google Analytics, Microsoft Clarity, PostHog with
 * storage) loads until the visitor clicks Accept. Reject is one click and looks
 * the same as Accept, as EU rules expect. The choice is kept in localStorage
 * (strictly necessary: it is the record of the choice itself) for 6 months,
 * then the banner asks again.
 *
 * Use, in <head>, BEFORE any tracker:
 *
 *   <script>
 *     window.cookieConsentConfig = {
 *       ga4: 'G-XXXXXXX',              // optional
 *       clarity: 'abcdefghij',         // optional
 *       privacyUrl: '/privacy',        // optional
 *       text: { title, body, accept, reject, privacy },   // optional overrides
 *       theme: { bg, text, muted, accent, accentText, border, radius, buttonRadius, font }
 *     }
 *   </script>
 *   <script src="/cookie-consent.js" defer></script>
 *
 * Then remove the site's own GA / Clarity snippets: this file loads them.
 *
 * Design source: the "Cookie Banner" Figma file. Every theme/text value maps
 * to a variable there (color/*, radius/*, font/family, copy/*), and the layout
 * follows its Cookie Banner component: Layout=Desktop above 640px, Mobile below.
 *
 * From app code:
 *   cookieConsent.onAccept(fn)  run fn now if accepted, else when accepted
 *   cookieConsent.status()      'accepted' | 'rejected' | null
 *   cookieConsent.open()        show the banner again (wire to a footer
 *                               "Cookie settings" link: people must be able
 *                               to change their mind as easily as they agreed)
 */
(function () {
  'use strict'
  if (window.cookieConsent) return

  var KEY = 'cookie-consent'
  var VERSION = 1 // bump to ask everyone again (e.g. a new tracker is added)
  var MAX_AGE = 1000 * 60 * 60 * 24 * 182

  var cfg = window.cookieConsentConfig || {}
  var t = Object.assign(
    {
      title: 'Cookies',
      body: 'We use analytics cookies to see how the site is used and make it better. They are only set if you accept.',
      accept: 'Accept',
      reject: 'Reject',
      privacy: 'Privacy policy',
    },
    cfg.text || {},
  )
  var theme = Object.assign(
    {
      bg: '#ffffff',
      text: '#111111',
      muted: '#555555',
      accent: '#111111',
      accentText: '#ffffff',
      border: '#e5e5e5',
      radius: '12px',
      buttonRadius: '7px',
      font: 'inherit',
    },
    cfg.theme || {},
  )

  var listeners = []
  var loaded = false

  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY) || 'null')
      if (!v || v.v !== VERSION || Date.now() - v.at > MAX_AGE) return null
      return v.choice
    } catch (e) {
      return null
    }
  }

  function write(choice) {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: VERSION, choice: choice, at: Date.now() }))
    } catch (e) {
      /* private mode: the choice holds for this page view only */
    }
  }

  function script(src) {
    var s = document.createElement('script')
    s.async = true
    s.src = src
    document.head.appendChild(s)
  }

  function loadTrackers() {
    if (loaded) return
    loaded = true
    if (cfg.ga4) {
      window.dataLayer = window.dataLayer || []
      window.gtag =
        window.gtag ||
        function () {
          window.dataLayer.push(arguments)
        }
      window.gtag('js', new Date())
      window.gtag('config', cfg.ga4)
      script('https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(cfg.ga4))
    }
    if (cfg.clarity) {
      window.clarity =
        window.clarity ||
        function () {
          ;(window.clarity.q = window.clarity.q || []).push(arguments)
        }
      script('https://www.clarity.ms/tag/' + encodeURIComponent(cfg.clarity))
      window.clarity('consent')
    }
    listeners.splice(0).forEach(function (fn) {
      try {
        fn()
      } catch (e) {
        console.error('[cookie-consent]', e)
      }
    })
  }

  // Withdrawing consent: forget the trackers' cookies on this domain and reload,
  // so nothing already running keeps collecting.
  function clearTrackerCookies() {
    var host = location.hostname
    var domains = ['', host, '.' + host, '.' + host.split('.').slice(-2).join('.')]
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim()
      if (!/^(_ga|_gid|_gat|_clck|_clsk|CLID|ph_|_ph)/.test(name)) return
      domains.forEach(function (d) {
        document.cookie = name + '=; Max-Age=0; path=/' + (d ? '; domain=' + d : '')
      })
    })
    try {
      Object.keys(localStorage).forEach(function (k) {
        if (/^(ph_|_clck|_clsk)/.test(k)) localStorage.removeItem(k)
      })
    } catch (e) {
      /* ignore */
    }
  }

  var root = null

  // Layout from the Figma component (Cookie Banner, node 4:40).
  function css() {
    return (
      '.cc{position:fixed;z-index:2147483000;right:16px;bottom:16px;width:618px;max-width:calc(100% - 32px);' +
      'box-sizing:border-box;display:flex;flex-direction:column;gap:8px;padding:8px;' +
      'background:var(--cc-bg);color:var(--cc-text);border:1px solid var(--cc-border);border-radius:var(--cc-radius);' +
      'font-family:var(--cc-font);line-height:1.5;box-shadow:0 10px 40px rgba(0,0,0,.18);animation:cc-in .25s ease-out}' +
      '@keyframes cc-in{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}' +
      '@media (prefers-reduced-motion:reduce){.cc{animation:none}}' +
      '.cc-content{display:flex;flex-direction:column;gap:4px}' +
      '.cc-head{display:flex;align-items:baseline;justify-content:space-between;gap:32px}' +
      '.cc h2{margin:0;font:inherit;font-size:16px;font-weight:600;color:var(--cc-text)}' +
      '.cc a{font-size:14px;color:var(--cc-text);text-decoration:underline;text-underline-offset:2px;white-space:nowrap}' +
      '.cc p{margin:0;font-size:14px;color:var(--cc-muted)}' +
      // equal widths on purpose: rejecting must be as easy and as visible as accepting
      '.cc-row{display:flex;gap:32px}' +
      '.cc button{min-width:0;height:32px;padding:0 16px;border-radius:var(--cc-button-radius);' +
      'font:inherit;font-size:14px;font-weight:600;cursor:pointer;transition:opacity .15s}' +
      '.cc button:hover{opacity:.85}' +
      '.cc button:focus-visible{outline:2px solid var(--cc-accent);outline-offset:2px}' +
      '.cc-reject{flex:1 1 0;background:transparent;color:var(--cc-text);border:1px solid var(--cc-text)}' +
      '.cc-accept{flex:1 1 0;background:var(--cc-accent);color:var(--cc-accent-text);border:1px solid var(--cc-accent)}' +
      '@media (max-width:640px){' +
      '.cc{left:8px;right:8px;bottom:8px;width:auto;max-width:none}' +
      '.cc-head{gap:24px}.cc h2{font-size:14px}.cc a,.cc p{font-size:12px}' +
      '.cc-row{gap:16px}}'
    )
  }

  function show() {
    if (root) return
    if (!document.getElementById('cc-style')) {
      var st = document.createElement('style')
      st.id = 'cc-style'
      st.textContent = css()
      document.head.appendChild(st)
    }
    root = document.createElement('section')
    root.className = 'cc'
    root.setAttribute('role', 'dialog')
    root.setAttribute('aria-live', 'polite')
    root.setAttribute('aria-labelledby', 'cc-title')
    var vars = {
      '--cc-bg': theme.bg,
      '--cc-text': theme.text,
      '--cc-muted': theme.muted,
      '--cc-accent': theme.accent,
      '--cc-accent-text': theme.accentText,
      '--cc-border': theme.border,
      '--cc-radius': theme.radius,
      '--cc-button-radius': theme.buttonRadius,
      '--cc-font': theme.font,
    }
    Object.keys(vars).forEach(function (k) {
      root.style.setProperty(k, vars[k])
    })
    var link = cfg.privacyUrl ? '<a href="' + cfg.privacyUrl + '">' + t.privacy + '</a>' : ''
    root.innerHTML =
      '<div class="cc-content">' +
      '<div class="cc-head"><h2 id="cc-title">' + t.title + '</h2>' + link + '</div>' +
      '<p>' + t.body + '</p>' +
      '</div>' +
      '<div class="cc-row">' +
      '<button type="button" class="cc-reject">' + t.reject + '</button>' +
      '<button type="button" class="cc-accept">' + t.accept + '</button>' +
      '</div>'
    root.querySelector('.cc-accept').addEventListener('click', function () {
      decide('accepted')
    })
    root.querySelector('.cc-reject').addEventListener('click', function () {
      decide('rejected')
    })
    document.body.appendChild(root)
  }

  function hide() {
    if (root) root.remove()
    root = null
  }

  function decide(choice) {
    var before = read()
    write(choice)
    hide()
    if (choice === 'accepted') loadTrackers()
    else if (before === 'accepted' || loaded) {
      clearTrackerCookies()
      location.reload()
    }
  }

  window.cookieConsent = {
    status: read,
    open: show,
    onAccept: function (fn) {
      if (read() === 'accepted') {
        if (loaded) fn()
        else listeners.push(fn)
      } else listeners.push(fn)
    },
  }

  function start() {
    var choice = read()
    if (choice === 'accepted') loadTrackers()
    else if (choice === null) show()
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start)
  else start()
})()
