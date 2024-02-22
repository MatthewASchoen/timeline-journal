import { Timeline } from '../types/entry';
import { createTimelineCSV } from './timeline-parser';

export const timelineBlobUrl = (timeline: Timeline): string => {
  const csv = createTimelineCSV(timeline);
  const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  return window.URL.createObjectURL(csvData);
};

export const downloadTimeline = (
  timeline: Timeline,
  filename: string
): void => {
  const tempLink = document.createElement('a');
  const url = timelineBlobUrl(timeline);
  tempLink.href = url;
  tempLink.setAttribute('download', `${filename}.csv`);
  tempLink.click();
  window.URL.revokeObjectURL(url);
  //document.removeChild(tempLink);
};
