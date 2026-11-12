import { CLUB, LINKS } from '../src/content/club'

/* Shared by the home page and every team page, so the hash links are
   absolute ('/#mission') rather than bare fragments — otherwise they
   would try to scroll to a section that is not on a team page. */
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-brand">
            <p className="footer-brand__mark">
              BigThink<span>AI</span>
            </p>
            <p className="footer-brand__line">{CLUB.mission}.</p>
          </div>

          <div className="footer-col">
            <p className="footer-col__head">Explore</p>
            <ul>
              <li><a href="/#mission">Mission</a></li>
              <li><a href="/#what-we-do">What We Do</a></li>
              <li><a href="/projects">EDGE Projects</a></li>
              <li><a href="/#whats-next">What&apos;s Next</a></li>
              <li><a href="/#join">Join</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-col__head">Elsewhere</p>
            <ul>
              <li><a href={LINKS.discord} target="_blank" rel="noopener noreferrer">Discord</a></li>
              <li><a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href={`mailto:${CLUB.email}`}>Partner with us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <p className="footer-col__head">Contact</p>
            <ul>
              <li><a href={`mailto:${CLUB.email}`}>{CLUB.email}</a></li>
              <li>
                <address>
                  {CLUB.school}
                  <br />
                  {CLUB.location}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <span>© {new Date().getFullYear()} BigThink AI</span>
          <span>Think Big</span>
        </div>
      </div>
    </footer>
  )
}
