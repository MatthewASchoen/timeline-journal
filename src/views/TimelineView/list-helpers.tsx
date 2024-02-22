import { ReactNode } from 'react';
import { Entry, EntryFilter, Relation } from '../../types/entry';
import { ClickySpan } from '../../ui/ClickySpan';
import { When, isAfter, newWhen, whenString } from '../../types/when';
import { ITALIAN } from '../../ui/colors';
import * as S from './styled';

export type EntryActions = {
  view: (entry: Entry) => void;
  edit: (entry: Entry) => void;
  delete: (entry: Entry) => void;
};

/** Generates a label representing the current entry filter.
 * Clicking any individual filter sends a call to remove it. */
export const filteredListsLabel = (
  filter: EntryFilter,
  setFilter: (filter: EntryFilter) => void
): ReactNode => {
  const { when, text, category, location } = filter;
  let label = <>Entries</>;
  if (category)
    label = (
      <>
        <ClickySpan
          onClick={() => setFilter({ ...filter, category: '' })}
          strikethrough
        >
          {category}
        </ClickySpan>{' '}
        {label}
      </>
    );
  if (location)
    label = (
      <>
        {label}{' '}
        <ClickySpan
          onClick={() => setFilter({ ...filter, location: '' })}
          strikethrough
        >
          in {location}
        </ClickySpan>
      </>
    );
  if (text)
    label = (
      <>
        {label}{' '}
        <ClickySpan
          onClick={() => setFilter({ ...filter, text: '' })}
          strikethrough
        >
          matching "{text}"
        </ClickySpan>
      </>
    );
  return when ? (
    <>
      {label}
      {' - '}
      <ClickySpan
        onClick={() => setFilter({ ...filter, when: undefined })}
        strikethrough
      >
        {whenString(when)}
      </ClickySpan>
    </>
  ) : (
    <>All {label}</>
  );
};

export const relationColors = {
  start: ITALIAN.green, // 'darkgreen',
  end: ITALIAN.red, // 'firebrick',
  anniversary: ITALIAN.blue, // 'darkblue',
};

/** Generates a tooltip with general information about the given Entry */
export const entryTooltip = ({
  start,
  end,
  ongoing,
  category,
  location,
}: Entry): string => {
  const details = [];
  if (category) details.push(category);
  if (location) details.push(location);
  if (ongoing) {
    details.push(
      `Start${isAfter(start, newWhen()) ? 's' : 'ed'} ${whenString(start)}`
    );
  } else {
    details.push(whenString(start, end));
  }
  return details.join(', ');
};

/** Returns colored relation text (Start/End/Years) and the given entry's name */
export const entryRelationLabel = (
  { name, start }: Entry,
  relation: Relation,
  when?: When
): ReactNode => {
  let prefix = '';
  let color = '';
  switch (relation) {
    case Relation.STARTS_IN:
      prefix = 'Start';
      color = relationColors.start;
      break;
    case Relation.ENDS_IN:
      prefix = 'End';
      color = relationColors.end;
      break;
    case Relation.ANNIVERSARY:
      const years = when ? when.year - start.year : 0;
      if (years > 0) {
        prefix = `${years} Year${years !== 1 ? 's' : ''}`;
        color = relationColors.anniversary;
      }
      break;
  }
  return prefix ? (
    <>
      <S.ColorSpan color={color}>{prefix}</S.ColorSpan>: {name}
    </>
  ) : (
    name
  );
};
