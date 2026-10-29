import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description:
    'How Café Tout va bien handles personal data on toutvabien.cz: analytics cookies only with your consent, the booking form, hosting, and your rights.',
  alternates: { canonical: '/privacy' },
}

const INSTAGRAM = 'https://www.instagram.com/toutvabienprague/'
const FACEBOOK = 'https://www.facebook.com/toutvabienprague/'

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="privacy-inner">
        <Link href="/#panel-hero" className="book-back-link">
          ← Back to site
        </Link>

        <h1 className="book-heading privacy-heading">Privacy policy</h1>
        <p className="privacy-updated">Last updated: 29 October 2026</p>

        <section className="privacy-section">
          <h2>In short</h2>
          <ul>
            <li>This website does not use any analytics or tracking cookies unless you click &ldquo;Accept&rdquo; in the cookie banner.</li>
            <li>If you accept, we use Google Analytics to see how people find and use the site. You can change your mind at any time with &ldquo;Cookie settings&rdquo;.</li>
            <li>The booking form does not currently send or store anything: online booking is not live yet.</li>
            <li>We do not sell your data and we do not use it for advertising.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Who is responsible</h2>
          <p>
            The controller of personal data processed through toutvabien.cz is{' '}
            <strong>Café Tout va bien, Prague</strong> (Vinohrady, Prague, Czech Republic).
          </p>
          <p>
            For any privacy question or request, please message us on{' '}
            <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram (@toutvabienprague)</a>{' '}
            or{' '}
            <a href={FACEBOOK} target="_blank" rel="noopener noreferrer">Facebook (Tout va bien Prague)</a>,
            or ask us in person at the café.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Analytics cookies (Google Analytics)</h2>
          <p>
            When you first visit, a banner asks whether you accept analytics cookies. Until you click
            &ldquo;Accept&rdquo;, Google Analytics is not loaded at all and no analytics cookies are set.
          </p>
          <p>
            If you accept, we load Google Analytics 4 (measurement ID G-RRC08YYYH2). It sets cookies
            (such as <code>_ga</code>) and collects information about your visit: pages viewed, how you
            arrived (for example from a search or a link), approximate location (city or country),
            device, browser and screen size, and a few clicks on the site (for example the menu, the
            &ldquo;Book&rdquo; button and the Instagram and Facebook icons). We use this only to understand
            how people find the café online and to improve the site. Google Analytics 4 does not log or
            store IP addresses.
          </p>
          <p>
            <strong>Legal basis:</strong> your consent (GDPR Art. 6(1)(a) and the Czech Electronic
            Communications Act, implementing the ePrivacy Directive).
          </p>
          <p>
            <strong>Your choice is remembered:</strong> whether you accepted or declined is saved in your
            browser&apos;s local storage under the name <code>cookie-consent</code>. This is strictly
            necessary to respect your choice, contains no personal details, and stays on your device.
            After 6 months the banner asks again.
          </p>
          <p>
            <strong>Changing your mind:</strong> click &ldquo;Cookie settings&rdquo; at the bottom of the
            home page at any time. If you withdraw consent, the site deletes the Google Analytics
            cookies on this domain and reloads without analytics. Withdrawing does not affect anything
            collected before you withdrew.
          </p>
        </section>

        <section className="privacy-section">
          <h2>The booking form</h2>
          <p>
            The &ldquo;Book a table&rdquo; page asks for your name, date, arrival and departure time,
            number of guests and optional notes. <strong>Online booking is not live yet</strong>: when
            you press &ldquo;Check availability&rdquo;, these details are only checked in your own browser
            and are then discarded. They are not sent to us, to a server or to any third party, and are
            not stored. You are then shown how to contact the café directly.
          </p>
          <p>
            If you have accepted analytics cookies, Google Analytics records only that the button was
            clicked, not anything you typed.
          </p>
          <p>
            If you contact us to make a reservation (in person or via Instagram or Facebook), we use
            the details you give us only to handle your booking (legal basis: steps taken at your
            request before a contract, GDPR Art. 6(1)(b)) and keep them only as long as needed for that
            booking and any records we are legally required to keep. Messages sent via Instagram or
            Facebook are also handled by Meta under its own privacy policy.
          </p>
          <p>
            If online booking is introduced in the future, we will update this policy before it starts
            collecting any data.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Hosting and server logs</h2>
          <p>
            The website is hosted by Vercel. Like any web server, it automatically receives technical
            information needed to deliver the page to you, such as your IP address, the page requested,
            the time, and your browser&apos;s user agent. Vercel keeps these logs for a short period for
            security and operation of the site. We do not use them to identify visitors.
          </p>
          <p>
            <strong>Legal basis:</strong> our legitimate interest in running a secure, working website
            (GDPR Art. 6(1)(f)).
          </p>
        </section>

        <section className="privacy-section">
          <h2>Fonts, images and social links</h2>
          <p>
            All fonts and images are served from our own website. We do not use Google Fonts, embedded
            maps, videos or social media widgets, so no data is sent to those services when you browse
            the site.
          </p>
          <p>
            The Instagram and Facebook icons are plain links. Nothing is sent to Meta unless you click
            one; once you are on Instagram or Facebook, Meta&apos;s own privacy policy applies.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Who processes data for us</h2>
          <div className="privacy-table-wrap">
            <table className="privacy-table">
              <thead>
                <tr>
                  <th scope="col">Provider</th>
                  <th scope="col">Purpose</th>
                  <th scope="col">Where</th>
                  <th scope="col">When</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Vercel Inc.</td>
                  <td>Website hosting and server logs</td>
                  <td>USA, with servers in the EU and worldwide</td>
                  <td>Every visit</td>
                </tr>
                <tr>
                  <td>Google Ireland Ltd. / Google LLC</td>
                  <td>Google Analytics 4 (visit statistics)</td>
                  <td>EU and USA</td>
                  <td>Only if you accept analytics cookies</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Where data is transferred outside the European Economic Area (for example to the USA), it
            is protected by the EU&ndash;US Data Privacy Framework where the provider is certified, and
            by the European Commission&apos;s Standard Contractual Clauses (SCCs).
          </p>
        </section>

        <section className="privacy-section">
          <h2>How long data is kept</h2>
          <ul>
            <li><strong>Your cookie choice:</strong> 6 months in your browser, then the banner asks again. You can clear it at any time by clearing your browser&apos;s site data.</li>
            <li><strong>Google Analytics cookies:</strong> up to 2 years in your browser, or until you withdraw consent or clear them.</li>
            <li><strong>Google Analytics reports:</strong> event data is kept for Google Analytics&apos; standard retention period (2 months by default, at most 14 months), after which only aggregated statistics remain.</li>
            <li><strong>Server logs:</strong> kept by Vercel for a short period only.</li>
            <li><strong>Booking form:</strong> nothing is stored (see above).</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Your rights</h2>
          <p>Under the GDPR you have the right to:</p>
          <ul>
            <li>access the personal data we hold about you;</li>
            <li>have inaccurate data corrected;</li>
            <li>have your data erased;</li>
            <li>restrict or object to processing (including processing based on legitimate interest);</li>
            <li>data portability;</li>
            <li>withdraw your consent at any time, via &ldquo;Cookie settings&rdquo;, without affecting processing before you withdrew.</li>
          </ul>
          <p>
            To use any of these rights, contact us as described under &ldquo;Who is responsible&rdquo;.
            You also have the right to lodge a complaint with the Czech data protection authority,
            the Office for Personal Data Protection (Úřad pro ochranu osobních údajů, ÚOOÚ),{' '}
            <a href="https://uoou.gov.cz" target="_blank" rel="noopener noreferrer">uoou.gov.cz</a>.
          </p>
          <p>
            We do not use your data for automated decision-making or profiling, and you are not
            required to provide any personal data to use this website.
          </p>
        </section>

        <section className="privacy-section">
          <h2>Changes</h2>
          <p>
            If we change how the site handles personal data, we will update this page and the date
            at the top.
          </p>
        </section>

        <Link href="/#panel-hero" className="book-back-link privacy-back-bottom">
          ← Back to site
        </Link>
      </div>
    </main>
  )
}
