import React from 'react';
import { Activity } from 'lucide-react';
import { Badge } from '../ui/Badge';

interface StatusFilterProps {
  selected: string[];
  onChange: (status: string[]) => void;
}

const statuses = [
  { value: 'active', label: 'Active', color: 'success' },
  { value: 'beta', label: 'Beta', color: 'warning' },
  { value: 'deprecated', label: 'Deprecated', color: 'error' }
] as const;

export function StatusFilter({ selected, onChange }: StatusFilterProps) {
  const handleToggle = (status: string) => {
    const newSelected = selected.includes(status)
      ? selected.filter(s => s !== status)
      : [...selected, status];
    onChange(newSelected);
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-3">
        <Activity className="h-4 w-4 text-[#4FC3F7]" />
        <h4 className="text-[#E0E0E0] font-medium">Status</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {statuses.map(({ value, label, color }) => (
          <button
            key={value}
            onClick={() => handleToggle(value)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              selected.includes(value)
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