import React, { useEffect } from "react";

export const useKey = (
  key: React.KeyboardEvent["key"],
  onThatKeyDown: () => void
) => {
  useEffect(() => {
    const handleKeydown = (e: any) => {
      if (e.key === key) {
        onThatKeyDown();
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });
};
