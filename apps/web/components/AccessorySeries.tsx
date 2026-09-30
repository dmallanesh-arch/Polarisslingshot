'use client';

import type { AccessorySeries as Series } from '@slingshot/shared';
import Image from 'next/image';
import { useState } from 'react';

/** "Arrive in your style": tabbed photos of the four accessory series. */
export function AccessorySeries({ series }: { series: Series[] }) {
  const [active, setActive] = useState(0);
  const current = series[active];

  return (
    <section className="series section" id="accessories" aria-labelledby="series-title">
      <div className="container series__grid">
        <div className="series__copy">
          <h2 className="section-title" id="series-title">Arrive In Your Style</h2>
          <p>
            Explore the accessories that enhance your ride and tailor your vehicle to you. Start by adding
            style, comfort, and performance accessories, or rev up your personalization journey with one of
            four accessory series. You&apos;ve turned heads. Now turn up the style.
          </p>
          <a className="btn btn--primary" href="#tools">Build Yours</a>
        </div>

        <div className="series__media">
          <div className="series__photo">
            <Image key={current.image} src={current.image} alt={`Slingshot with ${current.name} accessories`} fill sizes="(max-width: 991px) 100vw, 60vw" />
          </div>
          <div className="series__tabs" role="tablist" aria-label="Accessory series">
            {series.map((s, i) => (
              <button
                key={s.name}
                role="tab"
                aria-selected={i === active}
                className={i === active ? 'is-active' : undefined}
                onClick={() => setActive(i)}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
