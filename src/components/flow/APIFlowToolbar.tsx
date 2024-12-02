import React from 'react';
import { Save, Undo, Redo, ZoomIn, ZoomOut, Download } from 'lucide-react';

interface APIFlowToolbarProps {
  onSave: () => void;
}

export function APIFlowToolbar({ onSave }: APIFlowToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-[#424242] p-4">
      <div className="flex items-center space-x-2">
        <button className="p-2 text-[#E0E0E0] hover:text-white hover:bg-[#2A2A2A] rounded">
          <Undo className="h-5 w-5" />
        </button>
        <button className="p-2 text-[#E0E0E0] hover:text-white hover:bg-[#2A2A2A] rounded">
          <Redo className="h-5 w-5" />
        </button>
        <div className="h-6 w-px bg-[#424242] mx-2" />
        <button className="p-2 text-[#E0E0E0] hover:text-white hover:bg-[#2A2A2A] rounded">
          <ZoomIn className="h-5 w-5" />
        </button>
        <button className="p-2 text-[#E0E0E0] hover:text-white hover:bg-[#2A2A2A] rounded">
          <ZoomOut className="h-5 w-5" />
        </button>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={onSave}
          className="flex items-center space-x-2 px-4 py-2 bg-[#FF5722] text-white rounded-lg hover:bg-[#F4511E] transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>Save Flow</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 border border-[#424242] text-[#E0E0E0] rounded-lg hover:bg-[#2A2A2A] transition-colors">
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
}