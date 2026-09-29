'use client';

import { formatCAD, type LineupModel } from '@slingshot/shared';
import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from './Icons';
import { Vehicle } from './Vehicle';

export function Compare({ lineup }: { lineup: LineupModel[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () =>
      setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (el && card) el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: 'smooth' });
  };

  return (
    <section className="compare" id="compare" aria-labelledby="compare-title">
      <div className="container">
        <header className="section-head section-head--row reveal">
          <div>
            <p className="eyebrow">2026 Lineup</p>
            <h2 className="h1" id="compare-title">Compare models</h2>
          </div>
          <div className="compare__arrows">
            <button className="icon-btn icon-btn--outline" aria-label="Previous models" disabled={edges.start} onClick={() => scroll(-1)}><ChevronLeft /></button>
            <button className="icon-btn icon-btn--outline" aria-label="Next models" disabled={edges.end} onClick={() => scroll(1)}><ChevronRight /></button>
          </div>
        </header>
        <div className="compare__track" ref={track}>
          {lineup.map((m) => (
            <article key={m.id} className={`model-card${m.current ? ' is-current' : ''}`}>
              <span className="model-card__tag">{m.current ? 'You are here' : m.tag}</span>
              <Vehicle id={`cmp-${m.id}`} paint={m.paint} />
              <h3>{m.name}</h3>
              <p className="model-card__price">
                {m.price ? <>Starting at <strong>{formatCAD(m.price)}</strong> MSRP</> : 'See dealer for pricing'}
              </p>
              <ul>
                {m.bullets.map((b) => <li key={b}>{b}</li>)}
              </ul>
              <a className={`btn ${m.current ? 'btn--primary' : 'btn--ghost'} btn--sm`} href={m.current ? '#build' : '#dealer'}>
                {m.current ? 'Build & Price' : 'Explore'}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
