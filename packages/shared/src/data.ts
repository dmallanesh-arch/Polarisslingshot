/* --------------------------------------------------------------------------
   Content for the 2026 Slingshot SL (en-CA).
   Single source of truth for the web app, API and mobile app.
   Prices are CAD MSRP. Verify every figure against the official spec
   sheet before publishing.
   -------------------------------------------------------------------------- */
import type {
  Accessory,
  AccessorySeries,
  Dealer,
  LineupModel,
  ModelPage,
  Offer,
  SpecGroup,
  TransmissionId,
} from './types';

export const FREIGHT_CAD = 1900;
export const DEALER_SETUP_CAD = 500;

export const slingshotSL: ModelPage = {
  id: 'sl',
  year: 2026,
  name: 'Slingshot SL',
  shortName: 'SL',
  tagline: 'Enhanced style with the tech to keep you connected.',
  lede:
    'A redesigned front end, a 180 HP ProStar® engine and a Stage 2 Rockford Fosgate® sound system — the SL is built for the ride you actually want.',
  story:
    "Slingshot SL takes everything you love about the drive and turns it up. A fully redesigned front end, a 7″ RIDE COMMAND® display and Stage 2 Rockford Fosgate® audio keep you connected to the road, your music and your crew. From backroad escapes to downtown detours, this is where your story opens up — one curve at a time.",
  colors: [
    {
      id: 'white-lightning',
      name: 'White Lightning',
      paint: '#e9ecef',
      accent: '#101114',
      swatch: ['#ffffff', '#b8bec6'],
      image: '/images/sl/white-lightning.png',
      swatchImage: '/images/swatches/white-lightning.jpg',
    },
    {
      id: 'earth-blue',
      name: 'Earth Blue',
      paint: '#1f4f9e',
      accent: '#0b0c10',
      swatch: ['#4d7fd0', '#0f2a5a'],
      image: '/images/sl/earth-blue.png',
      swatchImage: '/images/swatches/earth-blue.jpg',
    },
    {
      id: 'spectra-orange',
      name: 'Spectra Orange',
      paint: '#f26a1b',
      accent: '#0b0c10',
      swatch: ['#ffa25a', '#b53d00'],
      image: '/images/sl/spectra-orange.png',
      swatchImage: '/images/swatches/spectra-orange.jpg',
    },
  ],
  transmissions: [
    { id: 'manual', label: 'Manual', price: 41299, description: '5-speed manual with reverse. Pure, connected, driver-focused.' },
    { id: 'auto', label: 'AutoDrive', price: 41299, description: '5-speed AutoDrive automated manual. No clutch pedal — just point, shoot and go.' },
  ],
  highlights: [
    { value: '180', unit: 'HP', label: 'Horsepower' },
    { value: '2.0', unit: 'L', label: 'ProStar® Engine' },
    { value: '7', unit: 'in', label: 'RIDE COMMAND® Display' },
    { value: '200', unit: 'W', label: 'Stage 2 Rockford Fosgate® Audio' },
  ],
  features: [
    {
      id: 'style',
      title: 'Up front style',
      body: "The fully redesigned SL front end provides fresh, bold styling and adds an inch of ground clearance, so you'll continue to turn heads whether you're parked or cruising down the road.",
      image: '/images/scenes/feature-01.jpg',
    },
    {
      id: 'drive',
      title: 'Your perfect drive',
      body: 'Available in a sporty 5-speed manual or intuitive AutoDrive, Slingshot is available in whatever drive you desire.',
      image: '/images/scenes/feature-02.jpg',
    },
    {
      id: 'tech',
      title: 'Tech out your ride',
      body: 'Stay connected with a 7″ display powered by RIDE COMMAND®. Steering wheel controls help you conquer every twist and turn with confidence, all while keeping the rest of the world at your fingertips.',
      image: '/images/scenes/gallery-1.jpg',
    },
    {
      id: 'audio',
      title: 'Turn up the volume',
      body: 'The Stage 2 Rockford Fosgate® 200W audio system offers an immersive driving and vibing experience, tuned for the open-air cockpit so your soundtrack keeps up at speed.',
      image: '/images/scenes/gallery-3.jpg',
    },
    {
      id: 'wheels',
      title: 'Ride on in style',
      body: 'With aluminum wheels, metal badges and SL accent graphics throughout, the Slingshot SL will always stand out.',
      image: '/images/scenes/feature-04.jpg',
    },
    {
      id: 'lighting',
      title: "It's time to shine",
      body: 'Turn on the style with signature LED lighting and see how easy it is to make a big impression.',
      image: '/images/scenes/feature-06.jpg',
    },
    {
      id: 'engine',
      title: 'More power, more go',
      body: "Built around Polaris' four-cylinder engine, the Slingshot SL delivers 180 horsepower with one of the highest production redlines, giving you the power to drive it your way.",
      image: '/images/scenes/feature-07.jpg',
    },
  ],
  keySpecs: [
    { label: 'Engine', value: 'ProStar® 2.0L 4 Cylinder Engine - 180 HP' },
    { label: 'Transmission', value: 'Manual or AutoDrive' },
    { label: 'Display', value: '7″ RIDE COMMAND® with Apple CarPlay®' },
    { label: 'Audio', value: 'Stage 2 Rockford Fosgate® 200W' },
    { label: 'Driver Assistance', value: 'Hill Hold, Traction Control, & Anti-Lock Braking' },
  ],
  equipment: [
    'Redesigned SL Front End',
    'ProStar® 2.0L 4 Cylinder Engine - 180 HP',
    'Manual or AutoDrive',
    '7″ RIDE COMMAND® Display',
    'Stage 2 Rockford Fosgate® 200W Audio',
    'Backup Camera',
    'Signature LED Lighting',
    'Metal Badges & SL Accent Graphics',
  ],
  gallery: [
    { src: '/images/scenes/gallery-5.jpg', caption: 'Slingshot on the city streets' },
    { src: '/images/scenes/gallery-1.jpg', caption: 'Ready for the ride' },
    { src: '/images/scenes/gallery-6.jpg', caption: 'Unmistakable stance' },
    { src: '/images/scenes/gallery-3.jpg', caption: 'Downtown detours' },
    { src: '/images/scenes/gallery-4.jpg', caption: 'Aluminum wheels' },
    { src: '/images/scenes/gallery-2.jpg', caption: 'Rockford Fosgate® audio' },
  ],
};

