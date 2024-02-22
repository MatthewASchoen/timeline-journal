import { newWhen, whenEqual } from '../../../types/when';
import {
  RangeHighlight,
  getDayRangeHighlights,
} from '../../../types/when-range';
import { CalendarMonth, CalendarMonthProps } from '../Month';
import * as S from './styled';

const MONTH_NUMBERS = Array.from({ length: 12 }, (_, m) => m + 1);

export interface CalendarYearProps
  extends Omit<CalendarMonthProps, 'value' | 'monthSelected' | 'highlights'> {
  year: number;
  highlights?: RangeHighlight[];
}

export const CalendarYear = ({
  year,
  scale,
  highlights,
  ...calProps
}: CalendarYearProps): JSX.Element => (
  <S.FullYear scale={scale}>
    {MONTH_NUMBERS.map(month => {
      const value = newWhen(year, month);
      return (
        <CalendarMonth
          value={value}
          monthSelected={calProps.selected?.some(when =>
            whenEqual(when, value)
          )}
          highlights={getDayRangeHighlights(value, highlights)}
          {...calProps}
        />
      );
    })}
  </S.FullYear>
);
