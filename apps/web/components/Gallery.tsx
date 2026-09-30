'use client';

import type { GalleryItem } from '@slingshot/shared';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, CloseIcon } from './Icons';

/** "The drive starts here": photo mosaic that opens a keyboard-navigable lightbox. */
export function Gallery({ items }: { items: GalleryItem[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

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
    <section className="gallery section" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <h2 className="section-title" id="gallery-title">The Drive Starts Here</h2>
        <div className="gallery__grid">
          {items.map((item, i) => (
            <button
              key={item.src}
              className="gallery__item"
              aria-label={`Open image: ${item.caption}`}
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setIndex(i);
              }}
            >
              <Image src={item.src} alt="" fill sizes={i === 0 ? '(max-width: 767px) 100vw, 66vw' : '(max-width: 767px) 50vw, 33vw'} />
              <span className="gallery__cta"><span aria-hidden="true">+</span> View Gallery</span>
            </button>
          ))}
        </div>
      </div>

      {current && index !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.caption} onClick={(e) => e.target === e.currentTarget && close()}>
          <button ref={closeRef} className="lightbox__close" aria-label="Close" onClick={close}><CloseIcon /></button>
          <button className="round-btn lightbox__nav" aria-label="Previous image" onClick={() => step(-1)}><ChevronLeft /></button>
          <figure className="lightbox__figure">
            <Image src={current.src} alt={current.caption} width={1920} height={860} sizes="90vw" />
            <figcaption>{current.caption} ({index + 1} / {items.length})</figcaption>
          </figure>
          <button className="round-btn lightbox__nav" aria-label="Next image" onClick={() => step(1)}><ChevronRight /></button>
        </div>
      )}
    </section>
  );
}
