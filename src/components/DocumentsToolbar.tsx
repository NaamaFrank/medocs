import { Search, Filter, Download, SortAsc, SortDesc } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DocumentsToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: 'date' | 'title' | 'doctor';
  sortOrder: 'asc' | 'desc';
  onSort: (newSortBy: 'date' | 'title' | 'doctor') => void;
  filterType: 'all' | 'lab' | 'prescription' | 'report' | 'scan';
  onFilterChange: (filterType: 'all' | 'lab' | 'prescription' | 'report' | 'scan') => void;
  onExport: () => void;
}

export const DocumentsToolbar = ({
  searchTerm,
  onSearchChange,
  sortBy,
  sortOrder,
  onSort,
  filterType,
  onFilterChange,
  onExport
}: DocumentsToolbarProps) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search documents or doctors..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="px-4 py-3 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => onFilterChange('all')}>
              All Types
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange('lab')}>
              Lab Results
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange('prescription')}>
              Prescriptions
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange('report')}>
              Reports
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onFilterChange('scan')}>
              Scans
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="px-4 py-3 flex items-center gap-2">
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              <span className="hidden sm:inline">Sort</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => onSort('date')}>
              By Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort('title')}>
              By Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSort('doctor')}>
              By Doctor {sortBy === 'doctor' && (sortOrder === 'asc' ? '↑' : '↓')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          variant="outline" 
          className="px-4 py-3 flex items-center gap-2"
          onClick={onExport}
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
      </div>
    </div>
  );
};