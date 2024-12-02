import React from 'react';
import { BarChart2, TrendingUp, Users, Clock, AlertTriangle, Activity } from 'lucide-react';
import { Card } from '../ui/Card';

interface AnalyticsData {
  requestVolume: {
    total: number;
    trend: number;
    data: { date: string; value: number }[];
  };
  responseTime: {
    average: number;
    p95: number;
    p99: number;
    data: { date: string; value: number }[];
  };
  errorRates: {
    total: number;
    byType: { type: string; count: number }[];
    trend: number;
  };
  activeUsers: {
    current: number;
    trend: number;
    data: { date: string; value: number }[];
  };
}

interface APIAnalyticsDashboardProps {
  data: AnalyticsData;
  timeRange: '24h' | '7d' | '30d' | '90d';
  onTimeRangeChange: (range: '24h' | '7d' | '30d' | '90d') => void;
}

export function APIAnalyticsDashboard({ data, timeRange, onTimeRangeChange }: APIAnalyticsDashboardProps) {
  const timeRanges = [
    { value: '24h', label: 'Last 24h' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const formatTrend = (trend: number) => {
    const isPositive = trend > 0;
    return (
      <span className={`flex items-center ${isPositive ? 'text-[#4ADE80]' : 'text-[#EF4444]'}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(trend)}%
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BarChart2 className="h-5 w-5 text-[#4FC3F7]" />
          <h2 className="text-lg font-semibold text-white">API Analytics</h2>
        </div>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => onTimeRangeChange(range.value as any)}
              className={`px-3 py-1.5 rounded-md text-sm ${
                timeRange === range.value
                  ? 'bg-[#FF5722] text-white'
                  : 'bg-[#2A2A2A] text-[#E0E0E0] hover:bg-[#333333]'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-[#1E1E1E] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-[#4FC3F7]" />
              <h3 className="text-white font-medium">Request Volume</h3>
            </div>
            {formatTrend(data.requestVolume.trend)}
          </div>
          <div className="text-3xl font-bold text-white mb-4">
            {data.requestVolume.total.toLocaleString()}
          </div>
          <div className="h-48 bg-[#2A2A2A] rounded-lg">
            {/* Chart visualization would go here */}
          </div>
        </Card>

        <Card className="bg-[#1E1E1E] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-[#4FC3F7]" />
              <h3 className="text-white font-medium">Response Time</h3>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-[#E0E0E0] text-sm">Average</p>
              <p className="text-xl font-bold text-white">{data.responseTime.average}ms</p>
            </div>
            <div>
              <p className="text-[#E0E0E0] text-sm">P95</p>
              <p className="text-xl font-bold text-white">{data.responseTime.p95}ms</p>
            </div>
            <div>
              <p className="text-[#E0E0E0] text-sm">P99</p>
              <p className="text-xl font-bold text-white">{data.responseTime.p99}ms</p>
            </div>
          </div>
          <div className="h-48 bg-[#2A2A2A] rounded-lg">
            {/* Chart visualization would go here */}
          </div>
        </Card>

        <Card className="bg-[#1E1E1E] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-[#4FC3F7]" />
              <h3 className="text-white font-medium">Error Rates</h3>
            </div>
            {formatTrend(data.errorRates.trend)}
          </div>
          <div className="text-3xl font-bold text-white mb-4">
            {data.errorRates.total}%
          </div>
          <div className="space-y-2">
            {data.errorRates.byType.map((error) => (
              <div key={error.type} className="flex items-center justify-between">
                <span className="text-[#E0E0E0] text-sm">{error.type}</span>
                <span className="text-white font-medium">{error.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-[#1E1E1E] p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-[#4FC3F7]" />
              <h3 className="text-white font-medium">Active Users</h3>
            </div>
            {formatTrend(data.activeUsers.trend)}
          </div>
          <div className="text-3xl font-bold text-white mb-4">
            {data.activeUsers.current.toLocaleString()}
          </div>
          <div className="h-48 bg-[#2A2A2A] rounded-lg">
            {/* Chart visualization would go here */}
          </div>
        </Card>
      </div>
    </div>
  );
}