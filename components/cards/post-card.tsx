'use client';

import { Typography } from '@/components/typography/typography';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getRandomColor } from '@/lib/utils';
import { type PostSummary } from '@/types/post.type';
import Link from 'next/link';
interface PostCardProps {
  data: PostSummary;
}
export function PostCard(props: PostCardProps): JSX.Element {
  const { createdAt, title, contents, tags, timeToRead, slug } = props.data;
  return (
    <Card>
      <CardHeader>
        <TagBadges tags={tags} />
        <Link passHref href={'/blog' + slug}>
          <CardTitle className="hover:text-primary">{title}</CardTitle>
        </Link>
        <CardDescription>읽는 데 {timeToRead} 분</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{contents}</p>
      </CardContent>
      <CardFooter className="justify-end">
        <Typography.muted>{createdAt}</Typography.muted>
      </CardFooter>
    </Card>
  );
}

function TagBadges({ tags }: { tags: PostSummary['tags'] }): JSX.Element {
  return (
    <div className="flex items-center gap-1">
      {tags?.map((tag) => <ColoredTagBadge key={tag} tag={tag}></ColoredTagBadge>)}
    </div>
  );
}

function ColoredTagBadge({ tag }: { tag: Required<PostSummary>['tags'][number] }): JSX.Element {
  return (
    <Badge variant="outline">
      <span style={{ color: getRandomColor() }}>#</span>
      {tag}
    </Badge>
  );
}
