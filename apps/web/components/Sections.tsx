import type { KeySpec, Offer, PaintColor } from '@slingshot/shared';
import Image from 'next/image';

export function PromoBanner({ offer, legal }: { offer: Offer; legal: string }) {
  return (
    <section className="promo" id="offers" aria-label="Current offer">
      <a className="promo__link" href="#dealer">
        <Image src="/images/scenes/promo.jpg" alt="" fill sizes="100vw" />
        <span className="promo__copy">
          <strong>{offer.title}</strong>
          <span className="btn btn--light-outline btn--sm">Explore Offers</span>
        </span>
      </a>
      <p className="container promo__legal">{legal}</p>
    </section>
  );
}

export function KeySpecs({ specs, color }: { specs: KeySpec[]; color: PaintColor }) {
  return (
    <section className="key-specs section" id="specs" aria-labelledby="key-specs-title">
      <div className="container">
        <h2 className="section-title" id="key-specs-title">Key Specifications</h2>
        <div className="key-specs__grid">
          <div className="key-specs__media">
            <Image src={color.image} alt={`Slingshot SL in ${color.name}`} width={768} height={432} sizes="(max-width: 991px) 100vw, 55vw" />
          </div>
          <dl className="key-specs__list">
            {specs.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Apparel() {
  return (
    <section className="apparel" id="apparel" aria-labelledby="apparel-title">
      <Image src="/images/scenes/apparel.jpg" alt="" fill sizes="100vw" />
      <div className="container apparel__copy">
        <h2 className="section-title" id="apparel-title">Gear That Makes A Statement</h2>
        <p>Make sure the only thing making a bigger statement than your Slingshot is your gear.</p>
        <a className="btn btn--light-outline" href="#footer">Shop Clothing &amp; Gear</a>
      </div>
    </section>
  );
}

const TOOLS = [
  { icon: 'test-drive', label: 'Schedule A Test Drive', href: '#dealer' },
  { icon: 'build-and-price', label: 'Build Yours', href: '#trim' },
  { icon: 'get-a-quote', label: 'Get Internet Price', href: '#dealer' },
  { icon: 'estimated-trade-in', label: 'Estimate Trade-In', href: '#dealer' },
];

export function ShoppingTools() {
  return (
    <section className="tools" id="tools" aria-label="Shopping tools">
      <ul className="container tools__list">
        {TOOLS.map((t) => (
          <li key={t.label}>
            <a href={t.href}>
              <Image src={`/images/tools/${t.icon}.png`} alt="" width={50} height={50} />
              <span>{t.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Disclaimers({ price, safety }: { price: string; safety: string }) {
  return (
    <section className="disclaimers" aria-label="Disclaimers">
      <div className="container">
        <p>{price}</p>
        <p>{safety}</p>
        <p>
          All pricing, specifications, claims, and information contained on this website are based upon current
          knowledge available at time of publication and are subject to change without notice.
        </p>
      </div>
    </section>
  );
}
