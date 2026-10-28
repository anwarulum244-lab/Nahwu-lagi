import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {Arabic, C, H, Latin, W, cs, rnd, sec, useAnim} from '../lib';
import {Big, Flash, SceneWrap, Small, Tag} from '../components/ui';
import {Silhouette} from '../components/Silhouette';
import {Burst, Streak} from '../components/Ornament';

const num = (n: number) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

/* ───────── 8. ALFIYAH ───────── */
export const Alfiyah: React.FC<{dur: number}> = ({dur}) => {
  const {f, ease, spr} = useAnim();
  const up = interpolate(f, [cs(38), cs(38) + 40], [0, 2750], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const squeeze = interpolate(f, [cs(40) + 8, cs(41) + 6], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const count = f < cs(40) + 8 ? up : 2750 - (2750 - 1002) * squeeze;
  const final = f >= cs(42);
  const heavy = f >= cs(39) && f < cs(40);
  const shake = heavy ? Math.sin(f * 2) * 8 : 0;
  const bookH = 420 - squeeze * 200;
  const bookW = 460 - squeeze * 80;
  return (
    <SceneWrap dur={dur}>
      <Tag text={final ? 'RINGKASAN BAIT' : 'KARYA BESAR'} at={cs(36)} />
      <Silhouette x={W / 2} y={470} scale={0.55} turban label="Ibnu Malik" opacity={ease(cs(36), 12) * (1 - ease(cs(40), 10) * 0.7)} />
      {/* kitab */}
      <div style={{position: 'absolute', left: W / 2 - bookW / 2 + shake, top: 760 + (420 - bookH) / 2, width: bookW, height: bookH, borderRadius: 18, background: final ? `linear-gradient(135deg, #6a4210, #2a1804)` : 'linear-gradient(135deg,#143a2f,#0a2019)', border: `4px solid ${C.gold}`, boxShadow: `0 0 ${final ? 90 : 50}px ${C.gold}88`, textAlign: 'center', overflow: 'hidden', opacity: ease(cs(37) - 6, 12)}}>
        <div style={{...Arabic, fontSize: final ? 150 : 82, color: C.gold, marginTop: final ? 26 : 38, lineHeight: 1.1, fontWeight: 700}}>{final ? 'الألفية' : 'الكافية الشافية'}</div>
        <div style={{...Latin, fontWeight: 800, fontSize: final ? 64 : 40, color: C.cream, marginTop: 14}}>{final ? 'ALFIYAH' : 'al-Kafiyah asy-Syafiyah'}</div>
      </div>
      {/* penghitung bait */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 1190, textAlign: 'center', ...Latin, opacity: ease(cs(38) - 4, 8)}}>
        <span style={{fontWeight: 800, fontSize: 130, color: f >= cs(39) && f < cs(41) ? C.red : C.gold, textShadow: `0 0 36px ${C.orange}`}}>{num(count)}</span>
        <span style={{fontWeight: 700, fontSize: 48, color: C.cream, marginLeft: 16}}>BAIT</span>
      </div>
      <Big text="TERLALU BERAT" at={cs(39)} y={310} size={100} color={C.red} glow={false} />
      <Big text="DIPERAS" at={cs(40)} y={330} size={100} color={C.orange} />
      <Big text="ITULAH ALFIYAH" at={cs(42)} y={310} size={96} color={C.gold} />
      <Flash at={cs(42)} color={C.gold} />
      <Burst at={cs(42)} x={W / 2} y={960} n={34} power={520} />
      <Streak at={cs(42)} y={960} w={1000} />
    </SceneWrap>
  );
};

/* ───────── 9. KONON ───────── */
export const Konon: React.FC<{dur: number}> = ({dur}) => {
  const {f, ease, spr} = useAnim();
  const candle = 0.85 + 0.15 * Math.sin(f / 3) * Math.sin(f / 7);
  const strike = ease(cs(48), 12);
  const lineA = ease(cs(45), 10) * (1 - ease(cs(48) + 14, 12));
  const lineB = ease(cs(49), 12);
  const stop = f >= cs(46) && f < cs(47);
  return (
    <SceneWrap dur={dur}>
      <Tag text="KONON" at={cs(43)} />
      {/* lilin */}
      <div style={{position: 'absolute', left: 160, top: 760, opacity: ease(cs(43), 12) * (1 - ease(cs(47) + 8, 20))}}>
        <div style={{width: 18, height: 90, background: C.cream, borderRadius: 4, marginLeft: 6}} />
        <div style={{position: 'absolute', left: 4, top: -50, width: 22, height: 50, borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%', background: `radial-gradient(circle at 50% 70%, #fff, ${C.gold} 45%, ${C.orange})`, transform: `scale(${candle})`, boxShadow: `0 0 ${60 * candle}px ${C.orange}, 0 0 160px ${C.orange}88`}} />
      </div>
      <Silhouette x={620} y={620} scale={0.8} turban label="Ibnu Malik" opacity={ease(cs(43), 14)} />
      {/* kertas bait */}
      <div style={{position: 'absolute', left: 90, right: 90, top: 880, height: 330, borderRadius: 22, background: 'linear-gradient(180deg,#f3e6c4,#dcc894)', boxShadow: `0 0 50px ${C.gold}66`, opacity: ease(cs(44), 12), transform: stop ? `translateX(${Math.sin(f * 3) * 6}px)` : undefined, padding: '36px 40px', ...Latin}}>
        <div style={{fontWeight: 700, fontSize: 30, color: '#6b5420', letterSpacing: 4}}>BAIT PEMBUKA</div>
        <div style={{position: 'relative', marginTop: 28, fontWeight: 700, fontSize: 40, color: '#4a3410', opacity: lineA}}>
          “…lebih unggul dari Alfiyah Ibnu Mu’thi”
          <div style={{position: 'absolute', left: 0, top: 24, height: 6, width: `${strike * 100}%`, background: C.red}} />
        </div>
        <div style={{marginTop: -50, fontWeight: 800, fontSize: 42, color: '#0f5a2a', opacity: lineB, transform: `translateY(${(1 - lineB) * 20}px)`}}>
          Pujian untuk Ibnu Mu’thi
        </div>
      </div>
      <Big text="TERHENTI" at={cs(46)} y={330} size={110} color={C.red} glow={false} slam />
      <Flash at={cs(47)} color={C.orange} />
      <Big text="ILMU TINGGI," at={cs(50)} y={1260} size={92} color={C.gold} />
      <Big text="HATI RENDAH" at={cs(51)} y={1360} size={92} color={C.cream} />
      <Burst at={cs(50)} x={W / 2} y={1300} n={24} power={380} />
      <Streak at={cs(50)} y={1250} w={900} />
    </SceneWrap>
  );
};

/* ───────── 10. WAFAT ───────── */
export const Wafat: React.FC<{dur: number}> = ({dur}) => {
  const {f, ease, spr} = useAnim();
  const line = interpolate(f, [cs(55), cs(55) + 40], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <SceneWrap dur={dur}>
      <Tag text="WAFAT" at={cs(52)} />
      <Big text="672 H" at={cs(53)} y={300} size={220} color={C.cream} />
      <Streak at={cs(53)} y={420} w={900} />
      <Small text="DAMASKUS" at={cs(52)} y={560} size={52} color={C.gold} />
      {/* gelombang lantunan */}
      <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0}}>
        {[0, 1, 2, 3, 4].map((k) => {
          const p = ((f - cs(54) - k * 16) % 80) / 80;
          const on = f >= cs(54) + k * 16;
          return <circle key={k} cx={W / 2} cy={880} r={40 + Math.max(0, p) * 360} fill="none" stroke={C.gold} strokeWidth={5} opacity={on ? (1 - Math.max(0, p)) * 0.8 : 0} />;
        })}
        <circle cx={W / 2} cy={880} r={44} fill={C.gold} opacity={ease(cs(54), 10)} style={{filter: `drop-shadow(0 0 24px ${C.orange})`}} />
        {/* linimasa 672 H → hari ini */}
        <line x1={140} y1={1230} x2={140 + 800 * line} y2={1230} stroke={C.orange} strokeWidth={8} strokeLinecap="round" style={{filter: `drop-shadow(0 0 12px ${C.orange})`}} />
        <circle cx={140} cy={1230} r={16} fill={C.gold} opacity={ease(cs(55), 8)} />
        <circle cx={940} cy={1230} r={16} fill={C.cream} opacity={line > 0.98 ? 1 : 0} />
      </svg>
      <div style={{position: 'absolute', left: 60, top: 1260, ...Latin, fontWeight: 600, fontSize: 32, color: C.gold, opacity: ease(cs(55), 8)}}>672 H</div>
      <div style={{position: 'absolute', right: 60, top: 1260, ...Latin, fontWeight: 600, fontSize: 32, color: C.cream, opacity: line > 0.98 ? 1 : 0}}>hari ini</div>
      <Big text="±7 ABAD KEMUDIAN" at={cs(55)} y={1000} size={72} color={C.gold} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 790, textAlign: 'center', ...Arabic, fontSize: 130, color: C.cream, opacity: ease(cs(54) + 6, 14) * 0.9, textShadow: `0 0 40px ${C.orange}`}}>الألفية</div>
    </SceneWrap>
  );
};

