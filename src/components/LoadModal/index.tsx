import {
  Entry,
  Timeline,
  entryCompare,
  entryEqual,
  entriesConflict,
} from '../../types/entry';
import { useMemo, useState } from 'react';
import { Button, ButtonTray } from '../../ui/Button';
import CenteredModal, {
  ModalSubtitle,
  ModalTitle,
} from '../../ui/CenteredModal';
import ResolveModal from '../ResolveModal';
import * as S from './styled';

const combineTimelines = (
  timeline1: Timeline,
  timeline2: Timeline
): { combinedTimeline: Timeline; conflicts: [Entry, Entry][] } => {
  const combinedTimeline: Timeline = [];
  const conflicts: [Entry, Entry][] = [];

  const t2: (Entry | null)[] = [...timeline2];

  timeline1.forEach(e1 => {
    let i = t2.findIndex(e2 => e2 && entryEqual(e1, e2));
    if (i >= 0) {
      combinedTimeline.push(e1);
      t2[i] = null;
    } else {
      i = t2.findIndex(e2 => e2 && entriesConflict(e1, e2));
      if (i >= 0) {
        conflicts.push([e1, timeline2[i]]);
        t2[i] = null;
      } else {
        combinedTimeline.push(e1);
      }
    }
  });

  t2.forEach(e => e && combinedTimeline.push(e));

  return { combinedTimeline: combinedTimeline, conflicts };
};

type LoadModalProps = {
  timeline: Timeline;
  loadedTimeline: Timeline;
  setTimeline: (timeline: Timeline, needSave: boolean) => void;
  onClose: () => void;
};

const LoadModal = ({
  timeline,
  loadedTimeline,
  setTimeline,
  onClose,
}: LoadModalProps): JSX.Element => {
  const { combinedTimeline, conflicts } = useMemo(
    () => combineTimelines(timeline, loadedTimeline),
    [loadedTimeline, timeline]
  );
  const [resolving, setResolving] = useState(false);

  if (resolving) {
    return (
      <ResolveModal
        timeline={timeline}
        loadedTimeline={loadedTimeline}
        combinedTimeline={combinedTimeline}
        conflicts={conflicts}
        setTimeline={timeline => setTimeline(timeline, true)}
        onClose={onClose}
      />
    );
  }

  if (!loadedTimeline.length) {
    return (
      <CenteredModal isOpen onRequestClose={onClose}>
        <ModalTitle>Load Timeline</ModalTitle>
        <ModalSubtitle>
          No entries could be loaded from the given file.
        </ModalSubtitle>
        <ButtonTray right>
          <Button onClick={onClose}>Bummer</Button>
        </ButtonTray>
      </CenteredModal>
    );
  }

  const loadCount = loadedTimeline.length;
  let summary: string;

  let combineText: string;
  let onCombine: () => void;

  if (combinedTimeline.length === timeline.length + loadedTimeline.length) {
    summary = `No loaded entries match the entries currently in the app.`;
    combineText = 'Add loaded entries to the current timeline';
    onCombine = () => {
      const newTimeline = [...combinedTimeline];
      newTimeline.sort(entryCompare);
      onClose();
      setTimeline(newTimeline, true);
    };
  } else {
    summary =
      'One or more loaded entries match what is already in the current timeline.';
    combineText = 'Combine identical entries and resolve conflicts manually';
    onCombine = () => setResolving(true);
  }

  summary = `${loadCount} Entr${
    loadCount > 1 ? 'ies have' : 'y has'
  } been loaded from this file. ${summary} What would you like to do?`;

  return (
    <CenteredModal isOpen>
      <ModalTitle>Load Timeline</ModalTitle>
      <S.LoadSummary>{summary}</S.LoadSummary>
      <Button onClick={onCombine}>{combineText}</Button>
      {/* <ConfirmButton
        message="Are you sure you want to clear the current timeline? Unsaved data will be lost."
        yesText="Yes, clear Timeline"
        noText="No, go back to options"
        onClick={() => {
          onClose();
          setTimeline(loadedTimeline, false);
        }}
      >
        Clear current timeline and only show entries from the file
      </ConfirmButton> */}
      <Button onClick={onClose}>
        Cancel and return to the current timeline
      </Button>
    </CenteredModal>
  );
};

export default LoadModal;
