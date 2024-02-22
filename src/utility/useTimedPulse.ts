import { useEffect, useRef, useState } from 'react';

/** Returns a boolean that turns true after timeToOn MS, then turns false after timeToOff, then repeats */
export const useTimedPulse = (
  enabled: boolean,
  timeToOn = 3000,
  timeToOff = 300
): boolean => {
  const pulseTimeout = useRef<number>();
  const [pulseOn, setPulseOn] = useState(false);

  useEffect(() => {
    if (!enabled) {
      if (pulseOn) setPulseOn(false);
      return;
    }
    clearTimeout(pulseTimeout.current);
    pulseTimeout.current = window.setTimeout(
      () => setPulseOn(!pulseOn),
      !pulseOn ? timeToOn : timeToOff
    );

    return () => clearTimeout(pulseTimeout.current);
  }, [pulseOn, enabled, timeToOn, timeToOff]);

  return pulseOn;
};
