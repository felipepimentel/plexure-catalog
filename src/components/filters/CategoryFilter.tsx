import React from 'react';
import { Tag } from 'lucide-react';

interface CategoryFilterProps {
  selected: string[];
  onChange: (categories: string[]) => void;
}

const categories = [
  'Financial',
  'Banking',
  'Analytics',
  'Security',
  'Communication',
  'Storage',
  'Machine Learning',
  'Integration'
];

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  const handleToggle = (category: string) => {
    const newSelected = selected.includes(category)
      ? selected.filter(c => c !== category)
      : [...selected, category];
    onChange(newSelected);
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-3">
        <Tag className="h-4 w-4 text-[#4FC3F7]" />
        <h4 className="text-[#E0E0E0] font-medium">Categories</h4>
      </div>
      <div className="space-y-2">
        {categories.map((category) => (
          <label
            key={category}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selected.includes(category)}
              onChange={() => handleToggle(category)}
              className="form-checkbox h-4 w-4 rounded border-[#424242] bg-[#2A2A2A] text-[#FF5722] focus:ring-[#FF5722] focus:ring-offset-0"
            />
            <span className="text-[#E0E0E0] text-sm group-hover:text-white transition-colors">
              {category}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}