import { useMemo } from "react";
import { format } from "date-fns";
import { groupDocumentsByTimeSegments, type TimelineZoom, type TimelineSegment } from "@/lib/timelineUtils";
import { TimelineDot } from "./TimelineDot";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Document } from "@/types/timeline";

interface HorizontalTimelineViewProps {
  documents: Document[];
  zoom: TimelineZoom;
  onDocumentClick: (id: string) => void;
}

export const HorizontalTimelineView = ({ 
  documents, 
  zoom, 
  onDocumentClick 
}: HorizontalTimelineViewProps) => {
  const segments = useMemo(() => 
    groupDocumentsByTimeSegments(documents, zoom), 
    [documents, zoom]
  );

  if (segments.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        <div className="text-center">
          <div className="text-lg font-medium mb-2">No documents found</div>
          <div className="text-sm">Add some medical documents to see your timeline</div>
        </div>
      </div>
    );
  }

  const getSegmentWidth = (segment: TimelineSegment, index: number) => {
    const baseWidth = zoom === 'day' ? 60 : zoom === 'week' ? 80 : zoom === 'month' ? 120 : 160;
    return `${baseWidth}px`;
  };

  const getDateFormat = (zoom: TimelineZoom) => {
    switch (zoom) {
      case 'year': return 'yyyy';
      case 'month': return 'MMM\nyyyy';
      case 'week': return 'MMM dd';
      case 'day': return 'dd\nMMM';
      default: return 'MMM yyyy';
    }
  };

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Medical Timeline</h3>
        <p className="text-sm text-muted-foreground">
          Showing {documents.length} documents across {segments.filter(s => s.count > 0).length} time periods
        </p>
      </div>

      {/* Timeline Scroll Area */}
      <ScrollArea className="w-full">
        <div className="relative pb-8">
          {/* Main timeline line */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-border"></div>
          
          <div className="flex gap-0 min-w-fit">
            {segments.map((segment, index) => (
              <div
                key={segment.period}
                className="flex flex-col items-center relative"
                style={{ minWidth: getSegmentWidth(segment, index) }}
              >
                {/* Date label */}
                <div className="text-xs text-muted-foreground text-center mb-4 whitespace-pre-line font-medium">
                  {format(segment.date, getDateFormat(zoom))}
                </div>
                
                {/* Vertical line to timeline */}
                <div className="w-0.5 h-4 bg-border mb-2"></div>
                
                {/* Timeline dot */}
                <TimelineDot
                  documents={segment.documents}
                  date={segment.date}
                  onDocumentClick={onDocumentClick}
                />
                
                {/* Document count */}
                {segment.count > 0 && (
                  <div className="text-xs text-muted-foreground mt-2">
                    {segment.count} {segment.count === 1 ? 'doc' : 'docs'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      {/* Timeline Legend */}
      <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent"></div>
          <span>Single document</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-medium">
            2+
          </div>
          <span>Multiple documents</span>
        </div>
      </div>
    </div>
  );
};