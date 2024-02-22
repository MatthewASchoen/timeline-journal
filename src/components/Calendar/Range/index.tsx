import {
  isAfter,
  monthsBetween,
  newWhen,
  whenAdd,
  whenEqual,
} from '../../../types/when';
import {
  RangeHighlight,
  getDayRangeHighlights,
} from '../../../types/when-range';
import WhenLink from '../../WhenLink';
import { CalendarMonth } from '../Month';
import { BoxText, YearBox } from '../Month/styled';
import { CalendarYear, CalendarYearProps } from '../Year';
import * as S from './styled';

// Scale for index + 1 adjacent months
const monthCountScale = [
  32, //1
  24, //2
  24, //3
  20, //4
];

export interface CalendarRangeProps
  extends Pick<CalendarYearProps, 'onClick' | 'defaultHighlightColor'> {
  id: string;
  highlight: RangeHighlight;
}

export const CalendarRange = ({
  id,
  highlight,
  ...rest
}: CalendarRangeProps): JSX.Element => {
  const { start, end, color: highlightColor } = highlight;
  const between = monthsBetween(start, end);
  console.log({ between });

  const calProps = {
    ...rest,
    selected: !whenEqual(start, end) ? [start, end] : [start],
  };

  const highlights: RangeHighlight[] = [highlight];

  if (between < 4) {
    const calendars: JSX.Element[] = [];
    for (
      let month = newWhen(start.year, start.month);
      !isAfter(month, end);
      month = whenAdd(month, 1, 'month')
    ) {
      calendars.push(
        <CalendarMonth
          key={`${id}-${month.month}/${month.year}`}
          id={id}
          value={month}
          scale={monthCountScale[between]}
          highlights={getDayRangeHighlights(month, highlights)}
          {...calProps}
        />
      );
    }

    return <S.RangeTimeline>{calendars}</S.RangeTimeline>;
  }

  const yearsApart = end.year - start.year;

  if (yearsApart < 1) {
    return (
      <S.RangeTimeline>
        <CalendarYear
          id={id}
          year={start.year}
          highlights={highlights}
          {...calProps}
        />
      </S.RangeTimeline>
    );
  }

  let middleContent: JSX.Element | undefined = undefined;
  if (yearsApart > 1) {
    const { onClick: setValue } = calProps;
    const firstYear = newWhen(start.year + 1);
    if (yearsApart > 2) {
      const lastYear = newWhen(end.year - 1);

      middleContent = (
        <>
          <S.HighlightLine highlightColor={highlightColor} />
          <YearBox>
            <BoxText>
              <WhenLink
                value={firstYear}
                onClick={setValue && (() => setValue(firstYear))}
              />
              {' - '}
              <WhenLink
                value={lastYear}
                onClick={setValue && (() => setValue(lastYear))}
              />
            </BoxText>
            <BoxText>({yearsApart - 1} years)</BoxText>
          </YearBox>
        </>
      );
    } else {
      middleContent = (
        <>
          <S.HighlightLine highlightColor={highlightColor} />
          <YearBox>
            <WhenLink
              value={firstYear}
              onClick={setValue && (() => setValue(firstYear))}
            />
          </YearBox>
        </>
      );
    }
  }

  const rangeScale = 14; //middleContent ? 5 : 6;
  return (
    <S.RangeTimeline scale={rangeScale}>
      <CalendarYear
        id={`${id}-start-year`}
        year={start.year}
        highlights={highlights}
        {...calProps}
      />
      {middleContent}
      <S.HighlightLine highlightColor={highlightColor} />
      <CalendarYear
        id={`${id}-end-year`}
        year={end.year}
        highlights={highlights}
        {...calProps}
      />
    </S.RangeTimeline>
  );
};
