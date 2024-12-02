import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Star, GitBranch } from 'lucide-react';
import { API } from '../../types/api';
import { APIMetricsCard } from './APIMetricsCard';
import { APIVersionHistory } from './APIVersionHistory';
import { APIDocumentation } from './APIDocumentation';
import { APIRelationships } from './APIRelationships';
import { APIGovernance } from './APIGovernance';
import { APIFeedbackSection } from './APIFeedback';
import { APICostCalculator } from '../tools/APICostCalculator';
import { APIAnalyticsDashboard } from '../analytics/APIAnalyticsDashboard';
import { APIDependencyGraph } from '../visualization/APIDependencyGraph';
import { APIRelationshipCard } from '../visualization/APIRelationshipCard';
import { Badge } from '../ui/Badge';
import { sampleAPIs } from '../../data/sampleAPIs';

interface APIDetailsViewProps {
  api: API;
  onBack: () => void;
}

export function APIDetailsView({ api, onBack }: APIDetailsViewProps) {
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('24h');
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'dependencies'>('overview');

  const sampleAnalyticsData = {
    requestVolume: {
      total: 1250000,
      trend: 12.5,
      data: []
    },
    responseTime: {
      average: 125,
      p95: 250,
      p99: 450,
      data: []
    },
    errorRates: {
      total: 0.5,
      trend: -0.2,
      byType: [
        { type: '4xx Errors', count: 234 },
        { type: '5xx Errors', count: 45 },
        { type: 'Timeouts', count: 12 }
      ]
    },
    activeUsers: {
      current: 5280,
      trend: 8.3,
      data: []
    }
  };

  const relatedApis = sampleAPIs.filter(a => 
    api.dependencies.some(d => d.name === a.title) ||
    a.dependencies.some(d => d.name === api.title)
  );

  return (
    <div className="min-h-screen bg-[#121212]">
      <div className="border-b border-[#424242]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-white" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">{api.title}</h1>
                <p className="text-[#E0E0E0]">{api.category}</p>
              </div>
              <Badge
                variant={api.status === 'stable' ? 'success' : 'error'}
                className="ml-2"
              >
                {api.status}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 border border-[#424242] rounded-lg text-white hover:bg-[#2A2A2A]">
                <Star className="h-4 w-4" />
                <span>Star</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-[#FF5722] text-white rounded-lg hover:bg-[#F4511E]">
                <ExternalLink className="h-4 w-4" />
                <span>Try it out</span>
              </button>
            </div>
          </div>

          <div className="mt-4 flex space-x-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === 'overview'
                  ? 'bg-[#2A2A2A] text-white'
                  : 'text-[#E0E0E0] hover:text-white hover:bg-[#2A2A2A]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === 'analytics'
                  ? 'bg-[#2A2A2A] text-white'
                  : 'text-[#E0E0E0] hover:text-white hover:bg-[#2A2A2A]'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('dependencies')}
              className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center space-x-2 ${
                activeTab === 'dependencies'
                  ? 'bg-[#2A2A2A] text-white'
                  : 'text-[#E0E0E0] hover:text-white hover:bg-[#2A2A2A]'
              }`}
            >
              <GitBranch className="h-4 w-4" />
              <span>Dependencies</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2 space-y-8">
              <APIMetricsCard metrics={api.metrics} />
              <APIDocumentation documentation={api.documentation} />
              <APIVersionHistory versions={api.versions} />
              <APICostCalculator
                pricingTiers={[
                  {
                    name: 'Basic',
                    requests: 10000,
                    price: 29,
                    features: ['Basic Support', 'Standard SLA', 'Core Features']
                  },
                  {
                    name: 'Pro',
                    requests: 50000,
                    price: 99,
                    features: ['Priority Support', 'Enhanced SLA', 'Advanced Features']
                  },
                  {
                    name: 'Enterprise',
                    requests: 200000,
                    price: 299,
                    features: ['24/7 Support', 'Custom SLA', 'All Features']
                  }
                ]}
              />
              <APIFeedbackSection
                feedback={api.feedback}
                onSubmitFeedback={console.log}
              />
            </div>
            <div className="space-y-8">
              <APIGovernance
                security={api.security}
                owner="API Team"
                sla={api.metrics.uptime}
              />
              <APIRelationshipCard
                api={api}
                relatedApis={relatedApis}
                onViewAPI={console.log}
              />
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <APIAnalyticsDashboard
            data={sampleAnalyticsData}
            timeRange={timeRange}
            onTimeRangeChange={setTimeRange}
          />
        )}

        {activeTab === 'dependencies' && (
          <div className="space-y-8">
            <APIDependencyGraph
              apis={[api, ...relatedApis]}
              onNodeClick={console.log}
            />
            <APIRelationshipCard
              api={api}
              relatedApis={relatedApis}
              onViewAPI={console.log}
            />
          </div>
        )}
      </div>
    </div>
  );
}