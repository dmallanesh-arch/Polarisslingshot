/* --------------------------------------------------------------------------
   Side-profile vector geometry for the 3-wheel roadster.
   Rendered with <svg> on the web and react-native-svg on mobile, so the
   paint colour can be swapped live by the colour picker.
   viewBox: 0 0 1000 400 — ground line at y = 352.
   -------------------------------------------------------------------------- */

export const VEHICLE_VIEWBOX = '0 0 1000 400';

export interface Wheel {
  cx: number;
  cy: number;
  tire: number;
  rim: number;
  hub: number;
}

export const vehicleGeometry = {
  shadow: { cx: 520, cy: 356, rx: 440, ry: 16 },
  rearWheel: { cx: 205, cy: 292, tire: 62, rim: 44, hub: 12 } satisfies Wheel,
  frontWheel: { cx: 792, cy: 294, tire: 58, rim: 40, hub: 11 } satisfies Wheel,
  /** Single-sided swing arm from the chassis to the rear hub. */
  swingArm: 'M338 280 L214 286 L208 298 L340 296 Z',
  /** Front control arms behind the wheel. */
  controlArms: 'M700 276 L786 288 M702 300 L786 300',
  /** Dark wheel well visible through the front arch. */
  wheelWell: 'M722 282 A70 70 0 0 1 862 282 Z',
  /** Main painted body. */
  body:
    'M118 214 C150 198 228 192 292 194 L352 190 C368 158 392 140 424 142 C444 144 452 160 458 196 ' +
    'L560 200 L606 184 C690 176 790 186 872 210 C924 224 958 240 972 258 L968 278 ' +
    'C930 284 884 282 862 280 A72 72 0 0 0 720 276 L304 284 L266 262 C238 248 188 238 136 236 Z',
  /** Lower rocker / side sill in the trim colour. */
  sill: 'M304 284 L720 276 L716 262 L316 268 Z',
  /** Front splitter under the nose. */
  splitter: 'M872 282 L972 276 L968 288 L880 292 Z',
  /** Side intake scoop. */
  intake: 'M540 236 L640 226 L628 252 L556 256 Z',
  /** Seat back and headrest. */
  seat: 'M458 198 C452 168 468 152 492 160 C506 166 510 184 510 200 Z',
  /** Roll hoop / halo. */
  hoop: 'M404 190 C404 150 424 132 446 136',
  /** Windscreen. */
  windscreen: 'M604 186 L566 150 L580 146 L618 182 Z',
  /** Steering wheel peeking above the cowl. */
  steering: 'M556 196 L572 170',
  /** Headlight and DRL. */
  headlight: 'M918 230 L960 248 L952 258 L914 244 Z',
  drl: 'M880 226 L940 244',
  /** Tail light. */
  taillight: 'M120 214 L150 206 L152 216 L124 222 Z',
  /** Accent graphics stripe along the flank. */
  stripe: 'M330 250 C460 242 640 232 846 236',
  /** Specular highlight along the top of the body. */
  highlight: 'M300 198 L352 194 M620 188 C700 182 790 190 860 210',
} as const;

/** Lighten or darken a hex colour by `amt` (-255..255). */
export function shade(hex: string, amt: number): string {
  const n = parseInt(hex.replace('#', ''), 16);
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp((n >> 16) + amt);
  const g = clamp(((n >> 8) & 0xff) + amt);
  const b = clamp((n & 0xff) + amt);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/** True when a colour is light enough to need dark trim contrast. */
export function isLight(hex: string): boolean {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = n >> 16, g = (n >> 8) & 0xff, b = n & 0xff;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.7;
}
