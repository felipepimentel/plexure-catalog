import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  Connection,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'react-flow-renderer';
import { APIFlowSidebar } from './APIFlowSidebar';
import { APIFlowToolbar } from './APIFlowToolbar';
import { APIFlowNode } from './APIFlowNode';
import { APIFlowEdge } from './APIFlowEdge';
import { APIFlowInspector } from './APIFlowInspector';
import { Card } from '../ui/Card';
import { API } from '../../types/api';

interface APIFlowBuilderProps {
  apis: API[];
  onSave: (flow: { nodes: Node[]; edges: Edge[] }) => void;
}

const nodeTypes = {
  apiNode: APIFlowNode,
};

const edgeTypes = {
  apiEdge: APIFlowEdge,
};

export function APIFlowBuilder({ apis, onSave }: APIFlowBuilderProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, type: 'apiEdge' }, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const apiId = event.dataTransfer.getData('application/reactflow');
      const api = apis.find(a => a.id === apiId);
      
      if (!api) return;

      const position = {
        x: event.clientX - event.currentTarget.getBoundingClientRect().left,
        y: event.clientY - event.currentTarget.getBoundingClientRect().top,
      };

      const newNode: Node = {
        id: `${api.id}-${nodes.length + 1}`,
        type: 'apiNode',
        position,
        data: { api },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [apis, nodes, setNodes]
  );

  const handleSave = () => {
    onSave({ nodes, edges });
  };

  return (
    <div className="flex h-[calc(100vh-12rem)]">
      <APIFlowSidebar apis={apis} />
      
      <div className="flex-1">
        <Card className="bg-[#1E1E1E] h-full flex flex-col">
          <APIFlowToolbar onSave={handleSave} />
          
          <div className="flex-1">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              onNodeClick={(_, node) => setSelectedNode(node)}
              fitView
            >
              <Background color="#424242" gap={16} />
              <Controls />
            </ReactFlow>
          </div>
        </Card>
      </div>

      {selectedNode && (
        <APIFlowInspector
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
          onUpdate={(updatedData) => {
            setNodes((nds) =>
              nds.map((n) =>
                n.id === selectedNode.id ? { ...n, data: updatedData } : n
              )
            );
          }}
        />
      )}
    </div>
  );
}