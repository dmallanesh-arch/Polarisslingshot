'use client';

import { formatCAD, type ModelPage, type TransmissionId } from '@slingshot/shared';
import { useState } from 'react';
import { Vehicle } from './Vehicle';

/** Hero + colour/transmission configurator, sharing the selected build. */
export function Showroom({ model }: { model: ModelPage }) {
  const [colorId, setColorId] = useState(model.colors[2]?.id ?? model.colors[0].id);
  const [transId, setTransId] = useState<TransmissionId>('manual');

  const color = model.colors.find((c) => c.id === colorId) ?? model.colors[0];
  const trans = model.transmissions.find((t) => t.id === transId) ?? model.transmissions[0];
  const fromPrice = Math.min(...model.transmissions.map((t) => t.price));

  const onSwatchKey = (e: React.KeyboardEvent, index: number) => {
    const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const nextIndex = (index + delta + model.colors.length) % model.colors.length;
    setColorId(model.colors[nextIndex].id);
    (e.currentTarget.parentElement?.children[nextIndex] as HTMLElement | undefined)?.focus();
  };

  return (
    <>
      <section className="hero" id="overview" aria-labelledby="hero-title">
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__glow" />
          <div className="hero__road" />
        </div>
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">{model.year} Slingshot</p>
            <h1 className="hero__title" id="hero-title">
              Slingshot <em>{model.shortName}</em>
            </h1>
            <p className="hero__lede">
              <strong>{model.tagline}</strong> {model.lede}
            </p>
            <div className="hero__price">
              <span className="hero__price-label">Starting at</span>
              <span className="hero__price-value">{formatCAD(fromPrice)}</span>
              <span className="hero__price-note">MSRP<a href="#disclaimer-price" className="fn">*</a></span>
            </div>
            <div className="hero__ctas">
              <a className="btn btn--primary" href="#build">Build &amp; Price</a>
              <a className="btn btn--ghost" href="#dealer">Find a Dealer</a>
              <a className="btn btn--link" href="#demo">Book a Demo Ride</a>
            </div>
          </div>
          <div className="hero__vehicle">
            <Vehicle id="hero" paint={color.paint} accent={color.accent} title={`${model.year} ${model.name} in ${color.name}`} />
          </div>
        </div>
        <a className="hero__scroll" href="#colors" aria-label="Scroll to colours">
          <span />
        </a>
      </section>

      <section className="configurator" id="colors" aria-labelledby="colors-title">
        <div className="container configurator__inner">
          <div className="configurator__stage">
            <Vehicle id="config" paint={color.paint} accent={color.accent} />
            <p className="configurator__caption" aria-live="polite">{color.name}</p>
          </div>

          <div className="configurator__panel">
            <p className="eyebrow">Make it yours</p>
            <h2 className="h2" id="colors-title">Choose your colour</h2>
            <p>Three distinct colours, each finished with metal badges and SL accent graphics.</p>

            <div className="swatches" role="radiogroup" aria-label="Colour">
              {model.colors.map((c, i) => (
                <button
                  key={c.id}
                  className="swatch"
                  role="radio"
                  aria-checked={c.id === colorId}
                  aria-label={c.name}
                  title={c.name}
                  tabIndex={c.id === colorId ? 0 : -1}
                  style={{ background: `linear-gradient(135deg, ${c.swatch[0]} 0%, ${c.paint} 55%, ${c.swatch[1]} 100%)` }}
                  onClick={() => setColorId(c.id)}
                  onKeyDown={(e) => onSwatchKey(e, i)}
                />
              ))}
            </div>
            <p className="swatch-label">{color.name}</p>

            <h3 className="h4">Transmission</h3>
            <div className="segmented" role="tablist" aria-label="Transmission">
              {model.transmissions.map((t) => (
                <button key={t.id} role="tab" aria-selected={t.id === transId} onClick={() => setTransId(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>
            <p className="small">{trans.description}</p>

            <div className="configurator__price">
              <div>
                <span className="small">Starting at</span>
                <strong>{formatCAD(trans.price)}</strong>
                <span className="small">MSRP<a href="#disclaimer-price" className="fn">*</a></span>
              </div>
              <a className="btn btn--primary" href="#build">Build Yours</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
