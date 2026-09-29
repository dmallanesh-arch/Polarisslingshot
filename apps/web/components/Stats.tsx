'use client';

import type { Highlight } from '@slingshot/shared';
import { useEffect, useRef, useState } from 'react';

function CountUp({ value }: { value: string }) {
  const target = Number(value);
  const decimals = value.includes('.') ? value.split('.')[1].length : 0;
  const [shown, setShown] = useState(value);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || Number.isNaN(target) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setShown((0).toFixed(decimals));
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setShown((target * eased).toFixed(decimals));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, decimals]);

  return <strong ref={ref}>{shown}</strong>;
}

export function Stats({ items }: { items: Highlight[] }) {
  return (
    <section className="stats" aria-label="Key specifications">
      <div className="container">
        <ul className="stats__list">
          {items.map((h) => (
            <li key={h.label}>
              <CountUp value={h.value} />
              <small className="stats__unit">{h.unit}</small>
              <span>{h.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
