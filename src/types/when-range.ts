import { When, hasDays, hasMonths, isAfter, isBefore, sameMonth, sameYear } from './when';


export type WhenRange = { start: When; end: When };
export type RangeHighlight = WhenRange & { color?: string };
export type DayRangeHighlight = { min: number; max: number; color?: string };

export const getDayRangeHighlights = (
  thisMonth: When,
  highlights: RangeHighlight[] | undefined
): DayRangeHighlight[] | undefined => {
  if (!highlights) return highlights;
  const newHighlights: DayRangeHighlight[] = [];

  highlights.forEach(({ start, end, color }) => {
    if (isBefore(end, thisMonth) || isAfter(start, thisMonth)) return;

    let min: number;
    let max: number;

    const startsInMonth = hasDays(start) && sameMonth(thisMonth, start);
    if (startsInMonth) min = start.day;
    else
      min =
        isBefore(start, thisMonth) ||
        (sameYear(start, thisMonth) &&
          (!hasMonths(start) || start.month === thisMonth.month))
          ? // If start is before or contains this month, highlight from the start
            1
          : 32;

    const endsInMonth = hasDays(end) && sameMonth(thisMonth, end);
    if (endsInMonth) max = end.day;
    else
      max =
        isAfter(end, thisMonth) ||
        (end.year === thisMonth.year &&
          (!hasMonths(end) || end.month === thisMonth.month))
          ? // If end is after or contains this month, highlight to the end
            31
          : 0;
    if (min <= max) newHighlights.push({ min, max, color });
  });

  return newHighlights.length ? newHighlights : undefined;
};