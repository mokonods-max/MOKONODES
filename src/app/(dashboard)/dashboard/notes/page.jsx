'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '@/store/useAuthStore';
import { subscribeNotes, createNote, deleteNote } from '@/lib/firestore';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import GlassInput from '@/components/ui/GlassInput';
import AdPlaceholder from '@/components/ui/AdPlaceholder';

export default function NotesPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const [notes, setNotes] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;
    const unsub = subscribeNotes(user.uid, setNotes);
    return () => unsub();
  }, [user?.uid]);

  const handleCreate = useCallback(async () => {
    if (!newTitle.trim() || !user?.uid) return;
    setCreating(true);
    try {
      const noteId = await createNote(user.uid, newTitle.trim(), '');
      setNewTitle('');
      setShowCreate(false);
      router.push(`/dashboard/notes/${noteId}`);
    } catch (err) {
      console.error('خطأ في إنشاء الملاحظة:', err);
    } finally {
      setCreating(false);
    }
  }, [newTitle, user?.uid, router]);

  const handleDelete = useCallback(async (e, noteId) => {
    e.stopPropagation();
    if (confirm('هل أنت متأكد من حذف هذه الملاحظة؟')) {
      await deleteNote(noteId);
    }
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto h-full">
      {/* ─── Header ─── */}
      <div className="flex items-center justify-between mb-8 w-full">
        <div>
          <h2
            className="text-3xl font-bold mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            ملاحظاتي
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {notes.length === 0
              ? 'لا يوجد لديك ملاحظات بعد.'
              : `لديك ${notes.length} ملاحظة`}
          </p>
        </div>

        <GlassButton onClick={() => setShowCreate(true)}>
          + ملاحظة جديدة
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
                إنشاء ملاحظة جديدة
              </h3>
              <GlassInput
                label="عنوان الملاحظة"
                placeholder="مثال: أفكار المشروع الجديد"
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

      {/* ─── Notes Grid ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {notes.map((note, i) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
            >
              <GlassCard
                className="p-6 h-[200px] flex flex-col cursor-pointer group relative"
                onClick={() => router.push(`/dashboard/notes/${note.id}`)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, var(--color-warning), var(--color-danger))',
                      opacity: 0.9,
                    }}
                  >
                    <span className="text-lg text-white">📝</span>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, note.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-sm p-1 rounded-lg hover:bg-red-500/20"
                    style={{ color: 'var(--color-danger)' }}
                  >
                    🗑️
                  </button>
                </div>

                <h3
                  className="text-lg font-bold mb-2 line-clamp-1 flex-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {note.title || 'بدون عنوان'}
                </h3>

                <p
                  className="text-sm line-clamp-2 mb-4 flex-1"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {note.content || 'لا يوجد محتوى...'}
                </p>

                <div
                  className="text-xs pt-4 border-t flex justify-between items-center"
                  style={{
                    borderColor: 'var(--glass-border)',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span>
                    {note.updatedAt?.toDate
                      ? note.updatedAt.toDate().toLocaleDateString('ar-SA')
                      : 'الآن'}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ─── Empty State ─── */}
      {notes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center py-20"
        >
          <div className="text-6xl mb-4 animate-float">📝</div>
          <p
            className="text-xl font-medium mb-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            لا توجد ملاحظات
          </p>
          <p style={{ color: 'var(--text-muted)' }}>
            ابدأ بتدوين أفكارك وملاحظاتك المهمة الآن
          </p>
        </motion.div>
      )}
    </div>
  );
}
