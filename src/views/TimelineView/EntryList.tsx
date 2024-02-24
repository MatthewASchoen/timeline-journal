import { Entry, EntryFilter, EntryRelation } from '../../types/entry';
import { When } from '../../types/when';
import * as S from './styled';
import { ClickySpan } from '../../ui/ClickySpan';
import { ButtonTray } from '../../ui/Button';
import { EntryActions, entryRelationLabel, entryTooltip } from './list-helpers';
import { ICONS } from '../../types/icons';

export type EntryListProps = {
  label: string;
  entries: EntryRelation[];
  selectedEntry?: Entry;
  entryActions: EntryActions;
  filter: EntryFilter;
  listKey: string;
  setFilter: (filter: EntryFilter) => void;
  when?: When;
  onHoverEntry?: (entry: Entry | undefined) => void;
};

const EntryList = ({
  label,
  entries,
  selectedEntry,
  entryActions,
  filter: { lists, ...filter },
  listKey,
  setFilter,
  onHoverEntry,
}: EntryListProps): JSX.Element => (
  <S.ScrollGroup
    label={entries.length ? `${label} (${entries.length})` : label}
    collapsed={!lists[listKey]}
    onCollapse={() =>
      setFilter({
        ...filter,
        lists: { ...lists, [listKey]: !lists[listKey] },
      })
    }
  >
    <S.List>
      {entries.map(([entry, relation]) => (
        <S.EntryListItem
          selected={entry === selectedEntry}
          onMouseEnter={onHoverEntry && (() => onHoverEntry(entry))}
          onMouseLeave={onHoverEntry && (() => onHoverEntry(undefined))}
        >
          <ClickySpan
            onClick={() => entryActions.view(entry)}
            title={entryTooltip(entry)}
          >
            {entryRelationLabel(entry, relation, filter.when)}
          </ClickySpan>
          <ButtonTray>
            <ClickySpan
              onClick={() => entryActions.edit(entry)}
              title={`Edit ${entry.name}`}
            >
              {ICONS.pencil}
            </ClickySpan>
            <ClickySpan
              onClick={() => entryActions.delete(entry)}
              title={`Delete ${entry.name}`}
            >
              {ICONS.trash}
            </ClickySpan>
          </ButtonTray>
        </S.EntryListItem>
      ))}
    </S.List>
  </S.ScrollGroup>
);

export default EntryList;
