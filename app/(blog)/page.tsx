import PostCardList from '@/components/cards/post-card-list';

export default function Home(): JSX.Element {
  return (
    <div className="flex flex-col justify-center gap-6">
      {/* <TagSelector /> */}
      <PostCardList />
    </div>
  );
}
