/* --------------------------------------------------------------------------
   Content for the 2026 Slingshot SL (en-CA).
   Single source of truth for the web app, API and mobile app.
   Prices are CAD MSRP. Verify every figure against the official spec
   sheet before publishing.
   -------------------------------------------------------------------------- */
import type {
  Accessory,
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
  tagline: 'Turn heads. Turn up the volume.',
  lede:
    'A redesigned front end, a 180 HP ProStar® engine and a Stage 2 Rockford Fosgate® sound system — the SL is built for the ride you actually want.',
  colors: [
    { id: 'white-lightning', name: 'White Lightning', paint: '#e9ecef', accent: '#101114', swatch: ['#ffffff', '#b8bec6'] },
    { id: 'blue-rush', name: 'Blue Rush', paint: '#1f5ad6', accent: '#0b0c10', swatch: ['#4d86ff', '#0f2f7a'] },
    { id: 'sunburst-orange', name: 'Sunburst Orange', paint: '#ff6a13', accent: '#0b0c10', swatch: ['#ffa25a', '#b53d00'] },
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
      title: 'Bold new front end',
      body: "The fully redesigned SL front end provides fresh, bold styling and adds an inch of ground clearance, so you'll continue to turn heads whether you're parked or cruising down the road.",
      bullets: ['Redesigned fascia & signature LED lighting', '+1″ (25 mm) added ground clearance', 'Metal badges & SL accent graphics'],
    },
    {
      id: 'tech',
      title: '7″ RIDE COMMAND® display',
      body: 'Stay connected with a 7″ display powered by RIDE COMMAND. Steering wheel controls help you conquer every twist and turn with confidence, all while keeping the rest of the world at your fingertips.',
      bullets: ['Apple CarPlay® compatible', 'Integrated steering wheel controls', 'Bluetooth® connectivity & backup camera'],
    },
    {
      id: 'audio',
      title: 'Stage 2 Rockford Fosgate® audio',
      body: 'The Stage 2 Rockford Fosgate® 200W audio system offers an immersive driving and vibing experience — tuned for open-air cockpits so your soundtrack keeps up at speed.',
      bullets: ['200 watts of premium sound', 'Weather-resistant speakers', 'Tuned for the open-air cockpit'],
    },
    {
      id: 'engine',
      title: '180 HP ProStar® 2.0L engine',
      body: 'A high-revving 2.0L ProStar® engine delivers 180 horsepower through a rear-wheel drive belt system. Pick your shift style: a pure 5-speed manual or the clutch-free AutoDrive transmission.',
      bullets: ['5-speed Manual or AutoDrive', 'Rear-wheel drive with carbon fibre belt', 'Electronic stability & traction control'],
    },
  ],
  gallery: [
    { colorId: 'sunburst-orange', scene: 'sunset', caption: 'Sunburst Orange — coastal highway' },
    { colorId: 'blue-rush', scene: 'night', caption: 'Blue Rush — city lights' },
    { colorId: 'white-lightning', scene: 'studio', caption: 'White Lightning — studio' },
    { colorId: 'blue-rush', scene: 'mountain', caption: 'Blue Rush — mountain pass' },
    { colorId: 'sunburst-orange', scene: 'studio', caption: 'Sunburst Orange — studio' },
    { colorId: 'white-lightning', scene: 'sunset', caption: 'White Lightning — golden hour' },
  ],
};

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
      ['Colours', 'White Lightning · Blue Rush · Sunburst Orange'],
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
  { id: 's', name: 'Slingshot S', price: 37149, paint: '#2a2c31', tag: 'Essential', bullets: ['180 HP ProStar® 2.0L', 'Manual or AutoDrive', 'Stage 1 audio'] },
  { id: 'sl', name: 'Slingshot SL', price: 41299, paint: '#ff6a13', tag: 'Most Popular', current: true, bullets: ['180 HP ProStar® 2.0L', '7″ RIDE COMMAND® display', 'Stage 2 Rockford Fosgate® 200W'] },
  { id: 'slr', name: 'Slingshot SLR', price: 46149, paint: '#7d8288', tag: 'Performance', bullets: ['Performance tuned', 'Sport-inspired styling', 'Premium audio & tech'] },
  { id: 'r', name: 'Slingshot R', price: null, paint: '#c8102e', tag: 'Flagship', bullets: ['Most powerful Slingshot', 'Premium performance package', 'RIDE COMMAND+'] },
  { id: 'sig', name: 'Slingshot Signature Edition', price: null, paint: '#6b2fd6', tag: 'Limited Edition', bullets: ['Colour-shifting paint', 'Stage 3 Max audio', 'XKGlow® lighting'] },
  { id: 'gt', name: 'Slingshot Grand Touring', price: 48999, paint: '#0f5c4a', tag: 'Limited Edition', bullets: ['Touring comfort', 'RIDE COMMAND+', 'Premium styling'] },
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
