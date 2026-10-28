import React from 'react';
import {Composition} from 'remotion';
import {Video} from './Video';
import {FPS, H, TOTAL_FRAMES, W} from './lib';

export const Root: React.FC = () => (
  <Composition id="Nahwu" component={Video} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
);
