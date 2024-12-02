import React, { useState } from 'react';
import { Globe, Search } from 'lucide-react';

interface RegionFilterProps {
  selected: string[];
  onChange: (regions: string[]) => void;
}

const regions = [
  { code: 'na', name: 'North America' },
  { code: 'eu', name: 'Europe' },
  { code: 'ap', name: 'Asia Pacific' },
  { code: 'sa', name: 'South America' },
  { code: 'af', name: 'Africa' },
  { code: 'me', name: 'Middle East' }
];

export function RegionFilter({ selected, onChange }: RegionFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (code: string) => {
    const newSelected = selected.includes(code)
      ? selected.filter(r => r !== code)
      : [...selected, code];
    onChange(newSelected);
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-3">
        <Globe className="h-4 w-4 text-[#4FC3F7]" />
        <h4 className="text-[#E0E0E0] font-medium">Region</h4>
      </div>
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9E9E9E]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search regions..."
          className="w-full pl-9 pr-3 py-1.5 bg-[#2A2A2A] border border-[#424242] rounded-lg text-sm text-white placeholder-[#9E9E9E] focus:outline-none focus:ring-2 focus:ring-[#FF5722]"
        />
      </div>
      <div className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-[#424242] scrollbar-track-transparent">
        {filteredRegions.map(({ code, name }) => (
          <label
            key={code}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selected.includes(code)}
              onChange={() => handleToggle(code)}
              className="form-checkbox h-4 w-4 rounded border-[#424242] bg-[#2A2A2A] text-[#FF5722] focus:ring-[#FF5722] focus:ring-offset-0"
            />
            <span className="text-[#E0E0E0] text-sm group-hover:text-white transition-colors">
              {name}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}