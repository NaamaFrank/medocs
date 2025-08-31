import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FileText, Stethoscope, Pill, Activity } from "lucide-react";
import type { ReactElement } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TYPE_TAG_STYLES: Record<string, string> = {
  lab: "bg-accent bg-opacity-10 text-accent-active border-accent/30",
  prescription: "bg-secondary bg-opacity-10 text-secondary-accent border-secondary/30",
  report: "bg-primary/10 text-primary border-primary/30",
  scan: "bg-primary-light bg-opacity-10 text-primary-hover border-primary-light/30",
  default: "bg-muted bg-opacity-10 text-muted-foreground border-muted/30",
};

export function getTypeLabel(type: string): string {
  switch (type) {
    case "lab":
      return "Lab Results";
    case "prescription":
      return "Prescription";
    case "report":
      return "Medical Report";
    case "scan":
      return "Medical Scan";
    default:
      return "Document";
  }
}

export function getDocumentIcon(type: string): ReactElement {
  switch (type) {
    case "lab":
      return <Activity className="w-5 h-5 text-accent-active" />;
    case "prescription":
      return <Pill className="w-5 h-5 text-secondary-accent" />;
    case "report":
      return <FileText className="w-5 h-5 text-primary" />;
    case "scan":
      return <Stethoscope className="w-5 h-5 text-primary-hover" />;
    default:
      return <FileText className="w-5 h-5 text-muted-foreground" />;
  }
}

export function getDocumentIconForCard(type: string): ReactElement {
  const iconClass = "w-5 h-5 text-primary";
  return <FileText className={iconClass} />;
}

export function getTypeColorForCard(type: string): string {
  switch (type) {
    case "lab":
      return "bg-primary-light text-primary";
    case "prescription":
      return "bg-secondary text-secondary-accent";
    case "report":
      return "bg-accent text-accent-foreground";
    case "scan":
      return "bg-muted text-muted-foreground";
    default:
      return "bg-primary-light text-primary";
  }
}
