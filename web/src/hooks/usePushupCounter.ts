import { useState, useRef, useEffect } from "react";
import { useLog } from "../hooks/useLog";

// const _sensor = new LinearAccelerationSensor({
//   frequency: 30,
// });

export const usePushupCounter = (active: boolean = true) => {
  const [count, setCount] = useState(0);
  const [currentReading, setCurrentReading] = useState(0);
  const [currentDirection, setCurrentDirection] = useState<-1 | 1>(-1);
  const [sensor] = useState(
    () =>
      new LinearAccelerationSensor({
        frequency: 60,
      })
  );
  const mva = useRef<number[]>([]);
  const debouncing = useRef(false);

  const handleData = () => {
    const reading = sensor.z;
    if (reading && Math.abs(reading) > 2 && !debouncing.current) {
      debouncing.current = true;
      const timeout = setTimeout(() => {
        debouncing.current = false;
      }, 100);
      if (mva.current.length > 2) {
        mva.current.pop();
      }
      mva.current.unshift(reading);
      if (
        Math.abs(mva.current.reduce((p, c) => p + c / mva.current.length, 0)) >
        2
      ) {
        setCurrentReading(
          mva.current.reduce((p, c) => p + c / mva.current.length, 0)
        );
      }

      return () => {
        clearTimeout(timeout);
      };
    }
  };

  useEffect(() => {
    if (
      (currentDirection > 0 && currentReading > 0) ||
      (currentReading < 0 && currentDirection < 0)
    ) {
      setCurrentDirection((d) => (d * -1) as 1 | -1);
      if (currentDirection < 0) {
        setCount((count) => count + 1);
        navigator.vibrate(250);
      }
    }
  }, [currentReading]);

  useEffect(() => {
    if (active) {
      sensor.addEventListener("reading", handleData);
      sensor.start();
      setCount(0);
      return () => {
        sensor.removeEventListener("reading", handleData);
        sensor.stop();
      };
    }
  }, [sensor, active]);

  useLog(currentReading, count);
  return [count, currentDirection];
};
