import { useRef } from "react";
import { randomNum } from "./utils";

import "./moving-bg.scss";

export const useRainbowBackground = () => {
  const magicno = useRef<number>(randomNum(0, 360));
  const colors = useRef({
    background: `linear-gradient(${randomNum(0, 360)}deg, hsl(${
      magicno.current
    },100%,70%) 0%, hsl(${magicno.current + 120},100%,70%) 50%, hsl(${
      (magicno.current + 240) % 360
    },100%,70%) 100%)`,
  });

  return colors.current;
};
