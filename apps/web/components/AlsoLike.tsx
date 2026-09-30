'use client';

import { formatCAD, type LineupModel } from '@slingshot/shared';
import Image from 'next/image';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from './Icons';

/** "You may also like": horizontally scrolling cards for the rest of the lineup. */
export function AlsoLike({ lineup }: { lineup: LineupModel[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const others = lineup.filter((m) => !m.current);

  const scroll = (d: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    track.scrollBy({ left: d * (card ? card.offsetWidth + 24 : track.clientWidth), behavior: 'smooth' });
  };

  return (
    <section className="also section" id="compare" aria-labelledby="also-title">
      <div className="container">
        <div className="also__head">
          <h2 className="section-title" id="also-title">You May Also Like</h2>
          <div className="also__arrows">
            <button className="round-btn" aria-label="Previous models" onClick={() => scroll(-1)}><ChevronLeft /></button>
            <button className="round-btn" aria-label="Next models" onClick={() => scroll(1)}><ChevronRight /></button>
          </div>
        </div>

        <ul className="also__track" ref={trackRef}>
          {others.map((m) => (
            <li className="card" key={m.id}>
              <Image src={m.image} alt="" width={768} height={432} sizes="(max-width: 767px) 85vw, 400px" />
              <h3 className="card__name">{m.name}</h3>
              <p className="card__price">
                {m.price ? (
                  <><span>Starting at</span> <strong>{formatCAD(m.price)}</strong> <span>MSRP*</span></>
                ) : (
                  <strong>See dealer for pricing</strong>
                )}
              </p>
              {m.price && <p className="card__note">Plus freight and dealer set-up.</p>}
              <p className="card__blurb">{m.blurb}</p>
              <a className="btn btn--outline btn--sm" href="#dealer">Learn More</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
