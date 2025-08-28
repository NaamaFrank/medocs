import { FolderOpen, ChevronRight } from "lucide-react";
import type { TimelineGroup } from "@/types/timeline";

interface TimelineGroupItemProps {
  group: TimelineGroup;
  index: number;
  onDrillDown: (group: TimelineGroup) => void;
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case "lab": return "Lab Results";
    case "prescription": return "Prescription";
    case "report": return "Medical Report";
    case "scan": return "Medical Scan";
    default: return "Document";
  }
};

export const TimelineGroupItem = ({ group, index, onDrillDown }: TimelineGroupItemProps) => {
  return (
    <div 
      className="relative flex items-start gap-6 fade-in cursor-pointer group"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onDrillDown(group)}
    >
      {/* Timeline connector line */}
      <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-border to-transparent"></div>
      
      {/* Timeline dot with floating animation */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-16 h-16 medical-card flex items-center justify-center group-hover:border-primary/50 transition-all duration-300 group-hover:shadow-[var(--shadow-soft)] group-hover:scale-105">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center shadow-sm">
            <FolderOpen className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 pb-8">
        <div className="medical-card p-6 group-hover:border-primary/30 group-hover:shadow-[var(--shadow-floating)] transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors duration-200">
                {group.displayName}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {group.count} document{group.count !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
                  {group.count}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
            </div>
          </div>
          
          {/* Document type breakdown with improved styling */}
          <div className="flex flex-wrap gap-2">
            {['lab', 'prescription', 'report', 'scan'].map(type => {
              const count = group.documents.filter(doc => doc.type === type).length;
              if (count === 0) return null;
              return (
                <span 
                  key={type} 
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-normal transition-all duration-200 ${
                    type === 'lab' ? 'bg-accent/10 text-accent-active border border-accent/30' :
                    type === 'prescription' ? 'bg-secondary/10 text-secondary-accent border border-secondary/30' :
                    type === 'report' ? 'bg-primary/5 text-primary border border-primary/20' :
                    'bg-primary-light/10 text-primary-hover border border-primary-light/30'
                  }`}
                >
                  {count} {getTypeLabel(type).toLowerCase()}{count !== 1 ? 's' : ''}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};