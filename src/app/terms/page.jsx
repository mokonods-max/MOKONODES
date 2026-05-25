import Link from 'next/link';

export const metadata = {
  title: 'شروط الاستخدام — MokoNodes',
  description: 'شروط وأحكام استخدام منصة MokoNodes لإدارة المهام والخرائط الذهنية.',
};

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{
        fontSize: 20, fontWeight: 700, color: 'var(--text-primary)',
        marginBottom: 12, borderRight: '3px solid var(--color-accent)', paddingRight: 12,
      }}>{title}</h2>
      {children}
    </div>
  );
}

export default function TermsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--canvas-bg)', direction: 'rtl' }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(15,15,26,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--glass-border)',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'white', fontSize: 14 }}>M</div>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 16 }}>MokoNodes</span>
          </Link>
          <Link href="/" style={{ fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }}>الرئيسية ←</Link>
        </div>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8 }}>📋 شروط الاستخدام</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>آخر تحديث: {new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long' })}</p>
        </div>

        <div style={{ fontSize: 15, lineHeight: 1.85, color: 'var(--text-secondary)' }}>
          <p style={{ marginBottom: 24, padding: '16px 20px', background: 'rgba(6,214,160,0.08)', border: '1px solid rgba(6,214,160,0.2)', borderRadius: 12 }}>
            باستخدامك لمنصة MokoNodes، فإنك توافق على هذه الشروط والأحكام. يرجى قراءتها بعناية قبل استخدام الخدمة.
          </p>

          <Section title="1. قبول الشروط">
            <p>
              تمثّل هذه الشروط اتفاقية قانونية ملزمة بينك وبين MokoNodes. باستخدامك للمنصة، تؤكد أنك تقبل هذه الشروط وأنك تمتثل لها. إذا كنت لا توافق على هذه الشروط، يرجى التوقف عن استخدام المنصة.
            </p>
          </Section>

          <Section title="2. وصف الخدمة">
            <p>
              MokoNodes هي منصة إنتاجية سحابية تتيح للمستخدمين:
            </p>
            <ul style={{ marginRight: 20, marginTop: 10 }}>
              <li style={{ marginBottom: 8 }}>إنشاء وإدارة الخرائط الذهنية.</li>
              <li style={{ marginBottom: 8 }}>تدوين وتنظيم الملاحظات الرقمية.</li>
              <li style={{ marginBottom: 8 }}>إنشاء قوائم المهام وتتبع التقدم.</li>
              <li style={{ marginBottom: 8 }}>مزامنة البيانات عبر الأجهزة المختلفة.</li>
            </ul>
          </Section>

          <Section title="3. التسجيل والحساب">
            <p>لاستخدام الخدمات الكاملة، يجب إنشاء حساب. أنت مسؤول عن:</p>
            <ul style={{ marginRight: 20, marginTop: 10 }}>
              <li style={{ marginBottom: 8 }}>الحفاظ على سرية بيانات دخولك.</li>
              <li style={{ marginBottom: 8 }}>جميع الأنشطة التي تحدث تحت حسابك.</li>
              <li style={{ marginBottom: 8 }}>إخطارنا فوراً بأي استخدام غير مصرح به.</li>
            </ul>
          </Section>

          <Section title="4. الاستخدام المقبول">
            <p>توافق على عدم استخدام المنصة لـ:</p>
            <ul style={{ marginRight: 20, marginTop: 10 }}>
              <li style={{ marginBottom: 8 }}>نشر محتوى غير قانوني أو مسيء.</li>
              <li style={{ marginBottom: 8 }}>انتهاك حقوق الملكية الفكرية.</li>
              <li style={{ marginBottom: 8 }}>محاولة اختراق أمان المنصة.</li>
              <li style={{ marginBottom: 8 }}>استخدام الخدمة لأغراض تجارية غير مرخصة.</li>
            </ul>
          </Section>

          <Section title="5. الملكية الفكرية">
            <p>
              المحتوى الذي تنشئه في MokoNodes يبقى ملكيتك. في المقابل، تمنحنا رخصة محدودة لتخزينه ومعالجته تقنياً لتقديم الخدمة.
            </p>
            <p style={{ marginTop: 12 }}>
              المنصة ذاتها — التصميم، الكود، العلامة التجارية — ملكية حصرية لـ MokoNodes.
            </p>
          </Section>

          <Section title="6. الخدمة المجانية والمدفوعة">
            <p>
              توفر MokoNodes خطة مجانية لجميع المستخدمين. قد يتم في المستقبل تقديم ميزات إضافية ضمن خطة مدفوعة. سنخطرك بأي تغييرات في نموذج التسعير.
            </p>
          </Section>

          <Section title="7. إخلاء المسؤولية">
            <p>
              يُقدَّم MokoNodes "كما هو" دون أي ضمانات صريحة أو ضمنية. لا نضمن استمرارية الخدمة دون انقطاع أو خلو من الأخطاء. ننصح بالاحتفاظ بنسخ احتياطية لبياناتك المهمة.
            </p>
          </Section>

          <Section title="8. إنهاء الخدمة">
            <p>
              يمكنك حذف حسابك في أي وقت. يحق لنا تعليق أو إنهاء حسابك في حالة انتهاك هذه الشروط، مع الإخطار المسبق إن أمكن.
            </p>
          </Section>

          <Section title="9. القانون المطبق">
            <p>
              تخضع هذه الشروط للقوانين السارية، وأي نزاع يُحلّ بالتراضي أولاً، ثم عبر التحكيم إن لزم.
            </p>
          </Section>
        </div>
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
