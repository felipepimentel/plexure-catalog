import React from 'react';
import { Star, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { API } from '../../types/api';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { getFeaturedAPIs } from '../../data/sampleAPIs';

interface APIFeaturedSectionProps {
  apis: API[];
  onSelectAPI: (api: API) => void;
}

export function APIFeaturedSection({ apis, onSelectAPI }: APIFeaturedSectionProps) {
  const featuredAPIs = getFeaturedAPIs(apis);
  const recentlyUpdated = apis
    .filter(api => {
      const updatedDate = new Date(api.currentVersion.releaseDate);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return updatedDate >= sevenDaysAgo;
    })
    .slice(0, 3);

  return (
    <div className="mb-12">
      {/* Featured APIs */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {featuredAPIs.map((api) => (
          <Card
            key={api.id}
            className="relative overflow-hidden cursor-pointer group"
            onClick={() => onSelectAPI(api)}
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#4FC3F7] to-[#2196F3]" />
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-[#FFD700] fill-current" />
                  <h3 className="text-lg font-semibold text-white">{api.title}</h3>
                </div>
                <Badge variant={api.status === 'stable' ? 'success' : 'error'}>
                  {api.status}
                </Badge>
              </div>
              
              <p className="text-[#E0E0E0] text-sm mb-4 line-clamp-2">{api.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1 text-[#4FC3F7]">
                  <TrendingUp className="h-4 w-4" />
                  <span>{api.metrics.requests}</span>
                </div>
                <div className="flex items-center space-x-1 text-[#4ADE80]">
                  <Star className="h-4 w-4" />
                  <span>{api.metrics.satisfaction}% Satisfaction</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recently Updated */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="h-5 w-5 text-[#4FC3F7]" />
          <h2 className="text-lg font-semibold text-white">Recently Updated</h2>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {recentlyUpdated.map((api) => (
            <Card
              key={api.id}
              className="bg-[#1E1E1E] p-4 cursor-pointer hover:bg-[#2A2A2A] transition-all duration-200"
              onClick={() => onSelectAPI(api)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">{api.title}</h3>
                <Badge variant="default" className="text-xs">
                  v{api.currentVersion.version}
                </Badge>
              </div>
              <p className="text-[#9E9E9E] text-sm mb-3">
                {api.currentVersion.changelog}
              </p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#4FC3F7]">
                  {new Date(api.currentVersion.releaseDate).toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-1 text-[#4ADE80]">
                  <Sparkles className="h-3 w-3" />
                  <span>New Features</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}