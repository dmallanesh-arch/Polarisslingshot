import { formatCAD, specHighlights } from '@slingshot/shared';
import type { Metadata } from 'next';
import { Compare } from '@/components/Compare';
import { DealerLocator } from '@/components/DealerLocator';
import { Features, Marquee } from '@/components/Features';
import { Footer } from '@/components/Footer';
import { Gallery } from '@/components/Gallery';
import { Header, UtilityBar } from '@/components/Header';
import { ModelNav } from '@/components/ModelNav';
import { RevealObserver } from '@/components/Reveal';
import { Accessories, BuildCta, Disclaimers, Offers } from '@/components/Sections';
import { Showroom } from '@/components/Showroom';
import { Specs } from '@/components/Specs';
import { Stats } from '@/components/Stats';
import { getModelPage } from '@/lib/api';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const { model } = await getModelPage('sl');
  const from = formatCAD(Math.min(...model.transmissions.map((t) => t.price)));
  return {
    title: `${model.year} ${model.name}`,
    description: `${model.tagline} ${model.lede} Starting at ${from} MSRP.`,
    alternates: { canonical: '/en-ca/slingshot-sl', languages: { 'en-CA': '/en-ca/slingshot-sl', 'fr-CA': '/fr-ca/slingshot-sl' } },
    openGraph: { title: `${model.year} ${model.name}`, description: model.tagline, type: 'website', locale: 'en_CA' },
  };
}

export default async function SlingshotSLPage() {
  const { model, lineup, offers, accessories, disclaimers } = await getModelPage('sl');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${model.year} ${model.name}`,
    description: model.lede,
    offers: model.transmissions.map((t) => ({
      '@type': 'Offer',
      name: `${model.name} ${t.label}`,
      price: t.price,
      priceCurrency: 'CAD',
    })),
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <UtilityBar />
      <Header lineup={lineup} />
      <ModelNav year={model.year} name={model.name} />

      <main id="main">
        <Showroom model={model} />
        <Stats items={model.highlights} />
        <Features features={model.features} />
        <Marquee />
        <Specs highlights={specHighlights} />
        <Gallery items={model.gallery} colors={model.colors} />
        <Compare lineup={lineup} />
        <BuildCta />
        <Offers offers={offers} legal={disclaimers.offers} />
        <Accessories items={accessories} />
        <DealerLocator />
        <Disclaimers price={disclaimers.price} safety={disclaimers.safety} />
      </main>

      <Footer lineup={lineup} />
      <RevealObserver />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
