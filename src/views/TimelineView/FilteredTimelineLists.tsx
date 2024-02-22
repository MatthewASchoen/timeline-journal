import { ReactNode, useMemo } from 'react';
import EntryList from './EntryList';
import {
  Entry,
  EntryFilter,
  EntryRelation,
  Relation,
  Timeline,
  entryRelationCompare,
  filterRelation,
} from '../../types/entry';
import { whenString } from '../../types/when';
import { ClickySpan } from '../../ui/ClickySpan';
import {
  newEntryButtonText,
  noEntriesHighlight,
} from '../../components/NewEntryButton';
import { B, Info } from '../../ui/Info';
import * as S from './styled';
import {
  loadHighlight,
  loadTimelineButtonText,
} from '../../components/LoadButtonWithModal';
import { EntryActions, filteredListsLabel } from './list-helpers';



type FilteredTimelineListsProps = {
  timeline: Timeline;
  filter: EntryFilter;
  setFilter: (filter: EntryFilter) => void;
  entryActions: EntryActions;
  buttons: JSX.Element;
  onHoverEntry: (entry: Entry | undefined) => void;
};

const FilteredTimelineLists = ({
  timeline,
  filter,
  setFilter,
  entryActions,
  buttons,
  onHoverEntry,
}: FilteredTimelineListsProps): JSX.Element => {
  const [startEnd, ongoing, anniversaries] = useMemo(() => {
    const startEnd: EntryRelation[] = [];
    const ongoing: EntryRelation[] = [];
    const anniversaries: EntryRelation[] = [];
    timeline.forEach(entry => {
      const relation = filterRelation(entry, filter);
      if (relation & Relation.WITHIN)
        startEnd.push([entry, relation & Relation.WITHIN]);
      if (relation & Relation.ONGOING)
        ongoing.push([entry, relation & Relation.ONGOING]);
      if (relation & Relation.ANNIVERSARY)
        anniversaries.push([entry, relation & Relation.ANNIVERSARY]);
    });
    if (filter.when) {
      // Sort starting/ending entries with their relations
      startEnd.sort(entryRelationCompare);
    }
    // Sort anniversaries by month and day
    anniversaries.sort(
      ([a], [b]) => a.start.month - b.start.month || a.start.day - b.start.day
    );

    return [startEnd, ongoing, anniversaries];
  }, [timeline, filter]);

  const listGroupLabel = filteredListsLabel(filter, setFilter);

  const { lists } = filter;

  const hasEntries = !!timeline.length;

  const gridCols = hasEntries
    ? [lists.within, lists.ongoing, lists.anniversary]
        .map(b => (b ? '1fr' : 'min-content'))
        .join(' ')
    : '1fr';

  const listProps = {
    entryActions,
    filter,
    setFilter,
    onHoverEntry,
  };

  return (
    <S.FilteredListGrid
      label={listGroupLabel}
      buttons={buttons}
      gridCols={gridCols}
    >
      {timeline.length ? (
        <>
          <EntryList
            label="Started/Ended"
            entries={startEnd}
            listKey="within"
            {...listProps}
          />
          <EntryList
            label="Ongoing"
            entries={ongoing}
            listKey="ongoing"
            {...listProps}
          />
          <EntryList
            label="Anniversaries/Birthdays"
            entries={anniversaries}
            listKey="anniversary"
            {...listProps}
          />
        </>
      ) : (
        <S.NoEntriesGroup>
          <Info>
            <h2>You have no timeline entries.</h2>
            <span>
              Click{' '}
              <B back={noEntriesHighlight.highlight?.color}>
                {newEntryButtonText}
              </B>{' '}
              to start creating a timeline.
            </span>
            <h3>- Or -</h3>
            <span>
              Click{' '}
              <B back={loadHighlight.highlight?.color}>
                {loadTimelineButtonText}
              </B>{' '}
              if you have a timeline file to load.
            </span>
          </Info>
        </S.NoEntriesGroup>
      )}
    </S.FilteredListGrid>
  );
};

export default FilteredTimelineLists;
