import { Header } from "@/components/Header";
import { Timeline as TimelineComponent } from "@/components/Timeline";

const TimelinePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header userName="Sarah" />
      <TimelineComponent />
    </div>
  );
};

export default TimelinePage;