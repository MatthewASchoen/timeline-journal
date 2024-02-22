import { PartialEntry } from '../../types/entry';
import { hasDays } from '../../types/when-compare';
import { CheckboxLabel } from '../../ui/InputLabel';
import LabelTextbox from '../../ui/LabelTextbox';
import * as S from './styled';

type EntryDetailsFormProps = {
  entry: PartialEntry;
  setEntry: (entry: PartialEntry) => void;
  categories: string[];
  locations: string[];
};

const EntryDetailsForm = ({
  entry,
  setEntry,
  categories,
  locations,
}: EntryDetailsFormProps): JSX.Element => {
  const { name, category, location, anniversary, notes } = entry;
  return (
    <S.Details>
      <S.NameInput
        id="form-name"
        label="Name*:"
        value={name}
        setValue={name => setEntry({ ...entry, name })}
        inputProps={{ autoComplete: 'off', autoFocus: true }}
      />
      <S.CatAndLoc>
        <LabelTextbox
          id="form-category"
          label="Category:"
          value={category}
          setValue={category => setEntry({ ...entry, category })}
          suggestions={categories}
        />
        <LabelTextbox
          id="form-location"
          label="Location:"
          value={location}
          setValue={location => setEntry({ ...entry, location })}
          suggestions={locations}
        />
      </S.CatAndLoc>
      <CheckboxLabel
        id="form-anniversary"
        label="Show anniversaries on timeline (for birthdays, etc)"
        checked={anniversary}
        onChange={() => setEntry({ ...entry, anniversary: !anniversary })}
        disabled={entry.start && !hasDays(entry.start)}
      />
      <S.NoteGroup label="Notes:">
        <S.NoteBox
          value={notes}
          onChange={e => setEntry({ ...entry, notes: e.target.value })}
        />
      </S.NoteGroup>
    </S.Details>
  );
};

export default EntryDetailsForm;
