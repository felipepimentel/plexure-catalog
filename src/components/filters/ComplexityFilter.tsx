import React from 'react';
import { Gauge } from 'lucide-react';

interface ComplexityFilterProps {
  selected: string | null;
  onChange: (complexity: string | null) => void;
}

const complexityLevels = [
  { value: 'basic', label: 'Basic' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
];

export function ComplexityFilter({ selected, onChange }: ComplexityFilterProps) {
  return (
    <div>
      <div className="flex items-center space-x-2 mb-3">
        <Gauge className="h-4 w-4 text-[#4FC3F7]" />
        <h4 className="text-[#E0E0E0] font-medium">Complexity</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {complexityLevels.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onChange(selected === value ? null : value)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              selected === value
                ? 'bg-[#FF5722] text-white'
                : 'bg-[#2A2A2A] text-[#E0E0E0] hover:bg-[#333333]'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}