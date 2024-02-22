import Papa from 'papaparse';
import { Entry, Timeline, entryCompare } from '../types/entry';
import {
  When,
  isAfter,
  whenEqual,
  parseWhen,
  whenCSVString,
} from '../types/when';

export const parseTimeline = (
  csv: File | string,
  onComplete: (timeline: Timeline, failures: unknown[]) => void
): void => {
  const timeline: Timeline = [];
  const failures: unknown[] = [];
  Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase(),
    step: ({ data }) => {
      const row = parseEntry(data as Record<string, string>);
      if (row) timeline.push(row);
      else failures.push(data);
    },
    complete: () => {
      timeline.sort(entryCompare);
      onComplete(timeline, failures);
    },
  });
};

const NAME_HEADERS = ['name', 'entry', 'event'];
const START_HEADER = 'start';
const END_HEADER = 'end';
const CATEGORY_HEADER = 'category';
const WHERE_HEADER = 'where';
const ANNIVERSARY_HEADER = 'anniversary';
const NOTES_HEADER = 'notes';
// const REQUIRED_HEADERS = [NAME_HEADER, START_HEADER];
// const ALL_HEADERS = [
//   NAME_HEADER,
//   START_HEADER,
//   END_HEADER,
//   CATEGORY_HEADER,
//   WHERE_HEADER,
//   ANNIVERSARY_HEADER,
//   NOTES_HEADER,
// ];

const getValue = (
  csv: Record<string, unknown>,
  ...headers: string[]
): string | undefined => {
  const header = headers.find(header => header in csv);
  return header && (csv[header] as string)?.trim();
};

const ONGOING_END_VALUES = ['-', 'x'];
const YES_VALUES = ['x', 'y', 'yes', 'true'];

const parseEntry = (csv: Record<string, unknown>): Entry | null => {
  // Name
  const name = getValue(csv, ...NAME_HEADERS);
  if (!name) {
    console.error("Failed to parse entry: Entry name can't be empty", csv);
    return null;
  }

  // Start
  const startString = getValue(csv, START_HEADER);
  const start: When | null = parseWhen(startString || '');
  if (!start) {
    console.error(`Failed to parse start date for ${name}: "${startString}"`);
    return null;
  }

  // End
  const endString = getValue(csv, END_HEADER);
  let end: When | null = null;
  let ongoing = false;
  if (endString) {
    // Ongoing
    if (ONGOING_END_VALUES.includes(endString)) ongoing = true;
    else {
      end = parseWhen(endString);
      if (end === null) {
        console.error(`Failed to parse end date for ${name}: "${endString}"`);
        return null;
      }
      if (isAfter(start, end)) {
        console.error(
          `Invalid date range for ${name}: ${startString} to ${endString}`
        );
        return null;
      }
      if (whenEqual(start, end)) end = null;
    }
  }

  // Category / Location / Notes
  const category = getValue(csv, CATEGORY_HEADER) || '';
  const location = getValue(csv, WHERE_HEADER) || '';
  const notes = getValue(csv, NOTES_HEADER) || '';
  // Anniversary
  const anniversary = YES_VALUES.includes(
    getValue(csv, ANNIVERSARY_HEADER) || ''
  );

  return { name, start, end, category, location, ongoing, anniversary, notes };
};

export const createTimelineCSV = (timeline: Timeline): string =>
  Papa.unparse([
    [
      NAME_HEADERS[0],
      START_HEADER,
      END_HEADER,
      CATEGORY_HEADER,
      WHERE_HEADER,
      ANNIVERSARY_HEADER,
      NOTES_HEADER,
    ],
    ...timeline.map(entry => [
      entry.name,
      whenCSVString(entry.start),
      entry.ongoing
        ? ONGOING_END_VALUES[0]
        : entry.end
        ? whenCSVString(entry.end)
        : '',
      entry.category,
      entry.location,
      entry.anniversary ? YES_VALUES[0] : '',
      entry.notes,
    ]),
  ]);
