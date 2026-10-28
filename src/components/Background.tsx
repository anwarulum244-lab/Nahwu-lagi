import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {C, H, W, rnd, useAnim} from '../lib';
import {Arabesque, Bokeh} from './Ornament';

const PARTICLES = Array.from({length: 46}, (_, i) => ({
  x: rnd(`px${i}`) * W,
  y: rnd(`py${i}`) * H,
  r: 2 + rnd(`pr${i}`) * 5,
  sp: 0.4 + rnd(`ps${i}`) * 1.2,
  ph: rnd(`pp${i}`) * 6.28,
}));

export const Background: React.FC<{warm?: number}> = ({warm = 0}) => {
  const {f} = useAnim();
  const drift = Math.sin(f / 90) * 30;
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(1200px 1000px at ${50 + drift / 20}% 38%, #17306a 0%, ${C.navy} 45%, ${C.bg} 100%)`,
        }}
      />
      <Arabesque />
      <Bokeh />
      {/* berkas cahaya berputar pelan */}
      <AbsoluteFill style={{opacity: 0.2, mixBlendMode: 'screen'}}>
        <div
          style={{
            position: 'absolute',
            left: W / 2 - 1400,
            top: 700 - 1400,
            width: 2800,
            height: 2800,
            background: `repeating-conic-gradient(from ${f * 0.12}deg, rgba(255,154,60,0.55) 0deg 4deg, transparent 4deg 22deg)`,
            maskImage: 'radial-gradient(circle, black 0%, transparent 62%)',
            WebkitMaskImage: 'radial-gradient(circle, black 0%, transparent 62%)',
          }}
        />
      </AbsoluteFill>
      {/* debu emas */}
      {PARTICLES.map((p, i) => {
        const y = (p.y - f * p.sp * 1.4 + H * 4) % H;
        const x = p.x + Math.sin(f / 40 + p.ph) * 22;
        const o = 0.25 + 0.35 * Math.abs(Math.sin(f / 30 + p.ph));
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: p.r,
              height: p.r,
              borderRadius: '50%',
              background: C.gold,
              opacity: o,
              boxShadow: `0 0 ${p.r * 3}px ${C.orange}`,
            }}
          />
        );
      })}
      {/* hangat fajar (adegan "Paginya") */}
      <AbsoluteFill
        style={{
          opacity: warm,
          background: 'linear-gradient(0deg, rgba(255,140,50,0.55) 0%, rgba(255,190,100,0.18) 40%, transparent 75%)',
        }}
      />
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.65) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
