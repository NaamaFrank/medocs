import { useState, useMemo } from "react";
import { format, startOfYear, startOfMonth, startOfWeek, startOfDay, isSameYear, isSameMonth, isSameWeek, isSameDay } from "date-fns";
import type { Document, DrillLevel, TimelineGroup, TimelineBreadcrumb } from "@/types/timeline";

export const useTimeline = (documents: Document[]) => {
  const [drillLevel, setDrillLevel] = useState<DrillLevel>('month');
  const [selectedPeriod, setSelectedPeriod] = useState<Date | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<TimelineBreadcrumb[]>([
    { level: 'month', period: null, label: 'All Months' }
  ]);

  const groupDocumentsByPeriod = useMemo(() => {
    return (docs: Document[], level: DrillLevel, filterPeriod?: Date): TimelineGroup[] => {
      const groups: { [key: string]: TimelineGroup } = {};

      docs.forEach(doc => {
        const docDate = new Date(doc.date);
        let periodKey: string;
        let displayName: string;
        let periodDate: Date;

        switch (level) {
          case 'year':
            periodKey = format(docDate, 'yyyy');
            displayName = format(docDate, 'yyyy');
            periodDate = startOfYear(docDate);
            break;
          case 'month':
            if (filterPeriod && !isSameYear(docDate, filterPeriod)) return;
            periodKey = format(docDate, 'yyyy-MM');
            displayName = format(docDate, 'MMMM yyyy');
            periodDate = startOfMonth(docDate);
            break;
          case 'week':
            if (filterPeriod && !isSameMonth(docDate, filterPeriod)) return;
            periodKey = format(startOfWeek(docDate), 'yyyy-MM-dd');
            displayName = `Week of ${format(startOfWeek(docDate), 'MMM d, yyyy')}`;
            periodDate = startOfWeek(docDate);
            break;
          case 'day':
            if (filterPeriod && !isSameWeek(docDate, filterPeriod)) return;
            periodKey = format(docDate, 'yyyy-MM-dd');
            displayName = format(docDate, 'EEEE, MMM d, yyyy');
            periodDate = startOfDay(docDate);
            break;
          default:
            return;
        }

        if (!groups[periodKey]) {
          groups[periodKey] = {
            period: periodKey,
            displayName,
            count: 0,
            documents: [],
            date: periodDate
          };
        }

        groups[periodKey].count++;
        groups[periodKey].documents.push(doc);
      });

      return Object.values(groups).sort((a, b) => b.date.getTime() - a.date.getTime());
    };
  }, []);

  const handleDrillDown = (group: TimelineGroup) => {
    const nextLevel: DrillLevel = 
      drillLevel === 'year' ? 'month' :
      drillLevel === 'month' ? 'week' :
      drillLevel === 'week' ? 'day' : 'document';

    if (nextLevel === 'document') {
      setDrillLevel('document');
      setSelectedPeriod(group.date);
    } else {
      setDrillLevel(nextLevel);
      setSelectedPeriod(group.date);
    }

    setBreadcrumbs(prev => [...prev, { 
      level: nextLevel, 
      period: group.date, 
      label: group.displayName 
    }]);
  };

  const handleBreadcrumbClick = (index: number) => {
    const targetBreadcrumb = breadcrumbs[index];
    setDrillLevel(targetBreadcrumb.level);
    setSelectedPeriod(targetBreadcrumb.period);
    setBreadcrumbs(breadcrumbs.slice(0, index + 1));
  };

  const getCurrentDocuments = (): Document[] => {
    if (drillLevel === 'document' && selectedPeriod) {
      return documents.filter(doc => {
        const docDate = new Date(doc.date);
        return isSameDay(docDate, selectedPeriod);
      });
    }
    return documents;
  };

  const groups = useMemo(() => 
    drillLevel === 'document' ? [] : groupDocumentsByPeriod(documents, drillLevel, selectedPeriod || undefined),
    [documents, drillLevel, selectedPeriod, groupDocumentsByPeriod]
  );

  const individualDocs = useMemo(() => 
    drillLevel === 'document' ? getCurrentDocuments() : [],
    [drillLevel, getCurrentDocuments]
  );

  return {
    drillLevel,
    selectedPeriod,
    breadcrumbs,
    groups,
    individualDocs,
    handleDrillDown,
    handleBreadcrumbClick
  };
};