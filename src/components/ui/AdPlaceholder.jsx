'use client';

import { memo } from 'react';

function AdPlaceholder({ type = 'skyscraper', className = '' }) {
  // المقاسات القياسية للإعلانات
  const sizes = {
    skyscraper: { width: '100%', maxWidth: '160px', height: '600px', label: 'إعلان طولي (160x600)' },
    leaderboard: { width: '100%', maxWidth: '728px', height: '90px', label: 'إعلان Leaderboard (728x90)' },
    mediumRectangle: { width: '100%', maxWidth: '300px', height: '250px', label: 'إعلان مربع (300x250)' },
  };

  const adConfig = sizes[type] || sizes.skyscraper;

  return (
    <div
      className={`flex items-center justify-center rounded-xl overflow-hidden ${className}`}
      style={{
        width: adConfig.width,
        maxWidth: adConfig.maxWidth,
        height: adConfig.height,
        background: 'repeating-linear-gradient(45deg, var(--glass-bg), var(--glass-bg) 10px, var(--surface-card) 10px, var(--surface-card) 20px)',
        border: '2px dashed var(--glass-border-strong)',
        opacity: 0.8,
      }}
    >
      <div className="bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm text-center">
        <span className="text-xs font-bold" style={{ color: 'var(--text-muted)' }}>
          {adConfig.label}
        </span>
      </div>
    </div>
  );
}

export default memo(AdPlaceholder);
