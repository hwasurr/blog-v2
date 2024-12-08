export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  /** 커맨드 메뉴에 보여야할 지 항목 */
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
