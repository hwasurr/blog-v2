import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../providers/theme.provider';
import { SiteHeader } from '../components/nav/site-header';
import { SiteFooter } from '@/components/footer/site-footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://hwasurr.com'),
  title: `Hwasurr's Devlog`,
  openGraph: {
    images: 'https://github.com/hwasurr.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteHeader></SiteHeader>
          {children}
          <SiteFooter></SiteFooter>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
