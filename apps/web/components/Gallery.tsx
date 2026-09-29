'use client';

import type { GalleryItem, PaintColor } from '@slingshot/shared';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, CloseIcon, ZoomIcon } from './Icons';
import { Vehicle } from './Vehicle';

export function Gallery({ items, colors }: { items: GalleryItem[]; colors: PaintColor[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const paintOf = (id: string) => colors.find((c) => c.id === id) ?? colors[0];

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [index, close, step]);

  const current = index === null ? null : items[index];

  return (
    <section className="gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="eyebrow">Gallery</p>
          <h2 className="h1" id="gallery-title">See it <em>in motion</em></h2>
        </header>
        <div className="gallery__grid">
          {items.map((item, i) => {
            const c = paintOf(item.colorId);
            return (
              <button
                key={i}
                className={`gallery__item scene--${item.scene}`}
                aria-label={`Open image: ${item.caption}`}
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setIndex(i);
                }}
              >
                <Vehicle id={`gal-${i}`} paint={c.paint} accent={c.accent} />
                <span className="gallery__caption">{item.caption}</span>
                <span className="gallery__zoom"><ZoomIcon /></span>
              </button>
            );
          })}
        </div>
      </div>

      {current && index !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.caption} onClick={(e) => e.target === e.currentTarget && close()}>
          <button ref={closeRef} className="icon-btn lightbox__close" aria-label="Close" onClick={close}><CloseIcon /></button>
          <button className="icon-btn lightbox__nav" aria-label="Previous image" onClick={() => step(-1)}><ChevronLeft /></button>
          <figure className="lightbox__figure">
            <div className={`scene--${current.scene}`}>
              <Vehicle id="lightbox" paint={paintOf(current.colorId).paint} accent={paintOf(current.colorId).accent} title={current.caption} />
            </div>
            <figcaption>{current.caption} · {index + 1} / {items.length}</figcaption>
          </figure>
          <button className="icon-btn lightbox__nav" aria-label="Next image" onClick={() => step(1)}><ChevronRight /></button>
        </div>
      )}
    </section>
  );
}
