import Link from 'next/link';

export const metadata = {
  title: 'من نحن — MokoNodes',
  description: 'تعرف على قصة MokoNodes، رؤيتنا، ومهمتنا في مساعدة الناس على تنظيم أفكارهم وزيادة إنتاجيتهم.',
};

export default function AboutPage() {
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

      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            width: 80, height: 80, borderRadius: 24,
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 36, fontWeight: 800, color: 'white',
            margin: '0 auto 24px',
            boxShadow: '0 12px 40px rgba(108,99,255,0.4)',
          }}>M</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 12 }}>من نحن</h1>
          <p style={{ fontSize: 18, color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: 500, margin: '0 auto' }}>
            MokoNodes وُلد من إيمان عميق بأن التنظيم البصري يغير طريقة التفكير ويضاعف الإنتاجية.
          </p>
        </div>

        {/* Story */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, borderRight: '3px solid var(--color-primary)', paddingRight: 12 }}>
            القصة
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 16 }}>
            بدأت فكرة MokoNodes من مشكلة حقيقية: كيف تنظّم مئات الأفكار والمهام والملاحظات المتشعبة في مشروع واحد؟ الأدوات الموجودة إما معقدة جداً، أو مقيدة جداً، أو لا تدعم اللغة العربية بشكل صحيح.
          </p>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.85, marginBottom: 16 }}>
            ولد MokoNodes كمنصة مصممة خصيصاً للمستخدم العربي — سهلة الاستخدام، جميلة التصميم، وقوية الوظائف. الهدف الأول والأخير: مساعدتك على تحقيق أهدافك بطريقة أكثر وضوحاً وفعالية.
          </p>
        </div>

        {/* Values */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24, borderRight: '3px solid var(--color-accent)', paddingRight: 12 }}>
            قيمنا
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { icon: '🎯', title: 'البساطة', desc: 'أداة قوية لا تحتاج دليل استخدام. الوضوح في كل شيء.' },
              { icon: '🌐', title: 'عربية أولاً', desc: 'مبنية للمستخدم العربي مع دعم كامل للـ RTL والواجهة العربية.' },
              { icon: '🔒', title: 'الخصوصية', desc: 'بياناتك ملكك. لا نبيعها ولا نشاركها مع أي طرف ثالث.' },
              { icon: '⚡', title: 'السرعة', desc: 'مزامنة فورية وأداء سريع على كل الأجهزة.' },
              { icon: '🆓', title: 'المجانية', desc: 'الأدوات الأساسية مجانية للجميع، دائماً.' },
              { icon: '🚀', title: 'التطور', desc: 'نضيف ميزات جديدة باستمرار بناءً على ملاحظات مجتمعنا.' },
            ].map((val) => (
              <div key={val.title} style={{
                background: 'var(--surface-card)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{val.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{val.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(6,214,160,0.1))',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '36px 32px',
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>مهمتنا</h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 500, margin: '0 auto 24px' }}>
            "نريد أن يصل كل شخص عربي إلى أدوات إنتاجية عالمية المستوى، بلغته، وبتجربة تليق به."
          </p>
          <Link href="/login" style={{
            display: 'inline-flex', padding: '12px 28px',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
            color: 'white', borderRadius: 12, fontWeight: 600, fontSize: 15,
            textDecoration: 'none', boxShadow: '0 6px 24px rgba(108,99,255,0.35)',
          }}>
            ابدأ مجاناً الآن
          </Link>
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
