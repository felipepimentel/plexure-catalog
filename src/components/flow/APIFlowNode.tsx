import React, { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { Activity, Tag } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { API } from '../../types/api';

interface APIFlowNodeProps {
  data: {
    api: API;
  };
}

export const APIFlowNode = memo(({ data }: APIFlowNodeProps) => {
  const { api } = data;

  return (
    <div className="bg-[#1E1E1E] border border-[#424242] rounded-lg p-4 w-[280px]">
      <Handle type="target" position={Position.Left} />
      
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-medium truncate max-w-[70%]">
          {api.title}
        </h3>
        <Badge
          variant={api.status === 'stable' ? 'success' : 'error'}
          className="capitalize"
        >
          {api.status}
        </Badge>
      </div>

      <p className="text-[#E0E0E0] text-sm mb-3 line-clamp-2">
        {api.description}
      </p>

      <div className="flex items-center justify-between text-sm text-[#9E9E9E]">
        <div className="flex items-center space-x-1">
          <Activity className="h-4 w-4" />
          <span>v{api.currentVersion.version}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Tag className="h-4 w-4" />
          <span>{api.category}</span>
        </div>
      </div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
});

APIFlowNode.displayName = 'APIFlowNode';