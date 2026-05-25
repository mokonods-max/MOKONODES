'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '@/store/useAuthStore';
import { subscribeTaskLists, createTaskList, deleteTaskList } from '@/lib/firestore';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import GlassInput from '@/components/ui/GlassInput';
import AdPlaceholder from '@/components/ui/AdPlaceholder';

export default function TasksPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [lists, setLists] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;
    const unsub = subscribeTaskLists(user.uid, setLists);
    return () => unsub();
  }, [user?.uid]);

  const handleCreate = useCallback(async () => {
    if (!newTitle.trim() || !user?.uid) return;
    setCreating(true);
    try {
      const listId = await createTaskList(user.uid, newTitle.trim());
      setNewTitle('');
      setShowCreate(false);
      router.push(`/dashboard/tasks/${listId}`);
    } catch (err) {
      console.error('خطأ في إنشاء القائمة:', err);
    } finally {
      setCreating(false);
    }
  }, [newTitle, user?.uid, router]);

  const handleDelete = useCallback(async (e, listId) => {
    e.stopPropagation();
    if (confirm('هل أنت متأكد من حذف قائمة المهام هذه؟')) {
      await deleteTaskList(listId);
    }
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto h-full">
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2
            className="text-3xl font-bold mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            قوائم المهام
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {lists.length === 0
              ? 'لم تنشئ أي قائمة مهام بعد.'
              : `لديك ${lists.length} قائمة`}
          </p>
        </div>
        <GlassButton onClick={() => setShowCreate(true)}>
          + قائمة جديدة
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
                إنشاء قائمة مهام
              </h3>
              <GlassInput
                label="اسم القائمة"
                placeholder="مثال: مهام اليوم"
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

      {/* ─── Content Area with Left Ad ─── */}
      <div className="flex gap-8">
        {/* Task Lists Grid (Right side because of RTL) */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {lists.map((list, i) => (
                <motion.div
                  key={list.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <GlassCard
                    className="p-6 cursor-pointer group relative"
                    onClick={() => router.push(`/dashboard/tasks/${list.id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, var(--color-success), var(--color-accent))',
                          opacity: 0.9,
                        }}
                      >
                        <span className="text-lg text-white">✅</span>
                      </div>
                      <button
                        onClick={(e) => handleDelete(e, list.id)}
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
                      {list.title}
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {list.createdAt?.toDate
                        ? list.createdAt.toDate().toLocaleDateString('ar-SA')
                        : 'الآن'}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ─── Empty State ─── */}
          {lists.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4 animate-float">📋</div>
              <p
                className="text-xl font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                نظّم يومك
              </p>
              <p style={{ color: 'var(--text-muted)' }}>
                أضف قوائم لمهامك اليومية أو الأسبوعية وابدأ بالإنجاز.
              </p>
            </motion.div>
          )}
        </div>

        {/* ─── Left Vertical Ad (Skyscraper) ─── */}
        <div className="hidden lg:block w-[160px] flex-shrink-0">
          <AdPlaceholder type="skyscraper" />
        </div>
      </div>
    </div>
  );
}
