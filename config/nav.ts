export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: unknown;
  label?: string;
}
export interface MainNavItem extends NavItem {}
interface NavConfig {
  mainNav: MainNavItem[];
}

export const navConfig: NavConfig = {
  mainNav: [
    // {
    //   title: 'Blog',
    //   href: '/blog',
    // },
    {
      title: 'About',
      href: '/about',
    },
  ],
};
