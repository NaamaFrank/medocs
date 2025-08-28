export interface Document {
  id: string;
  title: string;
  doctor: string;
  date: string;
  type: "lab" | "prescription" | "report" | "scan";
}

export type DrillLevel = 'year' | 'month' | 'week' | 'day' | 'document';

export interface TimelineGroup {
  period: string;
  displayName: string;
  count: number;
  documents: Document[];
  date: Date;
}

export interface TimelineBreadcrumb {
  level: DrillLevel;
  period: Date | null;
  label: string;
}

export interface TimelineDrillViewProps {
  documents: Document[];
  onDocumentClick: (id: string) => void;
  isLoading?: boolean;
}