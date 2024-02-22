import { useEffect, useMemo, useState } from 'react';
import {
  Entry,
  Timeline,
  newFilter,
  PartialEntry,
  EntryFilter,
  entryCompare,
} from '../../types/entry';
import {
  LS_KEYS,
  useStoredBool,
  useStoredTimeline,
} from '../../utility/storage';

export type TimelineActions = {
  set: (timeline: Timeline, needSave?: boolean) => void;
  add: (entry: Entry) => void;
  update: (original: Entry, update: Entry) => void;
  delete: (entry: Entry) => void;
};

export type TimelineState = {
  timeline: Timeline;
  timelineActions: TimelineActions;
  loadingTimeline: boolean;
  filter: EntryFilter;
  setFilter: (filter: EntryFilter) => void;
  isDirty: boolean;
  setDirty: (dirty: boolean) => void;
  introSeen: boolean;
  setIntroSeen: (seen: boolean) => void;
  categories: string[];
  locations: string[];
};

export const useTimelineState = (): TimelineState => {
  const [timeline, setTimeline] = useStoredTimeline();

  const [filter, setFilter] = useState(newFilter());

  const [isDirty, setDirty] = useStoredBool(LS_KEYS.NEEDS_SAVE);

  const [introSeen, setIntroSeen] = useStoredBool(LS_KEYS.INTRO_SEEN);

  const [categories, locations] = useMemo(() => {
    const categorySet = new Set<string>();
    const locationSet = new Set<string>();

    timeline?.forEach(({ category, location }) => {
      if (category) categorySet.add(category);
      if (location) locationSet.add(location);
    });

    return [Array.from(categorySet).sort(), Array.from(locationSet).sort()];
  }, [timeline]);

  useEffect(() => {
    const category = categories.includes(filter.category)
      ? filter.category
      : '';
    const location = locations.includes(filter.location) ? filter.location : '';

    if (category !== filter.category || location !== filter.location) {
      setFilter({ ...filter, category, location });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories, locations]);

  const timelineActions = useMemo<TimelineActions>(() => {
    const setAndSaveTimeline = (timeline: Timeline, needSave = true): void => {
      // No need to save if the timeline is empty
      setDirty(needSave && !!timeline.length);
      setTimeline(timeline);
    };

    return {
      set: setAndSaveTimeline,
      add: entry =>
        setAndSaveTimeline(
          timeline ? [...timeline, entry].sort(entryCompare) : [entry]
        ),
      update: (original, update) =>
        setAndSaveTimeline(
          timeline?.map(e => (e !== original ? e : update)) ?? []
        ),
      delete: entry =>
        setAndSaveTimeline(timeline?.filter(e => e !== entry) ?? []),
    };
  }, [setDirty, setTimeline, timeline]);

  return {
    timeline: timeline ?? [],
    timelineActions,
    loadingTimeline: !timeline,
    filter,
    setFilter,
    isDirty,
    setDirty,
    introSeen,
    setIntroSeen,
    categories,
    locations,
  };
};

type TimelineView = { name: 'timeline' };
type DetailsView = { name: 'details'; entry: Entry };
type EditView =
  | { name: 'edit'; entry: PartialEntry; isNew: true }
  | { name: 'edit'; entry: Entry; isNew: false };
type HelpView = { name: 'help'; tab: string };
type ColorView = { name: 'colors' };

export type AppView =
  | TimelineView
  | DetailsView
  | EditView
  | HelpView
  | ColorView;

type ViewState = {
  currentView: AppView;
  openTimeline: () => void;
  openDetails: (entry: Entry) => void;
  openEdit: (entry: Entry) => void;
  openNew: (template: PartialEntry) => void;
  openHelp: (tab?: string) => void;
  setView: (view: AppView) => void;
};

export const useViewState = (): ViewState => {
  const [currentView, setView] = useState<AppView>({ name: 'timeline' });
  return {
    currentView,
    openTimeline: () => setView({ name: 'timeline' }),
    openDetails: (entry: Entry) => setView({ name: 'details', entry }),
    openEdit: (entry: Entry) => setView({ name: 'edit', entry, isNew: false }),
    openNew: (template: PartialEntry) =>
      setView({ name: 'edit', entry: template, isNew: true }),
    openHelp: (tab = 'about') => setView({ name: 'help', tab }),
    setView,
  };
};
