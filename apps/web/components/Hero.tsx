import { formatCAD, type ModelPage } from '@slingshot/shared';
import Image from 'next/image';

/** Full-bleed photo hero with the model name, starting price and primary CTAs. */
export function Hero({ model }: { model: ModelPage }) {
  const from = Math.min(...model.transmissions.map((t) => t.price));

  return (
    <section className="hero" id="overview" aria-labelledby="hero-title">
      <picture className="hero__media">
        <source media="(max-width: 767px)" srcSet="/images/scenes/hero-mobile.jpg" />
        <Image src="/images/scenes/hero.jpg" alt="" fill priority sizes="100vw" />
      </picture>
      <div className="hero__info">
        <p className="hero__year">{model.year}</p>
        <h1 className="hero__title" id="hero-title">{model.name}</h1>
        <p className="hero__price">
          <span>Starting at</span> <strong>{formatCAD(from)}</strong> <span>MSRP*</span>
        </p>
        <p className="hero__note">Plus freight and dealer set-up.</p>
        <div className="btn-row">
          <a className="btn btn--primary" href="#trim">Build Yours</a>
          <a className="btn btn--light-outline" href="#dealer">Get Local Price</a>
        </div>
      </div>
    </section>
  );
}
