import { ProfileCard } from '@/components/cards/profile-card';
import { TableOfContentsCard } from '@/components/cards/table-of-contents';
import { Metadata } from 'next';
import { JSX, PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: {
    template: `%s | Hwasurr's Devlog`,
    default: `Hwasurr's Devlog`,
  },
};

export default function BlogHome({ children }: PropsWithChildren): JSX.Element {
  return (
    <main className="relative mx-auto max-w-screen-xl px-4 py-10 md:flex md:flex-row md:py-10">
      <section id="main-section" className="mt-4 w-full min-w-0 max-w-6xl px-1 md:px-6">
        {children}
      </section>

      <aside
        id="sidebar-right"
        className="sticky top-[121px] hidden h-[calc(100vh-121px)] max-h-full w-[320px] overflow-y-auto py-2 lg:flex lg:shrink-0 lg:flex-col lg:justify-between"
      >
        <TableOfContentsCard />
        <ProfileCard />
      </aside>
    </main>
  );
}
