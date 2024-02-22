import { Entry, EntryFilter, entryDetailsMatch } from '../../types/entry';
import { Button } from '../../ui/Button';
import { ClickySpan } from '../../ui/ClickySpan';
import * as S from './styled';

export type IndexedEntry = { entry: Entry; index: number };

export type EntrySelectListProps = {
  entries: IndexedEntry[];
  filter?: EntryFilter;
  onSelect: (entries: IndexedEntry[]) => void;
  add?: boolean;
};

const EntrySelectList = ({
  entries,
  filter,
  onSelect,
  add,
}: EntrySelectListProps): JSX.Element => {
  const filteredEntries = filter
    ? entries.filter(({ entry }) => entryDetailsMatch(entry, filter))
    : entries;

  return (
    <S.SelectListContainer>
      <S.SelectList>
        {filteredEntries.map(iEntry => (
          <S.SelectListItem
            key={`${add ? 'add' : 'remove'}-entry-${iEntry.index}`}
            id={iEntry.entry.name}
            onClear={() => onSelect([iEntry])}
            plus={add}
          >
            <ClickySpan
              onClick={() => onSelect([iEntry])}
              title={iEntry.entry.name}
              noTab
            >
              {iEntry.entry.name}
            </ClickySpan>
          </S.SelectListItem>
        ))}
      </S.SelectList>
      <S.SelectListButtons>
        <Button onClick={() => onSelect(filteredEntries)}>
          {add ? 'Add' : 'Clear'} All
        </Button>
      </S.SelectListButtons>
    </S.SelectListContainer>
  );
};

export default EntrySelectList;
