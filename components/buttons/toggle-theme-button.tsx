'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ComponentProps, JSX } from 'react';
interface ToggleThemeButtonProps {
  variant?: ComponentProps<typeof Button>['variant'];
}
export function ToggleThemeButton(props: ToggleThemeButtonProps): JSX.Element {
  const { variant = 'outline' } = props;
  const { setTheme } = useTheme();

  function handleThemeChange(_theme: Parameters<typeof setTheme>[0]): void {
    setTheme(_theme);
    const preferTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = _theme !== 'system' ? _theme : preferTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme.toString());
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
