import Link from 'next/link';
import { articles } from '@/data/articles';

export const metadata = {
  title: 'المدونة — MokoNodes | مقالات في الإنتاجية والخرائط الذهنية',
  description: '15 مقالاً احترافياً في الإنتاجية، إدارة المهام، الخرائط الذهنية، وتطوير الذات. محتوى عربي غني ومتخصص.',
};

export default function BlogPage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px' }}>

      {/* ─── Hero ─── */}
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <div style={{
          display: 'inline-block',
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--color-accent)',
          background: 'rgba(6,214,160,0.1)',
          border: '1px solid rgba(6,214,160,0.2)',
          borderRadius: '20px',
          padding: '4px 14px',
          marginBottom: '16px',
          letterSpacing: '0.05em',
        }}>
          ✨ مدونة MokoNodes
        </div>
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 44px)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: '16px',
          lineHeight: 1.3,
        }}>
          مقالات في الإنتاجية وإدارة المعرفة
        </h1>
        <p style={{
          fontSize: '17px',
          color: 'var(--text-secondary)',
          maxWidth: '550px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          محتوى عربي متخصص يساعدك على تنظيم أفكارك، زيادة إنتاجيتك، وتحقيق أهدافك بأساليب مثبتة علمياً.
        </p>
      </div>

      {/* ─── Stats Bar ─── */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '40px',
        marginBottom: '48px',
        flexWrap: 'wrap',
      }}>
        {[
          { label: 'مقال', value: articles.length },
          { label: 'دقيقة قراءة متوسط', value: '7' },
          { label: 'مجال متخصص', value: '8' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '32px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, var(--color-primary-light), var(--color-accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ─── Articles Grid ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
      }}>
        {articles.map((article, i) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="article-card"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="article-card-icon">{article.image}</div>
            <span className="article-card-category">{article.category}</span>
            <h2 className="article-card-title">{article.title}</h2>
            <p className="article-card-excerpt">{article.excerpt}</p>
            <div className="article-card-meta">
              <span>⏱ {article.readTime}</span>
              <span>📅 {new Date(article.date).toLocaleDateString('ar-SA')}</span>
              <span style={{ marginRight: 'auto', color: 'var(--color-primary-light)', fontWeight: 600, fontSize: '13px' }}>
                اقرأ المزيد ←
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* ─── CTA ─── */}
      <div style={{
        marginTop: '64px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(6,214,160,0.1))',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '48px 32px',
      }}>
        <div style={{ fontSize: '40px', marginBottom: '16px' }}>🚀</div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
          جرّب MokoNodes مجاناً
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
          ابنِ خرائطك الذهنية، نظّم ملاحظاتك، وتتبع مهامك — كل ذلك في منصة واحدة سحابية.
        </p>
        <Link href="/login" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '13px 28px',
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
          color: 'white',
          borderRadius: '12px',
          fontWeight: 600,
          fontSize: '15px',
          textDecoration: 'none',
          boxShadow: '0 6px 24px rgba(108,99,255,0.35)',
          transition: 'all 200ms',
        }}>
          ابدأ مجاناً الآن
        </Link>
      </div>
    </div>
  );
}
