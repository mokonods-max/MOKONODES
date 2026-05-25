import Link from 'next/link';

export const metadata = {
  title: 'سياسة الخصوصية — MokoNodes',
  description: 'سياسة الخصوصية الخاصة بمنصة MokoNodes. تعرف على كيفية جمع بياناتك وحمايتها.',
};

function LegalLayout({ title, subtitle, children }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--canvas-bg)', direction: 'rtl' }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(15,15,26,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--glass-border)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, color: 'white', fontSize: 14,
            }}>M</div>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 16 }}>MokoNodes</span>
          </Link>
          <Link href="/" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>الرئيسية ←</Link>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>{title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{subtitle}</p>
        </div>
        <div style={{
          fontSize: 15, lineHeight: 1.85, color: 'var(--text-secondary)',
        }}>
          {children}
        </div>
      </main>

      {/* Footer */}
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

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{
        fontSize: 20, fontWeight: 700, color: 'var(--text-primary)',
        marginBottom: 12, borderRight: '3px solid var(--color-primary)', paddingRight: 12,
      }}>{title}</h2>
      {children}
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="🔒 سياسة الخصوصية"
      subtitle={`آخر تحديث: ${new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}`}
    >
      <p style={{ marginBottom: 24, padding: '16px 20px', background: 'rgba(108,99,255,0.08)', border: '1px solid rgba(108,99,255,0.2)', borderRadius: 12 }}>
        نحن في MokoNodes نأخذ خصوصيتك بجدية بالغة. تصف هذه السياسة بوضوح ما نجمعه من بيانات، وكيف نستخدمها، وكيف نحميها.
      </p>

      <Section title="1. البيانات التي نجمعها">
        <p>عند استخدامك لـ MokoNodes، قد نجمع الأنواع التالية من البيانات:</p>
        <ul style={{ marginRight: 20, marginTop: 10 }}>
          <li style={{ marginBottom: 8 }}><strong>بيانات الحساب:</strong> الاسم، البريد الإلكتروني، وصورة الملف الشخصي عند تسجيل الدخول بواسطة Google.</li>
          <li style={{ marginBottom: 8 }}><strong>المحتوى الذي تنشئه:</strong> الخرائط الذهنية، الملاحظات، وقوائم المهام التي تضيفها.</li>
          <li style={{ marginBottom: 8 }}><strong>بيانات الاستخدام:</strong> سجلات الدخول وأنماط الاستخدام لتحسين الخدمة.</li>
          <li style={{ marginBottom: 8 }}><strong>ملفات تعريف الارتباط (Cookies):</strong> للمصادقة والحفاظ على جلسة تسجيل الدخول.</li>
        </ul>
      </Section>

      <Section title="2. كيف نستخدم بياناتك">
        <p>نستخدم البيانات المجموعة للأغراض التالية:</p>
        <ul style={{ marginRight: 20, marginTop: 10 }}>
          <li style={{ marginBottom: 8 }}>تقديم وتشغيل خدمات MokoNodes.</li>
          <li style={{ marginBottom: 8 }}>مزامنة بياناتك عبر أجهزتك المختلفة.</li>
          <li style={{ marginBottom: 8 }}>تحسين جودة الخدمة وإصلاح الأخطاء.</li>
          <li style={{ marginBottom: 8 }}>عرض إعلانات من خلال Google AdSense (المستقبل) — حيث قد تستخدم Google الكوكيز لعرض إعلانات ذات صلة.</li>
          <li style={{ marginBottom: 8 }}>إرسال إشعارات خدمية مهمة (ليس بريداً تسويقياً).</li>
        </ul>
      </Section>

      <Section title="3. تخزين البيانات وأمانها">
        <p>
          تُخزَّن جميع بياناتك بأمان على منصة <strong>Google Firebase</strong>، وهي من أكثر منصات السحاب أماناً وموثوقية في العالم. تشمل إجراءات الحماية:
        </p>
        <ul style={{ marginRight: 20, marginTop: 10 }}>
          <li style={{ marginBottom: 8 }}>تشفير البيانات أثناء النقل باستخدام بروتوكول HTTPS.</li>
          <li style={{ marginBottom: 8 }}>تشفير البيانات المخزنة.</li>
          <li style={{ marginBottom: 8 }}>قواعد أمان Firestore تضمن أن كل مستخدم لا يرى إلا بياناته الخاصة.</li>
          <li style={{ marginBottom: 8 }}>لا نشارك بياناتك الشخصية مع أطراف ثالثة بدون إذنك.</li>
        </ul>
      </Section>

      <Section title="4. ملفات تعريف الارتباط (Cookies)">
        <p>
          نستخدم الكوكيز للأغراض التالية:
        </p>
        <ul style={{ marginRight: 20, marginTop: 10 }}>
          <li style={{ marginBottom: 8 }}><strong>الضرورية:</strong> للحفاظ على جلسة تسجيل دخولك.</li>
          <li style={{ marginBottom: 8 }}><strong>التحليلية:</strong> Google Analytics لفهم كيفية استخدام التطبيق.</li>
          <li style={{ marginBottom: 8 }}><strong>الإعلانية:</strong> Google AdSense قد يستخدم الكوكيز لعرض إعلانات مخصصة.</li>
        </ul>
        <p style={{ marginTop: 12 }}>يمكنك تعطيل الكوكيز من إعدادات متصفحك، لكن ذلك قد يؤثر على بعض وظائف التطبيق.</p>
      </Section>

      <Section title="5. حقوقك">
        <p>لديك الحق في:</p>
        <ul style={{ marginRight: 20, marginTop: 10 }}>
          <li style={{ marginBottom: 8 }}>الوصول إلى بياناتك الشخصية.</li>
          <li style={{ marginBottom: 8 }}>تصحيح أي بيانات غير دقيقة.</li>
          <li style={{ marginBottom: 8 }}>حذف حسابك وجميع بياناتك.</li>
          <li style={{ marginBottom: 8 }}>تصدير بياناتك.</li>
        </ul>
        <p style={{ marginTop: 12 }}>لممارسة أي من هذه الحقوق، تواصل معنا عبر صفحة <Link href="/contact" style={{ color: 'var(--color-primary-light)' }}>اتصل بنا</Link>.</p>
      </Section>

      <Section title="6. التغييرات على هذه السياسة">
        <p>
          نحتفظ بالحق في تحديث سياسة الخصوصية هذه في أي وقت. سنخطرك بأي تغييرات جوهرية عبر البريد الإلكتروني أو عبر إشعار في التطبيق.
        </p>
      </Section>

      <Section title="7. التواصل معنا">
        <p>
          إذا كان لديك أي استفسار حول سياسة الخصوصية، يرجى التواصل معنا عبر{' '}
          <Link href="/contact" style={{ color: 'var(--color-primary-light)' }}>صفحة اتصل بنا</Link>.
        </p>
      </Section>
    </LegalLayout>
  );
}
