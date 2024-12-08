import Link from 'next/link';
import { JSX } from 'react';
import { siteConfig } from '../../config/site';
import { cn } from '../../lib/utils';
import { Icons } from '../icons/icons';
import { buttonVariants } from '../ui/button';

export function GithubLinkButton(): JSX.Element {
  return (
    <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
      <div
        className={cn(
          buttonVariants({
            variant: 'ghost',
          }),
          'w-9 px-0',
        )}
      >
        <Icons.gitHub className="h-4 w-4" />
        <span className="sr-only">GitHub</span>
      </div>
    </Link>
  );
}
