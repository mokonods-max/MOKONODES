'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { articles } from '@/data/articles';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogPage() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedArticle]);

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
          <motion.button
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="article-card text-right w-full bg-[var(--surface-card)] border border-[var(--glass-border)] rounded-2xl p-6 transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-lg hover:-translate-y-1 relative overflow-hidden flex flex-col group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="text-4xl mb-4 p-3 bg-[rgba(255,255,255,0.05)] rounded-xl inline-flex group-hover:scale-110 transition-transform">{article.image}</div>
            <span className="text-xs font-bold text-[var(--color-primary-light)] bg-[rgba(108,99,255,0.15)] px-3 py-1 rounded-full mb-3 self-start">
              {article.category}
            </span>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3 leading-snug group-hover:text-[var(--color-primary-light)] transition-colors">
              {article.title}
            </h2>
            <p className="text-[var(--text-secondary)] text-sm mb-6 flex-grow leading-relaxed">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--glass-border)] text-xs text-[var(--text-muted)] w-full">
              <span className="flex items-center gap-1">⏱ {article.readTime}</span>
              <span className="flex items-center gap-1">📅 {new Date(article.date).toLocaleDateString('ar-SA')}</span>
              <span className="font-bold text-[var(--color-accent)] mr-auto opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                اقرأ المزيد ←
              </span>
            </div>
          </motion.button>
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

      {/* ─── Article Modal ─── */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 md:py-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full md:h-auto md:max-h-full max-w-4xl bg-[var(--canvas-bg)] md:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[var(--glass-border)]"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[rgba(15,15,26,0.9)] backdrop-blur-md border-b border-[var(--glass-border)]">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedArticle.image}</span>
                  <span className="text-sm font-bold text-[var(--color-primary-light)] bg-[rgba(108,99,255,0.15)] px-3 py-1 rounded-full">
                    {selectedArticle.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:text-white hover:bg-[var(--glass-bg-strong)] transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar" style={{ scrollBehavior: 'smooth' }}>
                <div className="max-w-3xl mx-auto">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] leading-tight mb-4">
                    {selectedArticle.title}
                  </h1>
                  
                  <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] mb-10 pb-6 border-b border-[var(--glass-border)]">
                    <span className="flex items-center gap-1">📅 {new Date(selectedArticle.date).toLocaleDateString('ar-SA')}</span>
                    <span className="flex items-center gap-1">⏱ {selectedArticle.readTime}</span>
                  </div>

                  <article className="prose prose-invert prose-lg max-w-none prose-headings:text-[var(--color-primary-light)] prose-a:text-[var(--color-accent)] prose-strong:text-white prose-li:text-[var(--text-primary)] text-[var(--text-primary)] marker:text-[var(--color-primary)] prose-hr:border-[var(--glass-border)] prose-blockquote:border-[var(--color-primary)] prose-blockquote:bg-[var(--glass-bg)] prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-l-lg prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-[var(--text-primary)]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {selectedArticle.content}
                    </ReactMarkdown>
                  </article>
                  
                  <div className="mt-16 pt-8 border-t border-[var(--glass-border)] text-center">
                    <h3 className="text-xl font-bold mb-4 text-[var(--text-primary)]">هل أعجبك المقال؟ ابدأ بتطبيق ما تعلمته الآن.</h3>
                    <Link href="/dashboard" className="glass-button glass-button-primary inline-flex">
                      الذهاب إلى لوحة التحكم
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
