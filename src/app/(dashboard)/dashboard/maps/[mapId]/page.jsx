'use client';

import { use } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with React Flow
const FlowCanvas = dynamic(
  () => import('@/components/canvas/FlowCanvas'),
  { ssr: false }
);

export default function MapPage({ params }) {
  const { mapId } = use(params);

  return (
    <div className="w-full" style={{ height: 'calc(100vh - 64px)' }}>
      <FlowCanvas mapId={mapId} />
    </div>
  );
}
