import { useState } from 'react'
import { randomNum } from '../utils'

import './moving-bg.scss'

const genBackgroundCss = (color0: number) => {
  const angles = randomNum(0, 360)

  const color1 = (color0 + 120) % 360
  const color2 = (color1 + 120) % 360

  return `linear-gradient(${angles}deg, hsl(${color0},100%,70%) 0%, hsl(${color1},100%,70%) 50%, hsl(${color2},100%,70%) 100%)`
}

export const useRainbowBackground = () => {
  const [color] = useState<number>(randomNum(0, 360))
  const [cssRules] = useState(
    {
      background: genBackgroundCss(color)
    }
  )
  return cssRules
}
