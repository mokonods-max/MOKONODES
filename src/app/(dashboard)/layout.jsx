'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '@/store/useAuthStore';
import Sidebar from '@/components/layout/Sidebar';
import AdPlaceholder from '@/components/ui/AdPlaceholder';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { user, loading, logout } = useAuthStore();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'var(--canvas-bg)' }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <span className="text-2xl font-bold text-white">M</span>
          </motion.div>
          <p style={{ color: 'var(--text-secondary)' }}>جارٍ التحميل...</p>
        </motion.div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--canvas-bg)' }}>
      {/* ─── Top Bar ─── */}
      <header
        className="glass-strong sticky top-0 z-50 flex items-center justify-between px-4 md:px-6 py-3 border-b"
        style={{ borderColor: 'var(--glass-border)' }}
      >
        <div className="flex items-center gap-2 md:gap-3">
          <div
            className="w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            }}
          >
            <span className="text-sm md:text-base font-bold text-white">M</span>
          </div>
          <h1 className="text-base md:text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            MokoNodes
          </h1>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <span className="text-xs md:text-sm hidden sm:block" style={{ color: 'var(--text-secondary)' }}>
            {user.displayName || user.email}
          </span>
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2"
              style={{ borderColor: 'var(--glass-border)' }}
            />
          )}
          <button
            onClick={logout}
            className="glass-button glass-button-ghost text-xs md:text-sm py-1.5 md:py-2 px-3 md:px-4"
          >
            خروج
          </button>
        </div>
      </header>

      {/* ─── Main Content Area with Sidebar ─── */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Page Content */}
        <div className="flex-1 flex flex-col overflow-y-auto relative min-w-0">
          
          <AnimatePresence mode="wait">
            <motion.main
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 h-full relative"
            >
              {children}
            </motion.main>
          </AnimatePresence>
        </div>

        {/* ─── Global Left Ad Sidebar ─── */}
        <div className="hidden lg:flex w-[200px] flex-shrink-0 flex-col items-center justify-start py-8 px-4 border-r border-[var(--glass-border)]" style={{ background: 'var(--canvas-bg)' }}>
          <AdPlaceholder type="skyscraper" />
        </div>
      </div>
    </div>
  );
}
