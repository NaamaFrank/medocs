import { Plus, Camera, Upload } from "lucide-react";
import { useState } from "react";

interface UploadButtonProps {
  onUpload?: (type: 'camera' | 'file') => void;
}

export const UploadButton = ({ onUpload }: UploadButtonProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleUploadClick = () => {
    setShowMenu(!showMenu);
  };

  const handleUploadType = (type: 'camera' | 'file') => {
    setShowMenu(false);
    onUpload?.(type);
  };

  return (
    <div className="relative">
      {/* Upload Menu */}
      {showMenu && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-2xl shadow-[var(--shadow-floating)] p-2 min-w-[160px] animate-slide-up">
          <button
            onClick={() => handleUploadType('camera')}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors duration-200 text-left"
          >
            <div className="p-2 bg-primary-light rounded-lg">
              <Camera className="w-5 h-5 text-primary" />
            </div>
            <span className="font-medium">Take Photo</span>
          </button>
          
          <button
            onClick={() => handleUploadType('file')}
            className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors duration-200 text-left"
          >
            <div className="p-2 bg-secondary rounded-lg">
              <Upload className="w-5 h-5 text-secondary-accent" />
            </div>
            <span className="font-medium">Select File</span>
          </button>
        </div>
      )}

      {/* Main Upload Button */}
      <button
        onClick={handleUploadClick}
        className="upload-button flex items-center justify-center animate-float"
        aria-label="Upload document"
      >
        <Plus className={`w-8 h-8 transition-transform duration-300 ${showMenu ? 'rotate-45' : ''}`} />
      </button>
    </div>
  );
};