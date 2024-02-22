import { When, newWhen, whenAdd, whenToDayJS } from './when';

export const hasDays = ({ unit }: When): boolean => unit === 'day';
export const bothHaveDays = (w1: When, w2: When): boolean =>
  hasDays(w1) && hasDays(w2);
export const hasMonths = ({ unit }: When): boolean => unit !== 'year';
export const bothHaveMonths = (w1: When, w2: When): boolean =>
  hasMonths(w1) && hasMonths(w2);

export const whenEqual = (
  a: When | null | undefined,
  b: When | null | undefined
): boolean =>
  a && b
    ? a.unit === b.unit &&
      a.year === b.year &&
      a.month === b.month &&
      a.day === b.day
    : a === b;

/** Returns true if the given Whens have the same year */
export const sameYear = (a: When, b: When): boolean => a.year === b.year;
/** Returns true if the given Whens have the same year and month */
export const sameMonth = (a: When, b: When): boolean =>
  sameYear(a, b) && bothHaveMonths(a, b) && a.month === b.month;

/** Returns true if when1 is before when2 */
export const isBefore = (when1: When, when2: When): boolean => {
  if (when1.year !== when2.year) return when1.year < when2.year;
  if (!hasMonths(when1) || !hasMonths(when2)) return false;
  if (when1.month !== when2.month) return when1.month < when2.month;
  if (!hasDays(when1) || !hasDays(when2)) return false;
  return when1.day < when2.day;
};

/** Returns true if when1 is after when2 */
export const isAfter = (when1: When, when2: When): boolean => {
  if (when1.year !== when2.year) return when1.year > when2.year;
  if (!hasMonths(when1) || !hasMonths(when2)) return false;
  if (when1.month !== when2.month) return when1.month > when2.month;
  if (!hasDays(when1) || !hasDays(when2)) return false;
  return when1.day > when2.day;
};

export const whenCompare = (w1: When, w2: When): number => {
  if (w1.year !== w2.year) return w1.year - w2.year;

  if (hasMonths(w1) !== hasMonths(w2)) {
    // Put the one with months second
    return hasMonths(w1) ? 1 : -1;
  }
  if (hasMonths(w1) && w1.month !== w2.month) return w1.month - w2.month;

  if (hasDays(w1) !== hasDays(w2)) {
    // Put the one with days second
    return hasDays(w1) ? 1 : -1;
  }
  return hasDays(w1) ? w1.day - w2.day : 0;
};

export const timeBetween = (
  from: When,
  to: When,
  lookAfter?: boolean
): { years: number; months: number; days: number } => {
  if (isAfter(from, to)) {
    return lookAfter
      ? timeBetween(whenAdd(to, 1, 'day'), from)
      : { years: 0, months: 0, days: 0 };
  }

  let years = to.year - from.year;
  let between: When = whenAdd(from, years, 'year');
  if (isAfter(between, to)) between = whenAdd(from, --years, 'year');

  let months = 0;
  if (bothHaveMonths(from, to)) {
    months = monthsBetween(between, to);
    if (months) between = whenAdd(between, months, 'month');
    // months = to.month - from.month;
    // if (months <= 0) months += 12;
    // between = whenAdd(between, months, 'month');
    // if (isAfter(between, to))
    //   between = whenAdd(whenAdd(from, years, 'year'), --months, 'month');
  } else {
    // If either when is just a year, add a full year
    // ie: 2007 to July 2008 should be 2 years (as it covers 2 years)
    ++years;
  }
  console.log({ years });

  let days = 0;
  if (bothHaveDays(from, to)) {
    days = daysBetween(between, to);
    if (years === 0 && months === 0) ++days;
  }

  while (months >= 12) {
    ++years;
    months -= 12;
  }

  // if (from.unit === to.unit) {
  //   // If the unit's the same and it's the only one with data, add 1 to be inclusive of both
  //   // Ex: 2010 to 2011 should be 2 years,
  //   // January to March should be 3 months,
  //   // and the 1st to the 5th should be 5 days
  //   switch (from.unit) {
  //     case 'year':
  //       ++years;
  //       break;
  //     case 'month':
  //       if (years === 0) ++months;
  //       break;
  //     case 'day':
  //       if (years === 0 && months === 0) ++days;
  //       break;
  //   }
  // }

  return { years, months, days };
};

/** Returns a string representation of the amount of time between two whens,
 * expressed in comma-separated counts of years, months, and days  */
export const timeBetweenString = (
  from: When,
  to: When,
  lookAfter?: boolean
): string => {
  const { years, months, days } = timeBetween(from, to, lookAfter);
  console.log({ years, months, days });
  const vals: string[] = [];
  if (years > 0) vals.push(`${years} year${years !== 1 ? 's' : ''}`);
  if (months > 0) vals.push(`${months} month${months !== 1 ? 's' : ''}`);
  if (days > 0) vals.push(`${days} day${days !== 1 ? 's' : ''}`);
  return vals.join(', ');
};

export const monthsBetween = (from: When, to: When): number => {
  if (isAfter(from, to)) return monthsBetween(to, from);
  if (bothHaveDays(from, to)) {
    // Both are full dates, so easy check
    return whenToDayJS(to).diff(whenToDayJS(from), 'months');
  }

  if (from.year === to.year) {
    // If one when is just a year and it encompasses the other, it's 12 months
    return bothHaveMonths(from, to) ? to.month - from.month + 1 : 12;
  }

  const yearsBetween = to.year - from.year - 1;
  return (
    (hasMonths(from) ? 13 - from.month : 12) +
    (hasMonths(to) ? to.month : 12) +
    yearsBetween * 12
  );
};

// {
//   if (!hasMonths(from) || !hasMonths(to)) return (to.year - from.year + 1) * 12;
//   let months = to.month + (to.year - from.year) * 12 - from.month;
//   if (
//     hasDays(from) &&
//     hasDays(to) &&
//     from.month === to.month &&
//     from.day < to.day
//   )
//     --months;
//   return months;
// };

export const daysBetween = (from: When, to: When): number =>
  whenToDayJS(to).diff(whenToDayJS(from), 'days');

/** Returns how many anniversaries there have been from then to now */
export const anniversariesSince = (
  then: When,
  now: When = newWhen()
): number => {
  if (!hasDays(then) || !hasDays(now) || then.year >= now.year) return 0;
  const years = now.year - then.year;
  return isAfter(whenAdd(then, years, 'year'), now) ? years - 1 : years;
};

/** Returns true if when contains or is the same as entryWhen */
export const whenContains = (when: When, entryWhen: When): boolean =>
  when.year === entryWhen.year &&
  (!hasMonths(when) || when.month === entryWhen.month) &&
  (!hasDays(when) || when.day === entryWhen.day);

/** Returns true if when1 contains when2 or vice versa */
export const eitherWhenContains = (when1: When, when2: When): boolean =>
  whenContains(when1, when2) || whenContains(when2, when1);
