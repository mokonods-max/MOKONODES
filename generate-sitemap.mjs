import fs from 'fs';
import { articles } from './src/data/articles.js';

const baseUrl = 'https://mokopro.online';

const staticRoutes = [
  '',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/blog',
  '/login',
  '/dashboard',
  '/settings'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map((route) => {
      return `
    <url>
      <loc>${baseUrl}${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${route === '' ? '1.0' : '0.8'}</priority>
    </url>
  `;
    })
    .join('')}
  ${articles
    .map((article) => {
      return `
    <url>
      <loc>${baseUrl}/blog/${article.slug}</loc>
      <lastmod>${new Date(article.date).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>
  `;
    })
    .join('')}
</urlset>
`;

fs.writeFileSync('public/sitemap.xml', sitemap);
fs.writeFileSync('public/robots.txt', `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`);

console.log('Sitemap and robots.txt generated successfully!');
