'use client';

import { DialogProps } from '@radix-ui/react-alert-dialog';
import { CircleIcon, FileIcon, LaptopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { navConfig } from '@/config/nav';
import { cn } from '@/lib/utils';
import { PostSummary } from '@/types/post.type';

export type MobileNavProps = DialogProps & {
  posts: PostSummary[];
};
export function CommandMenu({ ...props }: MobileNavProps): JSX.Element {
  const posts = props.posts;
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((_open) => !_open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-64',
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">검색하세요...</span>
        <span className="inline-flex lg:hidden">검색...</span>
        <div>
          <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
          <kbd className="pointer-events-none absolute right-[2.5rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">/</span>
          </kbd>
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="검색어나 명령을 입력하세요..." />
        <CommandList>
          <CommandEmpty>원하시는 결과를 찾을 수 없어요..</CommandEmpty>
          <CommandGroup heading="Links">
            {navConfig.mainNav
              .filter((navitem) => !navitem.external)
              .map((navItem) => (
                <CommandItem
                  key={navItem.href}
                  value={navItem.title}
                  onSelect={() => {
                    runCommand(() => router.push(navItem.href as string));
                  }}
                >
                  <FileIcon className="mr-2 h-4 w-4" />
                  {navItem.title}
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandGroup key={'Blog posts'} heading={'Blog posts'}>
            {posts.map((post) => (
              <CommandItem
                key={post.slug}
                value={post.title}
                onSelect={() => {
                  runCommand(() => router.push(('/blog' + post.slug) as string));
                }}
              >
                <div className="mr-2 flex h-4 w-4 items-center justify-center">
                  <CircleIcon className="h-3 w-3" />
                </div>
                {post.title}
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <SunIcon className="mr-2 h-4 w-4" />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <MoonIcon className="mr-2 h-4 w-4" />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <LaptopIcon className="mr-2 h-4 w-4" />
              System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
