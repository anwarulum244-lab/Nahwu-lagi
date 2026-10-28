import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {Arabic, C, H, Latin, W, cs, rnd, useAnim} from '../lib';
import {Big, Flash, SceneWrap, Small, Tag} from '../components/ui';
import {Silhouette} from '../components/Silhouette';
import {Burst, Streak} from '../components/Ornament';

/* ───────── 5. AL-ISHABAH ───────── */
export const Ishabah: React.FC<{dur: number}> = ({dur}) => {
  const {f, ease, spr} = useAnim();
  const card = (at: number, y: number, text: string, sub: string, color: string) => {
    const e = ease(at, 12);
    return (
      <div style={{position: 'absolute', left: 80, right: 80, top: y, opacity: e, transform: `translateX(${(1 - e) * 120}px)`, padding: '26px 34px', borderRadius: 28, background: 'rgba(8,16,40,0.82)', border: `3px solid ${color}`, boxShadow: `0 0 36px ${color}55`, ...Latin}}>
        <div style={{fontWeight: 800, fontSize: 44, color}}>{text}</div>
        <div style={{fontWeight: 500, fontSize: 32, color: C.cream, marginTop: 6}}>{sub}</div>
      </div>
    );
  };
  const bookS = spr(cs(15), 13, 130);
  return (
    <SceneWrap dur={dur}>
      <Tag text="RUJUKAN KITAB" at={cs(15)} />
      {/* sampul kitab */}
      <div style={{position: 'absolute', left: W / 2 - 230, top: 290, width: 460, height: 420, borderRadius: 18, background: 'linear-gradient(135deg,#143a2f,#0a2019)', border: `4px solid ${C.gold}`, boxShadow: `0 0 60px ${C.gold}66, 12px 14px 0 #04100c`, transform: `scale(${0.4 + 0.6 * bookS}) rotate(${(1 - bookS) * -12}deg)`, opacity: ease(cs(15), 8), textAlign: 'center', paddingTop: 56}}>
        <div style={{...Arabic, fontSize: 130, color: C.gold, lineHeight: 1.1, fontWeight: 700}}>الإصابة</div>
        <div style={{...Latin, fontWeight: 800, fontSize: 52, color: C.cream, marginTop: 20}}>al-Ishabah</div>
        <div style={{...Latin, fontWeight: 500, fontSize: 30, color: C.gold, marginTop: 12}}>Ibnu Hajar al-Asqalani</div>
      </div>
      {card(cs(16) + 6, 790, 'Orang pertama', 'yang memberi harakat pada mushaf', C.gold)}
      {card(cs(17), 985, 'Yang meletakkan al-‘Arabiyyah', 'nama awal ilmu ini', C.orange)}
      {/* linimasa nama */}
      <div style={{position: 'absolute', left: 80, right: 80, top: 1190, opacity: ease(cs(19) - 6, 10), ...Latin}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{fontWeight: 700, fontSize: 38, color: C.cream}}>al-‘Arabiyyah</div>
          <div style={{flex: 1, height: 6, margin: '0 22px', background: `linear-gradient(90deg, ${C.orange}, ${C.gold})`, borderRadius: 3, transform: `scaleX(${ease(cs(19) + 4, 22)})`, transformOrigin: 'left'}} />
          <div style={{fontWeight: 800, fontSize: 46, color: C.gold, opacity: ease(cs(19) + 20, 10), textShadow: `0 0 24px ${C.orange}`}}>Nahwu</div>
        </div>
        <div style={{textAlign: 'center', fontWeight: 500, fontSize: 30, color: C.dim, marginTop: 12, opacity: ease(cs(20), 12)}}>nama nahwu dikenal sepeninggalnya</div>
      </div>
      <Flash at={cs(15) + 2} color={C.gold} />
      <Burst at={cs(15) + 2} x={W / 2} y={500} n={24} power={380} />
    </SceneWrap>
  );
};