/** Accessory series shown in the "Arrive in your style" tabs. */
export const accessorySeries: AccessorySeries[] = [
  { name: 'Design Series', image: '/images/scenes/accessories-01.jpg' },
  { name: 'Show Series', image: '/images/scenes/accessories-02.jpg' },
  { name: 'Escape Series', image: '/images/scenes/accessories-03.jpg' },
  { name: 'Drive Series', image: '/images/scenes/accessories-04.jpg' },
];

const sharedSpecs: SpecGroup[] = [
  {
    group: 'Engine',
    rows: [
      ['Engine Type', 'ProStar® 2.0L DOHC Inline 4-Cylinder'],
      ['Displacement', '1,997 cc'],
      ['Horsepower', '180 HP'],
      ['Fuel System', 'Electronic Fuel Injection'],
      ['Fuel Capacity', '37.1 L (9.77 gal)'],
      ['Fuel Type', 'Premium Unleaded 91 Octane'],
    ],
  },
  {
    group: 'Drivetrain',
    rows: [
      ['Transmission', '{trans}'],
      ['Final Drive', 'Carbon Fibre Reinforced Belt'],
      ['Drive System', 'Rear-Wheel Drive'],
    ],
  },
  {
    group: 'Dimensions',
    rows: [
      ['Length', '3,800 mm (149.6 in)'],
      ['Width', '1,971 mm (77.6 in)'],
      ['Height', '1,320 mm (51.9 in)'],
      ['Wheelbase', '2,667 mm (105 in)'],
      ['Ground Clearance', '137.3 mm (5.4 in)'],
      ['Curb Weight', '{weight}'],
      ['Seating Capacity', '2'],
    ],
  },
  {
    group: 'Chassis & Safety',
    rows: [
      ['Brakes', '3-Wheel Disc with ABS'],
      ['Stability Control', 'Electronic Stability Control'],
      ['Traction Control', 'Standard'],
      ['Power Steering', 'Electronic Power Steering'],
    ],
  },
  {
    group: 'Technology & Audio',
    rows: [
      ['Display', '7″ RIDE COMMAND®'],
      ['Smartphone Integration', 'Apple CarPlay®'],
      ['Audio', 'Stage 2 Rockford Fosgate® 200W'],
      ['Controls', 'Integrated Steering Wheel Controls'],
      ['Backup Camera', 'Standard'],
    ],
  },
  {
    group: 'Styling',
    rows: [
      ['Front End', 'Redesigned SL Front Fascia'],
      ['Badging', 'Metal Badges'],
      ['Graphics', 'SL Accent Graphics'],
      ['Colours', 'White Lightning · Earth Blue · Spectra Orange'],
    ],
  },
];

