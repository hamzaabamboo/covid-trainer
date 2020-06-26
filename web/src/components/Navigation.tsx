import React from "react";
import { CustomLink } from "./CustomLink";

export function Navigation() {
  return (
    <div
      className="w-screen flex flex-row bottom-0 fixed bg-white shadow-lg"
      style={{ height: "64px" }}
    >
      <CustomLink to="/" className="w-full flex justify-center items-center">
        Home
      </CustomLink>
      <CustomLink
        to="/leaderboard"
        className="w-full flex justify-center items-center"
      >
        Leaderboard
      </CustomLink>
      <CustomLink
        to="/profile"
        className="w-full flex justify-center items-center"
      >
        Profile
      </CustomLink>
    </div>
  );
}
