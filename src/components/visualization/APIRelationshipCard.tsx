import React from 'react';
import { ArrowRight, GitBranch } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { API } from '../../types/api';

interface APIRelationshipCardProps {
  api: API;
  relatedApis: API[];
  onViewAPI: (api: API) => void;
}

export function APIRelationshipCard({ api, relatedApis, onViewAPI }: APIRelationshipCardProps) {
  return (
    <Card className="bg-[#1E1E1E] p-6">
      <div className="flex items-center space-x-2 mb-6">
        <GitBranch className="h-5 w-5 text-[#4FC3F7]" />
        <h3 className="text-lg font-semibold text-white">API Dependencies</h3>
      </div>

      <div className="space-y-4">
        {relatedApis.map((relatedApi) => (
          <div
            key={relatedApi.id}
            className="p-4 bg-[#2A2A2A] rounded-lg hover:bg-[#333333] transition-colors cursor-pointer"
            onClick={() => onViewAPI(relatedApi)}
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-white font-medium">{relatedApi.title}</h4>
                <p className="text-[#9E9E9E] text-sm">v{relatedApi.currentVersion.version}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Badge
                  variant={relatedApi.status === 'stable' ? 'success' : 'error'}
                >
                  {relatedApi.status}
                </Badge>
                <ArrowRight className="h-4 w-4 text-[#4FC3F7]" />
              </div>
            </div>
            <p className="text-[#E0E0E0] text-sm">{relatedApi.description}</p>
          </div>
        ))}

        {relatedApis.length === 0 && (
          <div className="text-center py-8 text-[#9E9E9E]">
            No dependencies found for this API
          </div>
        )}
      </div>
    </Card>
  );
}