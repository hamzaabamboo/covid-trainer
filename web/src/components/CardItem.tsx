import React from "react";

export const CardItem: React.FC = ({ children }) => {
  return (
    <div className="w-full bg-white rounded-md shadow-md p-4 mb-4">
      {children}
    </div>
  );
};
