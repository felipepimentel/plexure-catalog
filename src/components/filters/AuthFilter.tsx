import React from 'react';
import { Lock } from 'lucide-react';

interface AuthFilterProps {
  selected: string[];
  onChange: (auth: string[]) => void;
}

const authMethods = [
  { value: 'oauth2', label: 'OAuth 2.0' },
  { value: 'apikey', label: 'API Key' },
  { value: 'jwt', label: 'JWT' },
  { value: 'basic', label: 'Basic Auth' }
];

export function AuthFilter({ selected, onChange }: AuthFilterProps) {
  const handleToggle = (auth: string) => {
    const newSelected = selected.includes(auth)
      ? selected.filter(a => a !== auth)
      : [...selected, auth];
    onChange(newSelected);
  };

  return (
    <div>
      <div className="flex items-center space-x-2 mb-3">
        <Lock className="h-4 w-4 text-[#4FC3F7]" />
        <h4 className="text-[#E0E0E0] font-medium">Authentication</h4>
      </div>
      <div className="space-y-2">
        {authMethods.map(({ value, label }) => (
          <label
            key={value}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={selected.includes(value)}
              onChange={() => handleToggle(value)}
              className="form-checkbox h-4 w-4 rounded border-[#424242] bg-[#2A2A2A] text-[#FF5722] focus:ring-[#FF5722] focus:ring-offset-0"
            />
            <span className="text-[#E0E0E0] text-sm group-hover:text-white transition-colors">
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}