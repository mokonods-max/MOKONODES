'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import useAuthStore from '@/store/useAuthStore';
import GlassButton from '@/components/ui/GlassButton';

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
      style={{ background: 'var(--canvas-bg)' }}
    >
      {/* ─── Ambient Orbs ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, var(--color-primary), transparent)',
            top: '10%',
            right: '-10%',
          }}
          animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, var(--color-accent), transparent)',
            bottom: '5%',
            left: '5%',
          }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* ─── Hero ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative z-10 text-center max-w-2xl"
      >
        {/* Logo */}
        <motion.div
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-6"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            boxShadow: '0 12px 40px rgba(108, 99, 255, 0.4)',
          }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-4xl font-bold text-white">M</span>
        </motion.div>

        <h1
          className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, var(--color-primary-light), var(--color-accent))',
            }}
          >
            MokoNodes
          </span>
        </h1>

        <p
          className="text-xl md:text-2xl mb-3 font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          منصة إدارة المهام الذكية بالعُقد
        </p>

        <p
          className="text-base mb-10 max-w-lg mx-auto leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          حوّل أفكارك وأهدافك إلى خرائط بصرية تفاعلية مترابطة. ابنِ مشاريعك بطريقة
          ذكية ومرنة باستخدام الذكاء الاصطناعي.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <GlassButton
            size="lg"
            onClick={() => router.push('/login')}
          >
            🚀 ابدأ مجاناً
          </GlassButton>
          <GlassButton
            variant="ghost"
            size="lg"
            onClick={() => router.push('/login')}
          >
            تسجيل الدخول
          </GlassButton>
        </div>
      </motion.div>

      {/* ─── Features Grid ─── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="relative z-10 mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
      >
        {[
          {
            icon: '🧠',
            title: 'بناء ذكي بالـ AI',
            desc: 'اكتب هدفك وشاهد الذكاء الاصطناعي يبني خريطة مشروعك كاملة في ثوانٍ',
          },
          {
            icon: '🔗',
            title: 'عُقد مترابطة',
            desc: 'اربط مهامك بروابط ذكية مع شروط إتمام وتقدم تلقائي',
          },
          {
            icon: '⚡',
            title: 'مزامنة فورية',
            desc: 'كل تغيير يُحفظ فوراً في السحابة مع مزامنة مباشرة وبدون تأخير',
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + i * 0.15 }}
            className="glass-card p-6 text-center"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {feature.title}
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
