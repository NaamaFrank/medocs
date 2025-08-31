import { useTimeline } from "@/hooks/useTimeline";
import { TimelineBreadcrumbs } from "@/components/timeline/TimelineBreadcrumbs";
import { TimelineGroupItem } from "@/components/timeline/TimelineGroupItem";
import { TimelineDocumentItem } from "@/components/timeline/TimelineDocumentItem";
import { TimelineSkeleton } from "@/components/timeline/TimelineSkeleton";
import { TimelineEmptyState } from "@/components/timeline/TimelineEmptyState";
import type { TimelineDrillViewProps } from "@/types/timeline";

export const TimelineDrillView = ({ documents, onDocumentClick, isLoading = false }: TimelineDrillViewProps) => {
  const {
    breadcrumbs,
    groups,
    individualDocs,
    handleDrillDown,
    handleBreadcrumbClick
  } = useTimeline(documents);

  if (isLoading) {
    return <TimelineSkeleton />;
  }

  if (documents.length === 0) {
    return <TimelineEmptyState />;
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Breadcrumb Navigation */}
      <TimelineBreadcrumbs 
        breadcrumbs={breadcrumbs}
        onBreadcrumbClick={handleBreadcrumbClick}
      />

      {/* Timeline Content with improved layout */}
      <div className="relative">
        {/* Main timeline connector */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-border to-transparent"></div>
        
        <div className="space-y-0">
          {/* Group View with enhanced animations */}
          {groups.map((group, index) => (
            <TimelineGroupItem
              key={group.period}
              group={group}
              index={index}
              onDrillDown={handleDrillDown}
            />
          ))}

          {/* Individual Documents View*/}
          {individualDocs.map((doc, index) => (
            <TimelineDocumentItem
              key={doc.id}
              doc={doc}
              index={index}
              onDocumentClick={onDocumentClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};