import { Calendar, FileText, User, Pill, Activity, Heart } from "lucide-react";

// Mock timeline data
const timelineEvents = [
  {
    id: 1,
    date: "2024-12-15",
    title: "Blood Test Results",
    description: "Complete blood count and lipid panel results received",
    doctor: "Dr. Sarah Johnson",
    type: "lab",
    icon: Activity,
  },
  {
    id: 2,
    date: "2024-12-12", 
    title: "Prescription Updated",
    description: "New prescription for Amoxicillin 500mg",
    doctor: "Dr. Michael Chen",
    type: "prescription",
    icon: Pill,
  },
  {
    id: 3,
    date: "2024-12-10",
    title: "Annual Physical Examination",
    description: "Comprehensive annual health checkup completed",
    doctor: "Dr. Sarah Johnson", 
    type: "checkup",
    icon: Heart,
  },
  {
    id: 4,
    date: "2024-12-08",
    title: "Chest X-Ray",
    description: "Routine chest X-ray scan - results normal",
    doctor: "Dr. Robert Kim",
    type: "scan",
    icon: FileText,
  },
  {
    id: 5,
    date: "2024-12-01",
    title: "Follow-up Consultation",
    description: "Follow-up visit for previous symptoms",
    doctor: "Dr. Michael Chen",
    type: "consultation", 
    icon: User,
  },
  {
    id: 6,
    date: "2024-11-25",
    title: "Lab Work - Thyroid Function",
    description: "TSH and T4 levels testing",
    doctor: "Dr. Sarah Johnson",
    type: "lab",
    icon: Activity,
  },
];

const getEventColor = (type: string) => {
  switch (type) {
    case "lab":
      return "bg-primary text-primary-foreground";
    case "prescription":
      return "bg-secondary-accent text-white";
    case "checkup":
      return "bg-accent-active text-white";
    case "scan":
      return "bg-muted text-muted-foreground";
    case "consultation":
      return "bg-primary-light text-primary";
    default:
      return "bg-primary text-primary-foreground";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    day: date.getDate(),
    year: date.getFullYear(),
  };
};

export const Timeline = () => {
  // Group events by year/month for better organization
  const groupedEvents = timelineEvents.reduce((groups, event) => {
    const date = new Date(event.date);
    const yearMonth = `${date.getFullYear()}-${date.getMonth()}`;
    
    if (!groups[yearMonth]) {
      groups[yearMonth] = {
        label: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        events: []
      };
    }
    
    groups[yearMonth].events.push(event);
    return groups;
  }, {} as Record<string, { label: string; events: typeof timelineEvents }>);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-light via-accent to-secondary/50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-foreground mb-2">
              Medical Timeline
            </h1>
            <p className="text-muted-foreground">
              Your complete health history at a glance
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent-active to-secondary-accent"></div>

            {Object.entries(groupedEvents).map(([key, group], groupIndex) => (
              <div key={key} className="mb-12">
                {/* Month/Year Header */}
                <div className="flex items-center mb-8">
                  <div className="relative z-10 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-[var(--shadow-soft)]">
                    {group.label}
                  </div>
                </div>

                {/* Events for this month */}
                <div className="space-y-8">
                  {group.events.map((event, eventIndex) => {
                    const Icon = event.icon;
                    const { month, day } = formatDate(event.date);
                    const isLeft = eventIndex % 2 === 0;

                    return (
                      <div 
                        key={event.id}
                        className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'} animate-fade-in`}
                        style={{ animationDelay: `${(groupIndex * group.events.length + eventIndex) * 0.1}s` }}
                      >
                        {/* Timeline Dot */}
                        <div className={`absolute left-8 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background ${getEventColor(event.type)} z-20`}></div>

                        {/* Event Card */}
                        <div className={`medical-card p-6 max-w-md ${isLeft ? 'ml-20' : 'mr-20'} group hover:scale-105 transition-all duration-300`}>
                          {/* Date Badge */}
                          <div className="flex items-center justify-between mb-4">
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getEventColor(event.type)}`}>
                              <Icon className="w-4 h-4" />
                              <span className="font-medium">{event.type.charAt(0).toUpperCase() + event.type.slice(1)}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">{month}</div>
                              <div className="text-lg font-semibold text-foreground">{day}</div>
                            </div>
                          </div>

                          {/* Event Details */} 
                          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                            {event.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">
                            {event.description}
                          </p>

                          {/* Doctor Info */}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span>{event.doctor}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* End of Timeline */}
          <div className="flex justify-center mt-12">
            <div className="bg-secondary text-secondary-foreground px-6 py-3 rounded-full text-sm font-medium shadow-[var(--shadow-soft)]">
              <Calendar className="w-4 h-4 inline mr-2" />
              Timeline complete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};