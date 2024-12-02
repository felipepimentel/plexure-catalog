import React from 'react';
import { Activity, Clock, AlertTriangle, BarChart2 } from 'lucide-react';
import { Card } from '../ui/Card';

interface BenchmarkResult {
  latency: {
    p50: number;
    p95: number;
    p99: number;
  };
  throughput: number;
  errorRate: number;
  successRate: number;
}

interface APIBenchmarkProps {
  results: BenchmarkResult;
  isLoading?: boolean;
  onRunBenchmark: () => void;
}

export function APIBenchmark({ results, isLoading, onRunBenchmark }: APIBenchmarkProps) {
  return (
    <Card className="bg-[#1E1E1E] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <BarChart2 className="h-5 w-5 text-[#4FC3F7]" />
          <h3 className="text-lg font-semibold text-white">Performance Benchmark</h3>
        </div>
        <button
          onClick={onRunBenchmark}
          disabled={isLoading}
          className="px-4 py-2 bg-[#FF5722] text-white rounded-lg hover:bg-[#F4511E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Running...' : 'Run Benchmark'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#2A2A2A] p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Clock className="h-4 w-4 text-[#4FC3F7]" />
            <h4 className="text-white font-medium">Latency</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#E0E0E0]">P50</span>
              <span className="text-white">{results.latency.p50}ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#E0E0E0]">P95</span>
              <span className="text-white">{results.latency.p95}ms</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#E0E0E0]">P99</span>
              <span className="text-white">{results.latency.p99}ms</span>
            </div>
          </div>
        </div>

        <div className="bg-[#2A2A2A] p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-4 w-4 text-[#4FC3F7]" />
            <h4 className="text-white font-medium">Throughput</h4>
          </div>
          <div className="text-2xl font-bold text-white">
            {results.throughput} req/s
          </div>
        </div>

        <div className="bg-[#2A2A2A] p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-4 w-4 text-[#4FC3F7]" />
            <h4 className="text-white font-medium">Error Rate</h4>
          </div>
          <div className="text-2xl font-bold text-[#EF4444]">
            {results.errorRate}%
          </div>
        </div>

        <div className="bg-[#2A2A2A] p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-4 w-4 text-[#4FC3F7]" />
            <h4 className="text-white font-medium">Success Rate</h4>
          </div>
          <div className="text-2xl font-bold text-[#4ADE80]">
            {results.successRate}%
          </div>
        </div>
      </div>
    </Card>
  );
}