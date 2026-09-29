import { VEHICLE_VIEWBOX, isLight, shade, vehicleGeometry as g, type Wheel } from '@slingshot/shared';

interface VehicleProps {
  /** Unique id used to scope SVG gradients. */
  id: string;
  paint: string;
  accent?: string;
  className?: string;
  title?: string;
}

function WheelShape({ w, id }: { w: Wheel; id: string }) {
  const spokes = Array.from({ length: 10 }, (_, i) => {
    const a = (i * Math.PI) / 5;
    return (
      <line
        key={i}
        x1={w.cx + Math.cos(a) * w.hub}
        y1={w.cy + Math.sin(a) * w.hub}
        x2={w.cx + Math.cos(a) * (w.rim - 3)}
        y2={w.cy + Math.sin(a) * (w.rim - 3)}
      />
    );
  });
  return (
    <g>
      <circle cx={w.cx} cy={w.cy} r={w.tire} fill="#0c0c0e" />
      <circle cx={w.cx} cy={w.cy} r={w.tire - 5} fill="none" stroke="#1d1e22" strokeWidth={3} />
      <circle cx={w.cx} cy={w.cy} r={w.rim} fill={`url(#${id}-rim)`} />
      <g stroke="#0e0f12" strokeWidth={5} strokeLinecap="round">{spokes}</g>
      <circle cx={w.cx} cy={w.cy} r={w.rim - 12} fill="none" stroke="#b10816" strokeWidth={6} strokeDasharray="30 200" />
      <circle cx={w.cx} cy={w.cy} r={w.hub} fill="#2a2b30" stroke="#55575e" strokeWidth={2} />
    </g>
  );
}

/** Stylised side-profile of the 3-wheel roadster with a live paint colour. */
export function Vehicle({ id, paint, accent = '#0d0e11', className, title }: VehicleProps) {
  const light = isLight(paint);
  const hi = shade(paint, light ? 18 : 60);
  const lo = shade(paint, light ? -60 : -70);
  const stripe = light ? '#e10a1f' : accent;

  return (
    <svg
      className={['vehicle', className].filter(Boolean).join(' ')}
      viewBox={VEHICLE_VIEWBOX}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={hi} />
          <stop offset="0.45" stopColor={paint} />
          <stop offset="1" stopColor={lo} />
        </linearGradient>
        <radialGradient id={`${id}-rim`}>
          <stop offset="0" stopColor="#6b6e76" />
          <stop offset="0.7" stopColor="#3a3c42" />
          <stop offset="1" stopColor="#1b1c20" />
        </radialGradient>
        <radialGradient id={`${id}-shadow`}>
          <stop offset="0" stopColor="#000" stopOpacity="0.75" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse {...g.shadow} fill={`url(#${id}-shadow)`} />
      <path d={g.swingArm} fill="#16171b" />
      <path d={g.controlArms} stroke="#1c1d21" strokeWidth={8} strokeLinecap="round" />
      <WheelShape w={g.rearWheel} id={id} />
      <path d={g.wheelWell} fill="#0a0a0c" />

      <path className="vehicle__body" d={g.body} fill={`url(#${id}-body)`} />
      <path d={g.sill} fill={accent} />
      <path d={g.splitter} fill={accent} />
      <path d={g.intake} fill={accent} opacity={0.9} />
      <path className="vehicle__stripe" d={g.stripe} fill="none" stroke={stripe} strokeWidth={6} strokeLinecap="round" />
      <path d={g.highlight} fill="none" stroke="#fff" strokeOpacity={0.45} strokeWidth={3} strokeLinecap="round" />
      <path d={g.hoop} fill="none" stroke="#2c2d33" strokeWidth={10} strokeLinecap="round" />
      <path d={g.seat} fill="#141519" />
      <path d={g.steering} stroke="#141519" strokeWidth={8} strokeLinecap="round" />
      <path d={g.windscreen} fill="#9fb4c8" fillOpacity={0.45} stroke="#1a1b1f" strokeWidth={2} />
      <path d={g.headlight} fill="#f4f7ff" />
      <path d={g.drl} stroke="#e8f0ff" strokeWidth={3} strokeLinecap="round" />
      <path d={g.taillight} fill="#e10a1f" />

      <WheelShape w={g.frontWheel} id={id} />
    </svg>
  );
}
