import { Entry, EntryFilter } from '../../types/entry';
import EntryInfo from './EntryInfo';
import EntryTimeline from './EntryTimeline';
import Modal from 'react-modal';
import CenteredModal from '../../ui/CenteredModal';
import * as S from './styled';

export const entryViewModalProps: Modal.Styles = {
  content: {
    borderRadius: '1rem',
    background: 'royalblue',
    overflow: 'visible',
  },
};

type EntryDetailsModalProps = {
  entry: Entry;
  closeView: () => void;
  updateFilter: (filter: Partial<EntryFilter>) => void;
  editEntry: () => void;
  deleteEntry: () => void;
};

const EntryDetailsModal = ({
  entry,
  closeView,
  updateFilter,
  editEntry,
  deleteEntry,
}: EntryDetailsModalProps): JSX.Element => (
  <CenteredModal isOpen style={entryViewModalProps} onRequestClose={closeView}>
    <S.DetailsAndTimeline>
      <EntryInfo
        entry={entry}
        editEntry={editEntry}
        deleteEntry={deleteEntry}
        closeEntry={closeView}
        updateFilter={updateFilter}
      />
      <EntryTimeline
        label="Entry Timeline"
        entry={entry}
        setWhen={when => updateFilter({ when })}
      />
    </S.DetailsAndTimeline>
  </CenteredModal>
);

export default EntryDetailsModal;
