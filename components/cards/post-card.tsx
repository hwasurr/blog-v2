'use client';

import { TagBadges } from '@/components/tags/badges';
import { Typography } from '@/components/typography/typography';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
