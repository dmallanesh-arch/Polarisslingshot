'use client';

import { useEffect, useState } from 'react';

/** Live clock for the RIDE COMMAND screen mock-up. */
export function Clock() {
  const [time, setTime] = useState('12:00');
  useEffect(() => {
    const fmt = () =>
      setTime(new Date().toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' }));
    fmt();
    const t = setInterval(fmt, 15_000);
    return () => clearInterval(t);
  }, []);
  return <span suppressHydrationWarning>{time}</span>;
}

const BARS = 24;

/** Animated equaliser for the audio feature. */
export function Equalizer() {
  return (
    <div className="eq" aria-hidden="true">
      {Array.from({ length: BARS }, (_, i) => {
        // Deterministic pseudo-random values keep SSR and client output identical.
        const h = 30 + ((i * 37) % 70);
        const d = 0.6 + ((i * 13) % 7) / 10;
        const delay = -((i * 17) % 10) / 10;
        return (
          <span
            key={i}
            style={{ height: `${h}%`, animationDuration: `${d}s`, animationDelay: `${delay}s` }}
          />
        );
      })}
    </div>
  );
}
