import React, { CSSProperties } from 'react';
import { useRainbowBackground } from '../hooks/useRainbowBackground';

import './LoadingSpinner.scss';
import { randomNum } from '../utils';

const mixBlendModes: CSSProperties['mixBlendMode'][] = [
  'color',
  'color-burn',
  'color-dodge',
  'darken',
  'difference',
  'exclusion',
  'hard-light',
  'hue',
  'lighten',
  'luminosity',
  'multiply',
  'normal',
  'overlay',
  'saturation',
  'screen',
  'soft-light',
];

export const LoadingSpinner = () => {
  const colors = useRainbowBackground()

  const mixBlendMode = mixBlendModes[
    randomNum(0, mixBlendModes.length + 1)
  ]

  return (
    <div
      className='w-screen h-screen overflow-hidden absolute z-10 top-0 left-0'
      style={{mixBlendMode}}
    >
      <div
        className='spinme absolute z-20 top-0 left-0'
        style={{...colors}}
      ></div>
      <div className='w-screen h-screen absolute z-20 top-0 left-0 flex justify-center items-center'>
        <h1 className='zoomme text-6xl'>Loading</h1>
      </div>
    </div>
  )
}
