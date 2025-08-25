import { useState } from "react";
import { FileText, Stethoscope, Pill, Activity, Search, ChevronRight, ChevronLeft, Calendar, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, startOfYear, startOfMonth, startOfWeek, startOfDay, isSameYear, isSameMonth, isSameWeek, isSameDay } from "date-fns";

interface Document {
  id: string;
  title: string;
  doctor: string;
  date: string;
  type: "lab" | "prescription" | "report" | "scan";
}

interface TimelineDrillViewProps {
  documents: Document[];
  onDocumentClick: (id: string) => void;
}

type DrillLevel = 'year' | 'month' | 'week' | 'day' | 'document';

interface TimelineGroup {
  period: string;
  displayName: string;
  count: number;
  documents: Document[];
  date: Date;
}

export const TimelineDrillView = ({ documents, onDocumentClick }: TimelineDrillViewProps) => {
  const [drillLevel, setDrillLevel] = useState<DrillLevel>('month');
  const [selectedPeriod, setSelectedPeriod] = useState<Date | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<Array<{ level: DrillLevel; period: Date | null; label: string }>>([
    { level: 'month', period: null, label: 'All Months' }
  ]);

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

  const groupDocumentsByPeriod = (docs: Document[], level: DrillLevel, filterPeriod?: Date): TimelineGroup[] => {
    const groups: { [key: string]: TimelineGroup } = {};

    docs.forEach(doc => {
      const docDate = new Date(doc.date);
      let periodKey: string;
      let displayName: string;
      let periodDate: Date;

      switch (level) {
        case 'year':
          periodKey = format(docDate, 'yyyy');
          displayName = format(docDate, 'yyyy');
          periodDate = startOfYear(docDate);
          break;
        case 'month':
          if (filterPeriod && !isSameYear(docDate, filterPeriod)) return;
          periodKey = format(docDate, 'yyyy-MM');
          displayName = format(docDate, 'MMMM yyyy');
          periodDate = startOfMonth(docDate);
          break;
        case 'week':
          if (filterPeriod && !isSameMonth(docDate, filterPeriod)) return;
          periodKey = format(startOfWeek(docDate), 'yyyy-MM-dd');
          displayName = `Week of ${format(startOfWeek(docDate), 'MMM d, yyyy')}`;
          periodDate = startOfWeek(docDate);
          break;
        case 'day':
          if (filterPeriod && !isSameWeek(docDate, filterPeriod)) return;
          periodKey = format(docDate, 'yyyy-MM-dd');
          displayName = format(docDate, 'EEEE, MMM d, yyyy');
          periodDate = startOfDay(docDate);
          break;
        default:
          return;
      }

      if (!groups[periodKey]) {
        groups[periodKey] = {
          period: periodKey,
          displayName,
          count: 0,
          documents: [],
          date: periodDate
        };
      }

      groups[periodKey].count++;
      groups[periodKey].documents.push(doc);
    });

    return Object.values(groups).sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const handleDrillDown = (group: TimelineGroup) => {
    const nextLevel: DrillLevel = 
      drillLevel === 'year' ? 'month' :
      drillLevel === 'month' ? 'week' :
      drillLevel === 'week' ? 'day' : 'document';

    if (nextLevel === 'document') {
      // Show individual documents
      setDrillLevel('document');
      setSelectedPeriod(group.date);
    } else {
      setDrillLevel(nextLevel);
      setSelectedPeriod(group.date);
    }

    setBreadcrumbs(prev => [...prev, { 
      level: nextLevel, 
      period: group.date, 
      label: group.displayName 
    }]);
  };

  const handleBreadcrumbClick = (index: number) => {
    const targetBreadcrumb = breadcrumbs[index];
    setDrillLevel(targetBreadcrumb.level);
    setSelectedPeriod(targetBreadcrumb.period);
    setBreadcrumbs(breadcrumbs.slice(0, index + 1));
  };

  const getCurrentDocuments = (): Document[] => {
    if (drillLevel === 'document' && selectedPeriod) {
      return documents.filter(doc => {
        const docDate = new Date(doc.date);
        return isSameDay(docDate, selectedPeriod);
      });
    }
    return documents;
  };

  const groups = drillLevel === 'document' ? [] : groupDocumentsByPeriod(documents, drillLevel, selectedPeriod || undefined);
  const individualDocs = drillLevel === 'document' ? getCurrentDocuments() : [];

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
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
            <button
              onClick={() => handleBreadcrumbClick(index)}
              className={`hover:text-primary transition-colors ${
                index === breadcrumbs.length - 1 ? 'text-primary font-medium' : 'text-muted-foreground'
              }`}
            >
              {crumb.label}
            </button>
          </div>
        ))}
      </div>

      {/* Timeline Content */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
        
        <div className="space-y-6">
          {/* Group View */}
          {groups.map((group, index) => (
            <div 
              key={group.period}
              className="relative flex items-start gap-6 animate-fade-in cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleDrillDown(group)}
            >
              {/* Timeline dot */}
              <div className="relative z-10 flex-shrink-0">
                <div className="w-16 h-16 bg-card border-2 border-border rounded-full flex items-center justify-center group-hover:border-primary transition-colors shadow-sm">
                  <FolderOpen className="w-5 h-5 text-primary" />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0 pb-6">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group-hover:border-primary/50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                        {group.displayName}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {group.count} document{group.count !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {group.count}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                  
                  {/* Document type breakdown */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {['lab', 'prescription', 'report', 'scan'].map(type => {
                      const count = group.documents.filter(doc => doc.type === type).length;
                      if (count === 0) return null;
                      return (
                        <span key={type} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          type === 'lab' ? 'bg-accent/10 text-accent' :
                          type === 'prescription' ? 'bg-secondary/10 text-secondary' :
                          type === 'report' ? 'bg-primary/10 text-primary' :
                          'bg-primary-light/10 text-primary-light'
                        }`}>
                          {count} {getTypeLabel(type).toLowerCase()}{count !== 1 ? 's' : ''}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Individual Documents View */}
          {individualDocs.map((doc, index) => (
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
              <div className="flex-1 min-w-0 pb-6">
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
                        {format(new Date(doc.date), 'MMM d, yyyy')}
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
    </div>
  );
};