import React, {createContext, useContext} from 'react';
import {interpolate, random, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {CLAUSES, SCENES, AUDIO_SECONDS} from './timing';

export const FPS = 30;
export const W = 1080;
export const H = 1920;
export const TAIL_SECONDS = 3.5; // slide sumber setelah suara selesai
export const TOTAL_FRAMES = Math.ceil((AUDIO_SECONDS + TAIL_SECONDS) * FPS);

export const C = {
  bg: '#060b18',
  navy: '#0d1b3a',
  orange: '#ff9a3c',
  gold: '#ffcf6b',
  cream: '#f6ecd6',
  red: '#e5484d',
  teal: '#3fb6a8',
  dim: 'rgba(246,236,214,0.55)',
};

export const sec = (s: number) => Math.round(s * FPS);
/** frame awal klausa ke-i */
export const cs = (i: number) => sec(CLAUSES[i].s);
/** frame akhir klausa ke-i */
export const ce = (i: number) => sec(CLAUSES[i].e);
export const sceneRange = (key: string) => {
  const s = SCENES.find((x) => x.key === key)!;
  const from = sec(s.s);
  const to = key === 'cta' ? sec(AUDIO_SECONDS) : sec(s.e);
  return {from, dur: Math.max(1, to - from)};
};

const SceneCtx = createContext(0);
export const SceneProvider: React.FC<{start: number; children: React.ReactNode}> = ({start, children}) => (
  <SceneCtx.Provider value={start}>{children}</SceneCtx.Provider>
);

/** Frame absolut (dari awal video) di dalam adegan mana pun. */
export const useAnim = () => {
  const local = useCurrentFrame();
  const start = useContext(SceneCtx);
  const {fps} = useVideoConfig();
  const f = local + start;
  /** 0→1 dengan easing keluar, mulai di frame `at` */
  const ease = (at: number, dur = 14) =>
    interpolate(f, [at, at + dur], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    });
  const spr = (at: number, damping = 12, stiffness = 120) =>
    spring({frame: Math.max(0, f - at), fps, config: {damping, stiffness, mass: 0.8}});
  return {f, local, fps, ease, spr};
};

export const rnd = (seed: string | number) => random(seed);

export const Arabic: React.CSSProperties = {
  fontFamily: "'Amiri', serif",
  direction: 'rtl',
  unicodeBidi: 'isolate',
};
export const Latin: React.CSSProperties = {fontFamily: "'Poppins', sans-serif"};
