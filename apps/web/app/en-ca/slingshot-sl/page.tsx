import { formatCAD } from '@slingshot/shared';
import type { Metadata } from 'next';
import { AccessorySeries } from '@/components/AccessorySeries';
import { AlsoLike } from '@/components/AlsoLike';
import { DealerLocator } from '@/components/DealerLocator';
import { FeatureCarousel } from '@/components/FeatureCarousel';
import { Footer } from '@/components/Footer';
import { Gallery } from '@/components/Gallery';
import { Header, PromoBar } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Apparel, Disclaimers, KeySpecs, PromoBanner, ShoppingTools } from '@/components/Sections';
import { Spin } from '@/components/Spin';
import { SubNav } from '@/components/SubNav';
import { TrimColor } from '@/components/TrimColor';
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
  const { model, lineup, offers, accessorySeries, disclaimers } = await getModelPage('sl');

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
      <PromoBar />
      <Header lineup={lineup} />

      <main id="main">
        <Hero model={model} />
        <SubNav name={model.name} />
        <TrimColor model={model} />
        <PromoBanner offer={offers[0]} legal={disclaimers.offers} />
        <FeatureCarousel name={model.name} features={model.features} />
        <KeySpecs specs={model.keySpecs} color={model.colors[0]} />
        <Spin model={model} />
        <Gallery items={model.gallery} />
        <AlsoLike lineup={lineup} />
        <AccessorySeries series={accessorySeries} />
        <Apparel />
        <ShoppingTools />
        <DealerLocator />
        <Disclaimers price={disclaimers.price} safety={disclaimers.safety} />
      </main>

      <Footer lineup={lineup} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
