import { Entry, Timeline, entryCompare, entryEqual } from '../../types/entry';
import { useState } from 'react';
import { Button, ButtonTray } from '../../ui/Button';
import CenteredModal, { ModalTitle } from '../../ui/CenteredModal';
import { When } from '../../types/when';
import * as S from './styled';
import { RadioLabel } from '../../ui/InputLabel';
import ResolveRow from './ResolveRow';

const countCapitals = (str: string): number => {
  let n = 0;
  for (let i = 0; i < str.length; ++i) if (/[A-Z]/.test(str[i])) ++n;
  return n;
};

/** Returns true if w1 is more specific than w2 */
const isMoreSpecific = (w1: When | null, w2: When | null): boolean =>
  !!(
    (w1 && !w2) ||
    (w1 &&
      w2 &&
      ((w2.unit === 'year' && w1.unit !== 'year') ||
        (w2.unit === 'month' && w1.unit === 'day')))
  );

/** Returns a combined copy of e1 and e2, predicting which pieces of data are most up-to-date. */
const combineEntries = (conflict: [Entry, Entry] | undefined): Entry | null => {
  if (!conflict) return null;
  const [e1, e2] = conflict;
  const e3 = { ...e1 };
  if (countCapitals(e2.name) > countCapitals(e1.name)) e3.name = e2.name;
  if (isMoreSpecific(e2.start, e1.start)) e3.start = e2.start;
  if (isMoreSpecific(e2.end, e1.end)) e3.end = e2.end;
  if (!e1.category && e2.category) e3.category = e2.category;
  if (!e1.location && e2.location) e3.location = e2.location;
  if (!e1.anniversary && e2.anniversary) e3.anniversary = true;
  if (e2.notes.length > e1.notes.length) e3.notes = e2.notes;
  return e3;
};

type ResolveModalProps = {
  timeline: Timeline;
  loadedTimeline: Timeline;
  combinedTimeline: Timeline;
  conflicts: [Entry, Entry][];
  setTimeline: (timeline: Timeline) => void;
  onClose: () => void;
};

const ResolveModal = ({
  timeline,
  loadedTimeline,
  combinedTimeline,
  conflicts,
  setTimeline,
  onClose,
}: ResolveModalProps): JSX.Element => {
  const [{ index, combo, resolved }, setCurrentConflict] = useState(() => ({
    index: 0,
    combo: combineEntries(conflicts[0]),
    resolved: [] as Timeline,
  }));

  if (!combo) {
    // We're done!
    const finishUp = () => {
      const newTimeline = [...combinedTimeline, ...resolved];
      newTimeline.sort(entryCompare);
      onClose();
      setTimeline(newTimeline);
    };

    const autoResolved =
      timeline.length +
      loadedTimeline.length -
      (combinedTimeline.length + conflicts.length * 2);

    const unique = combinedTimeline.length - autoResolved;

    const manuallyResolved = conflicts.length;

    const totalEntries = combinedTimeline.length + resolved.length;

    return (
      <CenteredModal isOpen onRequestClose={finishUp}>
        <ModalTitle>Load Complete and Conflicts Resolved</ModalTitle>
        <S.SummaryGrid>
          <span>Unique Entries Found:</span>
          <span>{unique}</span>
          <span>Identical Entries Matched:</span>
          <span>{autoResolved}</span>
          <span>Conflicts Resolved:</span>
          <span>{manuallyResolved}</span>
          <span>New Entry Total:</span>
          <span>{totalEntries}</span>
        </S.SummaryGrid>

        <ButtonTray right>
          <Button onClick={finishUp}>Close and Show Timeline</Button>
        </ButtonTray>
      </CenteredModal>
    );
  }

  const [entry1, entry2] = conflicts[index];
  const setCombo = (part: Partial<Entry>) =>
    setCurrentConflict({ index, resolved, combo: { ...combo, ...part } });

  const rowProps = { entry1, entry2, combo, setValue: setCombo };

  const keepBoth = () =>
    setCurrentConflict({
      index: index + 1,
      combo: combineEntries(conflicts[index + 1]),
      resolved: [...resolved, entry1, entry2],
    });

  const acceptCombo = () =>
    setCurrentConflict({
      index: index + 1,
      combo: combineEntries(conflicts[index + 1]),
      resolved: [...resolved, combo],
    });

  return (
    <CenteredModal isOpen>
      <S.TitleRow>
        <ModalTitle>
          Entry Conflict {index + 1} / {conflicts.length}
        </ModalTitle>
        <Button onClick={keepBoth}>Keep Both Entries (2 Copies)</Button>
      </S.TitleRow>
      <S.ResolveGrid>
        <div />
        <S.GridHeader left>
          <RadioLabel
            id="resolve-from-timeline"
            label="From Timeline"
            onClick={() => setCombo(entry1)}
            checked={entryEqual(entry1, combo)}
          />
        </S.GridHeader>
        <S.GridHeader>
          <RadioLabel
            id="resolve-from-file"
            label="From File"
            onClick={() => setCombo(entry2)}
            checked={entryEqual(entry2, combo)}
          />
        </S.GridHeader>

        <ResolveRow entryKey="name" {...rowProps} />
        <ResolveRow entryKey="start" {...rowProps} />
        <ResolveRow entryKey="end" {...rowProps} />
        <ResolveRow entryKey="category" {...rowProps} />
        <ResolveRow entryKey="location" {...rowProps} />
        <ResolveRow entryKey="anniversary" {...rowProps} />
        <ResolveRow entryKey="notes" {...rowProps} />
      </S.ResolveGrid>

      <ButtonTray right>
        <Button onClick={acceptCombo}>Accept Selected Details</Button>
      </ButtonTray>
    </CenteredModal>
  );
};

export default ResolveModal;
