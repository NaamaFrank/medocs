import { FileText, Calendar, User, ChevronRight } from "lucide-react";

interface DocumentCardProps {
  title: string;
  doctor: string;
  date: string;
  type: "lab" | "prescription" | "report" | "scan";
  onClick?: () => void;
}

const getTypeIcon = (type: DocumentCardProps["type"]) => {
  const iconClass = "w-5 h-5 text-primary";
  switch (type) {
    case "lab":
      return <FileText className={iconClass} />;
    case "prescription":
      return <FileText className={iconClass} />;
    case "report":
      return <FileText className={iconClass} />;
    case "scan":
      return <FileText className={iconClass} />;
    default:
      return <FileText className={iconClass} />;
  }
};

const getTypeColor = (type: DocumentCardProps["type"]) => {
  switch (type) {
    case "lab":
      return "bg-primary-light text-primary";
    case "prescription":
      return "bg-secondary text-secondary-accent";
    case "report":
      return "bg-accent text-accent-foreground";
    case "scan":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-primary-light text-primary";
  }
};

export const DocumentCard = ({ title, doctor, date, type, onClick }: DocumentCardProps) => {
  return (
    <div 
      className="document-card animate-fade-in cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${getTypeColor(type)} group-hover:scale-110 transition-transform duration-300`}>
          {getTypeIcon(type)}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground text-balance group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{doctor}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
          </div>
        </div>
        
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
      </div>
    </div>
  );
};