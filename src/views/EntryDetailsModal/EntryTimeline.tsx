import { Entry, getRange } from '../../types/entry';
import { When, isAfter, newWhen, timeBetweenString } from '../../types/when';
import { CalendarRange } from '../../components/Calendar';
import * as S from './styled';

export type EntryTimelineProps = {
  label: string;
  entry: Entry | undefined;
  setWhen: (when: When) => void;
};

const EntryTimeline = ({
  label,
  entry,
  setWhen,
}: EntryTimelineProps): JSX.Element => {
  let labelEnd = '';
  let content: JSX.Element;
  if (entry) {
    const today = newWhen();
    const range = getRange(entry);
    if (isAfter(entry.start, today)) {
      labelEnd = `Starts in ${timeBetweenString(entry.start, today, true)}`;
    } else if (entry.end || entry.ongoing) {
      labelEnd = timeBetweenString(range.start, range.end);
    } else {
      labelEnd = `${timeBetweenString(range.start, newWhen())} ago`;
    }
    // console.log({ range });
    content = <CalendarRange id={label} onClick={setWhen} highlight={range} />;
  } else {
    content = (
      <S.SelectEntryMessage>
        Select an entry to see its place in the timeline
      </S.SelectEntryMessage>
    );
  }

  const timelineLabel = `Entry Timeline${labelEnd && ` - ${labelEnd}`}`;
  const bigLabel = /years.+months.+days.+/.test(timelineLabel);

  return (
    <S.TimelineGroup label={timelineLabel} bigLabel={bigLabel}>
      {content}
    </S.TimelineGroup>
  );
};

export default EntryTimeline;
