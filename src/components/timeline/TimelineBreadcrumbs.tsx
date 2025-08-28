import { Calendar, ChevronRight } from "lucide-react";
import type { TimelineBreadcrumb } from "@/types/timeline";

interface TimelineBreadcrumbsProps {
  breadcrumbs: TimelineBreadcrumb[];
  onBreadcrumbClick: (index: number) => void;
}

export const TimelineBreadcrumbs = ({ breadcrumbs, onBreadcrumbClick }: TimelineBreadcrumbsProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl border border-border/50">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Calendar className="w-4 h-4" />
        <span className="text-xs font-medium uppercase tracking-wider">Timeline Navigation</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground/60" />}
            <button
              onClick={() => onBreadcrumbClick(index)}
              className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                index === breadcrumbs.length - 1 
                  ? 'bg-primary text-primary-foreground font-medium shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/80'
              }`}
            >
              {crumb.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};