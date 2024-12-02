import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';

interface APIRecommendation {
  id: string;
  name: string;
  description: string;
  confidence: number;
  reason: string;
}

interface APIRecommendationsProps {
  recommendations: APIRecommendation[];
  onSelect: (id: string) => void;
}

export function APIRecommendations({ recommendations, onSelect }: APIRecommendationsProps) {
  return (
    <Card className="bg-[#1E1E1E] p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="h-5 w-5 text-[#4FC3F7]" />
        <h3 className="text-lg font-semibold text-white">Recommended APIs</h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-4 bg-[#2A2A2A] rounded-lg hover:bg-[#333333] transition-colors cursor-pointer"
            onClick={() => onSelect(rec.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium">{rec.name}</h4>
              <div className="flex items-center space-x-2">
                <div className="px-2 py-1 bg-[#1B4D3E] rounded-full">
                  <span className="text-xs text-[#4ADE80]">
                    {rec.confidence}% Match
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-[#4FC3F7]" />
              </div>
            </div>
            <p className="text-[#E0E0E0] text-sm mb-2">{rec.description}</p>
            <p className="text-[#9E9E9E] text-xs">
              Why recommended: {rec.reason}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}