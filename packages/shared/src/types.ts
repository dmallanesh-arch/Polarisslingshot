export type TransmissionId = 'manual' | 'auto';

export interface PaintColor {
  id: string;
  name: string;
  /** Primary body colour. */
  paint: string;
  /** Trim / graphics colour. */
  accent: string;
  /** Two-stop gradient used for swatches: [light, dark]. */
  swatch: [string, string];
  /** Studio photo of the vehicle in this colour (web public path). */
  image: string;
  /** Round paint-chip photo (web public path). */
  swatchImage: string;
}

export interface Transmission {
  id: TransmissionId;
  label: string;
  price: number;
  description: string;
}

export interface Highlight {
  value: string;
  unit: string;
  label: string;
}

export interface SpecGroup {
  group: string;
  rows: [label: string, value: string][];
}

export interface LineupModel {
  id: string;
  name: string;
  /** CAD MSRP, or null when the price is "see dealer". */
  price: number | null;
  paint: string;
  tag: string;
  current?: boolean;
  bullets: string[];
  /** One-line pitch shown on lineup cards. */
  blurb: string;
  /** Studio photo (web public path). */
  image: string;
}

export interface GalleryItem {
  /** Photo (web public path). */
  src: string;
  caption: string;
}

export type AccessoryIcon = 'wind' | 'bag' | 'seat' | 'roof' | 'light' | 'cover';

export interface Accessory {
  name: string;
  category: string;
  icon: AccessoryIcon;
}

export interface Feature {
  id: string;
  title: string;
  body: string;
  /** Photo (web public path). */
  image: string;
}

export interface KeySpec {
  label: string;
  value: string;
}

export interface AccessorySeries {
  name: string;
  /** Photo (web public path). */
  image: string;
}

export interface Offer {
  tag: string;
  title: string;
  body: string;
  cta: string;
}

export interface Dealer {
  id: string;
  name: string;
  city: string;
  province: string;
  /** First letter(s) of postal FSA codes this dealer serves. */
  fsaPrefixes: string[];
  phone: string;
  demo: boolean;
}

export interface ModelPage {
  id: string;
  year: number;
  name: string;
  shortName: string;
  tagline: string;
  lede: string;
  colors: PaintColor[];
  transmissions: Transmission[];
  highlights: Highlight[];
  /** Short marketing paragraph for the trim & colour section. */
  story: string;
  features: Feature[];
  keySpecs: KeySpec[];
  /** Standard equipment called out next to the vehicle viewer. */
  equipment: string[];
  gallery: GalleryItem[];
}
