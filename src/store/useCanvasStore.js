import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { updateNode as updateNodeInFirestore } from '@/lib/firestore';

const useCanvasStore = create((set, get) => ({
  // ─── حالة اللوحة ───
  nodes: [],
  edges: [],
  currentMapId: null,
  viewport: { x: 0, y: 0, zoom: 1 },

  // ─── تعيين الخريطة النشطة ───
  setCurrentMapId: (mapId) => set({ currentMapId: mapId }),

  // ─── تعيين العُقد والروابط (من Firestore) ───
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  // ─── تحديث العُقد عند السحب/التحريك ───
  onNodesChange: (changes) => {
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    }));
  },

  // ─── تحديث الروابط ───
  onEdgesChange: (changes) => {
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    }));
  },

  // ─── مزامنة موضع العقدة مع Firestore بعد السحب ───
  syncNodePosition: async (nodeId, position) => {
    const { currentMapId } = get();
    if (!currentMapId) return;
    try {
      await updateNodeInFirestore(currentMapId, nodeId, { position });
    } catch (err) {
      console.error('خطأ في مزامنة الموضع:', err);
    }
  },

  // ─── تحديث بيانات عقدة معينة ───
  updateNodeData: async (nodeId, data) => {
    const { currentMapId } = get();
    if (!currentMapId) return;
    try {
      await updateNodeInFirestore(currentMapId, nodeId, data);
    } catch (err) {
      console.error('خطأ في تحديث العقدة:', err);
    }
  },

  // ─── حفظ إعدادات العرض ───
  setViewport: (viewport) => set({ viewport }),

  // ─── مسح الحالة ───
  reset: () => set({ nodes: [], edges: [], currentMapId: null }),
}));

export default useCanvasStore;
