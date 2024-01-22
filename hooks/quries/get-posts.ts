import { PostsResponseData } from '@/app/api/posts/route';

export async function getPosts(): Promise<PostsResponseData> {
  const res = await fetch('http://localhost:3000' + '/api/posts');
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const data = (await res.json()) as PostsResponseData;

  if (!data.data.length) return { data: [] };
  return data;
}
