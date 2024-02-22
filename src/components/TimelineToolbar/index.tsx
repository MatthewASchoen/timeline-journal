import { PartialEntry, Timeline } from '../../types/entry';
import NewEntryButton from '../NewEntryButton';
import SaveButton from '../SaveButton';
import * as S from './styled';

type TimelineToolbarProps = {
  timeline: Timeline;
  onLoad: (timeline: Timeline) => void;
  onSave: () => void;
  needSave: boolean;
  setNewEvent: (template: PartialEntry) => void;
  categories: string[];
  locations: string[];
};

// NO LONGER USED
// const TimelineToolbar = ({
//   timeline,
//   onLoad,
//   setNewEvent,
//   needSave,
//   ...saveButtonProps
// }: TimelineToolbarProps): JSX.Element => {
//   return (
//     <S.ToolbarTray>
//       {/* <LoadButtonWithModal
//         timeline={timeline}
//         setTimeline={onLoad}
//         needSave={needSave}
//       /> */}
//       <SaveButton
//         timeline={timeline}
//         highlight={needSave}
//         {...saveButtonProps}
//       />
//       <NewEventButton setNewEvent={setNewEvent} />
//     </S.ToolbarTray>
//   );
// };

//export default TimelineToolbar;
