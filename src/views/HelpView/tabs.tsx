import { useMemo, useState } from 'react';
import {
  saveHighlight,
  saveTimelineButtonText,
} from '../../components/SaveButton';
import { chooseEntriesToSaveText } from '../../components/SaveModal';
import { TabWithId } from '../../ui/Group';
import { Info, InfoHeader, Section, B, I } from '../../ui/Info';
import {
  allTimeLabel,
  filterHighlight,
} from '../TimelineView/TimelineFilterPanel';
import {
  changeLog,
  listChanges,
  newChangesFirst,
  oldChangesFirst,
} from './changelog';
import * as S from './styled';
import { RadioLabel } from '../../ui/InputLabel';
import { RadioPair } from '../../ui/InputLabel/styled';
import { ClickySpan } from '../../ui/ClickySpan';
import { upcoming } from './future';
import { loadTimelineButtonText } from '../../components/LoadButtonWithModal';
import { AppView } from '../TimelineApp/state-hooks';
import { relationColors } from '../TimelineView/list-helpers';

const saveHighlightColor = saveHighlight.highlight?.color;

const About = (): JSX.Element => (
  <S.HelpContents>
    <Section>
      <InfoHeader>Timeline Journal</InfoHeader>
      <Info>
        Hello again! In case you missed it the first time, my name is Matt. I
        created this page in my spare time to track life events after realizing
        that I couldn't give a good picture of what was going on at specific
        times in my past. I wanted to be able to point to a year, month, or day
        in my life and be able to answer questions like "where was I living?",
        "what was I doing?", "what was going on?". As a web developer whose
        personal projects so far haven't been web-based, I decided to try my
        hand at making a small website to accomplish this.
      </Info>
    </Section>
    <Section>
      <Info>
        My design goals for this project were as follows:
        <S.HelpList>
          <li>
            Be able to define (and save) life events and updates as specifically
            as a day, or as vaguely as a year (I knew I wouldn't be able to get
            dates for everything)
          </li>
          <li>
            Be able to look at any time (day, month, year) and see what was
            happening, per my saved entries
          </li>
          <li>
            Be able to maintain all my data in a personal file, and run this
            site without a database
          </li>
        </S.HelpList>
      </Info>
    </Section>
    <Section>
      <Info>
        With these goals in mind, I made a spreadsheet of every meaningful event
        I could think of, and set about making a program to make it look nice.
        What you're looking at is the result of that work. I still have more to
        add and change, and I am always open to feedback, so please let me know
        what you think!
      </Info>
    </Section>
  </S.HelpContents>
);

