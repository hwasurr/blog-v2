import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../providers/theme.provider';
import { SiteHeader } from '../components/nav/site-header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hwasurr.com',
  description: 'Homepage',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SiteHeader></SiteHeader>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
