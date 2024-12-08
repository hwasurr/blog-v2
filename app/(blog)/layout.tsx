import { ProfileCard } from '@/components/cards/profile-card';
import { JSX, PropsWithChildren } from 'react';

export default function BlogHome({ children }: PropsWithChildren): JSX.Element {
  return (
    <main className="relative mx-auto max-w-screen-lg px-4 pb-4 pt-2 md:flex md:flex-row md:py-10">
      <section id="main-section" className="mt-4 w-full min-w-0 max-w-6xl px-1 md:px-6">
        {children}
      </section>

      <aside
        id="sidebar-right"
        className="sticky top-[121px] hidden h-[calc(100vh-121px)] w-[264px] py-2 lg:flex lg:shrink-0 lg:flex-col lg:justify-between"
      >
        <div></div>

        <ProfileCard />
      </aside>
    </main>
  );
}
