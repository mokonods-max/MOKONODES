'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import AdPlaceholder from '@/components/ui/AdPlaceholder';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    {
      name: 'الخرائط',
      path: '/dashboard',
      icon: '🗺️',
    },
    {
      name: 'الملاحظات',
      path: '/dashboard/notes',
      icon: '📝',
    },
    {
      name: 'المهام',
      path: '/dashboard/tasks',
      icon: '✅',
    },
  ];

  return (
    <div
      className="flex-shrink-0 border-l flex flex-row md:flex-col gap-2 p-2 md:p-4 w-full md:w-64 overflow-x-auto md:overflow-visible"
      style={{
        background: 'var(--surface-dark)',
        borderColor: 'var(--glass-border)',
      }}
    >
      {links.map((link) => {
        const isActive =
          pathname === link.path ||
          (link.path !== '/dashboard' && pathname.startsWith(link.path));

        return (
          <button
            key={link.path}
            onClick={() => router.push(link.path)}
            className="flex-1 md:flex-none flex items-center justify-center md:justify-start gap-2 md:gap-3 px-3 md:px-4 py-3 rounded-xl transition-all relative overflow-hidden"
            style={{
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
            }}
          >
            {isActive && (
              <motion.div
                layoutId="active-bg"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: 'var(--glass-bg-strong)',
                  border: '1px solid var(--glass-border)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10 text-xl md:text-2xl">{link.icon}</span>
            <span className="relative z-10 font-medium text-sm md:text-base hidden sm:block">
              {link.name}
            </span>
          </button>
        );
      })}

      {/* ─── Sidebar Ad (Desktop only) ─── */}
      <div className="hidden md:flex mt-auto pt-4 border-t flex-col items-center gap-4 w-full" style={{ borderColor: 'var(--glass-border)' }}>
        <AdPlaceholder type="mediumRectangle" className="!w-full !max-w-[250px] !h-[250px]" />
      </div>
    </div>
  );
}
