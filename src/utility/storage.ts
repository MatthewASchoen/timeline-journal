import { useCallback, useEffect, useState } from 'react';
import { Timeline } from '../types/entry';
import { createTimelineCSV, parseTimeline } from './timeline-parser';

export const LS_KEYS = {
  TIMELINE: 'timeline',
  FILENAME: 'timeline-filename',
  ACCESSIBILITY: 'timeline-accessibility',
  NEEDS_SAVE: 'timeline-needs-save',
  INTRO_SEEN: 'timeline-intro-seen',
};

/** Returns a typed value from local storage and a setter to use as state. */
export const useStorageState = <T = string>(
  key: string,
  parse: (val: string) => T,
  unparse: (val: T) => string
): [T, (val: T) => void] => {
  const [value, setValue] = useState(() => {
    const str = localStorage.getItem(key) ?? '';
    return parse(str);
  });

  return [
    value as T,
    useCallback(
      (val: T) => {
        localStorage.setItem(key, unparse(val));
        setValue(val);
      },
      [key, unparse]
    ),
  ];
};

export const PARSERS = {
  STRING: (val: string) => val,
  BOOL: (val: string) => val === 'true',
};

export const UNPARSERS = {
  STRING: PARSERS.STRING,
  BOOL: (val: boolean) => val.toString(),
};

/** Returns a boolean value from local storage and a setter to use as state. */
export const useStoredBool = (key: string) =>
  useStorageState(key, PARSERS.BOOL, UNPARSERS.BOOL);

/** Returns a string value from local storage and a setter to use as state. */
export const useStoredString = (key: string) =>
  useStorageState(key, PARSERS.STRING, UNPARSERS.STRING);

/** Returns the user's timeline from local storage and a setter to use as state. */
export const useStoredTimeline = (
  onError?: (failures: unknown[]) => void
): [Timeline | undefined, (newTimeline: Timeline) => void] => {
  const [timeline, setTimeline] = useState<Timeline>();

  useEffect(() => {
    const csv = localStorage.getItem(LS_KEYS.TIMELINE);
    if (csv) {
      parseTimeline(csv, (timeline, failures) => {
        setTimeline(timeline);
        if (failures.length) onError?.(failures);
      });
    } else setTimeline([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [
    timeline,
    useCallback((timeline: Timeline) => {
      const csv = createTimelineCSV(timeline);
      localStorage.setItem(LS_KEYS.TIMELINE, csv);
      setTimeline(timeline);
    }, []),
  ];
};

// getStoredTimeline(storedTimeline => {
//   if (storedTimeline) setTimeline(storedTimeline);
// });

// useStorageState(LS_KEYS.TIMELINE);

/** Sets the timeline in local storage */
// export const setStoredTimeline = (timeline: Timeline): void => {
//   const csv = createTimelineCSV(timeline);
//   localStorage.setItem(LS_KEYS.TIMELINE, csv);
// };

// /** Retrieves and parses the user's timeline from local storage */
// export const getStoredTimeline = (
//   onComplete: (timeline: Timeline | null, failures: unknown[]) => void
// ): void => {
//   const csv = localStorage.getItem(LS_KEYS.TIMELINE);
//   if (csv) parseTimeline(csv, onComplete);
//   else onComplete(null, []);
// };
