import React from 'react';
import { Node } from 'react-flow-renderer';
import { X, Settings } from 'lucide-react';
import { Card } from '../ui/Card';

interface APIFlowInspectorProps {
  node: Node;
  onClose: () => void;
  onUpdate: (data: any) => void;
}

export function APIFlowInspector({ node, onClose, onUpdate }: APIFlowInspectorProps) {
  return (
    <Card className="w-80 bg-[#1E1E1E] p-4 ml-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-[#4FC3F7]" />
          <h3 className="text-lg font-semibold text-white">Node Settings</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-[#E0E0E0] hover:text-white hover:bg-[#2A2A2A] rounded"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Add node configuration options here */}
      </div>
    </Card>
  );
}