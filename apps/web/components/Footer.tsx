import type { LineupModel } from '@slingshot/shared';
import Image from 'next/image';
import { Newsletter } from './Newsletter';

const COLUMNS = [
  { title: 'Shopping Tools', links: ['Build & Price', 'Offers', 'Compare Models', 'Find a Dealer', 'Financing'] },
  { title: 'Owners', links: ["Owner's Manuals", 'Safety & Recalls', 'RIDE COMMAND', 'Warranty', 'Parts & Accessories'] },
  { title: 'Company', links: ['About', 'Careers', 'News', 'Contact Us', 'Rentals & Demos'] },
];

const SOCIAL = [
  { label: 'Instagram', icon: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" className="dot" /></> },
  { label: 'Facebook', icon: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z" /> },
  { label: 'YouTube', icon: <><rect x="2" y="5" width="20" height="14" rx="4" /><path d="m10 9 5 3-5 3Z" className="dot" /></> },
  { label: 'TikTok', icon: <path d="M14 3v11a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.5 2.5 4.5 5 4.5" /> },
];

export function Footer({ lineup }: { lineup: LineupModel[] }) {
  return (
    <footer className="site-footer" id="footer">
      <div className="container">
        <div className="newsletter">
          <div>
            <h2 className="footer-title">Stay in the loop</h2>
            <p>Get the latest Slingshot news, events and offers.</p>
          </div>
          <Newsletter />
        </div>

        <div className="footer-cols">
          <div className="footer-col">
            <h3>Vehicles</h3>
            <ul>
              {lineup.map((m) => (
                <li key={m.id}><a href={m.current ? '#overview' : '#compare'}>{m.name}</a></li>
              ))}
            </ul>
          </div>
          {COLUMNS.map((col) => (
            <div className="footer-col" key={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((l) => <li key={l}><a href="#footer">{l}</a></li>)}
              </ul>
            </div>
          ))}
          <div className="footer-col">
            <h3>Follow</h3>
            <ul className="social">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a href="#footer" aria-label={s.label}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">{s.icon}</svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-base">
          <a className="logo" href="#top" aria-label="Back to top">
            <Image src="/images/slingshot-logo-white.png" alt="Slingshot" width={140} height={22} />
          </a>
          <ul className="footer-base__links">
            {['Privacy Policy', 'Terms of Use', 'Accessibility', 'Cookie Settings'].map((l) => (
              <li key={l}><a href="#footer">{l}</a></li>
            ))}
          </ul>
          <p className="small">&copy; {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
