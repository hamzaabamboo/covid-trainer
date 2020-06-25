import React from "react";
import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div
      className="w-screen flex flex-row bottom-0 fixed bg-white shadow-lg"
      style={{ height: "64px" }}
    >
      <div className="w-full flex justify-center items-center">
        <Link to="/">Home</Link>
      </div>
      <div className="w-full flex justify-center items-center">
        <Link to="/list">Leaderboard</Link>
      </div>
      <div className="w-full flex justify-center items-center">
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}
