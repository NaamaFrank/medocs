import { Bell, User } from "lucide-react";
import { useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface HeaderProps {
  userName?: string;
}

export const Header = ({ userName = "User" }: HeaderProps) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/documents':
        return 'Documents';
      case '/timeline':
        return 'Timeline';
      default:
        return 'Medical Vault';
    }
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="p-2 rounded-lg hover:bg-muted transition-colors" />
          
          <div>
            <h1 className="font-semibold text-xl bg-gradient-to-r from-primary to-accent-active bg-clip-text text-transparent">
              {getPageTitle()}
            </h1>
            <p className="text-sm text-muted-foreground">Your Medical Vault</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-muted transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-background"></div>
          </button>
          
          <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-primary-light rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <span className="hidden sm:block font-medium text-sm">Hello, {userName}</span>
          </div>
        </div>
      </div>
    </header>
  );
};