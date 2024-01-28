import { PostsResponseData } from '@/app/api/posts/route';
import { siteConfig } from '@/config/site';
import fs from 'fs';
import RSS from 'rss';

export default async function generateRssFeed(allPosts: PostsResponseData): Promise<void> {
  const site_url = siteConfig.baseURL;

  const feedOptions = {
    title: 'Blog posts | RSS Feed',
    description: 'Welcome to this blog posts!',
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.jpeg`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}`,
  };

  const feed = new RSS(feedOptions);

  // Add each individual post to the feed.
  allPosts.data.map((post) => {
    feed.item({
      title: post.title,
      description: post.description || '',
      url: `${site_url}/posts/${post.slug}`,
      date: new Date(post.createdAt),
    });
  });

  // Write the RSS feed to a file as XML.
  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));
}