/* ───────── 11. AJAKAN (CTA) ───────── */
export const Cta: React.FC<{dur: number}> = ({dur}) => {
  const {f, ease, spr} = useAnim();
  return (
    <SceneWrap dur={dur} zoom={0.03}>
      <div style={{position: 'absolute', left: 120, top: 520, opacity: ease(cs(56), 10), transform: `scale(${0.5 + 0.5 * spr(cs(56), 10, 160)})`, textAlign: 'center', width: 360}}>
        <svg width={200} height={260} viewBox="0 0 24 24" style={{filter: `drop-shadow(0 0 20px ${C.gold})`}}>
          <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.5L5 21V4a1 1 0 0 1 1-1z" fill={C.gold} />
        </svg>
        <div style={{...Latin, fontWeight: 800, fontSize: 64, color: C.gold, marginTop: 10}}>SIMPAN</div>
      </div>
      <div style={{position: 'absolute', left: 600, top: 520, opacity: ease(cs(57), 10), transform: `translateX(${(1 - ease(cs(57), 14)) * -120}px) scale(${0.6 + 0.4 * spr(cs(57), 10, 160)})`, textAlign: 'center', width: 360}}>
        <svg width={200} height={260} viewBox="0 0 24 24" style={{filter: `drop-shadow(0 0 20px ${C.orange})`}}>
          <path d="M2 21l21-9L2 3v7l15 2-15 2z" fill={C.orange} />
        </svg>
        <div style={{...Latin, fontWeight: 800, fontSize: 64, color: C.orange, marginTop: 10}}>KIRIM</div>
      </div>
      <Big text="Teman sekelas nahwu-mu" at={cs(57) + 6} y={1010} size={62} color={C.cream} slam={false} />
      <Flash at={cs(56)} color={C.gold} />
    </SceneWrap>
  );
};

