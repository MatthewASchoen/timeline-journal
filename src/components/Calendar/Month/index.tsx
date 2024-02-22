import {
  When,
  hasDays,
  hasMonths,
  monthDetails,
  newWhen,
  sameMonth,
  whenString,
} from '../../../types/when';
import { DayRangeHighlight } from '../../../types/when-range';
import { confirmKeys } from '../../../ui/keys';
import * as S from './styled';

export type CalendarMonthProps = {
  id: string;
  value: When;
  selected?: When[];
  onClick?: (when: When) => void;
  onHover?: (when: When | undefined) => void;
  scale?: number;
  highlights?: DayRangeHighlight[];
  defaultHighlightColor?: string;
  monthSelected?: boolean;
  tooltipPrefix?: string;
};

export const CalendarMonth = ({
  id,
  value,
  selected,
  onClick,
  onHover,
  scale,
  highlights,
  defaultHighlightColor = S.boxDefaultHighlightColor,
  monthSelected,
  tooltipPrefix,
}: CalendarMonthProps): JSX.Element => {
  if (!hasMonths(value)) {
    return (
      <S.YearBox scale={scale}>
        <S.BoxText>{value.year}</S.BoxText>
      </S.YearBox>
    );
  }

  // let highlightMin = 0;
  // let highlightMax = 0;
  // let highlightColor: string | undefined = defaultHighlightColor;

  let poppedDay = hasDays(value) ? value.day : 0;
  selected?.some(when => {
    if (hasDays(when) && sameMonth(when, value)) {
      if (poppedDay) {
        poppedDay = 0;
        // Break out of the loop if we've found a second value in this
        // month (only pop at most one date open at a time per month)
        return true;
      }
      poppedDay = when.day;
    }
    return false;
  });
  // if (highlight) {
  //   const { start, end, color } = highlight;
  //   highlightColor = color;
  //   const thisMonth = newWhen(value.year, value.month);

  //   const startsInMonth = hasDays(start) && sameMonth(value, start);
  //   if (startsInMonth) highlightMin = start.day;
  //   else
  //     highlightMin =
  //       isBefore(start, thisMonth) ||
  //       (start.year === thisMonth.year &&
  //         (!hasMonths(start) || start.month === thisMonth.month))
  //         ? // If start is before or contains this month, highlight from the start
  //           1
  //         : 32;

  //   const endsInMonth = hasDays(end) && sameMonth(value, end);
  //   if (endsInMonth) highlightMax = end.day;
  //   else
  //     highlightMax =
  //       isAfter(end, thisMonth) ||
  //       (end.year === thisMonth.year &&
  //         (!hasMonths(end) || end.month === thisMonth.month))
  //         ? // If end is after or contains this month, highlight to the end
  //           31
  //         : 0;

  //   // If no day is specified and exactly one of the two dates in highlight is in the month, pop it
  //   if (!popped.length) {
  //     if (startsInMonth && (!endsInMonth || whenEqual(start, end))) {
  //       popped.push(start.day);
  //     } else if (!startsInMonth && endsInMonth) {
  //       popped.push(end.day);
  //     }
  //   }
  // }
  //console.log({ month: value.month, popDay, highlightMin, highlightMax });

  const { name, startDay, daysInMonth } = monthDetails(value);

  const getHLColor = highlights?.length
    ? (day: number) => {
        const hl = highlights.find(({ min, max }) => min <= day && day <= max);
        return hl && (hl.color || defaultHighlightColor);
      }
    : undefined;

  const monthText = `${name} ${value.year}`;

  return (
    <S.MonthBox
      key={`${id}-${value.month}/${value.year}`}
      scale={scale}
      startDay={startDay}
      daysInMonth={daysInMonth}
    >
      <S.BoxText
        onClick={onClick && (() => onClick(newWhen(value.year, value.month)))}
        onKeyDown={
          onClick &&
          (({ key }) =>
            confirmKeys.includes(key) &&
            onClick(newWhen(value.year, value.month)))
        }
        onMouseOver={
          onHover && (() => onHover(newWhen(value.year, value.month)))
        }
        onMouseLeave={onHover && (() => onHover(undefined))}
        selected={monthSelected}
        clickable={!!onClick}
        tabIndex={onClick && 0}
        title={tooltipPrefix && `${tooltipPrefix} ${monthText}`}
      >
        {monthText}
      </S.BoxText>
      <S.DateGrid>
        {!!startDay && <S.Space />}
        {Array.from({ length: daysInMonth }, (_, d) => {
          const day = d + 1;
          const key = `${id}-${value.month}/${day}/${value.year}`;
          const hl = getHLColor?.(day);
          const w = newWhen(value.year, value.month, day);
          const dateText = whenString(w, undefined, {
            dayOfWeek: (startDay + d) % 7,
          });

          return (
            <S.Box
              key={key}
              open={poppedDay === day}
              clickable={!!onClick}
              highlight={!!hl}
              highlightColor={hl}
              onClick={onClick && (() => onClick(w))}
              onMouseOver={onHover && (() => onHover(w))}
              onMouseLeave={onHover && (() => onHover(undefined))}
              title={tooltipPrefix ? `${tooltipPrefix} ${dateText}` : dateText}
            >
              {day}
            </S.Box>
          );
          // return day !== popDay ? (
          //   <S.Box key={key} highlight={hl} />
          // ) : (
          //   <S.DateBox key={`date-${key}`} highlight={hl}>
          //     {day}
          //   </S.DateBox>
          // );
        })}
        {!!((startDay + daysInMonth) % 7) && <S.Space />}
      </S.DateGrid>
    </S.MonthBox>
  );
};
