import { useState } from 'react';
import SaveModal from '../SaveModal';
import { LS_KEYS, useStoredString } from '../../utility/storage';
// import 'tippy.js/dist/tippy.css';
import { Menu, MenuItem } from '../../ui/Menu';
import { ButtonProps } from '../../ui/Button';
import { Timeline } from '../../types/entry';
import { BRIGHT } from '../../ui/colors';

export const saveTimelineButtonText = 'Save Timeline';

export const saveEntireTimelineText = 'Save Entire Timeline';
export const saveSomeEntriesText = 'Save Some Entries';

export const saveHighlight: ButtonProps = {
  highlight: {
    color: BRIGHT.yellow, // 'lemonchiffon',
    glow: 'gold',
  },
  pulse: true,
};

enum SaveType {
  NONE,
  ALL,
  SOME,
}

type SaveButtonProps = {
  timeline: Timeline;
  onSave: () => void;
  highlight: boolean;
  categories: string[];
  locations: string[];
};

const SaveButton = ({
  timeline,
  onSave,
  highlight,
  ...modalProps
}: SaveButtonProps): JSX.Element => {
  //const buttonRef = useRef<HTMLDivElement>(null);
  const [saveType, setSaveType] = useState(SaveType.NONE);
  const [filename, setFilename] = useStoredString(LS_KEYS.FILENAME);

  return (
    <>
      <Menu
        label={saveTimelineButtonText}
        buttonProps={highlight ? saveHighlight : undefined}
        disabled={!timeline.length}
      >
        <MenuItem
          label={saveEntireTimelineText}
          onClick={() => setSaveType(SaveType.ALL)}
        />
        <MenuItem
          label={saveSomeEntriesText}
          onClick={() => setSaveType(SaveType.SOME)}
        />
      </Menu>
      {/* <Tippy
        content={
          <Stack ref={buttonRef}>
            <Button
              onClick={() => {
                buttonRef.current?.blur();
                setSaveType(SaveType.ALL);
              }}
            >
              Save Entire Timeline
            </Button>
            <Button onClick={() => setSaveType(SaveType.SOME)}>
              Save Some Entries
            </Button>
          </Stack>
        }
        trigger="click"
        placement="bottom"
        theme="light"
        interactive
        appendTo={document.body}
      >
        <S.SaveButton highlight={highlight}>Save Timeline</S.SaveButton>
      </Tippy> */}
      {timeline && saveType !== SaveType.NONE && (
        <SaveModal
          timeline={timeline}
          allEntries={saveType === SaveType.ALL}
          initialFilename={filename}
          onSave={newFilename => {
            setFilename(newFilename);
            onSave();
          }}
          closeModal={() => setSaveType(SaveType.NONE)}
          {...modalProps}
        />
      )}
    </>
  );
};

export default SaveButton;