const specVariants: Record<TransmissionId, { trans: string; weight: string }> = {
  manual: { trans: '5-Speed Manual with Reverse', weight: '749 kg (1,651 lb)' },
  auto: { trans: '5-Speed AutoDrive', weight: '751 kg (1,655 lb)' },
};

export const specHighlights = [
  { value: '180', unit: 'HP', label: 'Horsepower' },
  { value: '2.0', unit: 'L', label: 'ProStar® Engine' },
  { value: '37.1', unit: 'L', label: 'Fuel Capacity' },
  { value: '137', unit: 'mm', label: 'Ground Clearance' },
];

/** Full spec sheet for a transmission, with placeholders resolved. */
export function getSpecs(trans: TransmissionId): SpecGroup[] {
  const v = specVariants[trans];
  return sharedSpecs.map((g) => ({
    group: g.group,
    rows: g.rows.map(([k, val]) => [k, val.replace('{trans}', v.trans).replace('{weight}', v.weight)]),
  }));
}

export const lineup: LineupModel[] = [
  { id: 's', name: 'Slingshot S', price: 37149, paint: '#2a2c31', tag: 'Essential', bullets: ['180 HP ProStar® 2.0L', 'Manual or AutoDrive', 'Stage 1 audio'], blurb: 'Everything you need to make your ride truly yours.', image: '/images/lineup/s.png' },
  { id: 'sl', name: 'Slingshot SL', price: 41299, paint: '#f26a1b', tag: 'Most Popular', current: true, bullets: ['180 HP ProStar® 2.0L', '7″ RIDE COMMAND® display', 'Stage 2 Rockford Fosgate® 200W'], blurb: 'Enhanced style with the tech to keep you connected.', image: '/images/sl/spectra-orange.png' },
  { id: 'slr', name: 'Slingshot SLR', price: 46149, paint: '#1f4f9e', tag: 'Performance', bullets: ['Performance tuned', 'Sport-inspired styling', 'Premium audio & tech'], blurb: 'Upgraded performance and added style from the get-go.', image: '/images/lineup/slr.png' },
  { id: 'r', name: 'Slingshot R', price: null, paint: '#8a8f96', tag: 'Flagship', bullets: ['Most powerful Slingshot', 'Premium performance package', 'RIDE COMMAND+'], blurb: 'Top-tier features built for amplified performance and aesthetics.', image: '/images/lineup/r.png' },
  { id: 'sig', name: 'Slingshot Signature Edition', price: null, paint: '#b08d57', tag: 'Limited Edition', bullets: ['Colour-shifting paint', 'Stage 3 Max audio', 'XKGlow® lighting'], blurb: 'Next-level upgrades crafted for your high standards.', image: '/images/lineup/sig.png' },
  { id: 'gt', name: 'Slingshot Grand Touring', price: 48999, paint: '#2f8f3a', tag: 'Limited Edition', bullets: ['Touring comfort', 'RIDE COMMAND+', 'Premium styling'], blurb: "Premium side-by-side touring that doesn't compromise on comfort or style.", image: '/images/lineup/gt.png' },
];

