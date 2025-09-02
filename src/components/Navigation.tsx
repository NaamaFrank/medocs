import { FileText, Calendar } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Documents", url: "/documents", icon: FileText },
  { title: "Timeline", url: "/timeline", icon: Calendar },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="flex items-center space-x-1 bg-muted/30 rounded-lg p-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.url;
        const Icon = item.icon;
        
        return (
          <NavLink
            key={item.url}
            to={item.url}
            className={cn(
              "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
              "hover:bg-background hover:shadow-sm",
              isActive
                ? "bg-background text-primary shadow-sm border border-border/50"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{item.title}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};