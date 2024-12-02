import React from 'react';
import { Activity, Clock, AlertTriangle, ThumbsUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { APIMetrics } from '../../types/api';

interface APIMetricsCardProps {
  metrics: APIMetrics;
}

export function APIMetricsCard({ metrics }: APIMetricsCardProps) {
  return (
    <Card className="bg-[#1E1E1E] p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 p-3 bg-[#2A2A2A] rounded-lg">
          <Activity className="h-5 w-5 text-[#4FC3F7]" />
          <div>
            <p className="text-sm text-[#E0E0E0]">Uptime</p>
            <p className="text-lg font-semibold text-white">{metrics.uptime}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-[#2A2A2A] rounded-lg">
          <Clock className="h-5 w-5 text-[#4FC3F7]" />
          <div>
            <p className="text-sm text-[#E0E0E0]">Avg. Latency</p>
            <p className="text-lg font-semibold text-white">{metrics.latency}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-[#2A2A2A] rounded-lg">
          <AlertTriangle className="h-5 w-5 text-[#4FC3F7]" />
          <div>
            <p className="text-sm text-[#E0E0E0]">Error Rate</p>
            <p className="text-lg font-semibold text-white">{metrics.errorRate}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 bg-[#2A2A2A] rounded-lg">
          <ThumbsUp className="h-5 w-5 text-[#4FC3F7]" />
          <div>
            <p className="text-sm text-[#E0E0E0]">Satisfaction</p>
            <p className="text-lg font-semibold text-white">{metrics.satisfaction}%</p>
          </div>
        </div>
      </div>
    </Card>
  );
}