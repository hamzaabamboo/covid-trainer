import { useEffect } from "react";
export const useLog = (...values: any[]) => {
  // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => console.log(...values), [...values]);
};
