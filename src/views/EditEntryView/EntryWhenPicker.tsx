import { ReactNode, useState } from 'react';
import {
  MAX_YEAR,
  When,
  daysBetween,
  eitherWhenContains,
  isAfter,
  isBefore,
  newWhen,
  timeBetweenString,
  whenEqual,
  whenString,
} from '../../types/when';
import { CenteringDiv } from '../../ui/Containers';
import { RadioLabel } from '../../ui/InputLabel';
import { CalendarPicker, CalendarPickerProps } from '../../components/Calendar';
import { PartialEntry } from '../../types/entry';
import { RadioPair } from '../../ui/InputLabel/styled';
import * as S from './styled';
import { ClearableClicky } from '../../ui/ClearableInput';

export type EntryWhenPickerProps = {
  entry: PartialEntry;
  onChange: (ongoing: boolean, start?: When, end?: When | null) => void;
  highlightColor?: string;
};

const summarize = (
  ongoing: boolean,
  start: When | undefined,
  end: When | null | undefined,
  onChange: EntryWhenPickerProps['onChange']
): [ReactNode, ReactNode] => {
  const today = newWhen();
  if (!start) {
    return ['Select a day, month, or year', ''];
  }
  const clearStart = () => onChange(ongoing, end || undefined);
  const clearEnd = () => onChange(ongoing, start);

  const startString = start
    ? whenString(start, null, { shortMonth: !!end })
    : '';

  if (!ongoing) {
    return [
      <>
        <ClearableClicky onClear={clearStart} title="Click to unselect">
          {startString}
        </ClearableClicky>
        {end && (
          <>
            <span>—</span>
            <ClearableClicky onClear={clearEnd} title="Click to unselect">
              {whenString(end, null, { shortMonth: true })}
            </ClearableClicky>
          </>
        )}
      </>,
      <>
        <span>Duration: {timeBetweenString(start, end || start)}</span>
        {!end && (
          <span>Click another day, month, or year if you want a range</span>
        )}
      </>,
    ];
  }

  const between = timeBetweenString(start, today, true);

  const clearableWhen = (
    <ClearableClicky onClear={clearStart} title="Click to unselect">
      {startString}
    </ClearableClicky>
  );

  if (!isAfter(start, today)) {
    return [
      <>
        Started:
        {clearableWhen}
      </>,
      <span>Going for {between}</span>,
    ];
  }
  return [<>Starts: {clearableWhen}</>, <span>Starts in {between}</span>];
};

const EntryWhenPicker = ({
  entry,
  onChange,
  highlightColor,
}: EntryWhenPickerProps): JSX.Element => {
  const { ongoing, start, end } = entry;
  const today = newWhen();
  const [year, setYear] = useState(start?.year ?? today.year);
  const pickerProps: CalendarPickerProps = {
    id: 'entry-when-picker',
    year,
    setYear,
    value1: start,
    value2: end || undefined,
    highlightColor,
    tooltipPrefix: 'Select',
  };

  if (ongoing || !start) {
    // If we're ongoing (one date) or don't have a
    // selection, change the start date on click
    pickerProps.onClick = (when: When) =>
      onChange(ongoing, !start || !whenEqual(start, when) ? when : undefined);

    if (ongoing && start) {
      pickerProps.value2 = newWhen(MAX_YEAR, 12, 31);
    }
  } else if (!end) {
    pickerProps.onClick = (when: When) => {
      // If the start is clicked again, toggle it off
      if (whenEqual(start, when)) onChange(ongoing);
      // If a when more or less specific is clicked, change the start
      else if (eitherWhenContains(start, when)) onChange(ongoing, when);
      // If a unique when is clicked, set as the end
      else if (isAfter(when, start)) onChange(ongoing, start, when);
      else onChange(ongoing, when, start);
    };
    pickerProps.isRange = true;
  } else {
    pickerProps.onClick = (when: When) => {
      // If start/end is clicked, toggle it off
      if (whenEqual(when, start)) {
        onChange(ongoing, end);
        return;
      }
      if (whenEqual(when, end)) {
        onChange(ongoing, start);
        return;
      }
      // Clicked a value more or less specific than the start
      const subStart = eitherWhenContains(start, when);
      // Clicked a value more or less specific than the start
      const subEnd = eitherWhenContains(end, when);
      if (subStart && subEnd) {
        // Clicked a value bigger than both, so clear the end
        onChange(ongoing, when);
      } else if (
        !whenEqual(start, when) &&
        (subStart ||
          isBefore(when, start) ||
          (isBefore(when, end) &&
            daysBetween(start, when) < daysBetween(when, end)))
      ) {
        onChange(ongoing, when, end);
      } else {
        onChange(ongoing, start, when);
      }
    };
  }

  // pickerProps.buttons =
  //   start && end ? (
  //     <>
  //       <Button onClick={() => onChange(ongoing, end)}>
  //         Clear Start {capitalize(start.unit)}
  //       </Button>
  //       <Button onClick={() => onChange(ongoing, start)}>
  //         Clear End {capitalize(end.unit)}
  //       </Button>
  //     </>
  //   ) : start ? (
  //     <Button onClick={() => onChange(ongoing)}>
  //       Clear Selected {capitalize(start.unit)}
  //     </Button>
  //   ) : (
  //     <Button
  //       onClick={() => {
  //         if (year !== today.year) setYear(today.year);
  //         onChange(ongoing, today);
  //       }}
  //     >
  //       Select Today ({whenString(today)})
  //     </Button>
  //   );
  const [summaryText, subtext] = summarize(ongoing, start, end, onChange);

  pickerProps.header = <S.SummaryRange>{summaryText}</S.SummaryRange>;

  return (
    <S.WhenPickerContainer>
      <CenteringDiv>
        <RadioPair>
          <RadioLabel
            id="complete-entry"
            label="Complete Entry"
            checked={!ongoing}
            onClick={() => ongoing && onChange(false, start)}
            title="An entry with a set timespan, like a show or a trip"
          />
          <RadioLabel
            id="ongoing-entry"
            label="Ongoing Entry"
            onClick={() => !ongoing && onChange(true, start)}
            checked={ongoing}
            title="An entry that is still going, like working at a job"
          />
        </RadioPair>
      </CenteringDiv>
      <CalendarPicker {...pickerProps} />
      <S.SubText>{subtext}</S.SubText>
    </S.WhenPickerContainer>
  );
};

export default EntryWhenPicker;
