'use client';

import useAuthStore from '@/store/useAuthStore';

export default function SettingsPage() {
  const { user } = useAuthStore();

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto dashboard-page-container w-full">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 page-title">الإعدادات</h1>
        <p className="text-sm md:text-base text-[var(--text-secondary)] page-subtitle">
          إدارة حسابك وإعدادات المنصة
        </p>
      </div>

      <div className="glass-card p-6 md:p-8">
        <h2 className="text-xl font-bold mb-6 border-b pb-4" style={{ borderColor: 'var(--glass-border)' }}>
          معلومات الحساب
        </h2>
        
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-8">
          <div className="flex-shrink-0">
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="الملف الشخصي" 
                className="w-24 h-24 rounded-full border-4 shadow-lg"
                style={{ borderColor: 'var(--glass-border)' }}
              />
            ) : (
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg"
                style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))', color: 'white' }}
              >
                {user?.email?.charAt(0).toUpperCase() || 'M'}
              </div>
            )}
          </div>
          
          <div className="flex-1 space-y-4 text-center md:text-right w-full">
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-1">الاسم</label>
              <div className="glass-input bg-opacity-50">{user?.displayName || 'مستخدم MokoNodes'}</div>
            </div>
            <div>
              <label className="block text-sm text-[var(--text-muted)] mb-1">البريد الإلكتروني</label>
              <div className="glass-input bg-opacity-50" style={{ direction: 'ltr', textAlign: 'right' }}>
                {user?.email}
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-6 border-b pb-4" style={{ borderColor: 'var(--glass-border)' }}>
          تفضيلات التطبيق
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--glass-bg)' }}>
            <div>
              <h3 className="font-semibold">الوضع الداكن (Dark Mode)</h3>
              <p className="text-sm text-[var(--text-secondary)]">المنصة تعمل بالوضع الداكن الافتراضي المريح للعين.</p>
            </div>
            <div className="w-12 h-6 rounded-full bg-[var(--color-primary)] relative cursor-not-allowed opacity-80">
              <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all transform translate-x-6"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--glass-bg)' }}>
            <div>
              <h3 className="font-semibold">تنبيهات البريد الإلكتروني</h3>
              <p className="text-sm text-[var(--text-secondary)]">استلام تحديثات حول الميزات الجديدة والنصائح.</p>
            </div>
            <div className="w-12 h-6 rounded-full relative cursor-pointer" style={{ background: 'var(--glass-border-strong)' }}>
              <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-all"></div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex justify-end" style={{ borderColor: 'var(--glass-border)' }}>
          <button className="glass-button glass-button-primary">
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
}
