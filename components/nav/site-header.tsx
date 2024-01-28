import { GithubLinkButton } from '../buttons/github-link-button';
import { ToggleThemeButton } from '../buttons/toggle-theme-button';
import { CommandMenu } from './command-menu';
import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';

export function SiteHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center px-4 md:px-8">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <nav className="flex items-center">
            <GithubLinkButton />
            <ToggleThemeButton variant={'ghost'} />
          </nav>
        </div>
      </div>
    </header>
  );
}
