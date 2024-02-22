import { useState } from 'react';
import { Entry, PartialEntry } from '../../types/entry';
import * as S from './styled';
import EntryWhenPicker from './EntryWhenPicker';
import EntryDetailsForm from './EntryDetailsForm';
import EditEntryButtons from './EditEntryButtons';
import { hasDays } from '../../types/when-compare';

export type EntryFormProps = {
  baseEntry: PartialEntry;
  isNew: boolean;
  categories: string[];
  locations: string[];
  onSave: (entry: Entry) => void;
  onCancel: () => void;
};

const EditEntryView = ({
  baseEntry,
  isNew,
  categories,
  locations,
  onSave,
  onCancel,
}: EntryFormProps): JSX.Element => {
  const [entry, setEntry] = useState<PartialEntry>(baseEntry);

  return (
    <S.EntryFormContainer>
      <S.WhenAndDetails>
        <S.DetailsGroup label="Entry Details">
          <EntryDetailsForm
            entry={entry}
            setEntry={setEntry}
            categories={categories}
            locations={locations}
          />
        </S.DetailsGroup>
        <S.WhenGroup label="Entry Timeframe">
          <EntryWhenPicker
            entry={entry}
            onChange={(ongoing, start, end) =>
              setEntry({
                ...entry,
                start,
                end,
                ongoing,
                anniversary: entry.anniversary && (!start || hasDays(start)),
              })
            }
            highlightColor={S.whenPickerHighlight}
          />
          <EditEntryButtons
            baseEntry={baseEntry}
            entry={entry}
            isNew={isNew}
            onSave={onSave}
            onCancel={onCancel}
          />
        </S.WhenGroup>
      </S.WhenAndDetails>
    </S.EntryFormContainer>
  );
};

export default EditEntryView;
