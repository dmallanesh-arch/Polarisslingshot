import type { Feature } from '@slingshot/shared';
import type { ReactNode } from 'react';
import { Clock, Equalizer } from './FeatureWidgets';
import { Vehicle } from './Vehicle';

function RideCommandScreen() {
  return (
    <div className="screen" aria-hidden="true">
      <div className="screen__bar"><span>RIDE COMMAND</span><Clock /></div>
      <div className="screen__body">
        <div className="screen__tile screen__tile--map"><span>Maps</span></div>
        <div className="screen__tile screen__tile--music"><span>Now Playing</span><b>Rockford Fosgate</b></div>
        <div className="screen__tile"><span>Apple CarPlay®</span></div>
        <div className="screen__tile"><span>Vehicle</span></div>
      </div>
    </div>
  );
}

function Gauge() {
  return (
    <div className="gauge" aria-hidden="true">
      <svg viewBox="0 0 200 120">
        <path className="gauge__track" d="M20 110a80 80 0 0 1 160 0" />
        <path className="gauge__fill" d="M20 110a80 80 0 0 1 160 0" />
      </svg>
      <div className="gauge__read"><strong>180</strong><span>HP</span></div>
    </div>
  );
}

const media: Record<string, { className: string; node: ReactNode }> = {
  style: { className: 'feature__media--style', node: <Vehicle id="feature-style" paint="#ff6a13" /> },
  tech: { className: 'feature__media--tech', node: <RideCommandScreen /> },
  audio: { className: 'feature__media--audio', node: <Equalizer /> },
  engine: { className: 'feature__media--engine', node: <Gauge /> },
};

/** Render ® and ″ symbols in body copy as superscripts where appropriate. */
function Rich({ text }: { text: string }) {
  const parts = text.split('®');
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>{p}{i < parts.length - 1 && <sup>®</sup>}</span>
      ))}
    </>
  );
}

export function Features({ features }: { features: Feature[] }) {
  return (
    <section className="features" id="features" aria-labelledby="features-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="eyebrow">Features</p>
          <h2 className="h1" id="features-title">Engineered to <em>stand out</em></h2>
        </header>

        {features.map((f, i) => {
          const m = media[f.id];
          return (
            <article key={f.id} className={`feature reveal${i % 2 ? ' feature--flip' : ''}`}>
              <div className={`feature__media ${m?.className ?? ''}`}>{m?.node}</div>
              <div className="feature__copy">
                <p className="feature__num">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="h2"><Rich text={f.title} /></h3>
                <p><Rich text={f.body} /></p>
                <ul className="ticks">
                  {f.bullets.map((b) => <li key={b}><Rich text={b} /></li>)}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Marquee() {
  const line = 'Drive it like you stole it · Open air · Three wheels · Zero limits · Turn heads · ';
  return (
    <section className="band" aria-hidden="true">
      <div className="band__track">
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </section>
  );
}
