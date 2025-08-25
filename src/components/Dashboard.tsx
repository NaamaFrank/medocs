import { useState } from "react";
import { DocumentCard } from "./DocumentCard";
import { UploadButton } from "./UploadButton";
import { ChatButton } from "./ChatButton";
import { Chat } from "./Chat";
import { UploadProgress } from "./UploadProgress";
import { PDFExportDialog } from "./PDFExportDialog";
import { ViewToggle } from "./ViewToggle";
import { TimelineView } from "./TimelineView";
import { Search, Filter, Download, SortAsc, SortDesc } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Mock data for demonstration
const mockDocuments = [
  {
    id: "1",
    title: "Blood Test Results",
    doctor: "Dr. Sarah Johnson",
    date: "Dec 15, 2024",
    type: "lab" as const,
  },
  {
    id: "2", 
    title: "Prescription - Amoxicillin",
    doctor: "Dr. Michael Chen",
    date: "Dec 12, 2024",
    type: "prescription" as const,
  },
  {
    id: "3",
    title: "Annual Physical Report",
    doctor: "Dr. Sarah Johnson", 
    date: "Dec 10, 2024",
    type: "report" as const,
  },
  {
    id: "4",
    title: "Chest X-Ray Scan",
    doctor: "Dr. Robert Kim",
    date: "Dec 8, 2024", 
    type: "scan" as const,
  },
];

export const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPDFDialogOpen, setIsPDFDialogOpen] = useState(false);
  const [view, setView] = useState<'list' | 'timeline'>('list');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'doctor'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<'all' | 'lab' | 'prescription' | 'report' | 'scan'>('all');
  const [uploadProgress, setUploadProgress] = useState({
    isVisible: false,
    progress: 0,
    status: 'uploading' as 'uploading' | 'processing' | 'complete' | 'error',
    fileName: ''
  });
  const { toast } = useToast();

  const handleUpload = (type: 'camera' | 'file') => {
    const fileName = type === 'camera' ? 'Camera Photo.jpg' : 'Medical Document.pdf';
    
    setUploadProgress({
      isVisible: true,
      progress: 0,
      status: 'uploading',
      fileName
    });

    // Simulate upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        clearInterval(uploadInterval);
        setUploadProgress(prev => ({ ...prev, progress: 100, status: 'processing' }));
        
        // Simulate processing
        setTimeout(() => {
          setUploadProgress(prev => ({ ...prev, status: 'complete' }));
        }, 2000);
      } else {
        setUploadProgress(prev => ({ ...prev, progress: Math.min(progress, 100) }));
      }
    }, 200);
  };

  const handleUploadClose = () => {
    setUploadProgress(prev => ({ ...prev, isVisible: false }));
    
    // Simulate adding new document to the list
    toast({
      title: "Document Added",
      description: "Your medical document has been successfully added to your vault.",
    });
  };

  const handleDocumentClick = (id: string) => {
    toast({
      title: "Opening Document",
      description: "Document viewer will be available in the full version.",
    });
  };

  const handleSort = (newSortBy: 'date' | 'title' | 'doctor') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedDocuments = mockDocuments
    .filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.doctor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || doc.type === filterType;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'doctor':
          comparison = a.doctor.localeCompare(b.doctor);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-primary-light via-accent to-secondary/50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Welcome to Your Medical Vault
            </h2>
            <p className="text-muted-foreground">
              Securely manage and track your medical documents in one place
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search and Filter Section */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documents or doctors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
              />
            </div>
            
            <ViewToggle view={view} onViewChange={setView} />
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
                <DropdownMenuItem onClick={() => setFilterType('all')}>
                  All Types
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType('lab')}>
                  Lab Results
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType('prescription')}>
                  Prescriptions
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType('report')}>
                  Reports
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterType('scan')}>
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
                <DropdownMenuItem onClick={() => handleSort('date')}>
                  By Date {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('title')}>
                  By Title {sortBy === 'title' && (sortOrder === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleSort('doctor')}>
                  By Doctor {sortBy === 'doctor' && (sortOrder === 'asc' ? '↑' : '↓')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              variant="outline" 
              className="px-4 py-3 flex items-center gap-2"
              onClick={() => setIsPDFDialogOpen(true)}
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            
          </div>
        </div>

        {/* Documents Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">
              {view === 'timeline' ? 'Medical Timeline' : 'Recent Documents'}
            </h3>
            <span className="text-sm text-muted-foreground">{filteredAndSortedDocuments.length} documents</span>
          </div>

          {view === 'list' ? (
            <div className="space-y-3">
              {filteredAndSortedDocuments.length > 0 ? (
                filteredAndSortedDocuments.map((doc, index) => (
                  <div 
                    key={doc.id} 
                    className="animate-fade-in" 
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <DocumentCard
                      title={doc.title}
                      doctor={doc.doctor}
                      date={doc.date}
                      type={doc.type}
                      onClick={() => handleDocumentClick(doc.id)}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No documents found matching your search.</p>
                </div>
              )}
            </div>
          ) : (
            <TimelineView 
              documents={filteredAndSortedDocuments}
              onDocumentClick={handleDocumentClick}
            />
          )}
        </div>

        {/* Upload Button - Fixed positioned */}
        <div className="fixed bottom-6 right-6 z-50">
          <UploadButton onUpload={handleUpload} />
        </div>

        {/* Chat Button - Fixed positioned */}
        <ChatButton 
          onClick={() => setIsChatOpen(true)} 
          hasUnread={false}
        />

        {/* Chat Interface */}
        <Chat 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
        />

        {/* Upload Progress Overlay */}
        <UploadProgress
          isVisible={uploadProgress.isVisible}
          progress={uploadProgress.progress}
          status={uploadProgress.status}
          fileName={uploadProgress.fileName}
          onClose={handleUploadClose}
        />

        {/* PDF Export Dialog */}
        <PDFExportDialog
          isOpen={isPDFDialogOpen}
          onClose={() => setIsPDFDialogOpen(false)}
          documents={mockDocuments}
        />
      </div>
    </div>
  );
};