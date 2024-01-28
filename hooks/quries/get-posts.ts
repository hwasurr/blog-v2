import { PostsResponseData } from '@/app/api/posts/route';
import { siteConfig } from '@/config/site';

export async function getPosts(): Promise<PostsResponseData> {
  const res = await fetch(siteConfig.baseURL + '/api/posts');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const data = (await res.json()) as PostsResponseData;

  if (!data.data.length) return { data: [] };
  return data;
}
