import { siteConfig } from '@/config/site';
import { getPosts } from '@/hooks/quries/get-posts';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: blogPosts } = await getPosts();
  const pages = blogPosts.map<MetadataRoute.Sitemap[number]>((p) => ({
    url: p.href,
    lastModified: new Date(p.createdAt),
  }));
  pages.unshift({
    url: siteConfig.baseURL,
    lastModified: new Date(),
  });
  return pages;
}