export const offers: Offer[] = [
  { tag: 'Financing', title: 'Low-rate financing on select models', body: 'Finance your 2026 Slingshot with competitive rates and flexible terms through participating dealers.', cta: 'View details' },
  { tag: 'Protection', title: 'Extended Service Plan', body: 'Ride with confidence. Extend your coverage and protect your investment for the kilometres ahead.', cta: 'Learn more' },
  { tag: 'Trade-in', title: 'Value your trade', body: 'Get an estimate on your current ride and put it toward a brand-new Slingshot SL.', cta: 'Get an estimate' },
];

export const accessories: Accessory[] = [
  { name: 'Tall Wind Deflector', category: 'Comfort', icon: 'wind' },
  { name: 'Lock & Ride® Rear Storage', category: 'Storage', icon: 'bag' },
  { name: 'Premium Comfort Seats', category: 'Comfort', icon: 'seat' },
  { name: 'Slingshade® Roof', category: 'Protection', icon: 'roof' },
  { name: 'LED Accent Lighting Kit', category: 'Style', icon: 'light' },
  { name: 'All-Weather Cover', category: 'Protection', icon: 'cover' },
];

/** Demo dealer directory. Replace with a real dealer-locator feed. */
export const dealers: Dealer[] = [
  { id: 'tor-01', name: 'Slingshot Toronto', city: 'Toronto', province: 'ON', fsaPrefixes: ['M', 'L'], phone: '(416) 555-0142', demo: true },
  { id: 'ott-01', name: 'Capital Powersports', city: 'Ottawa', province: 'ON', fsaPrefixes: ['K'], phone: '(613) 555-0118', demo: false },
  { id: 'mtl-01', name: 'Sport Montréal', city: 'Montréal', province: 'QC', fsaPrefixes: ['H', 'J', 'G'], phone: '(514) 555-0177', demo: true },
  { id: 'van-01', name: 'Pacific Slingshot', city: 'Vancouver', province: 'BC', fsaPrefixes: ['V'], phone: '(604) 555-0136', demo: true },
  { id: 'cal-01', name: 'Foothills Motorsports', city: 'Calgary', province: 'AB', fsaPrefixes: ['T'], phone: '(403) 555-0159', demo: false },
  { id: 'wpg-01', name: 'Prairie Powersports', city: 'Winnipeg', province: 'MB', fsaPrefixes: ['R', 'S'], phone: '(204) 555-0191', demo: false },
  { id: 'hfx-01', name: 'Atlantic Slingshot', city: 'Halifax', province: 'NS', fsaPrefixes: ['B', 'E', 'C', 'A'], phone: '(902) 555-0103', demo: true },
];

export const disclaimers = {
  price: `*Price shown is Manufacturer's Suggested Retail Price (MSRP) in Canadian dollars. Freight ($${FREIGHT_CAD.toLocaleString('en-CA')}) and dealer set-up ($${DEALER_SETUP_CAD}) are extra. Price excludes tax, licence, insurance and registration. Dealer sets actual price. Prices, specifications and features are subject to change without notice.`,
  safety:
    'Always wear a helmet and eye protection and follow local laws when operating a Slingshot. Never drive under the influence of drugs or alcohol. Apple CarPlay is a trademark of Apple Inc. Rockford Fosgate is a registered trademark of Rockford Corporation. Bluetooth is a registered trademark of Bluetooth SIG, Inc.',
  offers:
    'Offers vary by region, are subject to change without notice and are available at participating dealers only. See your dealer for complete details.',
};
