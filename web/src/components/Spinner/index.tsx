import React from "react";
import "./style.css";

export const Spinner: React.FC = () => {
  return (
    <div className="lds-ring text-blue-600">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
