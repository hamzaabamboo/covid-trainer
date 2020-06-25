import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { Navigation } from "./components/Navigation";

import "./styles.scss";
import { Profile } from "./Profile";

const randomNum = (min: number, max: number) =>
  Math.round(Math.random() * (max - min) + min);

const magicno = randomNum(0, 360);
const colors = {
  background: `linear-gradient(${randomNum(
    0,
    360
  )}deg, hsl(${magicno},100%,70%) 0%, hsl(${magicno + 120},100%,70%) 50%, hsl(${
    (magicno + 240) % 360
  },100%,70%) 100%)`,
};

export const AppRouter: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <div
        className="flex moving-background"
        style={{
          marginBottom: "64px",
          height: "calc(100vh - 64px)",
          ...colors,
          mixBlendMode: "difference",
        }}
      >
        <div className="flex-grow overflow-scroll">
          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <Navigation />
      </div>
    </BrowserRouter>
  );
};
