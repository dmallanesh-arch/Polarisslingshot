'use client';

import { formatCAD, type LineupModel } from '@slingshot/shared';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, CloseIcon, PinIcon, SearchIcon } from './Icons';

const NAV = [
  { href: '#accessories', label: 'Parts & Accessories' },
  { href: '#apparel', label: 'Clothing & Gear' },
  { href: '#tools', label: 'Shopping Tools' },
];

export function PromoBar() {
  return (
    <div className="promo-bar">
      <a href="#offers">Low-rate financing available on select 2026 models. Explore offers.</a>
    </div>
  );
}

export function Header({ lineup }: { lineup: LineupModel[] }) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close menus on outside click / Escape.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMegaOpen(false);
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const closeAll = () => {
    setMegaOpen(false);
    setMenuOpen(false);
  };

  return (
    <header className="site-header" id="top" ref={headerRef}>
      <div className="site-header__inner">
        <a className="logo" href="#top" aria-label="Slingshot home">
          <Image src="/images/slingshot-logo-white.png" alt="Slingshot" width={160} height={26} priority />
        </a>

        <nav className="main-nav" aria-label="Primary">
          <ul className="main-nav__list">
            <li>
              <button
                className="main-nav__link"
                aria-expanded={megaOpen}
                aria-controls="mega-vehicles"
                onClick={() => setMegaOpen((v) => !v)}
              >
                Vehicles <ChevronDown />
              </button>
            </li>
            {NAV.map((item) => (
              <li key={item.href}>
                <a className="main-nav__link" href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <button className="icon-link" aria-label="Search" onClick={() => setSearchOpen(true)}>
            <SearchIcon />
          </button>
          <a className="icon-link hide-sm" href="#dealer"><PinIcon /> Find Dealer</a>
          <button
            className="burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {megaOpen && (
        <div className="mega" id="mega-vehicles">
          <div className="container">
            <ul className="mega__grid">
              {lineup.map((m) => (
                <li className="mega__item" key={m.id}>
                  <a href={m.current ? '#overview' : '#compare'} aria-current={m.current ? 'page' : undefined} onClick={closeAll}>
                    <Image src={m.image} alt="" width={384} height={216} />
                    <p className="mega__name">{m.name}</p>
                    <p className="mega__price">
                      {m.price ? `Starting at ${formatCAD(m.price)} MSRP` : 'See dealer for pricing'}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mega__foot">
              <a className="btn btn--dark btn--sm" href="#compare" onClick={closeAll}>Explore Lineup</a>
              <a className="btn btn--outline btn--sm" href="#overview" onClick={closeAll}>Build &amp; Price</a>
            </div>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="search">
          <form className="search__inner" role="search" onSubmit={(e) => e.preventDefault()}>
            <label className="visually-hidden" htmlFor="q">Search</label>
            <input ref={searchRef} id="q" type="search" placeholder="Search Keyword/Part #" autoComplete="off" />
            <button type="button" className="icon-link" aria-label="Close search" onClick={() => setSearchOpen(false)}>
              <CloseIcon />
            </button>
          </form>
        </div>
      )}

      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <ul>
            <li><a href="#compare" onClick={closeAll}>Vehicles</a></li>
            {NAV.map((item) => (
              <li key={item.href}><a href={item.href} onClick={closeAll}>{item.label}</a></li>
            ))}
            <li><a href="#dealer" onClick={closeAll}>Find Dealer</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}
