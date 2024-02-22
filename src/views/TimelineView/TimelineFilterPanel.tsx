import { useEffect, useState } from 'react';
import { CalendarPicker, CalendarPickerProps } from '../../components/Calendar';
import { Entry, EntryFilter } from '../../types/entry';
import { RadioLabel } from '../../ui/InputLabel';
import * as S from './styled';
import EntryDetailsFilter from '../../components/EntryDetailsFilter';
import { isBefore, newWhen, whenEqual, whenValue } from '../../types/when';
import { Button } from '../../ui/Button';

export const allTimeLabel = 'Entries from All Time';

// https://www.schemecolor.com/pastel-print-2.php - Flavescent #FBEB96
export const filterHighlight = '#FBEB96'; //'khaki';
const hoverHighlight = 'chartreuse';
const anniversaryHighlight = 'lightskyblue';

type TimelineFilterPanelProps = {
  filter: EntryFilter;
  setFilter: (filter: EntryFilter) => void;
  categories: string[];
  locations: string[];
  buttons: JSX.Element;
  hoverEntry: Entry | undefined;
};

const TimelineFilterPanel = ({
  filter,
  setFilter,
  categories,
  locations,
  buttons,
  hoverEntry,
}: TimelineFilterPanelProps): JSX.Element => {
  const today = newWhen();
  const [year, setYear] = useState(today.year);
  const { when } = filter;

  useEffect(() => {
    // If the entry filter is changed externally, change the year to match
    if (when?.year && when.year !== year) {
      setYear(when.year);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whenValue(when)]);

  const jumpButtons = (
    <>
      <Button
        onClick={() => setFilter({ ...filter, when: today })}
        disabled={when && whenEqual(when, today)}
      >
        Select Today
      </Button>
      <Button
        onClick={() => setYear(when?.year || today.year)}
        disabled={!when || when.year === year}
      >
        Jump to Selection
      </Button>
    </>
  );

  const pickerProps: CalendarPickerProps = {
    id: 'main-picker',
    year,
    setYear,
    value1: filter.when,
    onClick: when => setFilter({ ...filter, when }),
    highlightColor: filterHighlight,
    buttons: jumpButtons,
    tooltipPrefix: 'Select',
  };

  if (hoverEntry) {
    const { start, end, ongoing, anniversary } = hoverEntry;
    if (
      start.year === year ||
      (start.year < year &&
        ((ongoing && today.year >= year) || (end && end.year >= year)))
    ) {
      pickerProps.value1 = start;
      if (end) pickerProps.value2 = end;
      else if (ongoing && isBefore(start, today)) pickerProps.value2 = today;
      if (pickerProps.value2) pickerProps.isRange = true;
      pickerProps.highlightColor = hoverHighlight;
    } else if (anniversary && start.year < year) {
      pickerProps.value1 = { ...start, year };
      pickerProps.highlightColor = anniversaryHighlight;
    }
  }

  return (
    <S.FilterPanel label="Timeline Filters" buttons={buttons}>
      <S.AllTimeRow>
        <RadioLabel
          id="all-time-filter"
          label={allTimeLabel}
          onChange={() => setFilter({ ...filter, when: undefined })}
          checked={!when}
          color={filterHighlight}
        />
      </S.AllTimeRow>
      <CalendarPicker {...pickerProps} />
      <EntryDetailsFilter
        filter={filter}
        setFilter={setFilter}
        categories={categories}
        locations={locations}
        highlightColor={filterHighlight}
      />
    </S.FilterPanel>
  );
};

export default TimelineFilterPanel;
