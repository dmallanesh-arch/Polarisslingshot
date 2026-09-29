import type { Accessory, Offer } from '@slingshot/shared';
import { AccessoryGlyph } from './Icons';
import { Vehicle } from './Vehicle';

export function BuildCta() {
  return (
    <section className="build" id="build" aria-labelledby="build-title">
      <div className="container build__inner">
        <div className="build__copy reveal">
          <p className="eyebrow">Build &amp; Price</p>
          <h2 className="h1" id="build-title">Make it <em>unmistakably</em> yours</h2>
          <p>
            Select your transmission, add performance accessories, seats, wind deflectors, storage,
            style accents and more — then send your build straight to your local dealer.
          </p>
          <ol className="steps">
            <li><span>1</span>Choose model &amp; transmission</li>
            <li><span>2</span>Pick your colour</li>
            <li><span>3</span>Add accessories</li>
            <li><span>4</span>Get a quote</li>
          </ol>
          <a className="btn btn--primary" href="#colors">Start Building</a>
        </div>
        <div className="build__vehicle reveal">
          <Vehicle id="build" paint="#1f5ad6" />
        </div>
      </div>
    </section>
  );
}

export function Offers({ offers, legal }: { offers: Offer[]; legal: string }) {
  return (
    <section className="offers" id="offers" aria-labelledby="offers-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="eyebrow">Current offers</p>
          <h2 className="h1" id="offers-title">Offers &amp; financing</h2>
        </header>
        <div className="offers__grid">
          {offers.map((o) => (
            <article className="offer reveal" key={o.title}>
              <p className="offer__tag">{o.tag}</p>
              <h3 className="h3">{o.title}</h3>
              <p>{o.body}</p>
              <a className="link-arrow" href="#dealer">{o.cta}</a>
            </article>
          ))}
        </div>
        <p className="legal">{legal}</p>
      </div>
    </section>
  );
}

export function Accessories({ items }: { items: Accessory[] }) {
  return (
    <section className="accessories" id="accessories" aria-labelledby="acc-title">
      <div className="container">
        <header className="section-head section-head--row reveal">
          <div>
            <p className="eyebrow">Accessories</p>
            <h2 className="h1" id="acc-title">Gear up your SL</h2>
          </div>
          <a className="link-arrow" href="#accessories">Shop all accessories</a>
        </header>
        <ul className="acc__grid">
          {items.map((a) => (
            <li className="acc-card reveal" key={a.name}>
              <a href="#accessories">
                <AccessoryGlyph icon={a.icon} />
                <small>{a.category}</small>
                <strong>{a.name}</strong>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Disclaimers({ price, safety }: { price: string; safety: string }) {
  return (
    <section className="disclaimers" aria-label="Disclaimers">
      <div className="container">
        <p id="disclaimer-price">{price}</p>
        <p>{safety}</p>
      </div>
    </section>
  );
}
