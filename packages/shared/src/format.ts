/** Format a CAD price, e.g. 41299 → "$41,299". */
export function formatCAD(value: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).format(value);
}

const POSTAL_RE = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] ?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

/** Validate a Canadian postal code (e.g. "M5V 2T6"). */
export function isValidPostalCode(value: string): boolean {
  return POSTAL_RE.test(value.trim());
}

/** Normalise a postal code to "A1A 1A1". */
export function normalizePostalCode(value: string): string {
  const v = value.replace(/\s+/g, '').toUpperCase();
  return v.length === 6 ? `${v.slice(0, 3)} ${v.slice(3)}` : v;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}
