import { FileText, Stethoscope, Pill, Activity, Search } from "lucide-react";

interface Document {
  id: string;
  title: string;
  doctor: string;
  date: string;
  type: "lab" | "prescription" | "report" | "scan";
}

interface TimelineViewProps {
  documents: Document[];
  onDocumentClick: (id: string) => void;
}

export const TimelineView = ({ documents, onDocumentClick }: TimelineViewProps) => {
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "lab":
        return <Activity className="w-5 h-5 text-accent" />;
      case "prescription":
        return <Pill className="w-5 h-5 text-secondary" />;
      case "report":
        return <FileText className="w-5 h-5 text-primary" />;
      case "scan":
        return <Stethoscope className="w-5 h-5 text-primary-light" />;
      default:
        return <FileText className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "lab":
        return "Lab Results";
      case "prescription":
        return "Prescription";
      case "report":
        return "Medical Report";
      case "scan":
        return "Medical Scan";
      default:
        return "Document";
    }
  };

  // Sort documents by date (newest first)
  const sortedDocuments = [...documents].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-8 h-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">No documents found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
      
      <div className="space-y-8">
        {sortedDocuments.map((doc, index) => (
          <div 
            key={doc.id} 
            className="relative flex items-start gap-6 animate-fade-in cursor-pointer group"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onDocumentClick(doc.id)}
          >
            {/* Timeline dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-16 h-16 bg-card border-2 border-border rounded-full flex items-center justify-center group-hover:border-primary transition-colors shadow-sm">
                {getDocumentIcon(doc.type)}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0 pb-8">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-primary/50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getTypeLabel(doc.type)}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-sm font-medium text-foreground">
                      {doc.date}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Stethoscope className="w-4 h-4" />
                  <span>{doc.doctor}</span>
                </div>
                
                <div className="mt-4 flex items-center gap-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    doc.type === 'lab' ? 'bg-accent/10 text-accent' :
                    doc.type === 'prescription' ? 'bg-secondary/10 text-secondary' :
                    doc.type === 'report' ? 'bg-primary/10 text-primary' :
                    'bg-primary-light/10 text-primary-light'
                  }`}>
                    {getTypeLabel(doc.type)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};