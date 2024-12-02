import React from 'react';
import { ArrowRight, Link as LinkIcon } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface RelatedAPI {
  id: string;
  name: string;
  relationship: 'dependency' | 'complement' | 'alternative';
  status: 'stable' | 'beta' | 'deprecated';
}

interface APIRelationshipsProps {
  relatedAPIs: RelatedAPI[];
}

export function APIRelationships({ relatedAPIs }: APIRelationshipsProps) {
  const getRelationshipColor = (relationship: RelatedAPI['relationship']) => {
    switch (relationship) {
      case 'dependency':
        return 'text-[#EF4444]';
      case 'complement':
        return 'text-[#4ADE80]';
      case 'alternative':
        return 'text-[#4FC3F7]';
      default:
        return 'text-[#E0E0E0]';
    }
  };

  return (
    <Card className="bg-[#1E1E1E] p-6">
      <div className="flex items-center space-x-2 mb-4">
        <LinkIcon className="h-5 w-5 text-[#4FC3F7]" />
        <h3 className="text-lg font-semibold text-white">Related APIs</h3>
      </div>

      <div className="space-y-4">
        {relatedAPIs.map((api) => (
          <div
            key={api.id}
            className="flex items-center justify-between p-3 bg-[#2A2A2A] rounded-lg hover:bg-[#333333] transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="flex flex-col">
                <span className="text-white font-medium">{api.name}</span>
                <span className={`text-sm capitalize ${getRelationshipColor(api.relationship)}`}>
                  {api.relationship}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge
                variant={api.status === 'stable' ? 'success' : api.status === 'beta' ? 'default' : 'error'}
              >
                {api.status}
              </Badge>
              <ArrowRight className="h-4 w-4 text-[#4FC3F7]" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}