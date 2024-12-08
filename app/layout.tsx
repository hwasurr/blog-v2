import { SiteFooter } from '@/components/footer/site-footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { JSX } from 'react';
import { SiteHeader } from '../components/nav/site-header';
import { ThemeProvider } from '../providers/theme.provider';
import './globals.css';

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
      {/** https://github.com/shadcn-ui/ui/issues/5552 */}
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteHeader></SiteHeader>
          {children}
          <SiteFooter></SiteFooter>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
