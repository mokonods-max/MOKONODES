'use client';

import { useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';

export default function Providers({ children }) {
  const initAuthListener = useAuthStore((s) => s.initAuthListener);

  useEffect(() => {
    const unsubscribe = initAuthListener();
    return () => unsubscribe();
  }, [initAuthListener]);

  return <>{children}</>;
}
