import { List, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ViewToggleProps {
  view: 'list' | 'timeline';
  onViewChange: (view: 'list' | 'timeline') => void;
}

export const ViewToggle = ({ view, onViewChange }: ViewToggleProps) => {
  return (
    <div className="flex items-center bg-muted rounded-lg p-1">
      <Button
        variant={view === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        className="flex items-center gap-2 h-8 px-3"
      >
        <List className="w-4 h-4" />
        <span className="hidden sm:inline">List</span>
      </Button>
      <Button
        variant={view === 'timeline' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('timeline')}
        className="flex items-center gap-2 h-8 px-3"
      >
        <Clock className="w-4 h-4" />
        <span className="hidden sm:inline">Timeline</span>
      </Button>
    </div>
  );
};