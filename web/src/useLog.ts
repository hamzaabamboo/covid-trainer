import { useEffect } from "react";

export const useLog = (...values: any[]) => {
  useEffect(() => console.log(...values), [...values]);
};