const TimelineOverview = (): JSX.Element => (
  <S.HelpContents>
    <Section>
      <InfoHeader>The Main Timeline Page</InfoHeader>
      <Info>
        The main view of this site lets you view your timeline as lists of
        filtered entries.
      </Info>
    </Section>
    <S.SplitInfo>
      <Section>
        <InfoHeader>Timeline Filters</InfoHeader>
        <Info>
          On the left side of the page you can select which timeline entries you
          want to see. You can filter your entries by:
          <S.HelpList>
            <li>
              When the entry happened, selecting a day, month, or year from the
              calendar (or click <B>{allTimeLabel}</B> to see everything you
              have)
            </li>
            <li>Text contained in the entry's name or notes</li>
            <li>Entry Categories and Locations</li>
          </S.HelpList>
          All current filters are highlighted in{' '}
          <B back={filterHighlight}>this color</B>, and changing them affects
          which entries show up in the lists on the right side of the page.
        </Info>
      </Section>
      <Section>
        <InfoHeader>Entry Lists</InfoHeader>
        <Info>
          On the right side of the page you can see your filtered entries. The
          title at the top gives a description of your current selection (such
          as "Work Entries - July 2020", if you filtered the Category and
          timeframe), and each part of this text can be clicked separately to
          disable the associated filter. Underneath is three toggleable lists:
          <S.HelpList>
            <li>
              Entries that <B color={relationColors.start}>started</B>,{' '}
              <B color={relationColors.end}>ended</B>, or were completely within
              the given time period
            </li>
            <li>
              Entries that are/were Ongoing (started before and ended after the
              given timeframe, or haven't finished yet)
            </li>
            <li>
              Entries with{' '}
              <B color={relationColors.anniversary}>anniversaries</B> in the
              given day/month, with their counts
            </li>
          </S.HelpList>
          Mouse over an entry to see it on the calendar, or click one to open
          its full details. From the details pane there are options to edit or
          delete entries, or click any part of the entry to filter the timeline
          by the given detail.
        </Info>
      </Section>
    </S.SplitInfo>
  </S.HelpContents>
);

const SavingAndLoading = ({
  setTab,
}: {
  setTab: (tab: string) => void;
}): JSX.Element => (
  <S.HelpContents>
    <Section>
      <InfoHeader>Saving and Loading Timelines</InfoHeader>
      <Info>
        At the top of the main Timeline view there are buttons for saving
        timelines to and loading timelines from files. I used some browser
        tricks to store data locally on your computer, so you shouldn't lose
        anything if you always view your timeline with the same browser (see{' '}
        <ClickySpan onClick={() => setTab('tech')} linkLike>
          Technical Stuff
        </ClickySpan>{' '}
        for a deeper dive), but this site does not have a database, and you
        should save your data to a file every time you make changes.
      </Info>
      <Info>
        All Timelines are stored as <B>comma-separated value (CSV)</B> files.
        This is a simple spreadsheet format in which cell data is separated by
        commas, and you should be able to look at your files in programs such as
        Google Sheets or Microsoft Excel. The format of these files is very
        specific, so try saving a file with some example entries if you want to
        see what it looks like and edit it manually. I personally would
        recommend storing your file in a cloud storage service like Google Drive
        to keep it backed up and safe.
      </Info>
    </Section>
    <S.SplitInfo>
      <Section>
        <InfoHeader>Saving a Timeline</InfoHeader>
        <Info>
          When you click <B>{saveTimelineButtonText}</B>, you will be prompted
          what specifically you want to save. By default it will save all
          entries from your timeline, but if you click{' '}
          <B>{chooseEntriesToSaveText}</B> you can manually select what you want
          to go into your new file.
        </Info>
        <Info>
          For example, if you wanted to share this app with family members, you
          could deselect all entries, filter the Category to Birthday, and then
          select all of family birthdays to create a starting file for them.{' '}
          <B>Note</B>: changing the filters only changes what you can <I>see</I>{' '}
          in the list, not what is selected, so you can filter multiple times
          and click individual entries until everything you want is checked.
        </Info>
        <Info>
          The save button will glow <B back={saveHighlightColor}>this color</B>{' '}
          when changes have been made since your last save. Save often!
        </Info>
      </Section>
      <Section>
        <InfoHeader>Loading a Timeline</InfoHeader>
        <Info>
          When you click <B>{loadTimelineButtonText}</B>, you will be prompted
          for a (CSV) Timeline file. If you don't currently have any entries in
          the app, it will load the timeline immediately. If you have any
          entries currently, you will be asked if you want to load the timeline
          fresh from the given file (wiping away any unsaved data!), or combine
          it with what you have open.
        </Info>
        <Info>
          Mixing a timeline file into your current timeline may seem a little
          complicated, but I tried to make things as painless as possible. The
          top option will look for duplicate entries (by name), and if it finds
          anything identical, it will only keep one copy, allowing you to safely
          load a newer version of your current timeline without any duplicate
          entries being created. If it notices that two entries have the same
          name, but any other details are different, it will go through each of
          these "conflicts" and ask you to pick the most up-to-date version of
          the data.
        </Info>
        <Info>
          For example, if one previously-ongoing entry has ended and you updated
          its end date in the app, then you loaded a copy of your timeline from
          before the update, it will ask you which end date is correct, and
          create you a single, clean copy of the entry with the correct details.
        </Info>
      </Section>
    </S.SplitInfo>
    <Section></Section>
  </S.HelpContents>
);

const CreatingAndEditing = (): JSX.Element => (
  <S.HelpContents>
    <Section>
      <InfoHeader>Creating and Editing Entries</InfoHeader>
      <Info>
        To create a new entry, click the <B>Create Entry</B> button on the top
        right of the main Timeline page, above the filtered entry lists. From
        here it will ask if you would like to start from scratch or use a
        template, the latter of which simply fills in the Category and part of
        the entry name for you. You can edit an existing entry by clicking it on
        the Timeline page and clicking <B>Edit Entry</B> on the details panel.
      </Info>
      <Info>
        The edit page is the same for new and existing entries, and is divided
        into details on the left side and timeframe on the right.
      </Info>
    </Section>
    <S.SplitInfo>
      <Section>
        <InfoHeader>Entry Details</InfoHeader>
        <Info>
          The Entry Details section on the left allows you to specify the Name,
          Category, Location, Anniversary Status, and Notes of your entry:
          <S.HelpList>
            <li>
              <B>Name</B>: a title for your entry. Entry names can be the same,
              but I would recommend keeping them unique to prevent issues when
              loading multiple timeline files
            </li>
            <li>
              <B>Category and Location</B>: these fields can be any text you
              want, and can be used for quick filtering in the main timeline.
              Previous values you have used will auto-complete in these text
              boxes for quick selection
            </li>
            <li>
              <B>Anniversary Status</B>: checking this box will make the start
              date of this entry show up on the same day each year in the
              Anniversaries/Birthdays list on the main Timeline page, along with
              how many years it's been
            </li>
            <li>
              <B>Notes</B>: anything else you want to say about the entry!
            </li>
          </S.HelpList>
        </Info>
      </Section>
      <Section>
        <InfoHeader>Entry Timeframe (When)</InfoHeader>
        <Info>
          The When section on the right allows you to specify when the entry
          was. There are two types of entries to choose from when it comes to
          timeframe:
          <S.HelpList>
            <li>
              <B>Complete Entries</B> are entries that took place in a single
              timeframe, or between a start and end timeframe, such as a one-day
              entry or something that lasted a couple days/months/years. Choose
              a day, month, or year on the calendar to specify the first
              timeframe of the entry, and then choose another before or after
              that time if the entry took place over a range
            </li>
            <li>
              <B>Ongoing Entries</B> are entries that have a start day, month,
              or year, but have not ended yet. Choose the day, month, or year
              that the entry started on the calendar, and it will highlight all
              time going forward
            </li>
          </S.HelpList>
          Below the calendar it will tell you your current selection, as well as
          how long the entry lasted and some contextual buttons for fixing your
          selection. A timeframe is required to save an entry.
        </Info>
      </Section>
    </S.SplitInfo>
    <Section>
      <Info>
        The only information required to save an entry is a valid <B>Name</B>{' '}
        and <B>Timeframe</B>.
      </Info>
    </Section>
  </S.HelpContents>
);

const TechnicalStuff = (): JSX.Element => (
  <S.HelpContents>
    <Section>
      <InfoHeader>Technical Stuff</InfoHeader>
      <Info></Info>
    </Section>
    <S.SplitInfo>
      <Section>
        <InfoHeader></InfoHeader>
        <Info></Info>
      </Section>
      <Section>
        <InfoHeader></InfoHeader>
        <Info></Info>
      </Section>
    </S.SplitInfo>
    <Section></Section>
  </S.HelpContents>
);

const FutureImprovements = (): JSX.Element => (
  <S.HelpContents>
    <Section>
      <InfoHeader>Potential Future Changes and Improvements</InfoHeader>
      <Info>
        <S.HelpList>
          {listChanges(
            'future',
            upcoming.features,
            'Feature',
            relationColors.start
          )}
          {listChanges(
            'future',
            upcoming.updates,
            'Update',
            relationColors.anniversary
          )}
          {listChanges('future', upcoming.fixes, 'Fix', relationColors.end)}
        </S.HelpList>
      </Info>
    </Section>
    <Section>
      <Info>
        <B>
          Please let me know personally if you have any feedback, bugs to
          report, or ideas!
        </B>
      </Info>
    </Section>
  </S.HelpContents>
);

const Changelog = ({
  setView,
}: {
  setView: (view: AppView) => void;
}): JSX.Element => {
  const [sortNew, setSortNew] = useState(true);

  const log = useMemo(
    () => changeLog(setView).sort(sortNew ? newChangesFirst : oldChangesFirst),
    [setView, sortNew]
  );

  return (
    <S.HelpContents>
      <Section>
        <InfoHeader>Timeline Journal Changelog</InfoHeader>
        <Info>
          <RadioPair>
            <RadioLabel
              id="newest-changes-first"
              label="Newest Changes First"
              onChange={() => setSortNew(true)}
              checked={sortNew}
            />
            <RadioLabel
              id="oldest-changes-first"
              label="Oldest Changes First"
              onChange={() => setSortNew(false)}
              checked={!sortNew}
            />
          </RadioPair>
        </Info>
        {log.map(({ date, features, updates, fixes }) => (
          <Info>
            {date}:
            <S.HelpList>
              {listChanges(date, features, 'New', relationColors.start)}
              {listChanges(date, updates, 'Update', relationColors.anniversary)}
              {listChanges(date, fixes, 'Fix', relationColors.end)}
            </S.HelpList>
          </Info>
        ))}
      </Section>
    </S.HelpContents>
  );
};

export const helpTabs = (
  setTab: (tab: string) => void,
  setView: (view: AppView) => void
): TabWithId[] => [
  { id: 'about', name: 'About', content: <About /> },
  { id: 'timeline', name: 'Timeline Overview', content: <TimelineOverview /> },
  {
    id: 'save-load',
    name: 'Saving/Loading Timelines',
    content: <SavingAndLoading setTab={setTab} />,
  },
  {
    id: 'edit',
    name: 'Creating/Editing Entries',
    content: <CreatingAndEditing />,
  },
  { id: 'tech', name: 'Technical Stuff', content: <TechnicalStuff /> },
  { id: 'future', name: 'Future', content: <FutureImprovements /> },
  {
    id: 'changelog',
    name: 'Changelog',
    content: <Changelog setView={setView} />,
  },
];
