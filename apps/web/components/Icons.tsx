/** Shared outline style for the 24×24 UI icons. */
const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

export const ChevronDown = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke}><path d="m6 9 6 6 6-6" /></svg>
);
export const ChevronLeft = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke}><path d="m15 6-6 6 6 6" /></svg>
);
export const ChevronRight = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke}><path d="m9 6 6 6-6 6" /></svg>
);
export const CloseIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const SearchIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
);
export const PinIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke}><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
);
export const PrintIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" {...stroke}><path d="M6 9V3h12v6M6 18H4v-7h16v7h-2M8 14h8v7H8Z" /></svg>
);
