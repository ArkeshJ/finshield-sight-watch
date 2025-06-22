
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { VideoTracker } from "@/components/VideoTracker";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const Investigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<any>(null);

  useEffect(() => {
    const alertData = location.state?.alert;
    if (alertData) {
      setAlert(alertData);
      toast("Investigation Started", {
        description: `Analyzing ${alertData.type} at ${alertData.location}`
      });
    } else {
      // Redirect back if no alert data
      navigate("/");
    }
  }, [location.state, navigate]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-green-500 bg-green-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  if (!alert) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <Header />
      
      <div className="p-6">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="bg-slate-800/50 border-emerald-500 text-emerald-300 hover:bg-emerald-600/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Alert Details */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm h-full">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Investigation Details</h2>
                
                <div className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} mb-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className={`h-4 w-4 ${getSeverityTextColor(alert.severity)}`} />
                      <span className={`text-sm font-medium ${getSeverityTextColor(alert.severity)} uppercase`}>
                        {alert.severity} Priority
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 capitalize">{alert.status}</span>
                  </div>

                  <h3 className="text-white font-medium mb-3">{alert.type}</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <MapPin className="h-3 w-3" />
                      <span className="text-xs">{alert.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">{alert.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-700/50 p-3 rounded">
                    <h4 className="text-emerald-300 font-medium text-sm mb-1">Analysis Status</h4>
                    <p className="text-gray-300 text-xs">AI monitoring active - Tracking marine activity</p>
                  </div>
                  
                  <div className="bg-slate-700/50 p-3 rounded">
                    <h4 className="text-emerald-300 font-medium text-sm mb-1">Evidence Collected</h4>
                    <p className="text-gray-300 text-xs">Video footage, GPS coordinates, vessel identification</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Video Tracker */}
          <div className="lg:col-span-2">
            <VideoTracker selectedAlert={alert} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investigation;
