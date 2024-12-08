'use client';

const NextThemesProvider = dynamic(() => import('next-themes').then((e) => e.ThemeProvider), {
  ssr: false,
});

import { type ThemeProviderProps } from 'next-themes';
import dynamic from 'next/dynamic';
import { JSX } from 'react';

export function ThemeProvider({ children, ...props }: ThemeProviderProps): JSX.Element {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
