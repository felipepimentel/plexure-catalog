import React from 'react';
import { ChevronRight } from 'lucide-react';
import { APITag } from '../../types/api';

interface APITagsFilterProps {
  tags: APITag[];
  selectedTags: string[];
  onTagSelect: (tagId: string) => void;
}

export function APITagsFilter({ tags, selectedTags, onTagSelect }: APITagsFilterProps) {
  const groupedTags = tags.reduce((acc, tag) => {
    if (!acc[tag.category]) {
      acc[tag.category] = [];
    }
    acc[tag.category].push(tag);
    return acc;
  }, {} as Record<string, APITag[]>);

  return (
    <div className="bg-[#1E1E1E] rounded-lg p-4">
      <h3 className="text-white font-semibold mb-4">Filter by Tags</h3>
      {Object.entries(groupedTags).map(([category, categoryTags]) => (
        <div key={category} className="mb-4">
          <div className="flex items-center text-[#E0E0E0] mb-2">
            <ChevronRight className="h-4 w-4" />
            <span className="ml-1 text-sm font-medium">{category}</span>
          </div>
          <div className="ml-6 space-y-2">
            {categoryTags.map((tag) => (
              <label key={tag.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => onTagSelect(tag.id)}
                  className="rounded border-[#424242] bg-[#2A2A2A] text-[#FF5722] focus:ring-[#FF5722]"
                />
                <span className="text-[#E0E0E0] text-sm">{tag.name}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}