/* ───────── 6. DUA KUBU ───────── */
export const Kubu: React.FC<{dur: number}> = ({dur}) => {
  const {f, ease, spr} = useAnim();
  const split = interpolate(f, [cs(22), cs(22) + 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const clash = interpolate(f, [cs(28), cs(30) + 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const shake = f >= cs(28) ? Math.sin(f * 1.4) * 6 * clash : 0;
  return (
    <SceneWrap dur={dur}>
      <Tag text="DUA KUBU" at={cs(21)} />
      <Big text="BELUM SELESAI" at={cs(21)} y={560} size={110} color={C.cream} />
      {/* retakan */}
      <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
        <path d={`M ${W / 2} 280 L ${W / 2 - 40} 520 L ${W / 2 + 36} 760 L ${W / 2 - 30} 1000 L ${W / 2 + 20} 1250`} stroke={C.orange} strokeWidth={8} fill="none" strokeDasharray={1200} strokeDashoffset={1200 * (1 - split)} style={{filter: `drop-shadow(0 0 16px ${C.orange})`}} />
      </svg>
      <AbsoluteFill style={{opacity: split * 0.5, background: `linear-gradient(90deg, rgba(63,182,168,0.30) 0%, transparent 48%, transparent 52%, rgba(255,154,60,0.30) 100%)`}} />
      <Big text="DUA KUBU" at={cs(22) + 12} y={300} size={96} color={C.gold} />
      <div style={{position: 'absolute', left: 0, top: 0, width: W, height: H, transform: `translateX(${shake}px)`}}>
        <div style={{position: 'absolute', left: 0, width: W / 2, top: 420, textAlign: 'center', opacity: ease(cs(23), 12), ...Latin, fontWeight: 800, fontSize: 70, color: C.teal, textShadow: `0 0 28px ${C.teal}`}}>BASRAH</div>
        <div style={{position: 'absolute', left: W / 2, width: W / 2, top: 420, textAlign: 'center', opacity: ease(cs(25), 12), ...Latin, fontWeight: 800, fontSize: 70, color: C.orange, textShadow: `0 0 28px ${C.orange}`}}>KUFAH</div>
        <Silhouette x={270} y={900} scale={1.05} turban label="Sibawaih" rim={C.teal} opacity={ease(cs(24), 14)} />
        <Silhouette x={810} y={900} scale={1.05} turban label="al-Kisa’i" rim={C.orange} opacity={ease(cs(26), 14)} flip />
      </div>
      {/* benturan */}
      <div style={{position: 'absolute', left: W / 2 - 60, top: 850, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, #fff, ${C.gold} 40%, transparent 70%)`, opacity: clash * (0.6 + 0.4 * Math.sin(f / 3)), transform: `scale(${1 + clash * 2})`}} />
      <Big text="PERDEBATAN YANG PANJANG" at={cs(30)} y={1210} size={64} color={C.cream} />
      <Flash at={cs(22) + 6} color={C.orange} />
      <Burst at={cs(22) + 6} x={W / 2} y={760} n={26} color={C.orange} power={460} />
    </SceneWrap>
  );
};

/* ───────── 7a. KAIDAH MENUMPUK ───────── */
const TERMS = ['رَفْع', 'نَصْب', 'جَرّ', 'جَزْم', 'مُبْتَدَأ', 'خَبَر', 'فَاعِل', 'مَفْعُول', 'حَال', 'تَمْيِيز'];
export const Tumpuk: React.FC<{dur: number}> = ({dur}) => {
  const {f, ease, spr} = useAnim();
  const sink = ease(cs(33), 30);
  return (
    <SceneWrap dur={dur}>
      <Tag text="BERABAD-ABAD KEMUDIAN" at={cs(31)} />
      <Big text="KAIDAH MENUMPUK" at={cs(32)} y={290} size={96} color={C.gold} />
      <div style={{position: 'absolute', left: 0, top: 0, width: W, height: H, transform: `translateY(${sink * 40}px) rotate(${Math.sin(f / 5) * sink * 1.2}deg)`}}>
        {TERMS.map((t, i) => {
          const at = cs(31) + i * 9;
          const fall = interpolate(f, [at, at + 12], [-600, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          const bounce = f > at + 12 ? Math.max(0, Math.sin((f - at - 12) / 2.2) * 10 * Math.exp(-(f - at - 12) / 8)) : 0;
          const row = i;
          const w = 640 - (i % 3) * 60;
          const x = W / 2 - w / 2 + ((i * 53) % 90) - 45;
          return (
            <div key={i} style={{position: 'absolute', left: x, width: w, top: 1180 - row * 76 + fall - bounce, height: 68, borderRadius: 14, background: i % 2 ? 'linear-gradient(90deg,#1b2f66,#26408a)' : 'linear-gradient(90deg,#4a2b0c,#7a4616)', border: `2px solid ${C.gold}99`, opacity: f >= at ? 1 : 0, ...Arabic, textAlign: 'center', fontSize: 50, color: C.cream, lineHeight: '66px', boxShadow: '0 8px 22px #0008'}}>
              {t}
            </div>
          );
        })}
      </div>
      <Big text="BERAT DIHAFAL" at={cs(33)} y={400} size={84} color={C.red} glow={false} />
    </SceneWrap>
  );
};

/* ───────── 7b. PETA: ANDALUSIA → DAMASKUS ───────── */
export const Peta: React.FC<{dur: number}> = ({dur}) => {
  const {f, ease, spr} = useAnim();
  const A = {x: 150, y: 1000}, D = {x: 900, y: 760};
  const route = interpolate(f, [cs(34) + 14, cs(34) + 14 + 55], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const cxp = (A.x + D.x) / 2, cyp = Math.min(A.y, D.y) - 260;
  const pt = (t: number) => ({
    x: (1 - t) * (1 - t) * A.x + 2 * (1 - t) * t * cxp + t * t * D.x,
    y: (1 - t) * (1 - t) * A.y + 2 * (1 - t) * t * cyp + t * t * D.y,
  });
  const p = pt(route);
  return (
    <SceneWrap dur={dur}>
      <Tag text="ULAMA ANDALUSIA" at={cs(34)} />
      <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
        {Array.from({length: 11 * 9}, (_, k) => (
          <circle key={k} cx={60 + (k % 11) * 96} cy={420 + Math.floor(k / 11) * 120} r={3} fill={C.cream} opacity={0.14} />
        ))}
        <path d={`M ${A.x} ${A.y} Q ${cxp} ${cyp} ${D.x} ${D.y}`} stroke={C.orange} strokeWidth={7} fill="none" strokeDasharray="4 18" strokeLinecap="round" opacity={0.35} />
        <path d={`M ${A.x} ${A.y} Q ${cxp} ${cyp} ${D.x} ${D.y}`} stroke={C.gold} strokeWidth={9} fill="none" strokeDasharray={1400} strokeDashoffset={1400 * (1 - route)} style={{filter: `drop-shadow(0 0 14px ${C.orange})`}} />
        <circle cx={A.x} cy={A.y} r={22} fill={C.teal} style={{filter: `drop-shadow(0 0 16px ${C.teal})`}} opacity={ease(cs(34), 10)} />
        <circle cx={D.x} cy={D.y} r={22 + Math.sin(f / 5) * 3} fill={C.gold} style={{filter: `drop-shadow(0 0 20px ${C.orange})`}} opacity={ease(cs(34) + 20, 10)} />
        <circle cx={p.x} cy={p.y} r={14} fill="#fff" opacity={route > 0 && route < 1 ? 1 : 0} style={{filter: 'drop-shadow(0 0 14px #fff)'}} />
      </svg>
      <div style={{position: 'absolute', left: A.x - 130, top: A.y + 40, width: 260, textAlign: 'center', ...Latin, fontWeight: 700, fontSize: 40, color: C.teal, opacity: ease(cs(34), 10)}}>ANDALUSIA</div>
      <div style={{position: 'absolute', left: D.x - 150, top: D.y + 40, width: 260, textAlign: 'center', ...Latin, fontWeight: 700, fontSize: 40, color: C.gold, opacity: ease(cs(34) + 20, 10)}}>DAMASKUS</div>
      <Silhouette x={W / 2} y={560} scale={0.8} turban label="Ibnu Malik" opacity={ease(cs(35), 12)} />
      <Flash at={cs(35)} color={C.gold} />
      <Burst at={cs(35)} x={W / 2} y={620} n={22} power={340} />
    </SceneWrap>
  );
};
