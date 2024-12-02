import React from 'react';
import { Save, History, Settings, Code, Download } from 'lucide-react';

interface APIPlaygroundToolbarProps {
  method: string;
  onMethodChange: (method: string) => void;
  onHistoryClick: () => void;
  onSettingsClick: () => void;
  onSaveClick: () => void;
}

export function APIPlaygroundToolbar({
  method,
  onMethodChange,
  onHistoryClick,
  onSettingsClick,
  onSaveClick,
}: APIPlaygroundToolbarProps) {
  const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

  return (
    <div className="flex items-center justify-between border-b border-[#424242] p-4">
      <div className="flex items-center space-x-2">
        {methods.map((m) => (
          <button
            key={m}
            onClick={() => onMethodChange(m)}
            className={`px-3 py-1.5 rounded text-sm font-medium ${
              method === m
                ? 'bg-[#FF5722] text-white'
                : 'bg-[#2A2A2A] text-[#E0E0E0] hover:bg-[#333333]'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onHistoryClick}
          className="p-2 text-[#E0E0E0] hover:text-white hover:bg-[#2A2A2A] rounded"
        >
          <History className="h-5 w-5" />
        </button>
        <button
          onClick={onSettingsClick}
          className="p-2 text-[#E0E0E0] hover:text-white hover:bg-[#2A2A2A] rounded"
        >
          <Settings className="h-5 w-5" />
        </button>
        <button
          onClick={onSaveClick}
          className="flex items-center space-x-2 px-4 py-2 bg-[#FF5722] text-white rounded-lg hover:bg-[#F4511E] transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>Save Request</span>
        </button>
      </div>
    </div>
  );
}