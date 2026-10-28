import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {loadFont as loadPoppins} from '@remotion/google-fonts/Poppins';
import {loadFont as loadAmiri} from '@remotion/google-fonts/Amiri';
import {AUDIO_SECONDS} from './timing';
import {FPS, SceneProvider, TOTAL_FRAMES, cs, sceneRange, sec} from './lib';
import {Background} from './components/Background';
import {Subtitle} from './components/Subtitle';
import {Foreground, GoldFrame, Grade, LightSweep} from './components/Ornament';
import {Hook, Era, Tugas, Harakat} from './scenes/Part1';
import {Ishabah, Kubu, Tumpuk, Peta} from './scenes/Part2';
import {Alfiyah, Konon, Wafat, Cta, Sources} from './scenes/Part3';

loadPoppins('normal', {weights: ['500', '600', '700', '800'], subsets: ['latin']});
loadAmiri('normal', {weights: ['400', '700'], subsets: ['arabic', 'latin']});

type SceneDef = {key: string; C: React.FC<{dur: number}>};
const ORDER: SceneDef[] = [
  {key: 'hook', C: Hook}, {key: 'era', C: Era}, {key: 'tugas', C: Tugas}, {key: 'harakat', C: Harakat},
  {key: 'ishabah', C: Ishabah}, {key: 'kubu', C: Kubu}, {key: 'tumpuk', C: Tumpuk}, {key: 'peta', C: Peta},
  {key: 'alfiyah', C: Alfiyah}, {key: 'konon', C: Konon}, {key: 'wafat', C: Wafat}, {key: 'cta', C: Cta},
];

/* ── Efek suara: [frame, berkas, volume] ── */
const S = (f: number, file: string, vol: number): [number, string, number] => [f, file, vol];
const sfx: [number, string, number][] = [
  S(0, 'scratch', 0.35), S(cs(1), 'impact', 0.85), S(cs(1) + 3, 'chime', 0.3),
  // era
  S(cs(3) - 20, 'riser', 0.3), S(cs(5), 'impact', 0.5),
  ...Array.from({length: 18}, (_, i) => S(cs(7) + i * 5, 'tick', 0.3)),
  // tugas
  S(cs(8) + 26, 'whoosh', 0.35), S(cs(9), 'chime', 0.4),
  // harakat
  S(cs(11) + 18, 'impact', 0.55), S(cs(11) + 18, 'chime', 0.45),
  ...Array.from({length: 6}, (_, i) => S(cs(13) + i * 6, 'tick', 0.45)),
  // ishabah
  S(cs(15) + 2, 'impact', 0.55), S(cs(16) + 6, 'whoosh', 0.3), S(cs(17), 'whoosh', 0.3), S(cs(19) + 20, 'chime', 0.4),
  // kubu
  S(cs(22) + 4, 'impact', 0.9), S(cs(24), 'whoosh', 0.3), S(cs(26), 'whoosh', 0.3), S(cs(28), 'riser', 0.3),
  // tumpuk
  ...Array.from({length: 10}, (_, i) => S(cs(31) + i * 9 + 12, 'tick', 0.5)), S(cs(33), 'impact', 0.5),
  // peta
  S(cs(34) + 14, 'whoosh', 0.35), S(cs(35), 'chime', 0.45),
  // alfiyah
  ...Array.from({length: 10}, (_, i) => S(cs(38) + i * 4, 'tick', 0.3)),
  S(cs(39), 'impact', 0.7), S(cs(40), 'whoosh', 0.4),
  ...Array.from({length: 6}, (_, i) => S(cs(40) + 8 + i * 4, 'tick', 0.3)),
  S(cs(42), 'impact', 0.8), S(cs(42), 'chime', 0.45),
  // konon
  S(cs(46), 'impact', 0.6), S(cs(47), 'riser', 0.25), S(cs(48), 'scratch', 0.5), S(cs(49), 'chime', 0.45), S(cs(50), 'impact', 0.7),
  // wafat
  S(cs(53), 'impact', 0.8), S(cs(54), 'whoosh', 0.3),
  // cta
  S(cs(56), 'chime', 0.5), S(cs(57), 'whoosh', 0.4),
];
// whoosh di tiap pergantian adegan
const sceneWhoosh: [number, string, number][] = ORDER.slice(1).map((s) => S(sceneRange(s.key).from - 4, 'whoosh', 0.3));

export const Video: React.FC = () => {
  const frame = useCurrentFrame();
  const kon = sceneRange('konon');
  const warm = interpolate(frame, [cs(47), cs(47) + 36, kon.from + kon.dur - 10, kon.from + kon.dur + 10], [0, 0.9, 0.9, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const audioEnd = sec(AUDIO_SECONDS);
  const src = sceneRange('cta');
  const srcFrom = audioEnd;
  const bgmVol = (f: number) => interpolate(f, [0, 60, TOTAL_FRAMES - 70, TOTAL_FRAMES], [0, 0.09, 0.09, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <SceneProvider start={0}>
        <Background warm={warm} />
      </SceneProvider>

      <AbsoluteFill style={{transform: `translate(${Math.sin(frame / 75) * 9}px, ${Math.cos(frame / 95) * 7}px) rotate(${Math.sin(frame / 150) * 0.22}deg) scale(1.02)`}}>
      {ORDER.map(({key, C: Scene}) => {
        const {from, dur} = sceneRange(key);
        return (
          <Sequence key={key} from={from} durationInFrames={dur}>
            <SceneProvider start={from}>
              <Scene dur={dur} />
            </SceneProvider>
          </Sequence>
        );
      })}
      <Sequence from={srcFrom} durationInFrames={TOTAL_FRAMES - srcFrom}>
        <SceneProvider start={srcFrom}>
          <Sources dur={TOTAL_FRAMES - srcFrom} />
        </SceneProvider>
      </Sequence>
      </AbsoluteFill>

      <SceneProvider start={0}>
        <Foreground />
        {[...ORDER.slice(1).map((s) => sceneRange(s.key).from - 4), srcFrom - 2].map((at, i) => (
          <LightSweep key={i} at={at} />
        ))}
        <Grade />
        <GoldFrame />
      </SceneProvider>

      <Subtitle />

      {/* audio */}
      <Audio src={staticFile('voiceover.wav')} volume={1} />
      <Audio src={staticFile('sfx/pad.mp3')} volume={bgmVol} />
      {[...sfx, ...sceneWhoosh, S(srcFrom - 2, 'whoosh', 0.3)].map(([f, file, vol], i) => (
        <Sequence key={i} from={Math.max(0, f)} durationInFrames={FPS * 3}>
          <Audio src={staticFile(`sfx/${file}.wav`)} volume={vol} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
