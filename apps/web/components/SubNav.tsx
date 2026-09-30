'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'specs', label: 'Specs' },
  { id: 'compare', label: 'Compare' },
];

/** Sticky in-page navigation that highlights the section in view. */
export function SubNav({ name }: { name: string }) {
  const [active, setActive] = useState('overview');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sub-nav" aria-label={`${name} sections`}>
      <div className="container sub-nav__inner">
        <button className="sub-nav__toggle" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span className="burger-icon" aria-hidden="true"><span /><span /><span /></span> Menu
        </button>
        <ul className={`sub-nav__links${open ? ' is-open' : ''}`}>
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={active === l.id ? 'is-active' : undefined}
                aria-current={active === l.id ? 'location' : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
