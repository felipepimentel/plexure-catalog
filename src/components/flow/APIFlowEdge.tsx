import React from 'react';
import { EdgeProps, getBezierPath } from 'react-flow-renderer';

export function APIFlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path stroke-[#4FC3F7] stroke-2"
        d={edgePath}
      />
    </>
  );
}