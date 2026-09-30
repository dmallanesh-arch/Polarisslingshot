'use client';

import type { ModelPage } from '@slingshot/shared';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from './Icons';
import { Specs } from './Specs';

/** "Take it for a spin": step through the paint options, standard equipment and the full spec sheet. */
export function Spin({ model }: { model: ModelPage }) {
  const [index, setIndex] = useState(0);
  const [specsOpen, setSpecsOpen] = useState(false);
  const color = model.colors[index];
  const step = (d: number) => setIndex((i) => (i + d + model.colors.length) % model.colors.length);

  return (
    <section className="spin section" aria-labelledby="spin-title">
      <div className="container">
        <h2 className="section-title" id="spin-title">Take It For A Spin</h2>
        <p className="section-sub">View it in every colour.</p>

        <div className="spin__grid">
          <div className="spin__viewer">
            <button className="round-btn spin__prev" aria-label="Previous colour" onClick={() => step(-1)}><ChevronLeft /></button>
            <Image
              key={color.id}
              src={color.image}
              alt={`${model.name} in ${color.name}`}
              width={768}
              height={432}
              sizes="(max-width: 991px) 100vw, 60vw"
            />
            <button className="round-btn spin__next" aria-label="Next colour" onClick={() => step(1)}><ChevronRight /></button>
            <p className="spin__caption" aria-live="polite">{color.name}</p>
          </div>

          <ul className="spin__list">
            {model.equipment.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        <div className="btn-row btn-row--center">
          <button
            className="btn btn--dark"
            aria-expanded={specsOpen}
            aria-controls="full-specs"
            onClick={() => setSpecsOpen((v) => !v)}
          >
            {specsOpen ? 'Hide Full Specs' : 'See Full Specs'}
          </button>
        </div>

        <div id="full-specs" hidden={!specsOpen}>
          <Specs />
        </div>
      </div>
    </section>
  );
}
