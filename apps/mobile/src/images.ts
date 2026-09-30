import type { ImageSourcePropType } from 'react-native';

/*
 * Bundled photos, keyed by the web public paths used in @slingshot/shared
 * (e.g. "/images/sl/earth-blue.png"). The files live once in apps/web/public;
 * Metro resolves them through the monorepo's workspace root.
 */
const images: Record<string, ImageSourcePropType> = {
  '/images/sl/white-lightning.png': require('../../web/public/images/sl/white-lightning.png'),
  '/images/sl/earth-blue.png': require('../../web/public/images/sl/earth-blue.png'),
  '/images/sl/spectra-orange.png': require('../../web/public/images/sl/spectra-orange.png'),
  '/images/swatches/white-lightning.jpg': require('../../web/public/images/swatches/white-lightning.jpg'),
  '/images/swatches/earth-blue.jpg': require('../../web/public/images/swatches/earth-blue.jpg'),
  '/images/swatches/spectra-orange.jpg': require('../../web/public/images/swatches/spectra-orange.jpg'),
  '/images/lineup/s.png': require('../../web/public/images/lineup/s.png'),
  '/images/lineup/slr.png': require('../../web/public/images/lineup/slr.png'),
  '/images/lineup/r.png': require('../../web/public/images/lineup/r.png'),
  '/images/lineup/sig.png': require('../../web/public/images/lineup/sig.png'),
  '/images/lineup/gt.png': require('../../web/public/images/lineup/gt.png'),
  '/images/scenes/hero-mobile.jpg': require('../../web/public/images/scenes/hero-mobile.jpg'),
  '/images/scenes/feature-01.jpg': require('../../web/public/images/scenes/feature-01.jpg'),
  '/images/scenes/feature-02.jpg': require('../../web/public/images/scenes/feature-02.jpg'),
  '/images/scenes/feature-04.jpg': require('../../web/public/images/scenes/feature-04.jpg'),
  '/images/scenes/feature-06.jpg': require('../../web/public/images/scenes/feature-06.jpg'),
  '/images/scenes/feature-07.jpg': require('../../web/public/images/scenes/feature-07.jpg'),
  '/images/scenes/gallery-1.jpg': require('../../web/public/images/scenes/gallery-1.jpg'),
  '/images/scenes/gallery-3.jpg': require('../../web/public/images/scenes/gallery-3.jpg'),
};

/** Resolve a shared-data image path to a bundled asset. */
export function img(path: string): ImageSourcePropType | undefined {
  return images[path];
}
