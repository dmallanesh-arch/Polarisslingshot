'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { id: 'overview', label: 'Overview' },
  { id: 'features', label: 'Features' },
  { id: 'specs', label: 'Specs' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'compare', label: 'Compare' },
];

/** Sticky in-page navigation that highlights the section in view. */
export function ModelNav({ year, name }: { year: number; name: string }) {
  const [active, setActive] = useState('overview');

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
    <nav className="model-nav" aria-label={name}>
      <div className="container model-nav__inner">
        <p className="model-nav__title"><span>{year}</span> {name}</p>
        <ul className="model-nav__links">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={active === l.id ? 'is-active' : undefined}
                aria-current={active === l.id ? 'location' : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a className="btn btn--primary btn--sm" href="#build">Build &amp; Price</a>
      </div>
    </nav>
  );
}
