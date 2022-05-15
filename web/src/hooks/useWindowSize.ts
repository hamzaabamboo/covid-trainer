import { useState, useEffect } from "react";

export const useWindowsSize = () => {
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleEvent = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleEvent);

    return () => {
      window.removeEventListener("resize", handleEvent);
    };
  }, []);

  return size;
};
