'use client';

import { use, useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { subscribeNote, updateNote } from '@/lib/firestore';
import GlassButton from '@/components/ui/GlassButton';
import AdPlaceholder from '@/components/ui/AdPlaceholder';

export default function NoteEditorPage({ params }) {
  const { id: noteId } = use(params);
  const router = useRouter();
  const [note, setNote] = useState(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);

  const currentDataRef = useRef({ title: '', content: '' });
  const isDirtyRef = useRef(false);
  const savePromiseRef = useRef(null);

  useEffect(() => {
    if (!noteId) return;
    const unsub = subscribeNote(noteId, (data) => {
      if (data) {
        setNote(data);
        setTitle((prev) => (prev === '' ? data.title : prev));
        setContent((prev) => (prev === '' ? data.content || '' : prev));
        currentDataRef.current = { title: data.title, content: data.content || '' };
        isDirtyRef.current = false;
      } else {
        router.push('/dashboard/notes');
      }
    });
    return () => unsub();
  }, [noteId, router]);

  // تحديث Refs عندما يكتب المستخدم
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    currentDataRef.current.title = e.target.value;
    isDirtyRef.current = true;
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    currentDataRef.current.content = e.target.value;
    isDirtyRef.current = true;
  };

  // دالة الحفظ الفوري
  const handleSaveImmediately = useCallback(() => {
    if (isDirtyRef.current) {
      setSaving(true);
      isDirtyRef.current = false;
      
      const promise = updateNote(noteId, {
        title: currentDataRef.current.title,
        content: currentDataRef.current.content,
      })
        .catch((err) => {
          console.error('خطأ في الحفظ:', err);
          isDirtyRef.current = true;
        })
        .finally(() => {
          setSaving(false);
          savePromiseRef.current = null;
        });

      savePromiseRef.current = promise;
      return promise;
    }
    return savePromiseRef.current || Promise.resolve();
  }, [noteId]);

  // الحفظ التلقائي الزمني (كل ثانية)
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSaveImmediately();
    }, 1000);
    return () => clearTimeout(timer);
  }, [title, content, handleSaveImmediately]);

  // حفظ إجباري عند خروج المستخدم من الصفحة (Unmount)
  useEffect(() => {
    return () => {
      // هذه الدالة تنفذ عند التبديل لصفحة أخرى
      if (isDirtyRef.current) {
        updateNote(noteId, {
          title: currentDataRef.current.title,
          content: currentDataRef.current.content,
        }).catch(err => console.error("فشل الحفظ الإجباري:", err));
      }
    };
  }, [noteId]);

  if (!note) return null;

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto w-full p-6">
      {/* ─── Topbar ─── */}
      <div className="flex items-center justify-between mb-8">
        <GlassButton
          variant="ghost"
          size="sm"
          onClick={async () => {
            await handleSaveImmediately();
            router.push('/dashboard/notes');
          }}
          className="!rounded-xl shadow-sm hover:!bg-[var(--color-primary)] hover:!text-white"
        >
          حفظ وخروج
        </GlassButton>
        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          {saving ? 'جارٍ الحفظ...' : 'تم الحفظ ✔'}
        </span>
      </div>

      {/* ─── Editor Area ─── */}
      <div className="flex-1 flex flex-col gap-6">
        <input
          value={title}
          onChange={handleTitleChange}
          onBlur={handleSaveImmediately}
          className="w-full bg-transparent border-none outline-none text-2xl md:text-3xl font-bold placeholder-opacity-50"
          placeholder="عنوان الملاحظة..."
          style={{ color: 'var(--text-primary)' }}
        />
        
        <textarea
          value={content}
          onChange={handleContentChange}
          onBlur={handleSaveImmediately}
          className="flex-1 w-full bg-transparent border-none outline-none resize-none text-base md:text-lg leading-relaxed placeholder-opacity-50"
          placeholder="اكتب ملاحظاتك هنا بحرية..."
          style={{ color: 'var(--text-primary)' }}
        />
      </div>
    </div>
  );
}
