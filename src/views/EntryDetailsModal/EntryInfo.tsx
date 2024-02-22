import { Entry, EntryFilter } from '../../types/entry';
import { When, anniversariesSince, isAfter, newWhen } from '../../types/when';
import { Button, ButtonTray } from '../../ui/Button';
import { LinkSpan } from '../../ui/ClickySpan';
import WhenLink from '../../components/WhenLink';
import * as S from './styled';
import ConfirmButton from '../../ui/ConfirmButton';

type EntryInfoProps = {
  entry: Entry | undefined;
  updateFilter: (filter: Partial<EntryFilter>) => void;
  editEntry: () => void;
  deleteEntry: () => void;
  closeEntry: () => void;
};

const EntryInfo = ({
  entry,
  editEntry,
  deleteEntry,
  closeEntry,
  updateFilter,
}: EntryInfoProps): JSX.Element => {
  if (!entry) {
    return (
      <S.SelectEntryMessage>
        Select an entry to see its information
      </S.SelectEntryMessage>
    );
  }
  const { name, start, end, category, location, ongoing, anniversary, notes } =
    entry;
  let nameInfo: JSX.Element | undefined = undefined;
  if (category || location) {
    const catLink = category && (
      <LinkSpan onClick={() => updateFilter({ category })}>{category}</LinkSpan>
    );

    const locLink = location && (
      <LinkSpan onClick={() => updateFilter({ location })}>{location}</LinkSpan>
    );

    nameInfo =
      catLink && locLink ? (
        <>
          {catLink}, {locLink}:{' '}
        </>
      ) : (
        <>{catLink || locLink}: </>
      );
  }

  const setWhen = (when: When): void => updateFilter({ when });

  const today = newWhen();
  const unstarted = isAfter(start, today);

  const startPrefix = ongoing && unstarted ? 'Starts ' : null;

  const startLink = <WhenLink value={start} setValue={setWhen} />;

  const endLink =
    ongoing && !unstarted ? (
      <WhenLink value={today} setValue={setWhen}>
        Present
      </WhenLink>
    ) : end ? (
      <WhenLink value={end} setValue={setWhen} />
    ) : null;

  return (
    <S.InfoContainer
      label="Entry Details"
      buttons={<Button onClick={closeEntry}>Close</Button>}
    >
      <S.EntryDetails>
        <S.NameLine>
          {nameInfo}
          {name}
        </S.NameLine>
        <span>
          {startPrefix}
          {startLink}
          {endLink && <> to {endLink}</>}
        </span>
        {anniversary && <span>Anniversaries: {anniversariesSince(start)}</span>}
        {notes && <span>Notes: {notes}</span>}
      </S.EntryDetails>
      <ButtonTray right>
        <Button onClick={editEntry}>Edit Entry</Button>
        <ConfirmButton
          message="Are you sure you want to delete this entry?"
          onConfirm={deleteEntry}
          yesText="Delete Entry"
          noText="Cancel"
        >
          Delete Entry
        </ConfirmButton>
      </ButtonTray>
    </S.InfoContainer>
  );
};

export default EntryInfo;
