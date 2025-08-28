import { FileText, Stethoscope, Pill, Activity } from "lucide-react";
import { format } from "date-fns";
import type { Document } from "@/types/timeline";

interface TimelineDocumentItemProps {
  doc: Document;
  index: number;
  onDocumentClick: (id: string) => void;
}

const getDocumentIcon = (type: string) => {
  switch (type) {
    case "lab":
      return <Activity className="w-5 h-5 text-accent-active" />;
    case "prescription":
      return <Pill className="w-5 h-5 text-secondary-accent" />;
    case "report":
      return <FileText className="w-5 h-5 text-primary" />;
    case "scan":
      return <Stethoscope className="w-5 h-5 text-primary-hover" />;
    default:
      return <FileText className="w-5 h-5 text-muted-foreground" />;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case "lab": return "Lab Results";
    case "prescription": return "Prescription";
    case "report": return "Medical Report";
    case "scan": return "Medical Scan";
    default: return "Document";
  }
};

export const TimelineDocumentItem = ({ doc, index, onDocumentClick }: TimelineDocumentItemProps) => {
  return (
    <div 
      className="relative flex items-start gap-6 fade-in cursor-pointer group"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => onDocumentClick(doc.id)}
    >
      {/* Timeline connector line */}
      <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-border to-transparent"></div>
      
      {/* Timeline dot */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-16 h-16 medical-card flex items-center justify-center group-hover:border-primary/50 transition-all duration-300 group-hover:shadow-[var(--shadow-soft)] group-hover:scale-105">
          <div className="w-8 h-8 bg-gradient-to-br from-card to-muted rounded-lg flex items-center justify-center shadow-sm border border-border/50">
            {getDocumentIcon(doc.type)}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 pb-8">
        <div className="medical-card p-6 group-hover:border-primary/30 group-hover:shadow-[var(--shadow-floating)] transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors duration-200 truncate">
                {doc.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {getTypeLabel(doc.type)}
              </p>
            </div>
            <div className="ml-4 text-right flex-shrink-0">
              <div className="text-sm font-medium text-foreground bg-muted/50 px-3 py-1 rounded-full">
                {format(new Date(doc.date), 'MMM d, yyyy')}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              <span>{doc.doctor}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-normal border transition-all duration-200 ${
              doc.type === 'lab' ? 'bg-accent/10 text-accent-active border-accent/30' :
              doc.type === 'prescription' ? 'bg-secondary/10 text-secondary-accent border-secondary/30' :
              doc.type === 'report' ? 'bg-primary/10 text-primary/80 border-primary/20' :
              'bg-primary-light/10 text-primary-hover border-primary-light/30'
            }`}>
              {getTypeLabel(doc.type)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};