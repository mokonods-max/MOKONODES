'use client';

import { memo } from 'react';
import { BaseEdge, getSmoothStepPath } from '@xyflow/react';

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected,
  animated = true,
}) {
  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 30, // منحنى أنعم
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: selected ? 'var(--color-accent)' : 'var(--color-primary-light)',
          strokeWidth: selected ? 4 : 3,
          strokeOpacity: selected ? 1 : 0.6,
          filter: selected ? 'drop-shadow(0 0 10px var(--color-accent))' : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
      {/* نقطة مضيئة متحركة على طول الرابط */}
      {animated && (
        <circle r="4" fill={selected ? '#fff' : 'var(--color-accent)'} filter="drop-shadow(0 0 8px var(--color-accent))">
          <animateMotion dur="2.5s" repeatCount="indefinite" path={edgePath} />
        </circle>
      )}
    </>
  );
}

export default memo(CustomEdge);
