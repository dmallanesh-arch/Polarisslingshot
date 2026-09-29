'use client';

import { formatCAD, type LineupModel } from '@slingshot/shared';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, CloseIcon, LogoMark, PinIcon, SearchIcon } from './Icons';
import { Vehicle } from './Vehicle';

const NAV = [
  { href: '#build', label: 'Build & Price' },
  { href: '#offers', label: 'Offers' },
  { href: '#accessories', label: 'Accessories & Apparel' },
  { href: '#demo', label: 'Experience' },
  { href: '#footer', label: 'Owners' },
];

export function UtilityBar() {
  return (
    <div className="utility-bar">
      <div className="container utility-bar__inner">
        <p className="utility-bar__promo">
          <span className="badge">Offer</span>
          Low-rate financing available on select 2026 models.
          <a href="#offers">See offers</a>
        </p>
        <ul className="utility-bar__links">
          <li>
            <a href="#dealer"><PinIcon />Find a Dealer</a>
          </li>
          <li><a href="#demo">Rent &amp; Demo</a></li>
          <li className="lang" aria-label="Language">
            <a href="#" aria-current="true">EN</a>
            <span>|</span>
            <a href="#" lang="fr-CA">FR</a>
          </li>
        </ul>
      </div>
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
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
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
      <div className="container site-header__inner">
        <a className="logo" href="#top" aria-label="Slingshot home">
          <LogoMark />
          <span className="logo__word">SLINGSHOT</span>
        </a>

        <nav className="main-nav" aria-label="Primary">
          <ul className="main-nav__list">
            <li>
              <button
                className="main-nav__link"
                aria-expanded={megaOpen}
                aria-controls="mega-models"
                onClick={() => setMegaOpen((v) => !v)}
              >
                Models <ChevronDown />
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
          <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen(true)}>
            <SearchIcon />
          </button>
          <a className="btn btn--primary btn--sm hide-sm" href="#dealer">Find a Dealer</a>
          <button
            className="icon-btn burger"
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
        <div className="mega" id="mega-models">
          <div className="container">
            <p className="mega__eyebrow">2026 Lineup</p>
            <ul className="mega__grid">
              {lineup.map((m) => (
                <li className="mega__item" key={m.id}>
                  <a href={m.current ? '#overview' : '#compare'} aria-current={m.current ? 'page' : undefined} onClick={closeAll}>
                    <Vehicle id={`mega-${m.id}`} paint={m.paint} />
                    <p className="mega__name">{m.name}</p>
                    <p className="mega__price">
                      {m.price ? `Starting at ${formatCAD(m.price)} MSRP` : 'See dealer for pricing'}
                    </p>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mega__foot">
              <a className="link-arrow" href="#compare" onClick={closeAll}>Compare models</a>
              <a className="link-arrow" href="#build" onClick={closeAll}>Build &amp; Price</a>
            </div>
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="search">
          <div className="container search__inner">
            <form role="search" onSubmit={(e) => e.preventDefault()}>
              <label className="visually-hidden" htmlFor="q">Search</label>
              <input ref={searchRef} id="q" type="search" placeholder="Search models, accessories, owners…" autoComplete="off" />
            </form>
            <button className="icon-btn" aria-label="Close search" onClick={() => setSearchOpen(false)}>
              <CloseIcon />
            </button>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="mobile-menu" id="mobile-menu">
          <ul>
            <li><a href="#compare" onClick={closeAll}>Models</a></li>
            {NAV.map((item) => (
              <li key={item.href}><a href={item.href} onClick={closeAll}>{item.label}</a></li>
            ))}
            <li><a href="#dealer" onClick={closeAll}>Find a Dealer</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}
