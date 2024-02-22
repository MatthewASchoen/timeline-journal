import * as S from './styled';
import TimelineView from '../TimelineView';
import EntryDetailsModal from '../EntryDetailsModal';
import EditEntryView from '../EditEntryView';
import IntroModal from '../IntroModal';
import { useTimelineState, useViewState } from './state-hooks';
import HelpView from '../HelpView';
import { ColorSampler } from '../../test/ColorSampler';

const TimelineApp = (): JSX.Element => {
  const timelineState = useTimelineState();
  const {
    timeline,
    timelineActions,
    loadingTimeline,
    filter,
    setFilter,
    introSeen,
    setIntroSeen,
    categories,
    locations,
  } = timelineState;

  const {
    currentView,
    openTimeline,
    openDetails,
    openEdit,
    openNew,
    openHelp,
    setView,
  } = useViewState();

  if (loadingTimeline) return <></>;

  let primaryView: JSX.Element;

  switch (currentView.name) {
    case 'timeline':
    case 'details':
      primaryView = (
        <>
          {timeline && currentView.name === 'details' && (
            <EntryDetailsModal
              entry={currentView.entry}
              closeView={openTimeline}
              updateFilter={part => {
                setFilter({ ...filter, ...part });
                openTimeline();
              }}
              editEntry={() => openEdit(currentView.entry)}
              deleteEntry={() => {
                timelineActions.delete(currentView.entry);
                openTimeline();
              }}
            />
          )}
          <TimelineView
            {...timelineState}
            openEntry={openDetails}
            editEntry={openEdit}
            newEntry={openNew}
            openHelp={() => openHelp('timeline')}
          />
          <IntroModal
            isOpen={!introSeen}
            closeModal={() => setIntroSeen(true)}
            openAbout={() => {
              setIntroSeen(true);
              openHelp('about');
            }}
            openHowTo={() => {
              setIntroSeen(true);
              openHelp('timeline');
            }}
          />
        </>
      );
      break;
    case 'edit':
      primaryView = (
        <EditEntryView
          baseEntry={currentView.entry}
          isNew={currentView.isNew}
          categories={categories}
          locations={locations}
          onSave={entry => {
            if (currentView.isNew) {
              timelineActions.add(entry);
            } else {
              timelineActions.update(currentView.entry, entry);
            }
            openDetails(entry);
          }}
          onCancel={openTimeline}
        />
      );
      break;
    case 'help':
      primaryView = (
        <HelpView
          tab={currentView.tab}
          setTab={openHelp}
          goBack={openTimeline}
          setView={setView}
        />
      );
      break;
    case 'colors':
      primaryView = <ColorSampler goBack={() => openHelp('changelog')} />;
      break;
  }

  return <S.AppContainer>{primaryView}</S.AppContainer>;
};

export default TimelineApp;
