import React from 'react';
import { Link2, ArrowRight, Star } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface RelatedAPI {
  name: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  benefit: string;
  category: string;
  integration: string;
}

interface APIRelatedServicesProps {
  currentAPI: string;
  relatedAPIs: RelatedAPI[];
  onSelect: (apiName: string) => void;
}

export function APIRelatedServices({ currentAPI, relatedAPIs, onSelect }: APIRelatedServicesProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-[#1B4D3E] text-[#4ADE80]';
      case 'medium':
        return 'bg-[#4D461B] text-[#FFD700]';
      case 'low':
        return 'bg-[#4D1B1B] text-[#EF4444]';
      default:
        return 'bg-[#2A2A2A] text-[#E0E0E0]';
    }
  };

  return (
    <Card className="bg-[#1E1E1E] p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Link2 className="h-5 w-5 text-[#4FC3F7]" />
          <h3 className="text-lg font-semibold text-white">Related Services</h3>
        </div>
        <Badge variant="default">
          {relatedAPIs.length} Recommendations
        </Badge>
      </div>

      <div className="space-y-4">
        {relatedAPIs.map((api) => (
          <div
            key={api.name}
            className="p-4 bg-[#2A2A2A] rounded-lg hover:bg-[#333333] transition-colors cursor-pointer"
            onClick={() => onSelect(api.name)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <h4 className="text-white font-medium">{api.name}</h4>
                <Badge className={getPriorityColor(api.priority)}>
                  {api.priority.toUpperCase()} Priority
                </Badge>
              </div>
              <ArrowRight className="h-4 w-4 text-[#4FC3F7]" />
            </div>
            
            <p className="text-[#E0E0E0] text-sm mb-3">{api.description}</p>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#9E9E9E]">{api.category}</span>
              <div className="flex items-center space-x-1 text-[#4ADE80]">
                <Star className="h-4 w-4 fill-current" />
                <span>{api.benefit}</span>
              </div>
            </div>

            <div className="mt-2 px-3 py-2 bg-[#1E1E1E] rounded text-xs text-[#9E9E9E]">
              Integration: {api.integration}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}