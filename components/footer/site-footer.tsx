import { Typography } from '@/components/typography/typography';
import { JSX } from 'react';

export function SiteFooter(): JSX.Element {
  return (
    <footer className="mt-4 h-8">
      <div className="text-center">
        <Typography.muted className="text-xs">
          © {`${2020}-`}
          {new Date().getFullYear()} Created by Hwasurr{' '}
        </Typography.muted>
      </div>
    </footer>
  );
}
