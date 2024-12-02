import React from 'react';
import { APICard } from './APICard';
import { API } from '../../types/api';

interface APIGridProps {
  apis: API[];
  onSelect: (api: API) => void;
}

export function APIGrid({ apis, onSelect }: APIGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {apis.map((api) => (
        <div 
          key={api.id} 
          onClick={() => onSelect(api)} 
          className="transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
        >
          <APICard
            name={api.title}
            description={api.description}
            status={api.status === 'stable' ? 'active' : 'inactive'}
            version={api.currentVersion.version}
            tags={api.tags.map(tag => tag.name)}
            metrics={{
              uptime: api.metrics.uptime,
              latency: api.metrics.latency,
              requests: api.metrics.requests
            }}
            featured={api.metrics.satisfaction > 95}
          />
        </div>
      ))}
    </div>
  );
}