import { HTMLAttributes, useState } from 'react';
import { Timeline } from '../../types/entry';
import LoadModal from '../LoadModal';
import { useLoadInput } from '../LoadButton';
import { Menu, MenuItem } from '../../ui/Menu';
import { useConfirmModal } from '../../ui/ConfirmButton';
import { Button, ButtonProps } from '../../ui/Button';
import { BRIGHT } from '../../ui/colors';

export const loadTimelineButtonText = 'Load Timeline';

export const loadHighlight: ButtonProps = {
  highlight: {
    color: BRIGHT.orange, // 'orange',
    glow: 'darkorange',
  },
  pulse: true,
};

export interface LoadButtonWithModalProps
  extends HTMLAttributes<HTMLButtonElement> {
  timeline: Timeline;
  setTimeline: (timeline: Timeline, needSave: boolean) => void;
  needSave: boolean;
  setDirty: (dirty: boolean) => void;
}

export const LoadButtonWithModal = ({
  timeline,
  setTimeline,
  needSave,
  setDirty,
  // TODO: handle not used props
  ...props
}: LoadButtonWithModalProps): JSX.Element => {
  const [loadedTimeline, setLoadedTimeline] = useState<Timeline | undefined>();
  const [input, promptLoad] = useLoadInput({ disabled: !!loadedTimeline });

  const [promptClearAndLoad, clearAndLoadModal] = useConfirmModal({
    message:
      'This option will clear all entries from the current app and load data from a file. You have unsaved changes, which will be lost. Continue?',
    yesText:
      'Yes, I am sure all unsaved data is not important and I want to load another timeline',
    noText: 'No, cancel loading timeline',
    disableModal: !needSave,
    stackButtons: true,
    clickOutNo: true,
    onConfirm: () =>
      promptLoad(newTimeline => {
        setTimeline(newTimeline, false);
        setDirty(false);
      }),
  });

  return (
    <>
      {timeline.length ? (
        <Menu label={loadTimelineButtonText}>
          <MenuItem
            label="Add Entries from File"
            onClick={() =>
              promptLoad(newTimeline => {
                console.log({ newTimeline });
                if (timeline.length || !newTimeline.length)
                  setLoadedTimeline(newTimeline);
                else setTimeline(newTimeline, false);
              })
            }
          />
          <MenuItem
            label="Clear App and Load Timeline"
            onClick={promptClearAndLoad}
          />
        </Menu>
      ) : (
        <Button onClick={promptClearAndLoad} {...loadHighlight}>
          {loadTimelineButtonText}
        </Button>
      )}
      {input}
      {clearAndLoadModal}
      {loadedTimeline && (
        <LoadModal
          timeline={timeline}
          loadedTimeline={loadedTimeline}
          setTimeline={setTimeline}
          onClose={() => setLoadedTimeline(undefined)}
        />
      )}
    </>
  );
};

// export interface SaveButtonProps extends HTMLAttributes<HTMLButtonElement> {
//   getCSVData: () => string;
//   defaultFileName: string;
//   highlight?: boolean;
// }

// export const SaveButton = ({
//   getCSVData,
//   defaultFileName,
//   ...props
// }: SaveButtonProps): JSX.Element => {
//   const saveLink = useRef<HTMLAnchorElement>();

//   useEffect(() => {
//     saveLink.current = document.createElement('a');
//     saveLink.current.setAttribute('download', defaultFileName);
//     return () => {
//       //if (saveLink.current) document.removeChild(saveLink.current);
//     };
//   }, [defaultFileName]);

//   return (
//     <S.SaveButton
//       {...props}
//       onClick={e => {
//         if (!saveLink.current) return;
//         const csvData = getCSVData();
//         const blobData = new Blob([csvData], {
//           type: 'text/csv;charset=utf-8;',
//         });
//         const url = window.URL.createObjectURL(blobData);
//         saveLink.current.href = url;
//         saveLink.current.click();
//         window.URL.revokeObjectURL(url);
//         props.onClick?.(e);
//       }}
//     />
//   );
// };
