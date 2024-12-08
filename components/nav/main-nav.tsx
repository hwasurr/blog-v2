'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { JSX } from 'react';
import { navConfig } from '../../config/nav';

export function MainNav(): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {navConfig.mainNav.map((navItem) => {
          if (!navItem.href) return null;
          return (
            <Link
              key={navItem.title}
              href={navItem.href}
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname?.startsWith(navItem.href) ? 'text-foreground' : 'text-foreground/60',
              )}
            >
              {navItem.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
