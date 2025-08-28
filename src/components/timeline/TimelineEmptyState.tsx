import { Search, Calendar } from "lucide-react";

export const TimelineEmptyState = () => {
  return (
    <div className="text-center py-16">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center mx-auto shadow-[var(--shadow-soft)]">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-background border-2 border-border rounded-full flex items-center justify-center shadow-sm">
          <Search className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">No Documents Found</h3>
      <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
        No medical documents match your current search criteria. Try adjusting your filters or upload new documents to get started.
      </p>
      
      <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-xl max-w-sm mx-auto">
        <p className="text-sm text-primary font-medium">💡 Pro Tip</p>
        <p className="text-xs text-primary/80 mt-1">Use the timeline view to explore your medical history chronologically</p>
      </div>
    </div>
  );
};