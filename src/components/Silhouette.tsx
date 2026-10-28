import React from 'react';
import {C, Latin} from '../lib';

type Props = {
  x: number;
  y: number;
  scale?: number;
  turban?: boolean;
  beard?: boolean;
  opacity?: number;
  label?: string;
  sub?: string;
  rim?: string;
  flip?: boolean;
};

/** Siluet gelap dengan tepi cahaya oranye (ilustrasi, bukan potret asli). */
export const Silhouette: React.FC<Props> = ({
  x, y, scale = 1, turban = true, beard = true, opacity = 1, label, sub, rim = C.orange, flip,
}) => (
  <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%, -50%) scale(${scale})`, opacity, textAlign: 'center'}}>
    <div style={{position: 'absolute', left: '50%', top: 30, width: 520, height: 520, marginLeft: -260, borderRadius: '50%', background: `radial-gradient(circle, ${rim}55 0%, ${rim}18 40%, transparent 68%)`, filter: 'blur(10px)', zIndex: -1}} />
    <div style={{position: 'absolute', left: '50%', top: 322, width: 300, height: 34, marginLeft: -150, borderRadius: '50%', background: `radial-gradient(ellipse, ${rim}99, transparent 70%)`, filter: 'blur(6px)'}} />
    <svg width={260} height={340} viewBox="0 0 200 260" style={{filter: `drop-shadow(0 0 10px ${rim}) drop-shadow(0 0 28px ${rim}88)`, transform: flip ? 'scaleX(-1)' : undefined}}>
      <path d="M6 260 C6 192 46 166 100 166 C154 166 194 192 194 260 Z" fill="#04060d" stroke={rim} strokeWidth="2" />
      <rect x="84" y="140" width="32" height="34" rx="10" fill="#04060d" />
      <ellipse cx="100" cy="112" rx="37" ry="45" fill="#04060d" stroke={rim} strokeWidth="2" />
      {beard && <path d="M64 122 C66 170 134 170 136 122 C128 146 72 146 64 122 Z" fill="#04060d" stroke={rim} strokeWidth="1.5" />}
      {turban && (
        <>
          <ellipse cx="100" cy="76" rx="50" ry="27" fill="#04060d" stroke={rim} strokeWidth="2" />
          <path d="M52 80 C80 96 120 96 148 80" stroke={rim} strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M60 68 C86 82 116 82 142 68" stroke={rim} strokeWidth="1.5" fill="none" opacity="0.5" />
        </>
      )}
    </svg>
    {label && (
      <div style={{...Latin, marginTop: 6 / scale, fontWeight: 700, fontSize: 40, color: C.cream, textShadow: '0 3px 14px #000', lineHeight: 1.1}}>
        {label}
        {sub && <div style={{fontWeight: 500, fontSize: 28, color: C.gold, marginTop: 6}}>{sub}</div>}
      </div>
    )}
  </div>
);
