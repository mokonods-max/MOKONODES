'use client';

import { memo, useState, useRef, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import useCanvasStore from '@/store/useCanvasStore';

const statusConfig = {
  todo: {
    label: 'قيد الانتظار',
    className: 'badge-todo',
    icon: '📋',
  },
  'in-progress': {
    label: 'قيد التنفيذ',
    className: 'badge-in-progress',
    icon: '⚡',
  },
  completed: {
    label: 'مكتمل',
    className: 'badge-completed',
    icon: '✅',
  },
  overdue: {
    label: 'متأخر',
    className: 'badge-overdue',
    icon: '⏰',
  },
};

function CustomNode({ id, data, selected }) {
  const updateNodeData = useCanvasStore((s) => s.updateNodeData);
  const status = statusConfig[data.status] || statusConfig.todo;
  const progress = data.progress || 0;
  const isCompleted = data.status === 'completed';

  // حالة التعديل على العنوان
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title || 'عقدة جديدة');
  const inputRef = useRef(null);

  // دالة التعامل مع الضغط على زر "تمت"
  const handleToggleComplete = (e) => {
    e.stopPropagation();
    const newStatus = isCompleted ? 'todo' : 'completed';
    const newProgress = isCompleted ? 0 : 100;
    updateNodeData(id, { status: newStatus, progress: newProgress });
  };

  // التركيز على الحقل عند بدء التعديل
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      // وضع المؤشر في نهاية النص
      inputRef.current.selectionStart = inputRef.current.value.length;
    }
  }, [isEditing]);

  const handleTitleSubmit = () => {
    setIsEditing(false);
    if (title.trim() !== data.title) {
      updateNodeData(id, { title: title.trim() || 'عقدة بدون اسم' });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleTitleSubmit();
    if (e.key === 'Escape') {
      setTitle(data.title);
      setIsEditing(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative"
      style={{ minWidth: 260 }}
      onDoubleClick={() => {
        if (!isCompleted) setIsEditing(true);
      }}
    >
      {/* ─── 4 Handles (Connection Points) for Mobile Friendly ─── */}
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        isConnectable={true}
        className="!w-6 !h-6 md:!w-3 md:!h-3 !bg-[var(--color-primary)] !border-2 !border-[var(--surface-dark)] hover:!scale-125 transition-transform !-top-3 md:!-top-1.5 z-10"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        isConnectable={true}
        className="!w-6 !h-6 md:!w-3 md:!h-3 !bg-[var(--color-primary)] !border-2 !border-[var(--surface-dark)] hover:!scale-125 transition-transform !-bottom-3 md:!-bottom-1.5 z-10"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        isConnectable={true}
        className="!w-6 !h-6 md:!w-3 md:!h-3 !bg-[var(--color-primary)] !border-2 !border-[var(--surface-dark)] hover:!scale-125 transition-transform !-right-3 md:!-right-1.5 z-10"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        isConnectable={true}
        className="!w-6 !h-6 md:!w-3 md:!h-3 !bg-[var(--color-primary)] !border-2 !border-[var(--surface-dark)] hover:!scale-125 transition-transform !-left-3 md:!-left-1.5 z-10"
      />

      {/* ─── Node Card ─── */}
      <div
        className="rounded-2xl transition-all duration-300 relative overflow-hidden group"
        style={{
          background: isCompleted ? 'rgba(6, 214, 160, 0.08)' : 'var(--surface-card)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: selected
            ? '2px solid var(--color-primary)'
            : isCompleted
            ? '1px solid rgba(6, 214, 160, 0.3)'
            : '1px solid var(--glass-border)',
          boxShadow: selected
            ? '0 0 30px rgba(108, 99, 255, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        {isCompleted && (
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at top right, var(--color-success), transparent 70%)',
            }}
          />
        )}

        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${status.className}`}>
              {status.icon} {status.label}
            </span>

            <button
              onClick={handleToggleComplete}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all hover:opacity-80"
              style={{
                background: isCompleted ? 'var(--color-success)' : 'rgba(255,255,255,0.05)',
                color: isCompleted ? '#fff' : 'var(--text-secondary)',
                border: `1px solid ${isCompleted ? 'var(--color-success)' : 'var(--glass-border)'}`,
              }}
            >
              {isCompleted && (
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
              {isCompleted ? 'مكتملة' : 'إنهاء'}
            </button>
          </div>

          {/* Title Editor */}
          {isEditing ? (
            <input
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleSubmit}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none font-bold text-lg mb-2 border-b border-gray-500/50 pb-1"
              style={{ color: 'var(--color-primary-light)' }}
              placeholder="اكتب اسم العقدة..."
            />
          ) : (
            <h3
              className="font-bold text-lg mb-2 leading-tight cursor-text hover:opacity-80"
              style={{
                color: isCompleted ? 'var(--text-muted)' : 'var(--text-primary)',
                textDecoration: isCompleted ? 'line-through' : 'none',
              }}
            >
              {data.title || 'عقدة جديدة'}
            </h3>
          )}

          {/* Description */}
          {data.description && (
            <p
              className="text-sm mb-4 line-clamp-2 leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {data.description}
            </p>
          )}

          {/* Progress Bar */}
          {!isCompleted && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  التقدم
                </span>
                <span className="text-xs font-bold" style={{ color: 'var(--color-primary-light)' }}>
                  {progress}%
                </span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{
                    background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default memo(CustomNode);
