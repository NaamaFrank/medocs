import { MessageCircle } from "lucide-react";
import { useState } from "react";

interface ChatButtonProps {
  onClick: () => void;
  hasUnread?: boolean;
}

export const ChatButton = ({ onClick, hasUnread = false }: ChatButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-gradient-to-br from-accent-active to-secondary-accent text-white rounded-full shadow-[var(--shadow-floating)] transition-all duration-300 hover:scale-110 hover:shadow-[0_15px_50px_-10px_hsl(var(--accent-active)_/_0.4)] active:scale-95 animate-float"
      aria-label="Open medical assistant chat"
    >
      <MessageCircle className="w-6 h-6 mx-auto" />
      {hasUnread && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full border-2 border-background flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      )}
    </button>
  );
};