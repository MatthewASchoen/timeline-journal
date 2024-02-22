import {
  Entry,
  PartialEntry,
  entryEqual,
  isEntryValid,
} from '../../types/entry';
import { Button, ButtonTray } from '../../ui/Button';
import ConfirmButton from '../../ui/ConfirmButton';
import { capitalize } from '../../utility/string-stuff';

const saveStatus = (
  baseEntry: PartialEntry,
  newEntry: PartialEntry,
  isNew: boolean
): {
  isDirty: boolean;
  canSave: boolean;
  saveText: string;
  cancelText: string;
} => {
  const cancelText = `Cancel ${isNew ? 'New Entry' : 'Editing Entry'}`;
  const hasWhen = !!newEntry.start;
  const hasName = !!newEntry.name;

  const isDirty = !entryEqual(baseEntry, newEntry);

  if (!hasWhen || !hasName) {
    return {
      isDirty,
      canSave: false,
      saveText: `${capitalize(
        [!hasName && 'enter a name', !hasWhen && 'specify when']
          .filter(Boolean)
          .join(' and ')
      )} to save`,
      cancelText,
    };
  }

  return {
    isDirty,
    canSave: isNew || isDirty,
    saveText: isNew
      ? 'Save Entry'
      : !isDirty
      ? 'No changes made'
      : 'Save Changes',
    cancelText,
  };
};

type EditEntryButtonsProps = {
  baseEntry: PartialEntry;
  entry: PartialEntry;
  isNew: boolean;
  onSave: (entry: Entry) => void;
  onCancel: () => void;
};

const EditEntryButtons = ({
  baseEntry,
  entry,
  isNew,
  onSave,
  onCancel,
}: EditEntryButtonsProps): JSX.Element => {
  const { isDirty, canSave, saveText, cancelText } = saveStatus(
    baseEntry,
    entry,
    isNew
  );
  return (
    <ButtonTray right>
      <Button
        disabled={!canSave}
        onClick={isEntryValid(entry) ? () => onSave(entry) : undefined}
      >
        {saveText}
      </Button>
      <ConfirmButton
        message="You have pending changes. Cancel them?"
        onConfirm={onCancel}
        yesText="Yes, Discard my Changes"
        noText="No, Continue Editing"
        disableModal={!isDirty}
      >
        {cancelText}
      </ConfirmButton>
    </ButtonTray>
  );
};

export default EditEntryButtons;
