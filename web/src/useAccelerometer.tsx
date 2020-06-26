import { useState, useEffect } from "react";

/**
 * Use accelerometer censor
 * @param frequency : Frequency in hertz
 */
export const useAccelerometer = (frequency: number = 60) => {
  const [accel, setAccel] = useState<{ x: number; y: number; z: number }>({
    x: 0,
    y: 0,
    z: 0,
  });

  useEffect(() => {
    const sensor = new LinearAccelerationSensor({
      frequency: frequency,
    });

    const handleEvent = () => {
      setAccel({
        x: sensor.x || 0,
        y: sensor.y || 0,
        z: sensor.z || 0,
      });
    };

    sensor.addEventListener("reading", handleEvent);
    sensor.start();

    return () => {
      sensor.stop();
    };
  }, [frequency]);

  return accel;
};
