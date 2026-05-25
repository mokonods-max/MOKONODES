'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
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

  if (loading) return null;

  const features = [
    {
      icon: '🗺️',
      title: 'خرائط ذهنية تفاعلية',
      desc: 'أنشئ خرائط بصرية مترابطة تحوّل أفكارك المعقدة إلى صورة واضحة قابلة للتنفيذ.',
    },
    {
      icon: '📝',
      title: 'ملاحظات ذكية',
      desc: 'دوّن ملاحظاتك وأفكارك بطريقة منظمة مع مزامنة فورية عبر جميع أجهزتك.',
    },
    {
      icon: '✅',
      title: 'إدارة المهام',
      desc: 'تتبع مهامك اليومية والأسبوعية بقوائم مرنة تساعدك على الإنجاز والمتابعة.',
    },
    {
      icon: '☁️',
      title: 'مزامنة سحابية فورية',
      desc: 'كل ما تضيفه يُحفظ في السحابة تلقائياً. لا تضغط "حفظ". لا تخاف من الفقدان.',
    },
    {
      icon: '🔒',
      title: 'أمان وخصوصية',
      desc: 'بياناتك محمية بتشفير Google Firebase. حسابك خاص بك فقط.',
    },
    {
      icon: '📱',
      title: 'على كل الأجهزة',
      desc: 'تجربة سلسة على الهاتف، الكمبيوتر، والتابلت. صُمّمت لمرافقتك في كل مكان.',
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'أنشئ حسابك مجاناً',
      desc: 'سجّل الدخول بحسابك Google في ثانية واحدة. لا بطاقة ائتمان، لا تعقيد.',
      icon: '👤',
    },
    {
      step: '02',
      title: 'ابنِ خريطتك الأولى',
      desc: 'أنشئ خريطة ذهنية لأي موضوع وابدأ بإضافة العقد والروابط بضغطة واحدة.',
      icon: '🗺️',
    },
    {
      step: '03',
      title: 'نظّم وأنجز',
      desc: 'أضف ملاحظاتك، صنّف مهامك، وتابع تقدمك بصرياً في مكان واحد.',
      icon: '🚀',
    },
  ];

  const testimonials = [
    {
      text: 'MokoNodes غيّر طريقة تفكيري في التخطيط. الخرائط الذهنية فيه أسهل بكثير من أي أداة جربتها.',
      name: 'أحمد م.',
      role: 'مطور برمجيات',
      avatar: '👨‍💻',
    },
    {
      text: 'أخيراً أداة إنتاجية تدعم العربية بشكل حقيقي! ملاحظاتي الآن منظمة ويمكنني الوصول إليها من أي مكان.',
      name: 'سارة ع.',
      role: 'مصممة UI/UX',
      avatar: '👩‍🎨',
    },
    {
      text: 'استخدم MokoNodes لتخطيط مشاريعي الجانبية. المزامنة السحابية الفورية أنقذتني أكثر من مرة.',
      name: 'محمد ك.',
      role: 'رائد أعمال',
      avatar: '🧑‍💼',
    },
  ];

  return (
    <div style={{ background: 'var(--canvas-bg)', minHeight: '100vh', direction: 'rtl' }}>
      {/* ══════════════════════════════════════════════
          Floating Nav
      ══════════════════════════════════════════════ */}
      <header style={{
        position: 'fixed', top: 0, right: 0, left: 0, zIndex: 100,
        background: 'rgba(15,15,26,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--glass-border)',
        padding: '12px 24px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, color: 'white', fontSize: 16,
              boxShadow: '0 4px 12px rgba(108,99,255,0.35)',
            }}>M</div>
            <span style={{ fontWeight: 700, fontSize: 17, color: 'var(--text-primary)' }}>MokoNodes</span>
          </div>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Link href="/blog" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 200ms' }}>المدونة</Link>
            <Link href="/about" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 200ms' }}>من نحن</Link>
            <GlassButton size="sm" onClick={() => router.push('/login')}>
              تسجيل الدخول
            </GlassButton>
          </nav>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          Hero Section
      ══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden', paddingTop: 120, paddingBottom: 80 }}>
        {/* Ambient orbs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <motion.div
            style={{
              position: 'absolute', width: 600, height: 600, borderRadius: '50%', opacity: 0.12,
              background: 'radial-gradient(circle, var(--color-primary), transparent)',
              top: '-10%', right: '-10%',
            }}
            animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            style={{
              position: 'absolute', width: 400, height: 400, borderRadius: '50%', opacity: 0.09,
              background: 'radial-gradient(circle, var(--color-accent), transparent)',
              bottom: '5%', left: '5%',
            }}
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{
              display: 'inline-block', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
              color: 'var(--color-accent)', background: 'rgba(6,214,160,0.1)',
              border: '1px solid rgba(6,214,160,0.25)', borderRadius: 20, padding: '4px 14px', marginBottom: 24,
            }}>
              ✨ منصة الإنتاجية الأولى عربياً
            </div>
          </motion.div>

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <motion.div
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 88, height: 88, borderRadius: 28, marginBottom: 28,
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                boxShadow: '0 16px 48px rgba(108,99,255,0.45)',
              }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span style={{ fontSize: 40, fontWeight: 800, color: 'white' }}>M</span>
            </motion.div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontSize: 'clamp(32px, 6vw, 60px)', fontWeight: 900, lineHeight: 1.2, marginBottom: 20,
            }}
          >
            <span style={{
              backgroundImage: 'linear-gradient(135deg, var(--color-primary-light), var(--color-accent))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>MokoNodes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontSize: 'clamp(18px, 3vw, 22px)', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.5 }}
          >
            المنصة الذكية لإدارة المهام، تدوين الملاحظات، وبناء الخرائط الذهنية
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            style={{ fontSize: 16, color: 'var(--text-muted)', marginBottom: 36, lineHeight: 1.8, maxWidth: 560, margin: '0 auto 36px' }}
          >
            مرحباً بك في MokoNodes — المنصة الذكية لإدارة المهام، تدوين الملاحظات، وبناء الخرائط الذهنية لتنظيم أفكارك وزيادة إنتاجيتك. حوّل فوضى أفكارك إلى خطط واضحة تُنجز وتحتفظ بها في السحابة، لتصل إليها من أي مكان وعلى أي جهاز.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}
          >
            <GlassButton size="lg" onClick={() => router.push('/login')}>
              🚀 ابدأ مجاناً الآن
            </GlassButton>
            <GlassButton variant="ghost" size="lg" onClick={() => router.push('/blog')}>
              📰 اقرأ المدونة
            </GlassButton>
          </motion.div>

          {/* Trust line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ marginTop: 20, fontSize: 13, color: 'var(--text-muted)' }}
          >
            ✓ مجاني تماماً &nbsp;·&nbsp; ✓ بدون بطاقة ائتمان &nbsp;·&nbsp; ✓ مزامنة سحابية فورية
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Features Grid
      ══════════════════════════════════════════════ */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>
            كل ما تحتاجه في مكان واحد
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>
            MokoNodes يجمع أقوى أدوات الإنتاجية في منصة واحدة سهلة وجميلة.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              style={{
                background: 'var(--surface-card)', border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-lg)', padding: '28px 24px',
                transition: 'all 300ms',
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          How It Works
      ══════════════════════════════════════════════ */}
      <section style={{ background: 'var(--surface-dark)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>
              كيف يعمل MokoNodes؟
            </h2>
            <p style={{ fontSize: 16, color: 'var(--text-secondary)' }}>
              ثلاث خطوات بسيطة وأنت جاهز للإنجاز.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 28 }}>
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * i, duration: 0.6 }}
                style={{ textAlign: 'center', padding: '28px 20px' }}
              >
                <div style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 64, height: 64, borderRadius: 20, marginBottom: 16,
                  background: 'linear-gradient(135deg, rgba(108,99,255,0.2), rgba(6,214,160,0.15))',
                  border: '1px solid rgba(108,99,255,0.25)',
                  fontSize: 28,
                }}>{step.icon}</div>
                <div style={{
                  display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
                  color: 'var(--color-primary-light)',
                  background: 'rgba(108,99,255,0.1)', border: '1px solid rgba(108,99,255,0.2)',
                  borderRadius: 8, padding: '2px 8px', marginBottom: 10,
                }}>الخطوة {step.step}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>{step.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Testimonials
      ══════════════════════════════════════════════ */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '80px 24px' }}>
        <h2 style={{ textAlign: 'center', fontSize: 30, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 48 }}>
          ماذا يقول مستخدمونا؟
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {testimonials.map((t) => (
            <div key={t.name} style={{
              background: 'var(--surface-card)', border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-lg)', padding: '28px 24px',
            }}>
              <div style={{ fontSize: 20, color: 'var(--color-warning)', marginBottom: 12 }}>★★★★★</div>
              <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 20, fontStyle: 'italic' }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA Section
      ══════════════════════════════════════════════ */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{
          maxWidth: 800, margin: '0 auto', textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(6,214,160,0.1))',
          border: '1px solid var(--glass-border)', borderRadius: 28,
          padding: '64px 40px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>🎯</div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16, lineHeight: 1.3 }}>
            ابدأ تنظيم حياتك اليوم
          </h2>
          <p style={{ fontSize: 17, color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.7, maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
            انضم إلى آلاف المستخدمين الذين يستخدمون MokoNodes لتنظيم أفكارهم وتحقيق أهدافهم.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
            <GlassButton size="lg" onClick={() => router.push('/login')}>
              🚀 ابدأ مجاناً الآن
            </GlassButton>
            <GlassButton variant="ghost" size="lg" onClick={() => router.push('/about')}>
              تعرف علينا أكثر
            </GlassButton>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          Footer
      ══════════════════════════════════════════════ */}
      <footer style={{
        borderTop: '1px solid var(--glass-border)',
        background: 'var(--surface-dark)',
        padding: '48px 24px 32px',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, marginBottom: 40 }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: 14 }}>M</div>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>MokoNodes</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>
                منصة ذكية لإدارة المهام، الملاحظات، والخرائط الذهنية. مزامنة سحابية فورية مع Google Firebase.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>الصفحات</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[['/', 'الرئيسية'], ['/blog', 'المدونة'], ['/about', 'من نحن'], ['/contact', 'اتصل بنا']].map(([href, label]) => (
                  <Link key={href} href={href} style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>{label}</Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>القانونية</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[['/privacy', 'سياسة الخصوصية'], ['/terms', 'شروط الاستخدام']].map(([href, label]) => (
                  <Link key={href} href={href} style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>{label}</Link>
                ))}
              </div>
            </div>

            {/* App */}
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>التطبيق</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[['/login', 'تسجيل الدخول'], ['/login', 'إنشاء حساب']].map(([href, label]) => (
                  <Link key={label} href={href} style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>{label}</Link>
                ))}
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 24, textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} MokoNodes. جميع الحقوق محفوظة.
              {' · '}
              <Link href="/privacy" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>سياسة الخصوصية</Link>
              {' · '}
              <Link href="/terms" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>شروط الاستخدام</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
