import React from 'react';
import { Activity, Clock, Shield } from 'lucide-react';

interface APIMetricsProps {
  uptime: string;
  latency: string;
  requests: string;
}

export default function APIMetrics({ uptime, latency, requests }: APIMetricsProps) {
  return (
    <div className="grid grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center space-x-2">
        <Activity className="h-5 w-5 text-green-500" />
        <div>
          <p className="text-sm text-gray-500">Uptime</p>
          <p className="font-semibold">{uptime}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Clock className="h-5 w-5 text-blue-500" />
        <div>
          <p className="text-sm text-gray-500">Avg. Latency</p>
          <p className="font-semibold">{latency}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Shield className="h-5 w-5 text-purple-500" />
        <div>
          <p className="text-sm text-gray-500">Requests/day</p>
          <p className="font-semibold">{requests}</p>
        </div>
      </div>
    </div>
  );
}