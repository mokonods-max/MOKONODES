'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { subscribeTaskList, subscribeTasks, createTask, updateTask, deleteTask } from '@/lib/firestore';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import AdPlaceholder from '@/components/ui/AdPlaceholder';

export default function TaskListEditorPage({ params }) {
  const { id: listId } = use(params);
  const router = useRouter();
  const [list, setList] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    if (!listId) return;
    const unsubList = subscribeTaskList(listId, (data) => {
      if (data) setList(data);
      else router.push('/dashboard/tasks');
    });
    const unsubTasks = subscribeTasks(listId, setTasks);

    return () => {
      unsubList();
      unsubTasks();
    };
  }, [listId, router]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const text = newTaskText.trim();
    setNewTaskText('');
    try {
      await createTask(listId, text);
    } catch (err) {
      console.error('خطأ في إضافة المهمة:', err);
    }
  };

  const toggleTask = async (taskId, currentStatus) => {
    try {
      await updateTask(listId, taskId, { isCompleted: !currentStatus });
    } catch (err) {
      console.error('خطأ في تحديث المهمة:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(listId, taskId);
    } catch (err) {
      console.error('خطأ في حذف المهمة:', err);
    }
  };

  if (!list) return null;

  const completedCount = tasks.filter((t) => t.isCompleted).length;
  const progress = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="h-full flex flex-col max-w-3xl mx-auto w-full p-6">
      {/* ─── Topbar ─── */}
      <div className="flex items-center justify-between mb-8">
        <GlassButton
          variant="ghost"
          size="sm"
          onClick={async () => {
            if (newTaskText.trim()) {
              try {
                await createTask(listId, newTaskText.trim());
              } catch (err) {
                console.error(err);
              }
            }
            router.push('/dashboard/tasks');
          }}
          className="!rounded-xl shadow-sm hover:!bg-[var(--color-primary)] hover:!text-white"
        >
          حفظ وخروج
        </GlassButton>
      </div>

      {/* ─── Header & Progress ─── */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {list.title}
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--glass-bg)' }}>
            <motion.div
              className="h-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              style={{
                background: progress === 100 ? 'var(--color-success)' : 'var(--color-primary)',
              }}
            />
          </div>
          <span className="text-sm font-bold" style={{ color: 'var(--text-secondary)' }}>
            {progress}%
          </span>
        </div>
      </div>

      {/* ─── Add Task Form ─── */}
      <form onSubmit={handleAddTask} className="mb-8">
        <div className="relative">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            className="w-full rounded-2xl py-3 md:py-4 pl-4 pr-12 md:pr-14 text-base md:text-lg outline-none transition-all"
            style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
            }}
            placeholder="أضف مهمة جديدة واضغط Enter..."
          />
          <button
            type="submit"
            className="absolute left-2 top-2 bottom-2 w-10 bg-transparent flex items-center justify-center text-xl md:text-2xl hover:scale-110 transition-transform"
            style={{ color: 'var(--color-primary)' }}
          >
            +
          </button>
        </div>
      </form>

      {/* ─── Tasks List ─── */}
      <div className="flex-1 overflow-y-auto pr-2 pb-20">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="mb-3"
            >
              <GlassCard hover={false} className="p-3 md:p-4 flex items-center gap-3 md:gap-4 group">
                {/* Custom Checkbox Circle */}
                <button
                  onClick={() => toggleTask(task.id, task.isCompleted)}
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-all border-2"
                  style={{
                    borderColor: task.isCompleted ? 'var(--color-success)' : 'var(--glass-border-strong)',
                    background: task.isCompleted ? 'var(--color-success)' : 'transparent',
                  }}
                >
                  {task.isCompleted && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 md:w-4 md:h-4 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </motion.svg>
                  )}
                </button>

                {/* Task Text */}
                <span
                  className="flex-1 text-base md:text-lg transition-all"
                  style={{
                    color: task.isCompleted ? 'var(--text-muted)' : 'var(--text-primary)',
                    textDecoration: task.isCompleted ? 'line-through' : 'none',
                  }}
                >
                  {task.text}
                </span>

                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/20 rounded-lg text-xs md:text-sm"
                  style={{ color: 'var(--color-danger)' }}
                >
                  🗑️
                </button>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>

        {tasks.length === 0 && (
          <div className="text-center py-10 text-sm md:text-base" style={{ color: 'var(--text-muted)' }}>
            القائمة فارغة. أضف مهمتك الأولى بالأعلى!
          </div>
        )}
      </div>
    </div>
  );
}
