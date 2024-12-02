import React from 'react';
import { ChevronRight } from 'lucide-react';
import { API } from '../../types/api';
import { APICard } from './APICard';

interface APICategorySectionProps {
  category: string;
  apis: API[];
  onSelectAPI: (api: API) => void;
}

export function APICategorySection({ category, apis, onSelectAPI }: APICategorySectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center space-x-2 mb-6">
        <ChevronRight className="h-5 w-5 text-[#4FC3F7]" />
        <h2 className="text-xl font-semibold text-white">{category}</h2>
        <span className="text-[#9E9E9E] text-sm">({apis.length})</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apis.map((api) => (
          <div key={api.id} onClick={() => onSelectAPI(api)} className="cursor-pointer">
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
            />
          </div>
        ))}
      </div>
    </section>
  );
}