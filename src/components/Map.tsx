
import { useState } from "react";
import { MapPin, AlertTriangle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Alert {
  id: number;
  location: string;
  timestamp: string;
  severity: string;
  type: string;
  status: string;
}

interface MapProps {
  alerts: Alert[];
  onAlertSelect: (alert: Alert) => void;
}

export const Map = ({ alerts, onAlertSelect }: MapProps) => {
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);

  return (
    <div className="relative h-full bg-gradient-to-b from-blue-950 to-blue-900 rounded-lg border border-emerald-500/30 overflow-hidden">
      {/* Ocean Background with Animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800/30 to-blue-950/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent)] animate-pulse" />
      
      {/* Map Content */}
      <div className="relative h-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Global Activity Map</h2>
          <div className="flex items-center space-x-2 text-emerald-300">
            <Eye className="h-4 w-4" />
            <span className="text-sm">Live Tracking</span>
          </div>
        </div>

        {/* Simulated World Map with Alert Markers */}
        <div className="relative h-full bg-gradient-to-br from-blue-900/50 to-slate-800/50 rounded border border-blue-400/20">
          {/* Pacific Ocean Alert */}
          <div 
            className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => onAlertSelect(alerts[0])}
          >
            <div className="relative">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute" />
              <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-2 w-2 text-white" />
              </div>
              {selectedMarker === 1 && (
                <div className="absolute top-6 left-0 bg-slate-800 p-2 rounded shadow-lg border border-red-400 min-w-48">
                  <p className="text-xs text-white font-medium">High Priority Alert</p>
                  <p className="text-xs text-red-300">Illegal Fishing Activity</p>
                </div>
              )}
            </div>
          </div>

          {/* Atlantic Ocean Alert */}
          <div 
            className="absolute top-2/5 right-1/3 transform translate-x-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => onAlertSelect(alerts[1])}
          >
            <div className="relative">
              <div className="w-4 h-4 bg-yellow-500 rounded-full animate-ping absolute" />
              <div className="w-4 h-4 bg-yellow-600 rounded-full flex items-center justify-center">
                <MapPin className="h-2 w-2 text-white" />
              </div>
              {selectedMarker === 2 && (
                <div className="absolute top-6 left-0 bg-slate-800 p-2 rounded shadow-lg border border-yellow-400 min-w-48">
                  <p className="text-xs text-white font-medium">Medium Priority</p>
                  <p className="text-xs text-yellow-300">Suspicious Movement</p>
                </div>
              )}
            </div>
          </div>

          {/* Map Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-20">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-blue-400/10" />
            ))}
          </div>

          {/* Ocean Labels */}
          <div className="absolute top-8 left-8 text-blue-300 text-sm font-medium opacity-60">
            Pacific Ocean
          </div>
          <div className="absolute top-8 right-8 text-blue-300 text-sm font-medium opacity-60">
            Atlantic Ocean
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-blue-300 text-sm font-medium opacity-60">
            Southern Ocean
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm p-3 rounded border border-slate-600">
          <h3 className="text-sm font-medium text-white mb-2">Alert Levels</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-xs text-gray-300">High Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="text-xs text-gray-300">Medium Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-xs text-gray-300">Low Priority</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
