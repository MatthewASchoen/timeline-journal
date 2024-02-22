import { Timeline, newFilter } from '../../types/entry';
import { useState } from 'react';
import { Button, ButtonTray } from '../../ui/Button';
import { downloadTimeline } from '../../utility/filesystem';
import CenteredModal, { ModalTitle } from '../../ui/CenteredModal';
import EntryDetailsFilter from '../EntryDetailsFilter';
import EntrySelectList, { IndexedEntry } from '../EntrySelectList';
import * as S from './styled';
import { Label } from '../../ui/LabelTextbox/styled';
import { Text } from '../../ui/Info';
// import { CheckboxLabel } from '../../ui/InputLabel';

export const chooseEntriesToSaveText = 'Choose Which Entries to Save';

const defaultFilename = 'timeline';
const filterHighlight = 'lemonchiffon';

/** Moves items from listA to listB, returning new copies
 * of both (or to listA from listB, if toA is true) */
function moveItems<T>(
  items: T[],
  listA: T[],
  listB: T[],
  toA?: boolean
): [T[], T[]] {
  const itemSet = new Set(items);
  const fromList = toA ? listB : listA;
  const toList = toA ? listA : listB;

  const newFrom = fromList.filter(item => !itemSet.has(item));
  const newTo = [...toList, ...items];

  return toA ? [newTo, newFrom] : [newFrom, newTo];
}

type SaveModalProps = {
  timeline: Timeline;
  allEntries: boolean;
  initialFilename: string;
  onSave: (filename: string) => void;
  closeModal: () => void;
  categories: string[];
  locations: string[];
};

const SaveModal = ({
  timeline,
  allEntries,
  initialFilename,
  onSave,
  closeModal,
  categories,
  locations,
}: SaveModalProps): JSX.Element => {
  const [filename, setFilename] = useState(initialFilename || defaultFilename);
  const [[entryOptions, entriesToSave], setSaveEntries] = useState<
    [IndexedEntry[], IndexedEntry[]]
  >(() => {
    const withIndex = timeline.map((entry, index) => ({ entry, index }));
    return allEntries ? [[], withIndex] : [withIndex, []];
  });
  const [filter, setFilter] = useState(newFilter());
  // const [filterOpen, setFilterOpen] = useState(false);

  const saveCount = entriesToSave.length;

  const addToSave = (entries: IndexedEntry[]): void => {
    const [newOptions, newToSave] = moveItems(
      entries,
      entryOptions,
      entriesToSave
    );
    newToSave.sort((a, b) => a.index - b.index);
    setSaveEntries([newOptions, newToSave]);
  };

  const removeFromSave = (entries: IndexedEntry[]): void => {
    const [newOptions, newToSave] = moveItems(
      entries,
      entryOptions,
      entriesToSave,
      true
    );
    newOptions.sort((a, b) => a.index - b.index);
    setSaveEntries([newOptions, newToSave]);
  };

  // Note: Was used when this persisted
  // useEffect(() => {
  //   if (isOpen) {
  //     setFilename(initialFilename || defaultFilename);
  //     setEntriesToSave(new Set(timeline));
  //     setFilter(newFilter());
  //   }
  // }, [initialFilename, isOpen, timeline]);

  const onClickOut =
    filename !== initialFilename || (!allEntries && saveCount)
      ? undefined
      : closeModal;

  // const filterGroupLabel = (
  //   <CheckboxLabel
  //     id="save-filter-open"
  //     label={chooseEntriesToSaveText}
  //     onChange={() => setFilterOpen(!filterOpen)}
  //     checked={filterOpen}
  //   />
  // );

  const onSaveClick = () => {
    if (!filename) return;
    const filteredTimeline = entriesToSave.map(({ entry }) => entry);

    downloadTimeline(filteredTimeline, filename);
    onSave(filename);
    closeModal();
  };

  const summary = !saveCount
    ? 'Select Entries to Save'
    : `${
        saveCount < timeline.length
          ? `${saveCount} of ${timeline.length} Entr${
              timeline.length > 1 ? 'ies' : 'y'
            }`
          : 'All Entries'
      } will be Saved`;

  return (
    <CenteredModal isOpen onRequestClose={onClickOut}>
      <ModalTitle>Save Timeline</ModalTitle>
      {!allEntries && (
        <S.FilterGroup label={chooseEntriesToSaveText}>
          <S.ListWithHeader>
            <EntryDetailsFilter
              filter={filter}
              setFilter={setFilter}
              categories={categories}
              locations={locations}
              highlightColor={filterHighlight}
              vertical
            />
            <EntrySelectList
              entries={entryOptions}
              filter={filter}
              onSelect={addToSave}
              add
            />
          </S.ListWithHeader>
          <S.ListWithHeader>
            <Text>Entries Selected to Save ({saveCount}):</Text>
            <EntrySelectList
              entries={entriesToSave}
              onSelect={removeFromSave}
            />
          </S.ListWithHeader>
        </S.FilterGroup>
      )}
      <S.FilenameBoxWrapper>
        <Label htmlFor="filename">Filename:</Label>
        <S.FilenameBox
          id="filename"
          onChange={e => setFilename(e.target.value)}
          value={filename}
        />
        <span>.csv</span>
      </S.FilenameBoxWrapper>
      <S.SummaryAndButtons>
        <S.SaveSummary>{summary}</S.SaveSummary>
        <ButtonTray>
          <Button onClick={onSaveClick} disabled={!filename || !saveCount}>
            Save Timeline
          </Button>
          <Button onClick={closeModal}>Cancel</Button>
        </ButtonTray>
      </S.SummaryAndButtons>
    </CenteredModal>
  );
};

export default SaveModal;
