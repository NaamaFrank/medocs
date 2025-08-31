import { Calendar, User, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { getTypeLabel, getDocumentIconForCard, getTypeColorForCard } from "@/lib/utils";

interface DocumentCardProps {
  title: string;
  doctor: string;
  date: string;
  type: "lab" | "prescription" | "report" | "scan";
  onClick?: () => void;
}

export const DocumentCard = ({ title, doctor, date, type, onClick }: DocumentCardProps) => {
  const formattedDate = format(new Date(date), 'MMM d, yyyy');
  
  return (
    <div 
      className="document-card animate-fade-in cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${getTypeColorForCard(type)} group-hover:scale-110 transition-transform duration-300`}>
          {getDocumentIconForCard(type)}
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
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>
        
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
      </div>
    </div>
  );
};