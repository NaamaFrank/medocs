import { useState } from "react";
import { format } from "date-fns";
import { getDocumentIcon, getTypeLabel } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import type { Document } from "@/types/timeline";

interface TimelineDotProps {
  documents: Document[];
  date: Date;
  onDocumentClick: (id: string) => void;
}

export const TimelineDot = ({ documents, date, onDocumentClick }: TimelineDotProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  if (documents.length === 0) {
    return (
      <div className="relative flex flex-col items-center">
        <div className="w-2 h-2 rounded-full bg-border"></div>
      </div>
    );
  }

  const dotSize = Math.min(Math.max(documents.length * 4 + 8, 12), 24);
  const hasMultiple = documents.length > 1;

  return (
    <div 
      className="relative flex flex-col items-center group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Dot */}
      <div 
        className={`
          relative rounded-full cursor-pointer transition-all duration-200
          ${hasMultiple 
            ? 'bg-primary hover:bg-primary/80 shadow-lg' 
            : 'bg-accent hover:bg-accent/80'
          }
          group-hover:scale-125
        `}
        style={{ 
          width: `${dotSize}px`, 
          height: `${dotSize}px`,
        }}
      >
        {hasMultiple && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-primary-foreground">
              {documents.length}
            </span>
          </div>
        )}
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <Card className="absolute bottom-full mb-2 z-50 w-64 shadow-lg border animate-fade-in bg-card">
          <CardContent className="p-3 space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="w-4 h-4" />
              {format(date, 'MMM dd, yyyy')}
            </div>
            
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-start gap-2 p-2 rounded hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => onDocumentClick(doc.id)}
                >
                  <div className="mt-0.5">
                    {getDocumentIcon(doc.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {doc.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <User className="w-3 h-3" />
                        <span className="truncate">{doc.doctor}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {getTypeLabel(doc.type)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};