import { useState } from "react";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockDocuments } from "@/lib/documents";
import { DocumentCard } from "@/components/DocumentCard";
import { DocumentsToolbar } from "@/components/DocumentsToolbar";
import { UploadButton } from "@/components/UploadButton";
import { ChatButton } from "@/components/ChatButton";
import { Chat } from "@/components/Chat";
import { UploadProgress } from "@/components/UploadProgress";
import { PDFExportDialog } from "@/components/PDFExportDialog";

export const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPDFDialogOpen, setIsPDFDialogOpen] = useState(false);
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

    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        clearInterval(uploadInterval);
        setUploadProgress(prev => ({ ...prev, progress: 100, status: 'processing' }));
        
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
    <div className="container mx-auto px-4 py-6">
      <DocumentsToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={handleSort}
        filterType={filterType}
        onFilterChange={setFilterType}
        onExport={() => setIsPDFDialogOpen(true)}
      />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            Recent Documents
          </h3>
          <span className="text-sm text-muted-foreground">{filteredAndSortedDocuments.length} documents</span>
        </div>

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
      </div>

      {/* Fixed positioned elements */}
      <div className="fixed bottom-6 right-6 z-50">
        <UploadButton onUpload={handleUpload} />
      </div>

      <ChatButton 
        onClick={() => setIsChatOpen(true)} 
        hasUnread={false}
      />

      <Chat 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />

      <UploadProgress
        isVisible={uploadProgress.isVisible}
        progress={uploadProgress.progress}
        status={uploadProgress.status}
        fileName={uploadProgress.fileName}
        onClose={handleUploadClose}
      />

      <PDFExportDialog
        isOpen={isPDFDialogOpen}
        onClose={() => setIsPDFDialogOpen(false)}
        documents={mockDocuments}
      />
    </div>
  );
};