import React, { useState } from 'react';
import ReactFlow, { 
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Connection
} from 'react-flow-renderer';
import { Card } from '../ui/Card';
import { API } from '../../types/api';

interface APIFlowBuilderProps {
  apis: API[];
  onSaveFlow: (flow: { nodes: Node[]; edges: Edge[] }) => void;
}

export function APIFlowBuilder({ apis, onSaveFlow }: APIFlowBuilderProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onConnect = (params: Connection) => {
    setEdges((eds) => [...eds, { ...params, id: `e${eds.length + 1}` }]);
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const apiId = event.dataTransfer.getData('application/reactflow');
    const api = apis.find(a => a.id === apiId);
    
    if (!api) return;

    const position = {
      x: event.clientX - event.currentTarget.getBoundingClientRect().left,
      y: event.clientY - event.currentTarget.getBoundingClientRect().top
    };

    const newNode: Node = {
      id: `node_${nodes.length + 1}`,
      type: 'apiNode',
      position,
      data: { api }
    };

    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <Card className="bg-[#1E1E1E] p-6">
      <div className="h-[600px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </Card>
  );
}