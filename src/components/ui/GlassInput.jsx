'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const GlassInput = forwardRef(function GlassInput(
  { label, error, icon, className = '', ...props },
  ref
) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-2 w-full"
    >
      {label && (
        <label
          className="text-sm font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
            style={{ color: 'var(--text-muted)' }}
          >
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={`glass-input ${icon ? 'pr-10' : ''} ${error ? 'border-red-500' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-xs"
          style={{ color: 'var(--color-danger)' }}
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
});

export default GlassInput;
