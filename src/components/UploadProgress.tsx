import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface UploadProgressProps {
  isVisible: boolean;
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  fileName?: string;
  onClose?: () => void;
}

export const UploadProgress = ({ 
  isVisible, 
  progress, 
  status, 
  fileName = "Document", 
  onClose 
}: UploadProgressProps) => {
  if (!isVisible) return null;

  const getStatusConfig = () => {
    switch (status) {
      case 'uploading':
        return {
          icon: <Loader2 className="w-8 h-8 text-primary animate-spin" />,
          title: "Uploading Document",
          message: "Please wait while we upload your file..."
        };
      case 'processing':
        return {
          icon: <Loader2 className="w-8 h-8 text-accent-active animate-spin" />,
          title: "Analyzing Document",
          message: "We're extracting information from your medical document..."
        };
      case 'complete':
        return {
          icon: <CheckCircle className="w-8 h-8 text-secondary-accent" />,
          title: "Upload Complete",
          message: "Your document has been successfully processed and added to your vault."
        };
      case 'error':
        return {
          icon: <AlertCircle className="w-8 h-8 text-destructive" />,
          title: "Upload Failed",
          message: "There was an error processing your document. Please try again."
        };
      default:
        return {
          icon: <Loader2 className="w-8 h-8 text-primary animate-spin" />,
          title: "Processing",
          message: "Please wait..."
        };
    }
  };

  const statusConfig = getStatusConfig();

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-card border border-border rounded-3xl p-8 w-full max-w-md text-center shadow-[var(--shadow-floating)] animate-scale-in">
        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            {statusConfig.icon}
          </div>
        </div>

        {/* Title and Message */}
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {statusConfig.title}
        </h3>
        <p className="text-muted-foreground mb-6">
          {statusConfig.message}
        </p>

        {/* File Name */}
        <div className="bg-muted p-3 rounded-xl mb-6">
          <p className="text-sm font-medium text-foreground truncate">
            {fileName}
          </p>
        </div>

        {/* Progress Bar (only show during upload/processing) */}
        {(status === 'uploading' || status === 'processing') && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent-active transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        {status === 'complete' && (
          <button
            onClick={onClose}
            className="medical-button-primary w-full py-3"
          >
            Continue
          </button>
        )}

        {status === 'error' && (
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 medical-button-secondary py-3"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="flex-1 medical-button-primary py-3"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};