import Link from 'next/link';
import './blog.css';

export const metadata = {
  title: 'المدونة — MokoNodes | مقالات في الإنتاجية والخرائط الذهنية',
  description: 'مقالات احترافية في الإنتاجية، إدارة المهام، الخرائط الذهنية، وتطوير الذات. محتوى عربي متخصص لمساعدتك على تحقيق أهدافك.',
};

export default function BlogLayout({ children }) {
  return (
    <div className="blog-layout" dir="rtl">
      {/* ─── Blog Header ─── */}
      <header className="blog-header">
        <nav className="blog-nav-inner">
          <Link href="/" className="blog-logo-link">
            <div className="blog-logo-icon">M</div>
            <span className="blog-logo-text">MokoNodes</span>
          </Link>
          <div className="blog-nav-links">
            <Link href="/blog" className="blog-nav-link">المدونة</Link>
            <Link href="/dashboard" className="blog-nav-link">الداشبورد</Link>
            <Link href="/login" className="blog-cta-btn">ابدأ مجاناً</Link>
          </div>
        </nav>
      </header>

      {/* ─── Content ─── */}
      <main className="blog-main">
        {children}
      </main>

      {/* ─── Footer ─── */}
      <footer className="blog-footer">
        <div className="blog-footer-inner">
          <div className="blog-footer-logo">
            <div className="blog-logo-icon blog-logo-icon-sm">M</div>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>MokoNodes</span>
          </div>
          <p className="blog-footer-desc">
            منصة ذكية لإدارة المهام، تدوين الملاحظات، وبناء الخرائط الذهنية.
          </p>
          <div className="blog-footer-links">
            <Link href="/privacy" className="blog-footer-link">سياسة الخصوصية</Link>
            <Link href="/terms" className="blog-footer-link">شروط الاستخدام</Link>
            <Link href="/about" className="blog-footer-link">من نحن</Link>
            <Link href="/contact" className="blog-footer-link">اتصل بنا</Link>
          </div>
          <p className="blog-footer-copy">
            © {new Date().getFullYear()} MokoNodes. جميع الحقوق محفوظة.
          </p>
        </div>
      </footer>
    </div>
  );
}
