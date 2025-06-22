
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Map } from "@/components/Map";
import { AlertPanel } from "@/components/AlertPanel";
import { VideoTracker } from "@/components/VideoTracker";
import { StatsPanel } from "@/components/StatsPanel";
import { toast } from "sonner";

const Index = () => {
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      location: "Pacific Ocean - 34.0522°N, 118.2437°W",
      timestamp: "2024-06-22 14:30:00",
      severity: "high",
      type: "Illegal Fishing Activity",
      status: "active"
    },
    {
      id: 2,
      location: "Atlantic Ocean - 25.7617°N, 80.1918°W",
      timestamp: "2024-06-22 13:45:00",
      severity: "medium",
      type: "Suspicious Vessel Movement",
      status: "investigating"
    }
  ]);

  useEffect(() => {
    toast("FinShield System Online - Monitoring Marine Activity", {
      description: "Real-time shark fin tracking and illegal fishing detection active"
    });
  }, []);

  const handleAlertSelect = (alert: any) => {
    setSelectedAlert(alert);
    toast(`Analyzing Activity: ${alert.type}`, {
      description: `Location: ${alert.location}`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />
      
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Panel - Alerts and Stats */}
        <div className="w-1/3 p-6 space-y-6 overflow-y-auto">
          <StatsPanel />
          <AlertPanel 
            alerts={alerts} 
            onAlertSelect={handleAlertSelect}
            selectedAlert={selectedAlert}
          />
        </div>

        {/* Center - Map */}
        <div className="flex-1 p-6">
          <Map alerts={alerts} onAlertSelect={handleAlertSelect} />
        </div>

        {/* Right Panel - Video Tracker */}
        <div className="w-1/3 p-6">
          <VideoTracker selectedAlert={selectedAlert} />
        </div>
      </div>
    </div>
  );
};

export default Index;
