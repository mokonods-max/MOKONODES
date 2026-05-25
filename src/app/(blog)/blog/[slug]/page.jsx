import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllSlugs, articles } from '@/data/articles';

export async function generateStaticParams() {
  return getAllSlugs();
}

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: `${article.title} — MokoNodes`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      siteName: 'MokoNodes',
      locale: 'ar_SA',
    },
  };
}

// Simple markdown-like renderer for the article content
function renderContent(content) {
  const lines = content.split('\n');
  let html = '';
  for (const line of lines) {
    if (line.startsWith('## ')) {
      html += `<h2>${line.slice(3)}</h2>`;
    } else if (line.startsWith('### ')) {
      html += `<h3>${line.slice(4)}</h3>`;
    } else if (line.startsWith('**') && line.endsWith('**:')) {
      const text = line.slice(2, -3);
      html += `<p><strong>${text}:</strong></p>`;
    } else if (line.startsWith('- ')) {
      html += `<li>${line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`;
    } else if (line.trim() === '') {
      html += '';
    } else {
      html += `<p>${line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>`;
    }
  }
  return html;
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const currentIndex = articles.findIndex((a) => a.slug === params.slug);
  const prevArticle = currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const nextArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;

  return (
    <div style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 24px' }}>

      {/* ─── Breadcrumb ─── */}
      <nav style={{ marginBottom: '32px', fontSize: '13px', color: 'var(--text-muted)' }}>
        <Link href="/blog" style={{ color: 'var(--color-primary-light)', textDecoration: 'none' }}>
          المدونة
        </Link>
        <span style={{ margin: '0 8px' }}>←</span>
        <span>{article.category}</span>
      </nav>

      {/* ─── Article Header ─── */}
      <header style={{ marginBottom: '40px' }}>
        <span className="article-card-category" style={{ marginBottom: '16px', display: 'inline-block' }}>
          {article.category}
        </span>
        <h1 style={{
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          lineHeight: 1.35,
          marginBottom: '16px',
        }}>
          {article.image} {article.title}
        </h1>
        <p style={{
          fontSize: '17px',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          marginBottom: '24px',
        }}>
          {article.excerpt}
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontSize: '13px',
          color: 'var(--text-muted)',
          borderTop: '1px solid var(--glass-border)',
          borderBottom: '1px solid var(--glass-border)',
          padding: '14px 0',
        }}>
          <span>⏱ {article.readTime}</span>
          <span>📅 {new Date(article.date).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span style={{ marginRight: 'auto' }}>✍️ فريق MokoNodes</span>
        </div>
      </header>

      {/* ─── Article Body ─── */}
      <article
        className="article-body"
        dangerouslySetInnerHTML={{ __html: renderContent(article.content) }}
      />

      {/* ─── CTA Box ─── */}
      <div style={{
        marginTop: '48px',
        background: 'linear-gradient(135deg, rgba(108,99,255,0.12), rgba(6,214,160,0.08))',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 24px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
          🚀 جرّب MokoNodes مجاناً الآن
        </p>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          بناء الخرائط الذهنية، تنظيم الملاحظات، وتتبع المهام — كل ذلك في منصة واحدة.
        </p>
        <Link href="/login" style={{
          display: 'inline-flex',
          padding: '10px 24px',
          background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))',
          color: 'white',
          borderRadius: '10px',
          fontWeight: 600,
          fontSize: '14px',
          textDecoration: 'none',
          boxShadow: '0 4px 16px rgba(108,99,255,0.3)',
        }}>
          ابدأ مجاناً
        </Link>
      </div>

      {/* ─── Article Navigation ─── */}
      {(prevArticle || nextArticle) && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginTop: '40px',
        }}>
          {prevArticle ? (
            <Link href={`/blog/${prevArticle.slug}`} style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              textDecoration: 'none',
              transition: 'all 200ms',
            }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>← المقال السابق</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                {prevArticle.title}
              </div>
            </Link>
          ) : <div />}

          {nextArticle ? (
            <Link href={`/blog/${nextArticle.slug}`} style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              textDecoration: 'none',
              transition: 'all 200ms',
              textAlign: 'left',
            }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>المقال التالي →</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                {nextArticle.title}
              </div>
            </Link>
          ) : <div />}
        </div>
      )}

      {/* ─── Back to Blog ─── */}
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <Link href="/blog" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '14px',
          color: 'var(--color-primary-light)',
          textDecoration: 'none',
          fontWeight: 500,
        }}>
          ← العودة إلى المدونة
        </Link>
      </div>
    </div>
  );
}
