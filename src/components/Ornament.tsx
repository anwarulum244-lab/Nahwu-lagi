import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {C, H, W, rnd, useAnim} from '../lib';

/** Pola geometri Islami (bintang 8 sudut / khatam) yang bergeser sangat pelan. */
export const Arabesque: React.FC = () => {
  const {f} = useAnim();
  const s = 150;
  return (
    <AbsoluteFill style={{opacity: 0.2, transform: `translate(${(f * 0.25) % s}px, ${(f * 0.15) % s}px)`}}>
      <svg width={W + s * 2} height={H + s * 2} style={{position: 'absolute', left: -s, top: -s, maskImage: 'radial-gradient(ellipse 70% 55% at 50% 42%, black 10%, transparent 75%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 55% at 50% 42%, black 10%, transparent 75%)'}}>
        <defs>
          <pattern id="khatam" width={s} height={s} patternUnits="userSpaceOnUse">
            <g fill="none" stroke={C.gold} strokeWidth={1.4}>
              <rect x={s / 2 - 34} y={s / 2 - 34} width={68} height={68} />
              <rect x={s / 2 - 34} y={s / 2 - 34} width={68} height={68} transform={`rotate(45 ${s / 2} ${s / 2})`} />
              <circle cx={s / 2} cy={s / 2} r={14} />
              <path d={`M0 ${s / 2} H${s / 2 - 48} M${s / 2 + 48} ${s / 2} H${s} M${s / 2} 0 V${s / 2 - 48} M${s / 2} ${s / 2 + 48} V${s}`} />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#khatam)" />
      </svg>
    </AbsoluteFill>
  );
};

const ORBS = Array.from({length: 12}, (_, i) => ({x: rnd(`ox${i}`) * W, y: rnd(`oy${i}`) * H, r: 60 + rnd(`or${i}`) * 140, sp: 0.15 + rnd(`os${i}`) * 0.35, ph: rnd(`op${i}`) * 6.28}));
/** Bokeh besar buram: memberi kedalaman. */
export const Bokeh: React.FC = () => {
  const {f} = useAnim();
  return (
    <AbsoluteFill style={{mixBlendMode: 'screen', filter: 'blur(22px)'}}>
      {ORBS.map((o, i) => (
        <div key={i} style={{position: 'absolute', left: o.x + Math.sin(f / 70 + o.ph) * 50, top: (o.y - f * o.sp + H * 3) % H, width: o.r, height: o.r, borderRadius: '50%', background: i % 3 === 0 ? C.teal : C.orange, opacity: 0.10 + 0.07 * Math.sin(f / 50 + o.ph)}} />
      ))}
    </AbsoluteFill>
  );
};

const FG = Array.from({length: 22}, (_, i) => ({x: rnd(`fx${i}`) * W, y: rnd(`fy${i}`) * H, r: 3 + rnd(`fr${i}`) * 6, sp: 2.2 + rnd(`fs${i}`) * 2.5, ph: rnd(`fp${i}`) * 6.28}));
/** Partikel depan yang bergerak lebih cepat (paralaks), sedikit buram. */
export const Foreground: React.FC = () => {
  const {f} = useAnim();
  return (
    <AbsoluteFill style={{filter: 'blur(1.5px)'}}>
      {FG.map((p, i) => (
        <div key={i} style={{position: 'absolute', left: p.x + Math.sin(f / 30 + p.ph) * 40, top: (p.y - f * p.sp + H * 6) % H, width: p.r, height: p.r, borderRadius: '50%', background: '#ffe9b0', opacity: 0.55, boxShadow: `0 0 ${p.r * 4}px ${C.gold}`}} />
      ))}
    </AbsoluteFill>
  );
};

/** Butiran film halus + gradasi warna teal-oranye + vinyet. */
export const Grade: React.FC = () => {
  const {f} = useAnim();
  return (
    <>
      <AbsoluteFill style={{background: `linear-gradient(180deg, rgba(40,120,150,0.22) 0%, transparent 45%, rgba(255,140,50,0.20) 100%)`, mixBlendMode: 'soft-light'}} />
      <AbsoluteFill style={{opacity: 0.09, mixBlendMode: 'overlay'}}>
        <svg width={W} height={H}>
          <filter id="grain" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves={2} seed={f % 24} stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width={W} height={H} filter="url(#grain)" />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 45%, transparent 50%, rgba(0,0,0,0.55) 100%)'}} />
    </>
  );
};

