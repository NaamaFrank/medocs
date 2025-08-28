export const TimelineSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl border border-border/50">
        <div className="w-4 h-4 bg-muted rounded animate-pulse"></div>
        <div className="w-32 h-4 bg-muted rounded animate-pulse"></div>
        <div className="w-3 h-3 bg-muted rounded animate-pulse"></div>
        <div className="w-24 h-6 bg-muted rounded animate-pulse"></div>
      </div>

      {/* Timeline items skeleton */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
        
        <div className="space-y-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="relative flex items-start gap-6 animate-pulse">
              {/* Timeline dot skeleton */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-16 h-16 bg-muted rounded-xl border border-border"></div>
              </div>
              
              {/* Content skeleton */}
              <div className="flex-1 min-w-0 pb-8">
                <div className="bg-muted/50 border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <div className="w-40 h-6 bg-muted rounded mb-2"></div>
                      <div className="w-24 h-4 bg-muted rounded"></div>
                    </div>
                    <div className="w-12 h-8 bg-muted rounded"></div>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="w-20 h-6 bg-muted rounded-full"></div>
                    <div className="w-16 h-6 bg-muted rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};