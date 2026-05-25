'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '@/store/useAuthStore';
import { subscribeMaps, createMap, deleteMap } from '@/lib/firestore';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import GlassInput from '@/components/ui/GlassInput';
import AdPlaceholder from '@/components/ui/AdPlaceholder';

export default function DashboardPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [maps, setMaps] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [creating, setCreating] = useState(false);

  // مزامنة الخرائط من Firestore
  useEffect(() => {
    if (!user?.uid) return;
    const unsub = subscribeMaps(user.uid, setMaps);
    return () => unsub();
  }, [user?.uid]);

  // إنشاء خريطة جديدة
  const handleCreate = useCallback(async () => {
    if (!newTitle.trim() || !user?.uid) return;
    setCreating(true);
    try {
      const mapId = await createMap(user.uid, newTitle.trim());
      setNewTitle('');
      setShowCreate(false);
      router.push(`/dashboard/maps/${mapId}`);
    } catch (err) {
      console.error('خطأ في إنشاء الخريطة:', err);
    } finally {
      setCreating(false);
    }
  }, [newTitle, user?.uid, router]);

  // حذف خريطة
  const handleDelete = useCallback(async (e, mapId) => {
    e.stopPropagation();
    if (confirm('هل أنت متأكد من حذف هذه الخريطة؟')) {
      await deleteMap(mapId);
    }
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2
            className="text-3xl font-bold mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            خرائطي
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {maps.length === 0
              ? 'لم تنشئ أي خريطة بعد. ابدأ الآن!'
              : `لديك ${maps.length} خريطة`}
          </p>
        </div>
        <GlassButton onClick={() => setShowCreate(true)}>
          + خريطة جديدة
        </GlassButton>
      </div>

      {/* ─── Create Modal ─── */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setShowCreate(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-strong p-6 rounded-2xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                إنشاء خريطة جديدة
              </h3>
              <GlassInput
                label="اسم الخريطة"
                placeholder="مثال: خطة إطلاق المشروع"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              />
              <div className="flex gap-3 mt-6">
                <GlassButton
                  onClick={handleCreate}
                  loading={creating}
                  className="flex-1"
                >
                  إنشاء
                </GlassButton>
                <GlassButton
                  variant="ghost"
                  onClick={() => setShowCreate(false)}
                  className="flex-1"
                >
                  إلغاء
                </GlassButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Maps Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {maps.map((map, i) => (
            <motion.div
              key={map.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard
                className="p-6 cursor-pointer group relative"
                onClick={() => router.push(`/dashboard/maps/${map.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                      opacity: 0.9,
                    }}
                  >
                    <span className="text-lg">🗺️</span>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, map.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-sm p-1 rounded-lg hover:bg-red-500/20"
                    style={{ color: 'var(--color-danger)' }}
                  >
                    🗑️
                  </button>
                </div>
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {map.title}
                </h3>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {map.createdAt?.toDate
                    ? map.createdAt.toDate().toLocaleDateString('ar-SA')
                    : 'الآن'}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ─── Empty State ─── */}
      {maps.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4 animate-float">🚀</div>
          <p
            className="text-xl font-medium mb-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            ابدأ رحلتك الآن
          </p>
          <p style={{ color: 'var(--text-muted)' }}>
            أنشئ أول خريطة لك وابدأ بتنظيم أفكارك بصرياً
          </p>
        </motion.div>
      )}


    </div>
  );
}
