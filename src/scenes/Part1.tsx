import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {Arabic, C, H, Latin, W, cs, ce, rnd, useAnim} from '../lib';
import {Big, Flash, SceneWrap, Small, Tag} from '../components/ui';
import {Silhouette} from '../components/Silhouette';
import {Burst, Streak} from '../components/Ornament';

/* ───────── 1. HOOK ───────── */
export const Hook: React.FC<{dur: number}> = ({dur}) => {
  const {f, ease, spr} = useAnim();
  const flipAt = cs(1);
  const glitching = f < flipAt;
  const g = Math.floor(f / 2);
  const jx = glitching ? (rnd(`gx${g}`) - 0.5) * 34 : 0;
  const jy = glitching ? (rnd(`gy${g}`) - 0.5) * 16 : 0;
  const bad = interpolate(f, [flipAt - 6, flipAt], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const good = spr(flipAt, 11, 110);
  const base: React.CSSProperties = {...Arabic, position: 'absolute', left: 0, right: 0, textAlign: 'center', top: 560, fontSize: 430, fontWeight: 700, lineHeight: 1};
  return (
    <SceneWrap dur={dur} zoom={0.08}>
      <Tag text="KISAH LAHIRNYA ILMU NAHWU" at={4} />
      <Big text="SATU KESALAHAN" at={2} y={330} size={104} color={C.cream} />
      {/* kata "lahn" yang rusak */}
      <div style={{...base, color: C.red, opacity: 0.8 * bad, transform: `translate(${jx}px, ${jy}px)`, mixBlendMode: 'screen'}}>لَحْن</div>
      <div style={{...base, color: '#44e0ff', opacity: 0.7 * bad, transform: `translate(${-jx}px, ${-jy}px)`, mixBlendMode: 'screen'}}>لَحْن</div>
      <div style={{...base, color: C.cream, opacity: bad, textShadow: `0 0 40px ${C.red}`}}>لَحْن</div>
      {/* garis glitch */}
      {glitching && [0, 1, 2].map((k) => (
        <div key={k} style={{position: 'absolute', left: 0, width: W, top: 560 + rnd(`ls${g}${k}`) * 420, height: 6 + rnd(`lh${g}${k}`) * 10, background: C.red, opacity: 0.5 * rnd(`lo${g}${k}`)}} />
      ))}
      {/* jadi "nahwu" */}
      <div style={{...base, color: C.gold, opacity: good, transform: `scale(${0.6 + 0.4 * good})`, textShadow: `0 0 50px ${C.orange}, 0 0 120px ${C.orange}88`}}>نَحْو</div>
      <Big text="LAHIR SATU ILMU" at={flipAt + 6} y={1060} size={84} color={C.gold} slam={false} />
      <Flash at={flipAt} color={C.orange} />
      <Burst at={flipAt} x={W / 2} y={780} power={520} />
      <Streak at={flipAt} y={780} w={1000} />
    </SceneWrap>
  );
};

/* ───────── 2. ERA ───────── */
const DOTS = Array.from({length: 22}, (_, i) => ({a: (i / 22) * Math.PI * 2 + rnd(`da${i}`) * 0.3, d: 0.8 + rnd(`dd${i}`) * 0.2, c: [C.teal, C.gold, C.cream, C.orange][i % 4]}));
const RED = Array.from({length: 18}, (_, i) => ({x: 90 + rnd(`rx${i}`) * 900, y: 520 + rnd(`ry${i}`) * 700, s: 22 + rnd(`rs${i}`) * 26}));

export const Era: React.FC<{dur: number}> = ({dur}) => {
  const {f, ease, spr} = useAnim();
  const cx = W / 2, cy = 860;
  const ringStart = cs(3);
  return (
    <SceneWrap dur={dur}>
      <Tag text="ABAD PERTAMA HIJRIAH" at={cs(2)} />
      <Big text="ABAD 1 H" at={cs(2)} y={290} size={150} />
      <Small text="Madinah → dunia Islam" at={cs(3)} y={470} size={36} color={C.gold} />
      {/* Islam meluas: cincin */}
      <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
        {[0, 1, 2, 3].map((k) => {
          const p = interpolate(f, [ringStart + k * 14, ringStart + k * 14 + 70], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return <circle key={k} cx={cx} cy={cy} r={60 + p * 420} fill="none" stroke={C.orange} strokeWidth={6 - k} opacity={(1 - p) * 0.9 * (f >= ringStart + k * 14 ? 1 : 0)} />;
        })}
        <circle cx={cx} cy={cy} r={34 + Math.sin(f / 6) * 4} fill={C.gold} style={{filter: `drop-shadow(0 0 24px ${C.orange})`}} opacity={ease(cs(2) + 6, 12)} />
        {/* orang non-Arab masuk */}
        {DOTS.map((d, i) => {
          const at = cs(4) + i * 3;
          const p = interpolate(f, [at, at + 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const r = 520 * d.d * (1 - p) + 60 * p;
          return <circle key={i} cx={cx + Math.cos(d.a) * r} cy={cy + Math.sin(d.a) * r * 0.9} r={14} fill={d.c} opacity={p > 0 || f >= at ? 0.95 * (1 - Math.max(0, p - 0.92) * 12) : 0} style={{filter: `drop-shadow(0 0 8px ${d.c})`}} />;
        })}
      </svg>
      <Small text="ORANG NON-ARAB MASUK ISLAM" at={cs(4)} y={1280} size={34} color={C.cream} />
      {/* lahn */}
      {f >= cs(5) && (
        <AbsoluteFill style={{background: `rgba(229,72,77,${interpolate(f, [cs(5), cs(5) + 10], [0, 0.22], {extrapolateRight: 'clamp'})})`}} />
      )}
      <div style={{...Arabic, position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center', fontSize: 330, color: C.red, fontWeight: 700, opacity: ease(cs(6), 8), transform: `scale(${1.4 - 0.4 * spr(cs(6), 13, 140)})`, textShadow: `0 0 50px ${C.red}`}}>لَحْن</div>
      <Big text="LAHN" at={cs(6)} y={1010} size={110} color={C.red} glow={false} />
      <Flash at={cs(5)} color={C.red} />
      {/* merebak */}
      {RED.map((r, i) => {
        const at = cs(7) + i * 5;
        const p = ease(at, 10);
        return <div key={i} style={{position: 'absolute', left: r.x, top: r.y, width: r.s, height: r.s, borderRadius: '50%', background: C.red, opacity: 0.8 * p, transform: `scale(${p})`, boxShadow: `0 0 24px ${C.red}`}} />;
      })}
    </SceneWrap>
  );
};

/* ───────── 3. TUGAS ───────── */
export const Tugas: React.FC<{dur: number}> = ({dur}) => {
  const {f, ease, spr} = useAnim();
  const send = interpolate(f, [cs(8) + 30, cs(8) + 80], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <SceneWrap dur={dur}>
      <Tag text="PENUGASAN" at={cs(8)} />
      <Silhouette x={290} y={880} scale={1.25} turban label="Ali bin Abi Thalib" sub="Khalifah" opacity={ease(cs(8), 14)} />
      <Silhouette x={800} y={880} scale={1.25} turban label="Abu al-Aswad" sub="ad-Du’ali" opacity={ease(cs(8) + 40, 14)} flip />
      {/* gulungan berpindah */}
      <div style={{position: 'absolute', left: 290 + (800 - 290) * send, top: 560 - Math.sin(send * Math.PI) * 120, width: 120, height: 70, borderRadius: 14, background: `linear-gradient(90deg, ${C.cream}, #e3cf9f)`, transform: 'translate(-50%,-50%) rotate(-8deg)', boxShadow: `0 0 36px ${C.gold}`, opacity: ease(cs(8) + 26, 8) * (1 - Math.max(0, send - 0.95) * 20)}}>
        {[0, 1, 2].map((k) => <div key={k} style={{position: 'absolute', left: 16, right: 16, top: 16 + k * 16, height: 5, background: '#9a7c3a', borderRadius: 3}} />)}
      </div>
      <Big text="KAIDAH DASAR" at={cs(9)} y={330} size={104} color={C.gold} />
      <Streak at={cs(9)} y={470} w={760} />
      <Flash at={cs(9)} color={C.gold} />
    </SceneWrap>
  );
};

/* ───────── 4. HARAKAT ───────── */
const LETTERS = ['ر', 'د', 'ل', 'م', 'ع', 'ك'];
export const Harakat: React.FC<{dur: number}> = ({dur}) => {
  const {f, ease, spr} = useAnim();
  const dotAt = cs(11) + 18;
  const rowAt = cs(13);
  const single = 1 - ease(rowAt - 6, 10);
  return (
    <SceneWrap dur={dur}>
      <Tag text="TANDA HARAKAT" at={cs(10)} />
      <Silhouette x={W / 2} y={560} scale={0.7} turban label="Abu al-Aswad ad-Du’ali" opacity={ease(cs(10), 14) * single} />
      {/* satu huruf + titik merah */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center', opacity: ease(cs(10) + 30, 12) * single}}>
        <div style={{...Arabic, fontSize: 420, color: C.cream, lineHeight: 1, display: 'inline-block', position: 'relative', fontWeight: 700}}>
          د
          <div style={{position: 'absolute', left: '50%', top: -34 - (1 - spr(dotAt, 10, 160)) * 160, width: 60, height: 60, marginLeft: -30, borderRadius: '50%', background: C.red, opacity: f >= dotAt ? 1 : 0, boxShadow: `0 0 40px ${C.red}, 0 0 100px ${C.red}`}} />
        </div>
      </div>
      <Big text="FATHAH" at={cs(12)} y={1180} size={110} color={C.red} glow={false} />
      <Flash at={dotAt} color={C.red} />
      <Burst at={dotAt} x={W / 2} y={720} n={22} color={C.red} power={300} />
      {/* deret huruf bertitik */}
      <div style={{position: 'absolute', left: 60, right: 60, top: 700, display: 'flex', flexDirection: 'row-reverse', justifyContent: 'center', gap: 20, opacity: ease(rowAt - 4, 10)}}>
        {LETTERS.map((l, i) => {
          const at = rowAt + i * 6;
          return (
            <div key={i} style={{...Arabic, position: 'relative', fontSize: 190, color: C.cream, fontWeight: 700, lineHeight: 1}}>
              {l}
              <div style={{position: 'absolute', left: '50%', top: 4, width: 26, height: 26, marginLeft: -13, borderRadius: '50%', background: C.red, boxShadow: `0 0 20px ${C.red}`, opacity: f >= at ? 1 : 0, transform: `scale(${spr(at, 9, 200)})`}} />
            </div>
          );
        })}
      </div>
      <Big text="ATURAN MAIN" at={cs(14)} y={1000} size={100} color={C.gold} />
    </SceneWrap>
  );
};
