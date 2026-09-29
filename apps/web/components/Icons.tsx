import type { AccessoryIcon } from '@slingshot/shared';
import type { ReactNode } from 'react';

const accessoryPaths: Record<AccessoryIcon, ReactNode> = {
  wind: (
    <>
      <path d="M8 36 14 12h20l6 24" />
      <path d="M6 36h36" />
      <path d="M18 18h12" />
    </>
  ),
  bag: (
    <>
      <rect x="8" y="16" width="32" height="22" rx="3" />
      <path d="M17 16v-4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4M8 25h32" />
      <circle cx="24" cy="25" r="2" />
    </>
  ),
  seat: (
    <>
      <path d="M16 8c-3 0-4 3-4 6l2 18h16" />
      <path d="M14 32h20l4 8H12Z" />
      <path d="M16 14h6" />
    </>
  ),
  roof: (
    <>
      <path d="M6 30c6-12 30-12 36 0" />
      <path d="M10 30v8M38 30v8M4 30h40" />
    </>
  ),
  light: (
    <>
      <path d="M18 34h12M20 40h8" />
      <path d="M24 6a10 10 0 0 0-6 18c1 1 2 3 2 5v5h8v-5c0-2 1-4 2-5A10 10 0 0 0 24 6Z" />
    </>
  ),
  cover: (
    <>
      <path d="M4 34c2-10 8-16 20-16s18 6 20 16Z" />
      <path d="M12 34c0-6 4-10 12-10" />
    </>
  ),
};

export function AccessoryGlyph({ icon }: { icon: AccessoryIcon }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      {accessoryPaths[icon]}
    </svg>
  );
}

export const ChevronDown = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>
);
export const ChevronLeft = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m15 6-6 6 6 6" /></svg>
);
export const ChevronRight = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6" /></svg>
);
export const CloseIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const SearchIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
);
export const PinIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
);
export const ZoomIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
);
export const PrintIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 9V3h12v6M6 18H4v-7h16v7h-2M8 14h8v7H8Z" /></svg>
);

export function LogoMark({ className = 'logo__mark' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 32" aria-hidden="true">
      <path d="M2 30 24 2l22 28h-9L24 13 11 30Z" />
      <path d="M18 30 24 22l6 8Z" />
    </svg>
  );
}
