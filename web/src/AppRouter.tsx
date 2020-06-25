import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./Home";

export const AppRouter: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Route path="/">
        <Home />
      </Route>
    </BrowserRouter>
  );
};
