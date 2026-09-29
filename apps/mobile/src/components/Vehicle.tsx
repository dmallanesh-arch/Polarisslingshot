import { isLight, shade, vehicleGeometry as g, type Wheel } from '@slingshot/shared';
import Svg, { Circle, Defs, Ellipse, G, Line, LinearGradient, Path, RadialGradient, Stop } from 'react-native-svg';

interface Props {
  id: string;
  paint: string;
  accent?: string;
  width: number;
}

function WheelShape({ w, id }: { w: Wheel; id: string }) {
  return (
    <G>
      <Circle cx={w.cx} cy={w.cy} r={w.tire} fill="#0c0c0e" />
      <Circle cx={w.cx} cy={w.cy} r={w.tire - 5} fill="none" stroke="#1d1e22" strokeWidth={3} />
      <Circle cx={w.cx} cy={w.cy} r={w.rim} fill={`url(#${id}-rim)`} />
      <G stroke="#0e0f12" strokeWidth={5} strokeLinecap="round">
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i * Math.PI) / 5;
          return (
            <Line
              key={i}
              x1={w.cx + Math.cos(a) * w.hub}
              y1={w.cy + Math.sin(a) * w.hub}
              x2={w.cx + Math.cos(a) * (w.rim - 3)}
              y2={w.cy + Math.sin(a) * (w.rim - 3)}
            />
          );
        })}
      </G>
      <Circle cx={w.cx} cy={w.cy} r={w.rim - 12} fill="none" stroke="#b10816" strokeWidth={6} strokeDasharray="30 200" />
      <Circle cx={w.cx} cy={w.cy} r={w.hub} fill="#2a2b30" stroke="#55575e" strokeWidth={2} />
    </G>
  );
}

/** Native port of the web vehicle illustration (same shared geometry). */
export function Vehicle({ id, paint, accent = '#0d0e11', width }: Props) {
  const light = isLight(paint);
  const hi = shade(paint, light ? 18 : 60);
  const lo = shade(paint, light ? -60 : -70);
  const stripe = light ? '#e10a1f' : accent;

  return (
    <Svg width={width} height={width * 0.4} viewBox="0 0 1000 400">
      <Defs>
        <LinearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={hi} />
          <Stop offset="0.45" stopColor={paint} />
          <Stop offset="1" stopColor={lo} />
        </LinearGradient>
        <RadialGradient id={`${id}-rim`}>
          <Stop offset="0" stopColor="#6b6e76" />
          <Stop offset="0.7" stopColor="#3a3c42" />
          <Stop offset="1" stopColor="#1b1c20" />
        </RadialGradient>
        <RadialGradient id={`${id}-shadow`}>
          <Stop offset="0" stopColor="#000" stopOpacity={0.75} />
          <Stop offset="1" stopColor="#000" stopOpacity={0} />
        </RadialGradient>
      </Defs>

      <Ellipse {...g.shadow} fill={`url(#${id}-shadow)`} />
      <Path d={g.swingArm} fill="#16171b" />
      <Path d={g.controlArms} stroke="#1c1d21" strokeWidth={8} strokeLinecap="round" />
      <WheelShape w={g.rearWheel} id={id} />
      <Path d={g.wheelWell} fill="#0a0a0c" />

      <Path d={g.body} fill={`url(#${id}-body)`} />
      <Path d={g.sill} fill={accent} />
      <Path d={g.splitter} fill={accent} />
      <Path d={g.intake} fill={accent} opacity={0.9} />
      <Path d={g.stripe} fill="none" stroke={stripe} strokeWidth={6} strokeLinecap="round" />
      <Path d={g.highlight} fill="none" stroke="#fff" strokeOpacity={0.45} strokeWidth={3} strokeLinecap="round" />
      <Path d={g.hoop} fill="none" stroke="#2c2d33" strokeWidth={10} strokeLinecap="round" />
      <Path d={g.seat} fill="#141519" />
      <Path d={g.steering} stroke="#141519" strokeWidth={8} strokeLinecap="round" />
      <Path d={g.windscreen} fill="#9fb4c8" fillOpacity={0.45} stroke="#1a1b1f" strokeWidth={2} />
      <Path d={g.headlight} fill="#f4f7ff" />
      <Path d={g.drl} stroke="#e8f0ff" strokeWidth={3} strokeLinecap="round" />
      <Path d={g.taillight} fill="#e10a1f" />

      <WheelShape w={g.frontWheel} id={id} />
    </Svg>
  );
}
