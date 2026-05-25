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
    // Hidden on mobile — replaced by the hamburger drawer
    <div
      className="hidden md:flex flex-shrink-0 border-l flex-col gap-2 p-4 w-64"
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
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden"
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
            <span className="relative z-10 text-2xl">{link.icon}</span>
            <span className="relative z-10 font-medium text-base">
              {link.name}
            </span>
          </button>
        );
      })}

      {/* ─── Sidebar Ad (Desktop only) ─── */}
      <div className="mt-auto pt-4 border-t flex flex-col items-center gap-4 w-full" style={{ borderColor: 'var(--glass-border)' }}>
        <AdPlaceholder type="mediumRectangle" className="!w-full !max-w-[250px] !h-[250px]" />
      </div>
    </div>
  );
}
