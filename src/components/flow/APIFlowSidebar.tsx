import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { API } from '../../types/api';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface APIFlowSidebarProps {
  apis: API[];
}

export function APIFlowSidebar({ apis }: APIFlowSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(apis.map(api => api.category)));
  
  const filteredApis = apis.filter(api => {
    const matchesSearch = !searchQuery || 
      api.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.description.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = !selectedCategory || api.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const onDragStart = (event: React.DragEvent, api: API) => {
    event.dataTransfer.setData('application/reactflow', api.id);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Card className="w-80 bg-[#1E1E1E] p-4 mr-4 flex flex-col">
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9E9E9E]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search APIs..."
            className="w-full pl-9 pr-4 py-2 bg-[#2A2A2A] border border-[#424242] rounded-lg text-white placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
          />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 rounded-full text-sm ${
            !selectedCategory
              ? 'bg-[#FF5722] text-white'
              : 'bg-[#2A2A2A] text-[#E0E0E0] hover:bg-[#333333]'
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === category
                ? 'bg-[#FF5722] text-white'
                : 'bg-[#2A2A2A] text-[#E0E0E0] hover:bg-[#333333]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredApis.map((api) => (
          <div
            key={api.id}
            draggable
            onDragStart={(e) => onDragStart(e, api)}
            className="p-3 bg-[#2A2A2A] rounded-lg cursor-move hover:bg-[#333333] transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">{api.title}</span>
              <Badge
                variant={api.status === 'stable' ? 'success' : 'error'}
                className="capitalize"
              >
                {api.status}
              </Badge>
            </div>
            <p className="text-[#9E9E9E] text-sm line-clamp-2">
              {api.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}