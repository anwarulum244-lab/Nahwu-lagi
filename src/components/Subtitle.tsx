import React from 'react';
import {useCurrentFrame} from 'remotion';
import {CHUNKS} from '../timing';
import {C, FPS, Latin} from '../lib';

export const Subtitle: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const chunk = CHUNKS.find((c) => t >= c.s - 0.04 && t < c.e + 0.18);
  if (!chunk) return null;
  const enter = Math.min(1, (t - (chunk.s - 0.04)) / 0.12);
  const exit = Math.min(1, Math.max(0, (chunk.e + 0.18 - t) / 0.12));
  const o = Math.min(enter, exit);
  return (
    <div
      style={{
        position: 'absolute',
        left: 60,
        right: 60,
        bottom: 340,
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '6px 22px',
        opacity: o,
        transform: `translateY(${(1 - o) * 18}px)`,
        ...Latin,
        fontWeight: 800,
        fontSize: 72,
        lineHeight: 1.18,
        textAlign: 'center',
        textShadow: '0 4px 18px rgba(0,0,0,0.95), 0 0 3px rgba(0,0,0,1)',
      }}
    >
      <div style={{position: 'absolute', left: '50%', bottom: -26, width: 520 * o, height: 3, marginLeft: -260 * o, background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`, boxShadow: `0 0 14px ${C.gold}`}} />
      {chunk.words.map((w, i) => {
        const active = t >= w.s && t < w.e;
        return (
          <span
            key={i}
            style={{
              color: active ? '#ffd877' : '#fff',
              transform: `scale(${active ? 1.07 : 1}) translateY(${active ? -3 : 0}px)`,
              display: 'inline-block',
              textShadow: active ? `0 0 26px ${C.orange}, 0 4px 18px rgba(0,0,0,0.95)` : undefined,
            }}
          >
            {w.t}
          </span>
        );
      })}
    </div>
  );
};