/** Bingkai emas ganda dengan sudut berornamen; menggambar dirinya di awal video. */
export const GoldFrame: React.FC = () => {
  const {f} = useAnim();
  const draw = interpolate(f, [4, 60], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const m = 38, m2 = 56;
  const len = 2 * (W - 2 * m) + 2 * (H - 2 * m);
  const corner = (x: number, y: number, sx: number, sy: number) => (
    <g transform={`translate(${x} ${y}) scale(${sx} ${sy})`} opacity={draw}>
      <path d="M0 70 V14 Q0 0 14 0 H70" fill="none" stroke="url(#gf)" strokeWidth={5} />
      <rect x={20} y={20} width={22} height={22} transform="rotate(45 31 31)" fill="none" stroke="url(#gf)" strokeWidth={2.5} />
      <circle cx={31} cy={31} r={4} fill="#ffe9b0" />
    </g>
  );
  return (
    <AbsoluteFill style={{opacity: 0.9, filter: `drop-shadow(0 0 8px ${C.orange}88)`}}>
      <svg width={W} height={H}>
        <defs>
          <linearGradient id="gf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff3c4" />
            <stop offset="0.5" stopColor={C.gold} />
            <stop offset="1" stopColor="#b9791f" />
          </linearGradient>
        </defs>
        <rect x={m} y={m} width={W - 2 * m} height={H - 2 * m} rx={26} fill="none" stroke="url(#gf)" strokeWidth={3} strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />
        <rect x={m2} y={m2} width={W - 2 * m2} height={H - 2 * m2} rx={18} fill="none" stroke={C.gold} strokeOpacity={0.35} strokeWidth={1.2} />
        {corner(m - 6, m - 6, 1, 1)}
        {corner(W - m + 6, m - 6, -1, 1)}
        {corner(m - 6, H - m + 6, 1, -1)}
        {corner(W - m + 6, H - m + 6, -1, -1)}
      </svg>
    </AbsoluteFill>
  );
};

/** Pita cahaya emas yang menyapu layar saat pergantian adegan. */
export const LightSweep: React.FC<{at: number}> = ({at}) => {
  const {f} = useAnim();
  const p = interpolate(f, [at, at + 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (p <= 0 || p >= 1) return null;
  return (
    <AbsoluteFill style={{overflow: 'hidden', mixBlendMode: 'screen', pointerEvents: 'none'}}>
      <div style={{position: 'absolute', top: -300, height: H + 600, width: 300, left: -500 + p * (W + 800), transform: 'rotate(18deg)', background: `linear-gradient(90deg, transparent, rgba(255,226,150,0.55), rgba(255,255,255,0.8), rgba(255,226,150,0.55), transparent)`, filter: 'blur(26px)', opacity: Math.sin(p * Math.PI)}} />
    </AbsoluteFill>
  );
};

/** Kilau lensa (anamorphic streak) pada titik tertentu. */
export const Streak: React.FC<{at: number; x?: number; y: number; w?: number}> = ({at, x = W / 2, y, w = 900}) => {
  const {f} = useAnim();
  const o = interpolate(f, [at, at + 4, at + 26], [0, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = interpolate(f, [at, at + 26], [0.3, 1.1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (o <= 0) return null;
  return (
    <div style={{position: 'absolute', left: x - w / 2, top: y - 4, width: w, height: 8, background: `radial-gradient(ellipse at center, #fff, ${C.gold} 30%, transparent 70%)`, filter: 'blur(2px)', opacity: o, transform: `scaleX(${s})`, mixBlendMode: 'screen'}} />
  );
};

/** Percikan cahaya yang memancar dari satu titik (momen penting saja). */
export const Burst: React.FC<{at: number; x: number; y: number; n?: number; color?: string; power?: number}> = ({at, x, y, n = 28, color = C.gold, power = 420}) => {
  const {f} = useAnim();
  const t = f - at;
  if (t < 0 || t > 40) return null;
  return (
    <AbsoluteFill style={{mixBlendMode: 'screen', pointerEvents: 'none'}}>
      {Array.from({length: n}, (_, i) => {
        const a = (i / n) * Math.PI * 2 + rnd(`ba${at}${i}`) * 0.5;
        const v = (0.45 + rnd(`bv${at}${i}`) * 0.55) * power;
        const k = 1 - Math.pow(1 - t / 40, 2.2);
        const sz = 4 + rnd(`bs${at}${i}`) * 7;
        return (
          <div key={i} style={{position: 'absolute', left: x + Math.cos(a) * v * k, top: y + Math.sin(a) * v * k + t * t * 0.35, width: sz, height: sz, borderRadius: '50%', background: '#fff3c4', opacity: 1 - t / 40, boxShadow: `0 0 ${sz * 3}px ${color}`}} />
        );
      })}
    </AbsoluteFill>
  );
};
