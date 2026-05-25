import './globals.css';
import Providers from '@/components/layout/Providers';

export const metadata = {
  title: 'MokoNodes - منصة ذكية لإدارة المهام، تدوين الملاحظات، وبناء الخرائط الذهنية',
  description:
    'موكو برو, MokoNodes - منصة ذكية لإدارة المهام وتدوين ملاحظات ذكية وبناء خرائط ذهنية تفاعلية لزيادة إنتاجيتك.',
  keywords: 'موكو برو, MokoNodes, خرائط ذهنية, إدارة المهام, ملاحظات ذكية, إنتاجية',
  authors: [{ name: 'MokoNodes' }],
  openGraph: {
    title: 'MokoNodes - منصة ذكية لإدارة المهام، تدوين الملاحظات، وبناء الخرائط الذهنية',
    description: 'موكو برو, MokoNodes - منصة ذكية لإدارة المهام وتدوين ملاحظات ذكية وبناء خرائط ذهنية تفاعلية لزيادة إنتاجيتك.',
    url: 'https://mokonodes.online',
    siteName: 'MokoNodes',
    locale: 'ar_SA',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
