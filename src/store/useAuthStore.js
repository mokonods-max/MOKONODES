import { create } from 'zustand';
import { onAuthChange, logout as firebaseLogout } from '@/lib/auth';

const useAuthStore = create((set) => ({
  // ─── الحالة ───
  user: null,
  loading: true,
  error: null,

  // ─── تعيين المستخدم ───
  setUser: (user) => set({ user, loading: false, error: null }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error, loading: false }),

  // ─── تسجيل الخروج ───
  logout: async () => {
    try {
      await firebaseLogout();
      set({ user: null, loading: false, error: null });
    } catch (err) {
      set({ error: err.message });
    }
  },

  // ─── بدء مراقبة حالة المصادقة ───
  initAuthListener: () => {
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        set({
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          loading: false,
        });
      } else {
        set({ user: null, loading: false });
      }
    });
    return unsubscribe;
  },
}));

export default useAuthStore;
