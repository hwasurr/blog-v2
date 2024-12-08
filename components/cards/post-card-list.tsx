'use server';
import { PostCard } from '@/components/cards/post-card';
import { getPosts } from '@/hooks/quries/get-posts';
import { JSX } from 'react';

export default async function PostCardList(): Promise<JSX.Element> {
  const { data: cardList } = await getPosts();
  return (
    <div className="flex flex-col justify-center gap-6">
      <div id="list" className="flex flex-col gap-6">
        {cardList.map((post) => (
          <PostCard key={post.title} data={post}></PostCard>
        ))}
      </div>
    </div>
  );
}
