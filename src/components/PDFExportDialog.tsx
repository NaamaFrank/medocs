import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

interface Document {
  id: string;
  title: string;
  doctor: string;
  date: string;
  type: "lab" | "prescription" | "report" | "scan";
}

interface PDFExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  documents: Document[];
}

export const PDFExportDialog = ({ isOpen, onClose, documents }: PDFExportDialogProps) => {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>(
    documents.map(doc => doc.id)
  );
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleDocumentToggle = (documentId: string) => {
    setSelectedDocuments(prev =>
      prev.includes(documentId)
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    );
  };

  const handleSelectAll = () => {
    setSelectedDocuments(documents.map(doc => doc.id));
  };

  const handleDeselectAll = () => {
    setSelectedDocuments([]);
  };

  const generatePDF = async () => {
    setIsExporting(true);
    
    try {
      const pdf = new jsPDF();
      const selectedDocs = documents.filter(doc => selectedDocuments.includes(doc.id));
      
      // Title page
      pdf.setFontSize(24);
      pdf.text("Medical History Report", 20, 30);
      
      pdf.setFontSize(12);
      pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 50);
      pdf.text(`Total Documents: ${selectedDocs.length}`, 20, 60);
      
      let yPosition = 80;
      
      selectedDocs.forEach((doc, index) => {
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 30;
        }
        
        // Document header
        pdf.setFontSize(16);
        pdf.text(`${index + 1}. ${doc.title}`, 20, yPosition);
        
        yPosition += 10;
        pdf.setFontSize(12);
        pdf.text(`Doctor: ${doc.doctor}`, 30, yPosition);
        
        yPosition += 8;
        pdf.text(`Date: ${doc.date}`, 30, yPosition);
        
        yPosition += 8;
        pdf.text(`Type: ${doc.type.toUpperCase()}`, 30, yPosition);
        
        yPosition += 15;
        
        // Add separator line
        pdf.line(20, yPosition, 190, yPosition);
        yPosition += 10;
      });
      
      pdf.save(`medical-history-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({
        title: "Export Successful",
        description: `${selectedDocs.length} documents exported to PDF successfully.`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const getDocumentIcon = (type: string) => {
    return <FileText className="w-4 h-4" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Medical History
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-muted-foreground">
              Select documents to include in your PDF export:
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleSelectAll}
                disabled={selectedDocuments.length === documents.length}
              >
                Select All
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDeselectAll}
                disabled={selectedDocuments.length === 0}
              >
                Clear All
              </Button>
            </div>
          </div>
          
          <ScrollArea className="h-[300px] border rounded-lg p-4">
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-start space-x-3">
                  <Checkbox
                    id={doc.id}
                    checked={selectedDocuments.includes(doc.id)}
                    onCheckedChange={() => handleDocumentToggle(doc.id)}
                  />
                  <label
                    htmlFor={doc.id}
                    className="flex-1 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {getDocumentIcon(doc.type)}
                      <span className="font-medium text-sm">{doc.title}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {doc.doctor} • {doc.date}
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <div className="text-sm">
              <span className="font-medium">{selectedDocuments.length}</span> of{" "}
              <span className="font-medium">{documents.length}</span> documents selected
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button 
            onClick={generatePDF} 
            disabled={selectedDocuments.length === 0 || isExporting}
          >
            {isExporting ? "Generating..." : "Export PDF"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};