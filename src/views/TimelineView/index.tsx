import { Entry, PartialEntry } from '../../types/entry';
import * as S from './styled';
import TimelineFilterPanel from './TimelineFilterPanel';
import FilteredTimelineLists from './FilteredTimelineLists';
import { useState } from 'react';
import { LoadButtonWithModal } from '../../components/LoadButtonWithModal';
import SaveButton from '../../components/SaveButton';
import NewEntryButton from '../../components/NewEntryButton';
import { Button, ButtonTray } from '../../ui/Button';
import { TimelineState } from '../TimelineApp/state-hooks';
import CenteredModal, { ModalSubtitle } from '../../ui/CenteredModal';

interface TimelineViewProps
  extends Pick<
    TimelineState,
    | 'timeline'
    | 'timelineActions'
    | 'filter'
    | 'setFilter'
    | 'isDirty'
    | 'setDirty'
    | 'categories'
    | 'locations'
  > {
  openEntry: (entry: Entry) => void;
  editEntry: (entry: Entry) => void;
  newEntry: (entry: PartialEntry) => void;
  openHelp: () => void;
}

const TimelineView = ({
  timeline,
  timelineActions,
  filter,
  setFilter,
  isDirty,
  setDirty,
  categories,
  locations,
  openEntry,
  editEntry,
  newEntry,
  openHelp,
}: TimelineViewProps): JSX.Element => {
  const [hoverEntry, setHoverEntry] = useState<Entry>();
  const [trashEntry, setTrashEntry] = useState<Entry | undefined>(undefined);

  const loadButton = (
    <LoadButtonWithModal
      timeline={timeline}
      setTimeline={timelineActions.set}
      needSave={isDirty}
      setDirty={setDirty}
    />
  );

  const saveButton = (
    <SaveButton
      timeline={timeline}
      onSave={() => setDirty(false)}
      highlight={isDirty}
      categories={categories}
      locations={locations}
    />
  );

  const helpButton = <Button onClick={openHelp}>Help</Button>;

  const newEntryButton = (
    <NewEntryButton
      filter={filter}
      setNewEntry={newEntry}
      noEntries={timeline.length === 0}
    />
  );

  const cancelTrash = () => setTrashEntry(undefined);

  return (
    <S.FiltersAndEntries>
      <TimelineFilterPanel
        filter={filter}
        setFilter={setFilter}
        categories={categories}
        locations={locations}
        buttons={
          <>
            {saveButton}
            {loadButton}
            {helpButton}
          </>
        }
        hoverEntry={hoverEntry}
      />
      <FilteredTimelineLists
        timeline={timeline}
        filter={filter}
        setFilter={setFilter}
        entryActions={{
          view: openEntry,
          edit: editEntry,
          delete: setTrashEntry,
        }}
        buttons={newEntryButton}
        onHoverEntry={setHoverEntry}
      />
      {trashEntry && (
        <CenteredModal isOpen onRequestClose={cancelTrash}>
          <ModalSubtitle>
            Delete {trashEntry.name}?<br />
            This cannot be undone.
          </ModalSubtitle>
          <ButtonTray right stack>
            <Button
              onClick={() => {
                timelineActions.delete(trashEntry);
                cancelTrash();
              }}
            >
              Yes, Delete this Entry
            </Button>
            <Button onClick={cancelTrash}>Cancel</Button>
          </ButtonTray>
        </CenteredModal>
      )}
    </S.FiltersAndEntries>
  );
};

export default TimelineView;
