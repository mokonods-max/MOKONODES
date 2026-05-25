'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '@/store/useAuthStore';
import Sidebar from '@/components/layout/Sidebar';
import AdPlaceholder from '@/components/ui/AdPlaceholder';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout } = useAuthStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  // ─── First-Login Onboarding: Auto-open drawer ───
  useEffect(() => {
    if (!user) return;
    const key = `moko_first_visit_${user.uid}`;
    const seen = localStorage.getItem(key);
    if (!seen) {
      // Small delay so the page renders first
      const timer = setTimeout(() => {
        setDrawerOpen(true);
        localStorage.setItem(key, '1');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [user]);

  // ─── Close drawer on route change ───
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // ─── Close drawer on outside click ───
  useEffect(() => {
    function handleClickOutside(e) {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setDrawerOpen(false);
      }
    }
    if (drawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [drawerOpen]);

  // ─── Auth Guard ───
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

  const navLinks = [
    { name: 'الخرائط', path: '/dashboard', icon: '🗺️' },
    { name: 'الملاحظات', path: '/dashboard/notes', icon: '📝' },
    { name: 'المهام', path: '/dashboard/tasks', icon: '✅' },
    { name: 'المدونة', path: '/blog', icon: '📰' },
    { name: 'الإعدادات', path: '/settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--canvas-bg)' }}>

      {/* ─── Desktop Top Bar (hidden on mobile) ─── */}
      <header
        className="glass-strong sticky top-0 z-50 hidden md:flex items-center justify-between px-4 md:px-6 py-3 border-b"
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

      {/* ─── Mobile Floating Header ─── */}
      <header className="mobile-float-header md:hidden">
        {/* Logo + Name */}
        <div className="mobile-float-logo-group">
          <div className="mobile-float-logo">
            <span className="text-sm font-bold text-white">M</span>
          </div>
          <span className="mobile-float-title">MokoNodes</span>
        </div>

        {/* Hamburger */}
        <button
          id="hamburger-btn"
          className="mobile-hamburger"
          onClick={() => setDrawerOpen((v) => !v)}
          aria-label="القائمة"
        >
          <span className={`hamburger-line ${drawerOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`hamburger-line ${drawerOpen ? 'opacity-0' : ''}`} />
          <span className={`hamburger-line ${drawerOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </header>

      {/* ─── Mobile Drawer Overlay ─── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-[60]"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Drawer Panel */}
            <motion.div
              key="drawer"
              ref={drawerRef}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="md:hidden fixed top-0 right-0 h-full z-[70] mobile-drawer"
            >
              {/* Drawer Header */}
              <div className="mobile-drawer-header">
                <div className="mobile-float-logo">
                  <span className="text-base font-bold text-white">M</span>
                </div>
                <span className="mobile-float-title text-lg">MokoNodes</span>
                <button
                  className="mobile-drawer-close"
                  onClick={() => setDrawerOpen(false)}
                >
                  ✕
                </button>
              </div>

              {/* User Info */}
              <div className="mobile-drawer-user">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="avatar"
                    className="w-9 h-9 rounded-full border-2"
                    style={{ borderColor: 'var(--glass-border)' }}
                  />
                )}
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {user.displayName || 'مستخدم'}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Nav Links */}
              <nav className="mobile-drawer-nav">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.path ||
                    (link.path !== '/dashboard' && pathname.startsWith(link.path));
                  return (
                    <button
                      key={link.path}
                      onClick={() => {
                        setDrawerOpen(false);
                        router.push(link.path);
                      }}
                      className={`mobile-drawer-link ${isActive ? 'mobile-drawer-link-active' : ''}`}
                    >
                      <span className="text-xl">{link.icon}</span>
                      <span>{link.name}</span>
                      {isActive && <span className="mobile-drawer-dot" />}
                    </button>
                  );
                })}
              </nav>

              {/* Drawer Footer */}
              <div className="mobile-drawer-footer">
                <button
                  onClick={() => { setDrawerOpen(false); logout(); }}
                  className="mobile-drawer-logout"
                >
                  <span>🚪</span>
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─── Main Content Area with Sidebar ─── */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden mobile-content-offset">
        {/* Desktop Sidebar */}
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

        {/* ─── Global Left Ad Sidebar (Desktop only) ─── */}
        <div
          className="hidden lg:flex w-[200px] flex-shrink-0 flex-col items-center justify-start py-8 px-4 border-r border-[var(--glass-border)]"
          style={{ background: 'var(--canvas-bg)' }}
        >
          <AdPlaceholder type="skyscraper" />
        </div>
      </div>
    </div>
  );
}
