import { Calendar, ZoomIn, ZoomOut, Grid3X3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TimelineZoom } from "@/lib/timelineUtils";

interface TimelineControlsProps {
  currentZoom: TimelineZoom;
  onZoomChange: (zoom: TimelineZoom) => void;
  viewMode: 'horizontal' | 'vertical';
  onViewModeChange: (mode: 'horizontal' | 'vertical') => void;
  totalDocuments: number;
}

const zoomLevels: { value: TimelineZoom; label: string; icon: typeof ZoomIn }[] = [
  { value: 'year', label: 'Years', icon: ZoomOut },
  { value: 'month', label: 'Months', icon: Calendar },
  { value: 'week', label: 'Weeks', icon: Calendar },
  { value: 'day', label: 'Days', icon: ZoomIn },
];

export const TimelineControls = ({ 
  currentZoom, 
  onZoomChange, 
  viewMode, 
  onViewModeChange, 
  totalDocuments 
}: TimelineControlsProps) => {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-card border rounded-lg">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">View:</span>
          <div className="flex rounded-md border">
            <Button
              variant={viewMode === 'horizontal' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('horizontal')}
              className="rounded-r-none border-r"
            >
              <Grid3X3 className="w-4 h-4 mr-1" />
              Timeline
            </Button>
            <Button
              variant={viewMode === 'vertical' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('vertical')}
              className="rounded-l-none"
            >
              <List className="w-4 h-4 mr-1" />
              List
            </Button>
          </div>
        </div>

        {viewMode === 'horizontal' && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Zoom:</span>
            <div className="flex rounded-md border">
              {zoomLevels.map((level, index) => {
                const Icon = level.icon;
                return (
                  <Button
                    key={level.value}
                    variant={currentZoom === level.value ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => onZoomChange(level.value)}
                    className={`
                      ${index === 0 ? 'rounded-r-none' : index === zoomLevels.length - 1 ? 'rounded-l-none' : 'rounded-none'}
                      ${index > 0 ? 'border-l' : ''}
                    `}
                  >
                    <Icon className="w-4 h-4 mr-1" />
                    {level.label}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Badge variant="secondary" className="flex items-center gap-1">
        <span>{totalDocuments}</span>
        <span className="text-xs">documents</span>
      </Badge>
    </div>
  );
};