import React, { CSSProperties } from "react";
import { useRainbowBackground } from "../useRainbowBackground";

import "./LoadingSpinner.scss";
import { randomNum } from "../utils";

const blendmodes: CSSProperties["mixBlendMode"][] = [
  "color",
  "color-burn",
  "color-dodge",
  "darken",
  "difference",
  "exclusion",
  "hard-light",
  "hue",
  "lighten",
  "luminosity",
  "multiply",
  "normal",
  "overlay",
  "saturation",
  "screen",
  "soft-light",
];

export const LoadingSpinner = () => {
  const colors = useRainbowBackground();
  return (
    <div
      className="w-screen h-screen overflow-hidden absolute z-10 top-0 left-0"
      style={{
        mixBlendMode: blendmodes[randomNum(0, blendmodes.length + 1)],
      }}
    >
      <div
        className="spinme absolute z-20 top-0 left-0"
        style={{
          ...colors,
        }}
      ></div>
      <div className="w-screen h-screen absolute z-20 top-0 left-0 flex justify-center items-center">
        <h1 className="zoomme text-6xl">Loading</h1>
      </div>
    </div>
  );
};
