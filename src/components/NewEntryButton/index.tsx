import { useState } from 'react';
import { Entry, EntryFilter, PartialEntry, newEntry } from '../../types/entry';
import CenteredModal, {
  ModalSubtitle,
  ModalTitle,
} from '../../ui/CenteredModal';
import { Button, ButtonProps } from '../../ui/Button';
import * as S from './styled';
import { CheckboxLabel } from '../../ui/InputLabel';
import { whenString } from '../../types/when';
import { BRIGHT } from '../../ui/colors';

export const newEntryButtonText = 'New Entry';

export const noEntriesHighlight: ButtonProps = {
  highlight: {
    color: BRIGHT.green, // 'lawngreen',
    glow: 'chartreuse',
  },
  pulse: true,
};

const ENTRY_TEMPLATES: [string, Partial<Entry>][] = [
  [
    'Birthday',
    { name: "'s Birthday", category: 'Birthday', anniversary: true },
  ],
  ['Travel', { name: 'Trip to ', category: 'Travel' }],
  ['New Job', { name: 'Working at ', category: 'Work', anniversary: true }],
  ['New Home', { name: 'Living at ', category: 'Life', anniversary: true }],
];

type NewEntryButtonProps = {
  filter: EntryFilter;
  setNewEntry: (entry: PartialEntry) => void;
  noEntries: boolean;
};

const NewEntryButton = ({
  filter,
  setNewEntry,
  noEntries,
}: NewEntryButtonProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [useWhen, setUseWhen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
    setUseWhen(false);
  };

  const setEntryAndClose = (template: PartialEntry) => {
    closeModal();
    setNewEntry(template);
  };

  const blankEntry = newEntry(useWhen ? { start: filter.when } : undefined);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        {...(noEntries ? noEntriesHighlight : {})}
      >
        {newEntryButtonText}
      </Button>
      <CenteredModal isOpen={isOpen} onRequestClose={closeModal}>
        <ModalTitle>New Entry</ModalTitle>

        {filter.when && (
          <ModalSubtitle>
            <CheckboxLabel
              id="use-filter-when"
              label={`Starts ${whenString(filter.when, undefined, {
                inOnFrom: true,
              })}`}
              checked={useWhen}
              onChange={() => setUseWhen(!useWhen)}
            />
          </ModalSubtitle>
        )}

        <Button onClick={() => setEntryAndClose(blankEntry)}>
          Create From Scratch
        </Button>
        <ModalSubtitle>Or start from a template:</ModalSubtitle>
        <S.TemplateGrid>
          {ENTRY_TEMPLATES.map(([text, partial]) => (
            <Button
              key={`new ${text}`}
              onClick={() => setEntryAndClose({ ...blankEntry, ...partial })}
            >
              {text}
            </Button>
          ))}
        </S.TemplateGrid>
        <Button onClick={closeModal}>Cancel</Button>
      </CenteredModal>
    </>
  );
};

export default NewEntryButton;
