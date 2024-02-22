import {
  When,
  hasDays,
  isAfter,
  isBefore,
  whenEqual,
  newWhen,
  whenContains,
  hasMonths,
  whenCompare,
  eitherWhenContains,
} from './when';
import { WhenRange } from './when-range';

export type Entry = {
  name: string;
  start: When;
  end: When | null;
  category: string;
  location: string;
  ongoing: boolean;
  anniversary: boolean;
  notes: string;
};

export type PartialEntry = Omit<Entry, 'start' | 'end'> &
  Partial<Pick<Entry, 'start' | 'end'>>;

export const newEntry = (details: Partial<Entry> = {}): PartialEntry => ({
  name: '',
  start: undefined,
  end: undefined,
  category: '',
  location: '',
  ongoing: false,
  anniversary: false,
  notes: '',
  ...details,
});

export type Timeline = Entry[];

export const isEntryValid = (entry: PartialEntry): entry is Entry =>
  entry.name.length > 0 && !!entry.start;
export const hasEnd = ({ end }: Entry): boolean => !!end;

// TODO: Move to entry-compare////////////////////////////////////////////////////////////////

export const getRange = ({ start, end, ongoing }: Entry): WhenRange => {
  // If no end, end at today for ongoing or the start otherwise
  let rangeEnd = end || (ongoing ? newWhen() : start);
  if (isBefore(rangeEnd, start)) rangeEnd = start;
  return { start, end: rangeEnd };
};

/** Returns true if when is the anniversary month or day of entryWhen */
export const IsAnniversaryOf = (when: When, entryWhen: When): boolean =>
  hasDays(entryWhen) &&
  when.year > entryWhen.year &&
  (!hasMonths(when) ||
    (when.month === entryWhen.month &&
      (!hasDays(when) || when.day === entryWhen.day)));

export enum Relation {
  NONE = 0,
  STARTS_IN = 1,
  ENDS_IN = 2,
  WITHIN = 3, // STARTS_IN | ENDS_IN
  ONGOING = 4,
  ANNIVERSARY = 8,
}

export const whenRelation = (value: Entry, when: When): Relation => {
  const { start, end, ongoing, anniversary } = value;

  let relation = Relation.NONE;

  if (whenContains(when, start)) {
    relation |= Relation.STARTS_IN;
    if (!end && !ongoing) relation |= Relation.ENDS_IN;
  }

  if (end && whenContains(when, end)) {
    relation |= Relation.ENDS_IN;
  }

  if (
    !relation &&
    isBefore(start, when) &&
    (ongoing || (end && isAfter(end, when)))
  ) {
    relation |= Relation.ONGOING;
  }

  if (anniversary && IsAnniversaryOf(when, start)) {
    relation |= Relation.ANNIVERSARY;
  }

  return relation;
};

// export const whenRelation = (value: Entry, when: When): Relation => {
//   const { start, end, ongoing, anniversary } = value;

//   if (hasDays(when)) {
//     if (whenEqual(start, when)) {
//       return ongoing || hasEnd(value) ? Relation.STARTS_IN : Relation.WITHIN;
//     }

//     if (anniversary && IsAnniversaryOf(when, start)) {
//       return Relation.ANNIVERSARY;
//     }

//     if (end && whenEqual(end, when)) {
//       return Relation.ENDS_IN;
//     }

//     if ((ongoing || (end && isAfter(end, when))) && isBefore(start, when)) {
//       return Relation.ONGOING;
//     }

//     return Relation.NONE;
//   }

//   if (whenContains(when, start)) {
//     if (ongoing || (end && isAfter(end, when))) return Relation.STARTS_IN;
//     return Relation.WITHIN;
//   }

//   // Only show anniversaries on months or days
//   if (
//     hasMonths(when) &&
//     anniversary &&
//     start.year < when.year &&
//     start.month === when.month
//   ) {
//     return Relation.ANNIVERSARY;
//   }

//   if (end && whenContains(when, end)) return Relation.ENDS_IN;

//   if ((ongoing || (end && isAfter(end, when))) && isBefore(start, when)) {
//     return Relation.ONGOING;
//   }

//   return Relation.NONE;
// };

export const entryCompare = (e1: Entry, e2: Entry): number => {
  const comp = whenCompare(e1.start, e2.start);
  if (comp !== 0) return comp;
  // Put ongoing entries second
  if (e1.ongoing !== e2.ongoing) return e1.ongoing ? 1 : -1;
  if (!e1.ongoing) {
    if (e1.end && e2.end) return whenCompare(e1.end, e2.end);
    // The start is the same, so put the one that ends second
    if (e1.end) return 1;
    if (e2.end) return -1;
  }
  return 0;
};

export const entriesConflict = (entry1: Entry, entry2: Entry): boolean => {
  if (entry1.name.toLowerCase() !== entry2.name.toLowerCase()) return false;
  // Sort the entries so e1's start will always be before or equal to e2's start
  const [e1, e2] = [entry1, entry2].sort(entryCompare);
  return (
    [e1.start, e1.end].some(w1 =>
      [e2.start, e2.end].some(w2 => w1 && w2 && eitherWhenContains(w1, w2))
    ) ||
    !!(
      e1.end &&
      ((isBefore(e1.start, e2.start) && isAfter(e1.end, e2.start)) ||
        (e2.end && isBefore(e1.start, e2.end) && isAfter(e1.end, e2.end)))
    )
  );
};

/** Returns true if the two given entries are completely identical */
export const entryEqual = (
  e1: Entry | PartialEntry,
  e2: Entry | PartialEntry
): boolean =>
  e1.name === e2.name &&
  e1.category === e2.category &&
  e1.location === e2.location &&
  e1.ongoing === e2.ongoing &&
  e1.anniversary === e2.anniversary &&
  e1.notes === e2.notes &&
  whenEqual(e1.start, e2.start) &&
  whenEqual(e1.end, e2.end);

export type EntryFilter = {
  when?: When;
  text: string;
  category: string;
  location: string;
  lists: Record<string, boolean>;
};

export const newFilter = (): EntryFilter => ({
  when: newWhen(),
  text: '',
  category: '',
  location: '',
  lists: {
    within: true,
    ongoing: true,
    anniversary: true,
    ascending: true,
  },
});

/** Returns true if the details of entry match the given filter */
export const entryDetailsMatch = (
  entry: Entry,
  { text, category, location }: EntryFilter
): boolean => {
  const lcText = text.toLowerCase();
  return (
    (!lcText ||
      [entry.name, entry.notes].some(n => n.toLowerCase().includes(lcText))) &&
    (!category || entry.category === category) &&
    (!location || entry.location === location)
  );
};

export const filterRelation = (
  entry: Entry,
  { when, ...details }: EntryFilter
): Relation => {
  if (!entryDetailsMatch(entry, details)) {
    return Relation.NONE;
  }
  if (when) return whenRelation(entry, when);
  // All time
  const relation = entry.ongoing ? Relation.ONGOING : Relation.WITHIN;
  return entry.anniversary ? relation | Relation.ANNIVERSARY : relation;
};

export type EntryRelation = [Entry, Relation];

/** Compares entries with a Relation. Entries marked as ending will use their end dates for comparison. */
export const entryRelationCompare = (
  [e1, r1]: EntryRelation,
  [e2, r2]: EntryRelation
): number => {
  const w1 =
    e1.end && (r1 & Relation.WITHIN) === Relation.ENDS_IN ? e1.end : e1.start;
  const w2 =
    e2.end && (r2 & Relation.WITHIN) === Relation.ENDS_IN ? e2.end : e2.start;
  return whenCompare(w1, w2) || entryCompare(e1, e2);
};
