import React from 'react';
import { Activity, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { Card } from '../ui/Card';

interface MetricData {
  timestamp: number;
  value: number;
}

interface APIMetrics {
  requestRate: MetricData[];
  errorRate: MetricData[];
  latency: MetricData[];
  activeUsers: number;
}

interface APIObservabilityProps {
  metrics: APIMetrics;
  onTimeRangeChange: (range: '1h' | '24h' | '7d' | '30d') => void;
}

export function APIObservability({ metrics, onTimeRangeChange }: APIObservabilityProps) {
  const timeRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];

  return (
    <Card className="bg-[#1E1E1E] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-[#4FC3F7]" />
          <h3 className="text-lg font-semibold text-white">API Observability</h3>
        </div>
        <div className="flex items-center space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => onTimeRangeChange(range.value as any)}
              className="px-3 py-1.5 text-sm border border-[#424242] rounded-md text-[#E0E0E0] hover:bg-[#2A2A2A]"
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#2A2A2A] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-[#4FC3F7]" />
              <h4 className="text-white font-medium">Request Rate</h4>
            </div>
            <span className="text-[#4ADE80] text-sm">
              {metrics.requestRate[metrics.requestRate.length - 1]?.value.toFixed(2)} req/s
            </span>
          </div>
          {/* Add chart visualization here */}
        </div>

        <div className="bg-[#2A2A2A] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-[#4FC3F7]" />
              <h4 className="text-white font-medium">Error Rate</h4>
            </div>
            <span className="text-[#EF4444] text-sm">
              {metrics.errorRate[metrics.errorRate.length - 1]?.value.toFixed(2)}%
            </span>
          </div>
          {/* Add chart visualization here */}
        </div>

        <div className="bg-[#2A2A2A] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-[#4FC3F7]" />
              <h4 className="text-white font-medium">Latency</h4>
            </div>
            <span className="text-[#E0E0E0] text-sm">
              {metrics.latency[metrics.latency.length - 1]?.value.toFixed(2)}ms
            </span>
          </div>
          {/* Add chart visualization here */}
        </div>

        <div className="bg-[#2A2A2A] p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-[#4FC3F7]" />
              <h4 className="text-white font-medium">Active Users</h4>
            </div>
            <span className="text-[#E0E0E0] text-sm">{metrics.activeUsers}</span>
          </div>
          <div className="flex items-center justify-center h-32">
            <span className="text-4xl font-bold text-white">{metrics.activeUsers}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}