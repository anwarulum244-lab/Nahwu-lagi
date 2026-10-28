import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {C, Latin, useAnim} from '../lib';

/** Pembungkus adegan: fade masuk/keluar + zoom pelan (Ken Burns). */
export const SceneWrap: React.FC<{dur: number; children: React.ReactNode; zoom?: number}> = ({dur, children, zoom = 0.06}) => {
  const {local} = useAnim();
  const o = interpolate(local, [0, 10, dur - 9, dur], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const blur = interpolate(local, [0, 12, dur - 10, dur], [14, 0, 0, 10], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const s = 1.04 - 0.04 * Math.min(1, local / 14) + (local / Math.max(1, dur)) * zoom;
  return (
    <AbsoluteFill style={{opacity: o, transform: `scale(${s})`, filter: blur > 0.3 ? `blur(${blur}px)` : undefined}}>{children}</AbsoluteFill>
  );
};

export const Tag: React.FC<{text: string; at: number}> = ({text, at}) => {
  const {ease} = useAnim();
  const e = ease(at, 14);
  return (
    <div style={{position: 'absolute', top: 170, left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 22, opacity: e, transform: `translateY(${(1 - e) * -22}px)`}}>
      <div style={{width: 90 * e, height: 2, background: `linear-gradient(90deg, transparent, ${C.gold})`}} />
      <span style={{...Latin, fontWeight: 600, fontSize: 28, letterSpacing: 9, color: '#ffe9b0', padding: '12px 30px', borderRadius: 50, background: 'linear-gradient(180deg, rgba(255,207,107,0.16), rgba(0,0,0,0.5))', border: `1.5px solid ${C.gold}aa`, boxShadow: `0 0 30px ${C.gold}33, inset 0 0 18px ${C.gold}22`, backdropFilter: 'blur(6px)'}}>
        {text}
      </span>
      <div style={{width: 90 * e, height: 2, background: `linear-gradient(270deg, transparent, ${C.gold})`}} />
    </div>
  );
};

const GOLD_G = 'linear-gradient(180deg,#fff6d2 0%,#ffcf6b 48%,#c4801f 100%)';
const CREAM_G = 'linear-gradient(180deg,#ffffff 0%,#f6ecd6 55%,#d6c698 100%)';

export const Big: React.FC<{
  text: string; at: number; y: number; size?: number; color?: string; glow?: boolean; slam?: boolean; weight?: number; letter?: number;
}> = ({text, at, y, size = 120, color = C.cream, glow = true, slam = true, weight = 800, letter = 0}) => {
  const {f, ease, spr} = useAnim();
  const e = ease(at, 10);
  const s = slam ? 1.25 - 0.25 * spr(at, 14, 140) : 1;
  const grad = color === C.gold ? GOLD_G : color === C.cream ? CREAM_G : undefined;
  const shine = interpolate(f, [at + 8, at + 40], [130, -30], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const blur = (1 - e) * 14;
  const base: React.CSSProperties = {
    position: 'absolute', left: 40, right: 40, top: y, textAlign: 'center', ...Latin,
    fontWeight: weight, fontSize: size, lineHeight: 1.05, letterSpacing: letter, opacity: e,
    transform: `scale(${s})`, filter: `blur(${blur}px)`,
  };
  if (!grad) {
    return <div style={{...base, color, textShadow: glow ? `0 0 30px ${color}99, 0 6px 24px #000` : '0 6px 24px #000'}}>{text}</div>;
  }
  return (
    <div style={{...base, filter: `blur(${blur}px) drop-shadow(0 6px 18px #000) ${glow ? `drop-shadow(0 0 22px ${C.orange}aa)` : ''}`}}>
      <span
        style={{
          background: `linear-gradient(105deg, transparent ${shine - 14}%, rgba(255,255,255,0.95) ${shine}%, transparent ${shine + 14}%), ${grad}`,
          WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent',
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const Small: React.FC<{text: string; at: number; y: number; size?: number; color?: string}> = ({text, at, y, size = 38, color = C.cream}) => {
  const {ease} = useAnim();
  const e = ease(at, 12);
  return (
    <div style={{position: 'absolute', left: 60, right: 60, top: y, textAlign: 'center', ...Latin, fontWeight: 600, fontSize: size, color, opacity: e, transform: `translateY(${(1 - e) * 24}px)`, textShadow: '0 3px 14px #000'}}>
      {text}
    </div>
  );
};

export const Flash: React.FC<{at: number; color?: string}> = ({at, color = '#fff'}) => {
  const {f} = useAnim();
  const o = interpolate(f, [at, at + 3, at + 14], [0, 0.55, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: color, opacity: o, mixBlendMode: 'screen'}} />;
};
