import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { B, I } from '../../ui/Info';
import {
  loadHighlight,
  loadTimelineButtonText,
} from '../../components/LoadButtonWithModal';
import {
  newEntryButtonText,
  noEntriesHighlight,
} from '../../components/NewEntryButton';
import {
  saveHighlight,
  saveSomeEntriesText,
  saveTimelineButtonText,
} from '../../components/SaveButton';
import { PulseyText } from '../../ui/Info/PulseyText';
import { AppView } from '../TimelineApp/state-hooks';
import { ClickySpan } from '../../ui/ClickySpan';
import { filterHighlight } from '../TimelineView/TimelineFilterPanel';
import { relationColors } from '../TimelineView/list-helpers';
import { ICONS } from '../../types/icons';

type Changelist = ReactNode[];
export type Changes = {
  date: string;
  features?: Changelist;
  updates?: Changelist;
  fixes?: Changelist;
};

export const changeLog = (setView: (view: AppView) => void): Changes[] => [
  {
    date: '5/7/2023',
    features: ['Started work on web version of (previously C#) Timeline app'],
  },
  {
    date: '9/28/2023',
    features: ['Collapsible Event lists with checkboxes next to list labels'],
    updates: ['Moved Event View into a dialog'],
  },
  { date: '10/1/2023', features: ['Calendars embiggen on mouse-over'] },
  {
    date: '10/11/2023',
    features: [
      'Help page with About, Timeline Overview, Saving/Loading, and Creating/Editing sections',
      'Deployed project to Firebase for the first time!',
    ],
  },
  {
    date: '10/12/2023',
    updates: [
      'Better range highlighting on calendars to allow for hover states and multi-color highlighting',
    ],
  },
  {
    date: '10/19/2023',
    features: [
      'Separated Save dialog into options for saving entire timeline or saving only some events',
    ],
    updates: [
      'Buttons become outlined on tab-focus',
      "Press animation disabled for buttons that shouldn't move (like Save dropdown)",
    ],
    fixes: [
      'Visual glitch in which calendar rows shift briefly when a date pops open',
      'Visual glitch showing partial outlines on calendars in the Event View',
      'Better logic calculating time between dates to prevent text like "1 year, 364 days"',
    ],
  },
  {
    date: '10/20/2023',
    features: ['Changelog added to Help page (hello!)'],
  },
  {
    date: '10/23/2023',
    features: [
      'Added basic tooltips when mousing over a selectable timeframe on a calendar picker',
    ],
    updates: [
      'The Anniversary list now shows anniversaries for a selected year',
      <>
        Changed the load process to only consider events duplicates if they have
        the same name <I>and</I> overlapping timespans
      </>,
      'Event edit page only allows tracking anniversaries for events with full start dates (not start month/year)',
      'Added link to Technical Stuff from Saving/Loading help pages',
    ],
    fixes: [
      'Stopped scrollbars from appearing when pressing down save/cancel on the Edit page',
    ],
  },
  {
    date: '10/25/2023',
    features: [
      'Separated load dialog into options for adding to the current timeline or clearing the app and loading a file fresh',
    ],
    updates: [
      "Event info now says how many days until events that haven't started yet",
      'Clicking the current day/month/year selection in the edit page now toggles it off',
      'Added the day of the week to calendar tooltips',
      'Added info tooltips to hovered events in lists',
    ],
    fixes: [
      'Glowing save button should better reflect when changes have been made',
    ],
  },
  {
    date: '10/27/2023',
    features: [
      `Added edit button (${ICONS.pencil}) next to the year in the calendar picker`,
      'Clicking and holding on the arrow buttons next to the year in the calendar picker quickly cycles the year',
      'Added a checkbox to the New Event dialog to start the event on the current day/month/year selection (if present)',
      'Simplified edit view showing the current day/month/year selections below the calendar with Xs to clear them',
      'Added tooltips to several buttons/inputs, such as event type (Complete/Ongoing)',
    ],
  },
  {
    date: '10/28/2023',
    updates: [
      'Renamed "events" to "entries" app-wide to avoid the fixed-time implications of an "event".',
    ],
  },
  {
    date: '11/6/2023',
    features: [
      'Added a message that replaces the filtered timeline lists when your timeline is empty, instructing you to create entries or load a timeline',
    ],
    updates: [
      <>
        Added highlighting to the{' '}
        <B back={loadHighlight.highlight?.color}>{loadTimelineButtonText}</B>{' '}
        and{' '}
        <B back={noEntriesHighlight.highlight?.color}>{newEntryButtonText}</B>{' '}
        buttons when the user has no timeline entries
      </>,
      <>
        <B>{saveTimelineButtonText}</B>, <B>{loadTimelineButtonText}</B>, and{' '}
        <B>{newEntryButtonText}</B> buttons now <PulseyText b>pulse</PulseyText>{' '}
        every so often to draw attention (while highlighted)
      </>,
      'Added autofocus to the Name field on the new entry page',
    ],
  },
  {
    date: '11/11/2023',
    features: [
      <>
        Created a super secret{' '}
        <ClickySpan
          onClick={() => setView({ name: 'colors' })}
          linkLike
          noTab
          title="Found it!"
        >
          color testing page
        </ClickySpan>{' '}
        that you'll never find
      </>,
    ],
    updates: [
      <>
        Reconfigured <B>{saveSomeEntriesText}</B> dialog into a clearer two-list
        selection structure
      </>,
      <>
        Stole a bunch of colors from the internet to eventually make things look
        better (updated <B color={relationColors.start}>Start</B>,{' '}
        <B color={relationColors.end}>End</B>, and{' '}
        <B color={relationColors.anniversary}>Anniversary</B> colors first)
      </>,
      'Added placeholder text to text search box',
    ],
    fixes: [
      'Removing the last entry with the selected category/location now resets the applicable filter(s)',
    ],
  },
  {
    date: '11/22/2023',
    updates: [
      <>
        Updated colors for highlighted{' '}
        <B back={saveHighlight.highlight?.color}>{saveTimelineButtonText}</B>,{' '}
        <B back={loadHighlight.highlight?.color}>{loadTimelineButtonText}</B>,
        and{' '}
        <B back={noEntriesHighlight.highlight?.color}>{newEntryButtonText}</B>{' '}
        buttons
      </>,
    ],
    fixes: [
      <>
        Text search box once again becomes{' '}
        <B back={filterHighlight}>highlighted</B> when there is text entered
        (and color has been updated)
      </>,
    ],
  },
  {
    date: '11/26/2023',
    updates: [
      <>
        <B>{loadTimelineButtonText}</B> button now opens the load dialog
        directly when there are no entries in the app (rather than showing load
        options)
      </>,
    ],
    fixes: [
      <>
        Previously, when you tried to create a new Entry and selected{' '}
        <B>"Starts in/on [current timeline selection]"</B> <I>and</I> select a{' '}
        <B>template</B>, it would register this as an edit (rather than a new
        Entry), and would not add the Entry to the timeline when complete. New
        Entries created this way should now be added properly
      </>,
    ],
  },
  {
    date: '2/13/2024',
    features: [
      `Added edit (${ICONS.pencil}) and delete (${ICONS.trash}) icon buttons to each Entry listed in the main Timeline view`,
    ],
    updates: [
      <>
        Changed the calendar background color from <B back="snow">snow</B> to{' '}
        <B back="floralwhite">floralwhite</B>
      </>,
      'Overhauled internal timeline management. Please save your timeline often and report if you have any issues adding, removing, or updating Entries',
    ],
    fixes: [
      'Tooltips on Entries in the main timeline view now display start date to end date, rather than start date twice',
    ],
  },
  // {
  //   date: '',
  //   features: [''],
  //   updates: [''],
  //   fixes: [''],
  // },
];

export const newChangesFirst = (c1: Changes, c2: Changes) =>
  dayjs(c2.date).diff(c1.date);
export const oldChangesFirst = (c1: Changes, c2: Changes) =>
  dayjs(c1.date).diff(c2.date);

export const listChanges = (
  date: string,
  changes: Changelist | undefined,
  prefix: string,
  color: string
): JSX.Element => (
  <>
    {changes?.map((change, i) => (
      <li key={`${date}-${prefix}-${i}`}>
        <B color={color}>{prefix}</B>: {change}
      </li>
    ))}
  </>
);
