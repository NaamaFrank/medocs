import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TYPE_TAG_STYLES: Record<string, string> = {
  lab: "bg-accent/10 text-accent-active border-accent/30",
  prescription: "bg-secondary/10 text-secondary-accent border-secondary/30",
  report: "bg-primary/5 text-primary border-primary/30",
  scan: "bg-primary-light/10 text-primary-hover border-primary-light/30",
  default: "bg-muted/10 text-muted-foreground border-muted/30",
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
