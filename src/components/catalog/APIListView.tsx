import React from 'react';
import { Activity, Clock, Zap, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { API } from '../../types/api';

interface APIListViewProps {
  apis: API[];
  onSelect: (api: API) => void;
}

export function APIListView({ apis, onSelect }: APIListViewProps) {
  return (
    <div className="space-y-4">
      {apis.map((api) => (
        <div
          key={api.id}
          onClick={() => onSelect(api)}
          className="bg-[#1E1E1E] rounded-lg p-4 cursor-pointer hover:bg-[#2A2A2A] transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-white">{api.title}</h3>
                <Badge
                  variant={api.status === 'stable' ? 'success' : 'error'}
                  className="capitalize"
                >
                  {api.status}
                </Badge>
              </div>
              <p className="text-[#E0E0E0] text-sm mb-3">{api.description}</p>
              <div className="flex items-center space-x-6 text-sm text-[#9E9E9E]">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-[#4FC3F7]" />
                  <span>{api.metrics.uptime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-[#4FC3F7]" />
                  <span>{api.metrics.latency}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-[#4FC3F7]" />
                  <span>{api.metrics.requests}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center ml-6">
              <ArrowRight className="h-5 w-5 text-[#4FC3F7]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}