import React from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap
} from 'react-flow-renderer';
import { API } from '../../types/api';
import { Card } from '../ui/Card';

interface APIDependencyGraphProps {
  apis: API[];
  onNodeClick: (apiId: string) => void;
}

export function APIDependencyGraph({ apis, onNodeClick }: APIDependencyGraphProps) {
  const nodes: Node[] = apis.map((api) => ({
    id: api.id,
    type: 'default',
    data: { 
      label: (
        <div className="p-2">
          <div className="font-medium text-sm">{api.title}</div>
          <div className="text-xs text-gray-400">{api.currentVersion.version}</div>
        </div>
      )
    },
    position: { x: Math.random() * 500, y: Math.random() * 500 },
    style: {
      background: '#1E1E1E',
      color: '#E0E0E0',
      border: '1px solid #424242',
      borderRadius: '8px',
      width: 180,
    }
  }));

  const edges: Edge[] = apis.flatMap((api) => 
    api.dependencies.map((dep) => ({
      id: `${api.id}-${dep.name}`,
      source: api.id,
      target: apis.find(a => a.title === dep.name)?.id || '',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#4FC3F7' }
    }))
  ).filter(edge => edge.target);

  return (
    <Card className="bg-[#1E1E1E] p-6">
      <div className="h-[600px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={(_, node) => onNodeClick(node.id)}
          fitView
        >
          <Background color="#424242" gap={16} />
          <Controls />
          <MiniMap
            nodeColor="#1E1E1E"
            maskColor="rgba(0, 0, 0, 0.2)"
            style={{ background: '#2A2A2A' }}
          />
        </ReactFlow>
      </div>
    </Card>
  );
}