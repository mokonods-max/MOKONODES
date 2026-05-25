'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ReactFlow,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  useReactFlow,
  ReactFlowProvider,
  useOnSelectionChange,
  ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import useCanvasStore from '@/store/useCanvasStore';
import {
  subscribeNodes,
  subscribeEdges,
  createNode,
  createEdge,
  deleteNode,
  deleteEdge,
} from '@/lib/firestore';
import CustomNode from './CustomNode';
import CustomEdge from './CustomEdge';
import { motion, AnimatePresence } from 'framer-motion';

const nodeTypes = { custom: CustomNode };
const edgeTypes = { custom: CustomEdge };

function FlowCanvasInner({ mapId }) {
  const router = useRouter();
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
    syncNodePosition,
    setCurrentMapId,
  } = useCanvasStore();

  const { screenToFlowPosition, getViewport } = useReactFlow();
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedEdges, setSelectedEdges] = useState([]);

  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      setSelectedNodes(nodes);
      setSelectedEdges(edges);
    },
  });

  useEffect(() => {
    setCurrentMapId(mapId);
    return () => setCurrentMapId(null);
  }, [mapId, setCurrentMapId]);

  useEffect(() => {
    if (!mapId) return;

    const unsubNodes = subscribeNodes(mapId, (firestoreNodes) => {
      const flowNodes = firestoreNodes.map((n) => ({
        id: n.id,
        type: 'custom',
        position: n.position || { x: 0, y: 0 },
        data: {
          title: n.title,
          description: n.description,
          status: n.status,
          progress: n.progress,
          dueDate: n.dueDate,
          pomodoro: n.pomodoro,
        },
      }));
      setNodes(flowNodes);
    });

    const unsubEdges = subscribeEdges(mapId, (firestoreEdges) => {
      const flowEdges = firestoreEdges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        sourceHandle: e.sourceHandle,
        targetHandle: e.targetHandle,
        type: 'custom',
      }));
      setEdges(flowEdges);
    });

    return () => {
      unsubNodes();
      unsubEdges();
    };
  }, [mapId, setNodes, setEdges]);

  const handleNodeDragStop = useCallback(
    (event, node) => {
      syncNodePosition(node.id, node.position);
    },
    [syncNodePosition]
  );

  const handlePaneDoubleClick = useCallback(
    async (event) => {
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      await createNode(mapId, {
        title: 'عقدة جديدة',
        description: '',
        position,
        status: 'todo',
        progress: 0,
      });
    },
    [mapId, screenToFlowPosition]
  );

  const handleAddNodeCenter = useCallback(async () => {
    const { x, y, zoom } = getViewport();
    const centerX = -x / zoom + window.innerWidth / (2 * zoom);
    const centerY = -y / zoom + window.innerHeight / (2 * zoom);

    await createNode(mapId, {
      title: 'عقدة جديدة',
      description: '',
      position: { x: centerX, y: centerY },
      status: 'todo',
      progress: 0,
    });
  }, [mapId, getViewport]);

  const handleConnect = useCallback(
    async (params) => {
      await createEdge(mapId, {
        source: params.source,
        target: params.target,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
      });
    },
    [mapId]
  );

  const handleDeleteSelected = useCallback(async () => {
    for (const node of selectedNodes) {
      await deleteNode(mapId, node.id);
    }
    for (const edge of selectedEdges) {
      await deleteEdge(mapId, edge.id);
    }
  }, [mapId, selectedNodes, selectedEdges]);

  const handleDelete = useCallback(
    async (params) => {
      const { nodes: deletedNodes = [], edges: deletedEdges = [] } = params;
      for (const node of deletedNodes) {
        await deleteNode(mapId, node.id);
      }
      for (const edge of deletedEdges) {
        await deleteEdge(mapId, edge.id);
      }
    },
    [mapId]
  );

  const handleEdgeDoubleClick = useCallback(
    async (event, edge) => {
      event.stopPropagation();
      await deleteEdge(mapId, edge.id);
    },
    [mapId]
  );

  return (
    <div className="w-full h-full relative" style={{ background: 'var(--canvas-bg)' }}>
      
      {/* ─── Topbar: Actions ─── */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <button
          onClick={handleAddNodeCenter}
          className="glass-button text-sm py-2 px-4 !rounded-xl shadow-lg !bg-[var(--color-primary)] hover:!bg-[var(--color-primary-dark)] text-white transition-all flex items-center gap-2 font-bold"
        >
          <span className="text-lg">+</span>
          إضافة عقدة
        </button>
        <button
          onClick={() => router.push('/dashboard')}
          className="glass-button glass-button-ghost text-sm py-2 px-4 !rounded-xl shadow-lg hover:!bg-white/10 text-white transition-all"
        >
          حفظ وخروج
        </button>
      </div>

      {/* ─── Instructions Panel (Top Left) ─── */}
      <div className="absolute top-4 left-4 z-50 glass-strong p-3 rounded-xl max-w-[200px] md:max-w-[250px] pointer-events-none hidden sm:block shadow-lg border border-[var(--glass-border)]">
        <h3 className="text-xs md:text-sm font-bold mb-2 flex items-center gap-2 text-[var(--color-accent)]">
          <span>💡</span> تعليمات سريعة
        </h3>
        <ul className="text-[10px] md:text-xs space-y-2 text-[var(--text-secondary)] list-disc list-inside">
          <li><strong>تغيير الاسم:</strong> انقر مرتين على اسم العقدة لتعديله.</li>
          <li><strong>حذف سلك:</strong> انقر مرتين على السلك لحذفه مباشرة.</li>
          <li><strong>تحديد متعدد:</strong> اسحب الفأرة في اللوحة لتحديد أكثر من عنصر وحذفها.</li>
          <li><strong>الربط الحر:</strong> يمكنك سحب الأسلاك بين أي نقطتين بحرية.</li>
        </ul>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={handleNodeDragStop}
        onConnect={handleConnect}
        onPaneDoubleClick={handlePaneDoubleClick}
        onEdgeDoubleClick={handleEdgeDoubleClick}
        onDelete={handleDelete}
        fitView
        fitViewOptions={{ padding: 0.2, maxZoom: 1.2 }}
        connectionMode={ConnectionMode.Loose}
        snapToGrid
        snapGrid={[20, 20]}
        deleteKeyCode={['Backspace', 'Delete']}
        minZoom={0.1}
        maxZoom={4}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        proOptions={{ hideAttribution: true }}
        panOnScroll={false}
        panOnDrag={true}
        zoomOnScroll={true}
        zoomOnPinch={true}
        zoomOnDoubleClick={false}
      >
        <Controls
          position="bottom-left"
          showInteractive={false}
          className="glass-strong !m-6 !hidden md:!flex"
        />
        <MiniMap
          position="top-right"
          nodeColor={() => 'var(--color-primary)'}
          maskColor="rgba(0, 0, 0, 0.5)"
          className="glass-strong !m-6 !mt-24 !hidden lg:!block" // shifted down to avoid top buttons
          style={{ borderRadius: 'var(--radius-lg)' }}
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={30}
          size={2}
          color="rgba(255, 255, 255, 0.1)"
        />
      </ReactFlow>

      {/* ─── Delete Button (Only shows when items selected) ─── */}
      <AnimatePresence>
        {(selectedNodes.length > 0 || selectedEdges.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 glass-strong px-6 py-3 rounded-full shadow-2xl"
          >
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-2 text-sm font-bold text-white hover:text-red-400 transition-colors whitespace-nowrap"
            >
              <span className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                🗑
              </span>
              حذف المحدد
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FlowCanvas({ mapId }) {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner mapId={mapId} />
    </ReactFlowProvider>
  );
}
