import { format, startOfYear, startOfMonth, startOfWeek, startOfDay, endOfYear, endOfMonth, endOfWeek, endOfDay, eachMonthOfInterval, eachWeekOfInterval, eachDayOfInterval } from "date-fns";
import type { Document } from "@/types/timeline";

export type TimelineZoom = 'year' | 'month' | 'week' | 'day';

export interface TimelineSegment {
  date: Date;
  period: string;
  displayName: string;
  documents: Document[];
  count: number;
}

export function groupDocumentsByTimeSegments(
  documents: Document[],
  zoom: TimelineZoom,
  startDate?: Date,
  endDate?: Date
): TimelineSegment[] {
  if (documents.length === 0) return [];

  // Determine date range
  const docDates = documents.map(doc => new Date(doc.date)).sort((a, b) => a.getTime() - b.getTime());
  const rangeStart = startDate || docDates[0];
  const rangeEnd = endDate || docDates[docDates.length - 1];

  let segments: TimelineSegment[] = [];

  switch (zoom) {
    case 'year': {
      const years = eachMonthOfInterval({ start: rangeStart, end: rangeEnd })
        .map(date => startOfYear(date))
        .filter((date, index, arr) => arr.findIndex(d => d.getTime() === date.getTime()) === index);
      
      segments = years.map(yearStart => {
        const yearEnd = endOfYear(yearStart);
        const yearDocs = documents.filter(doc => {
          const docDate = new Date(doc.date);
          return docDate >= yearStart && docDate <= yearEnd;
        });
        
        return {
          date: yearStart,
          period: format(yearStart, 'yyyy'),
          displayName: format(yearStart, 'yyyy'),
          documents: yearDocs,
          count: yearDocs.length
        };
      });
      break;
    }
    case 'month': {
      const months = eachMonthOfInterval({ start: rangeStart, end: rangeEnd });
      
      segments = months.map(monthStart => {
        const monthEnd = endOfMonth(monthStart);
        const monthDocs = documents.filter(doc => {
          const docDate = new Date(doc.date);
          return docDate >= monthStart && docDate <= monthEnd;
        });
        
        return {
          date: monthStart,
          period: format(monthStart, 'yyyy-MM'),
          displayName: format(monthStart, 'MMM yyyy'),
          documents: monthDocs,
          count: monthDocs.length
        };
      });
      break;
    }
    case 'week': {
      const weeks = eachWeekOfInterval({ start: rangeStart, end: rangeEnd }, { weekStartsOn: 1 });
      
      segments = weeks.map(weekStart => {
        const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
        const weekDocs = documents.filter(doc => {
          const docDate = new Date(doc.date);
          return docDate >= weekStart && docDate <= weekEnd;
        });
        
        return {
          date: weekStart,
          period: format(weekStart, 'yyyy-MM-dd'),
          displayName: format(weekStart, 'MMM dd'),
          documents: weekDocs,
          count: weekDocs.length
        };
      });
      break;
    }
    case 'day': {
      const days = eachDayOfInterval({ start: rangeStart, end: rangeEnd });
      
      segments = days.map(dayStart => {
        const dayEnd = endOfDay(dayStart);
        const dayDocs = documents.filter(doc => {
          const docDate = new Date(doc.date);
          return docDate >= dayStart && docDate <= dayEnd;
        });
        
        return {
          date: dayStart,
          period: format(dayStart, 'yyyy-MM-dd'),
          displayName: format(dayStart, 'MMM dd'),
          documents: dayDocs,
          count: dayDocs.length
        };
      });
      break;
    }
  }

  return segments;
}