import dayjs from 'dayjs';
import { hasMonths } from './when-compare';
export * from './when-compare';

export const MIN_YEAR = 1000;
export const MAX_YEAR = 9999;

export const MONTHS = [
  '',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const yearRegex = /^([1-9]\d{3})$/;
export const monthRegex = /^([a-zA-Z]+) (\d{4})$/;
export const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
export const fullDayRegex = /^([a-zA-Z]+) (\d{1,2}), (\d{4})$/;

export type WhenUnit = 'year' | 'month' | 'day';

export type When = {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  unit: WhenUnit;
};

export const dayJSToWhen = (date: dayjs.Dayjs, unit: WhenUnit): When => ({
  year: date.year(),
  month: date.month() + 1,
  day: date.date(),
  unit,
});

/** Returns a new When value with the given values, or
 * a value representing Today if none are specified. */
export const newWhen = (year?: number, month?: number, day?: number): When =>
  year
    ? {
        year,
        month: month ?? 1,
        day: day ?? 1,
        unit: day ? 'day' : month ? 'month' : 'year',
      }
    : dayJSToWhen(dayjs(), 'day');

export const monthName = (when: When): string =>
  MONTHS[hasMonths(when) ? when.month : 0];

export const getUnitValue = (when: When, unit: WhenUnit): number =>
  unit === 'year' ? when.year : unit === 'month' ? when.month : when.day;

export const getUnitDisplay = (when: When, unit: WhenUnit): string | number => {
  const value = getUnitValue(when, unit);
  return unit !== 'month' ? value : MONTHS[value];
};

export const whenToDayJS = ({ year, month, day }: When): dayjs.Dayjs =>
  dayjs(`${year}/${month ?? 1}/${day ?? 1}`);

export const whenAdd = (when: When, value: number, unit: WhenUnit): When =>
  dayJSToWhen(whenToDayJS(when).add(value, unit), when.unit);
export const whenSubtract = (when: When, value: number, unit: WhenUnit): When =>
  dayJSToWhen(whenToDayJS(when).subtract(value, unit), when.unit);

export const monthDetails = (
  when: When
): { name: string; startDay: number; daysInMonth: number } => {
  const date = whenToDayJS(when);
  return {
    name: monthName(when),
    startDay: date.startOf('month').day(),
    daysInMonth: date.daysInMonth(),
  };
};

export const isWhenValid = (when: When): boolean => {
  const { year, month, day } = when;
  return (
    year >= MIN_YEAR &&
    year <= MAX_YEAR &&
    (month === undefined || (month > 0 && month < 13)) &&
    (day === undefined ||
      (month !== undefined && day > 0 && day <= monthDetails(when).daysInMonth))
  );
};

export const parseWhen = (value: string): When | null => {
  let year = 0;
  let month: number | undefined;
  let day: number | undefined;
  let match = value.match(yearRegex);
  if (match) {
    // yyyy
    year = parseInt(match[1]);
  } else if ((match = value.match(monthRegex))) {
    // Month yyyy
    year = parseInt(match[2]);
    month = MONTHS.findIndex(m => m.toLowerCase() === match?.[1].toLowerCase());
  } else if ((match = value.match(dateRegex))) {
    // mm/dd/yyyy
    year = parseInt(match[3]);
    month = parseInt(match[1]);
    day = parseInt(match[2]);
  } else if ((match = value.match(fullDayRegex))) {
    // Month dd, yyyy
    year = parseInt(match[3]);
    month = MONTHS.findIndex(m => m.toLowerCase() === match?.[1].toLowerCase());
    day = parseInt(match[2]);
  }
  const when: When = newWhen(year, month, day);
  return isWhenValid(when) ? when : null;
};

export const whenString = (
  when: When,
  when2?: When | null,
  options: { dayOfWeek?: number; inOnFrom?: boolean } = {}
): string => {
  const { dayOfWeek, inOnFrom } = options;
  if (when2) {
    const ws1 = whenString(when, undefined, { ...options, inOnFrom: false });
    const ws2 = whenString(when2, undefined, { ...options, inOnFrom: false });
    return `${inOnFrom ? 'from ' : ''}${ws1} to ${ws2}`;
  }
  if (!isWhenValid(when)) return 'Invalid When';
  switch (when.unit) {
    case 'year':
      return inOnFrom ? `in ${when.year}` : when.year.toString();
    case 'month':
      return `${inOnFrom ? 'in ' : ''}${monthName(when)} ${when.year}`;
    case 'day':
      return `${inOnFrom ? 'on ' : ''}${
        dayOfWeek !== undefined ? `${DAYS_OF_WEEK[dayOfWeek]}, ` : ''
      }${monthName(when)} ${when.day}, ${when.year}`;
  }
};

export const whenCSVString = (when: When): string => {
  if (!isWhenValid(when)) return '';
  switch (when.unit) {
    case 'year':
      return when.year.toString();
    case 'month':
      return `${monthName(when)} ${when.year}`;
    case 'day':
      return `${when.month}/${when.day}/${when.year}`;
  }
};

/** Returns a string value for the given When to use for comparisons */
export const whenValue = (when: When | undefined | null): string =>
  `${when?.year}/${when?.month}/${when?.day}/${when?.unit}`;