/* ───────── SUMBER (setelah suara selesai) ───────── */
export const Sources: React.FC<{dur: number}> = ({dur}) => {
  const {ease} = useAnim();
  const item = (at: number, title: string, sub: string) => (
    <div style={{opacity: ease(at, 12), transform: `translateY(${(1 - ease(at, 12)) * 24}px)`, marginBottom: 34}}>
      <div style={{...Latin, fontWeight: 700, fontSize: 40, color: C.gold}}>{title}</div>
      <div style={{...Latin, fontWeight: 500, fontSize: 32, color: C.cream, marginTop: 4}}>{sub}</div>
    </div>
  );
  return (
    <SceneWrap dur={dur} zoom={0.02}>
      <div style={{position: 'absolute', left: 90, right: 90, top: 330}}>
        <div style={{...Latin, fontWeight: 800, fontSize: 84, color: C.cream, marginBottom: 50, letterSpacing: 6}}>SUMBER</div>
        {item(6, 'Ibnu Hajar al-Asqalani', 'al-Ishabah fi Tamyiz as-Sahabah')}
        {item(16, 'Ibnu Malik', 'Alfiyah dan al-Kafiyah asy-Syafiyah')}
        {item(26, 'Catatan', 'Kisah bait pembuka Alfiyah dan Ibnu Mu’thi berstatus “konon”. Visual adalah ilustrasi, bukan potret asli.')}
      </div>
    </SceneWrap>
  );
};
