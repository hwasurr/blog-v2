import Link from 'next/link';
import { siteConfig } from '../../config/site';
import { cn } from '../../lib/utils';
import { buttonVariants } from '../ui/button';
import { Icons } from '../icons/icons';

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
