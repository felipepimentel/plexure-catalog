import React from 'react';
import { Activity, Clock, Zap, BookOpen, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { cn } from '../../utils/cn';

interface APICardProps {
  name: string;
  description: string;
  status: 'active' | 'inactive';
  version: string;
  tags: string[];
  metrics: {
    uptime: string;
    latency: string;
    requests: string;
  };
  featured?: boolean;
}

export function APICard({ 
  name, 
  description, 
  status, 
  version, 
  tags,
  metrics,
  featured 
}: APICardProps) {
  return (
    <Card 
      className={cn(
        "h-[320px] flex flex-col bg-[#1E1E1E] hover:bg-[#262626] transition-all duration-300",
        featured && "border-l-4 border-l-[#4FC3F7]"
      )}
    >
      {/* Metrics Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#2A2A2A] bg-[#1A1A1A] rounded-t-lg">
        <div className="flex items-center divide-x divide-[#2A2A2A]">
          <div className="flex items-center space-x-1.5 px-3 first:pl-0">
            <Activity className="h-4 w-4 text-[#4FC3F7]" />
            <span className="text-xs text-[#E0E0E0] font-medium">{metrics.uptime}</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3">
            <Clock className="h-4 w-4 text-[#4FC3F7]" />
            <span className="text-xs text-[#E0E0E0] font-medium">{metrics.latency}</span>
          </div>
          <div className="flex items-center space-x-1.5 px-3">
            <Zap className="h-4 w-4 text-[#4FC3F7]" />
            <span className="text-xs text-[#E0E0E0] font-medium">{metrics.requests}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 flex flex-col">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-semibold text-white truncate" title={name}>
              {name}
            </h3>
            <Badge 
              variant={status === 'active' ? 'success' : 'error'}
              className="capitalize text-xs"
            >
              {status}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-[#9E9E9E]">Version {version}</span>
            {featured && (
              <Badge variant="default" className="bg-[#1A237E] text-[#82B1FF] text-xs">
                Featured
              </Badge>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="relative flex-grow mb-4 group">
          <p className="text-[#E0E0E0] text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
            {description}
          </p>
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#1E1E1E] group-hover:from-transparent transition-opacity duration-300" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-[#2A2A2A] rounded text-xs text-[#E0E0E0] transition-colors hover:bg-[#333333]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 mt-auto">
          <button className="flex-1 flex items-center justify-center space-x-1.5 px-3 py-2 bg-gradient-to-r from-[#4FC3F7] to-[#2196F3] text-white rounded-lg hover:from-[#81D4FA] hover:to-[#42A5F5] transition-all duration-300 text-sm font-medium transform hover:-translate-y-0.5">
            <BookOpen className="h-4 w-4" />
            <span>Documentation</span>
          </button>
          <button className="flex items-center justify-center w-9 h-9 bg-[#2A2A2A] text-[#E0E0E0] rounded-lg hover:bg-[#333333] transition-all duration-300 transform hover:-translate-y-0.5">
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}