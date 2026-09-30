'use client';

import type { Feature } from '@slingshot/shared';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from './Icons';

/** Full-width photo carousel: one feature per slide with an "n / total" pager. */
export function FeatureCarousel({ name, features }: { name: string; features: Feature[] }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLUListElement>(null);

  const go = useCallback(
    (i: number) => {
      const next = (i + features.length) % features.length;
      const track = trackRef.current;
      const slide = track?.children[next] as HTMLElement | undefined;
      if (track && slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: 'smooth' });
      setIndex(next);
    },
    [features.length],
  );

  // Keep the pager in sync when the user swipes.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const i = Math.round(track.scrollLeft / track.clientWidth);
      setIndex(Math.min(features.length - 1, Math.max(0, i)));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [features.length]);

  return (
    <section className="features section" id="features" aria-labelledby="features-title" aria-roledescription="carousel">
      <div className="container">
        <h2 className="section-title" id="features-title">{name} Features</h2>
      </div>

      <ul className="features__track" ref={trackRef}>
        {features.map((f, i) => (
          <li
            className="features__slide"
            key={f.id}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${features.length}`}
            aria-hidden={i !== index}
          >
            <div className="features__media">
              <Image src={f.image} alt="" fill sizes="(max-width: 991px) 100vw, 66vw" />
            </div>
            <div className="features__copy">
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="container features__controls">
        <button className="round-btn" aria-label="Previous feature" onClick={() => go(index - 1)}><ChevronLeft /></button>
        <ol className="pager">
          {features.map((f, i) => (
            <li key={f.id}>
              <button
                className={i === index ? 'is-active' : undefined}
                aria-label={`Go to feature ${i + 1}: ${f.title}`}
                aria-current={i === index}
                onClick={() => go(i)}
              />
            </li>
          ))}
        </ol>
        <p className="features__count" aria-live="polite">
          <span>{index + 1}</span> / {features.length}
        </p>
        <button className="round-btn" aria-label="Next feature" onClick={() => go(index + 1)}><ChevronRight /></button>
      </div>
    </section>
  );
}
