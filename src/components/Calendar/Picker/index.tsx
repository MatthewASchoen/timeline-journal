import { useState } from 'react';
import {
  MAX_YEAR,
  MIN_YEAR,
  When,
  isAfter,
  isBefore,
  newWhen,
  yearRegex,
} from '../../../types/when';
import { CalendarYear, CalendarYearProps } from '../Year';
import { confirmKeys, leftKeys, rightKeys } from '../../../ui/keys';
import { LeftArrow, RightArrow } from '../../../ui/LRSelect/Arrows';
import { Button, ButtonTray } from '../../../ui/Button';
import * as S from './styled';
import { RangeHighlight } from '../../../types/when-range';
import { useOnClickRepeat } from '../../../utility/useOnClickRepeat';
import { ICONS } from '../../../types/icons';

export interface CalendarPickerProps
  extends Pick<
    CalendarYearProps,
    'id' | 'year' | 'onClick' | 'scale' | 'tooltipPrefix'
  > {
  setYear: (year: number) => void;
  value1?: When;
  value2?: When;
  isRange?: boolean;
  highlightColor?: string;
  buttons?: JSX.Element;
}

const isValidYear = (year: string): boolean => yearRegex.test(year);

export const CalendarPicker = ({
  year,
  setYear,
  value1,
  value2,
  onClick,
  isRange,
  highlightColor,
  buttons,
  ...calProps
}: CalendarPickerProps) => {
  //const [displayYear, setDisplayYear] = useState(value1?.year || CURRENT_YEAR);
  const [editYear, setEditYear] = useState(false);
  const yearLeft = () => year > MIN_YEAR && setYear(year - 1); //onClick(whenSubtract(value, 1, 'year'));
  const yearLeftClick = useOnClickRepeat(yearLeft);
  const yearRight = () => year < MAX_YEAR && setYear(year + 1);
  const yearRightClick = useOnClickRepeat(yearRight); //onClick(whenAdd(value, 1, 'year'));

  const [hoverWhen, setHoverWhen] = useState<When>();

  const yearSelected = [value1, value2].some(
    value => value?.unit === 'year' && value?.year === year
  );

  const yearProps: CalendarYearProps = {
    //scale: 5,
    year,
    selected: [value1, value2].filter(Boolean) as When[],
    onClick,
    defaultHighlightColor: highlightColor,
    onHover: onClick && setHoverWhen,
    ...calProps,
  };

  const highlights: RangeHighlight[] = [];

  if (value1) {
    let start = value1;
    let end = value2 || value1;
    if (!value2 && isRange) {
      //yearProps.onHover = setHoverWhen;
      if (hoverWhen) {
        if (isBefore(hoverWhen, value1)) {
          start = hoverWhen;
          end = value1;
        } else if (isAfter(hoverWhen, value1)) {
          end = hoverWhen;
        } else {
          start = end = hoverWhen;
        }
      }
    }
    highlights.push({ start, end, color: highlightColor });
    //push selected
  }

  if (hoverWhen) {
    highlights.push({
      start: hoverWhen,
      end: hoverWhen,
      color: highlightColor,
    });
  }

  if (highlights.length) yearProps.highlights = highlights;

  return (
    <S.PickerContainer scale={16}>
      <S.PickerYearRow>
        <LeftArrow
          {...yearLeftClick}
          onKeyDown={({ key }) => {
            if (confirmKeys.includes(key)) yearLeft();
          }}
          title={`View ${year - 1}`}
        />
        {editYear ? (
          <S.YearInput
            value={year.toString()}
            isValid={isValidYear}
            onChange={
              ({ target }) => setYear(parseInt(target.value))
              //whenAdd(value, parseInt(target.value) - value.year, 'year')
            }
            onBlur={() => setEditYear(false)}
            onKeyDown={({ key }) => {
              if (key === 'Enter') setEditYear(false);
            }}
            maxLength={4}
            autoFocus
          />
        ) : (
          <>
            <S.YearDisplay
              onClick={() => onClick?.(newWhen(year))}
              onKeyDown={({ key }) => {
                if (confirmKeys.includes(key)) onClick?.(newWhen(year));
                else if (leftKeys.includes(key)) yearLeft();
                else if (rightKeys.includes(key)) yearRight();
              }}
              onMouseOver={() => setHoverWhen(newWhen(year))}
              onMouseLeave={() => setHoverWhen(undefined)}
              selected={yearSelected}
              tabIndex={0}
              title={
                calProps.tooltipPrefix && `${calProps.tooltipPrefix} ${year}`
              }
            >
              {year}
            </S.YearDisplay>
            <Button onClick={() => setEditYear(true)} title="Edit year">
              {ICONS.pencil}
            </Button>
          </>
        )}
        <RightArrow
          {...yearRightClick}
          onKeyDown={({ key }) => {
            if (confirmKeys.includes(key)) yearRight();
          }}
          title={`View ${year + 1}`}
        />
      </S.PickerYearRow>
      {/* <S.PickerCalendarRow scale={5}> */}
      <CalendarYear {...yearProps} />
      {/* </S.PickerCalendarRow> */}
      {buttons && <ButtonTray>{buttons}</ButtonTray>}
    </S.PickerContainer>
  );
};
