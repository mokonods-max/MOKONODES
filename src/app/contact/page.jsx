'use client';

import Link from 'next/link';

export default function ContactPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--canvas-bg)', direction: 'rtl' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(15,15,26,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: 14 }}>M</div>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 16 }}>MokoNodes</span>
          </Link>
          <Link href="/" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>الرئيسية ←</Link>
        </div>
      </header>

      <main style={{ maxWidth: '700px', margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📬</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 10 }}>اتصل بنا</h1>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            هل لديك سؤال أو اقتراح أو مشكلة تقنية؟ نحن هنا لمساعدتك.
          </p>
        </div>

        {/* Info Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 40 }}>
          {[
            { icon: '📧', title: 'البريد الإلكتروني', desc: 'mokonods@gmail.com' },
            { icon: '⏱️', title: 'وقت الاستجابة', desc: 'خلال 24-48 ساعة عمل' },
            { icon: '🌐', title: 'الدعم', desc: 'العربية والإنجليزية' },
          ].map((info) => (
            <div key={info.title} style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-md)',
              padding: '18px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{info.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{info.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{info.desc}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        {/*
          PASTE YOUR FORMSPREE ID BELOW:
          Replace 'YOUR_FORM_ID' in the action URL with your actual Formspree endpoint ID.
        */}
        <form 
          action="https://formspree.io/f/YOUR_FORM_ID" 
          method="POST" 
          style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-xl)',
            padding: '36px 32px',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>الاسم</label>
              <input
                type="text"
                name="name"
                required
                placeholder="اسمك الكريم"
                className="glass-input"
                style={{ fontSize: 14 }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>البريد الإلكتروني</label>
              <input
                type="email"
                name="email"
                required
                placeholder="example@email.com"
                className="glass-input"
                style={{ fontSize: 14 }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>الموضوع</label>
            <select
              name="subject"
              required
              className="glass-input"
              style={{ fontSize: 14 }}
            >
              <option value="">اختر الموضوع</option>
              <option value="support">دعم تقني</option>
              <option value="feedback">اقتراح أو تعليق</option>
              <option value="bug">الإبلاغ عن خطأ</option>
              <option value="business">استفسار تجاري</option>
              <option value="other">أخرى</option>
            </select>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>الرسالة</label>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="اكتب رسالتك هنا..."
              className="glass-input"
              style={{ fontSize: 14, resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
              color: 'white',
              border: 'none',
              borderRadius: 12,
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 200ms',
              boxShadow: '0 6px 20px rgba(108,99,255,0.35)',
            }}
          >
            📨 إرسال الرسالة
          </button>
        </form>
      </main>

      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {[['/', 'الرئيسية'], ['/privacy', 'سياسة الخصوصية'], ['/terms', 'شروط الاستخدام'], ['/about', 'من نحن'], ['/contact', 'اتصل بنا']].map(([href, label]) => (
            <Link key={href} href={href} style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'none' }}>{label}</Link>
          ))}
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>© {new Date().getFullYear()} MokoNodes. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}
