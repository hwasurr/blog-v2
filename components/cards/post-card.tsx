import { TagBadges } from '@/components/tags/badges';
import TimeToReadText from '@/components/text/time-to-read';
import { Typography } from '@/components/typography/typography';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/date-util';
import { type PostSummary } from '@/types/post.type';
import Link from 'next/link';

interface PostCardProps {
  data: PostSummary;
}
export function PostCard(props: PostCardProps): JSX.Element {
  const { createdAt, title, description, tags, timeToRead, slug } = props.data;
  const date = formatDate(createdAt);
  return (
    <Card>
      <CardHeader className="pb-1 md:pb-4">
        <TagBadges tags={tags} />
        <Link passHref href={'/blog' + slug}>
          <CardTitle className="leading-8 hover:text-sky-600">{title}</CardTitle>
        </Link>
        <CardDescription>
          <span className="md:hidden">{`${createdAt} • `}</span>
          <TimeToReadText timeToRead={timeToRead || null}></TimeToReadText>
        </CardDescription>
      </CardHeader>
      {description ? (
        <CardContent>
          <p className="line-clamp-2 md:line-clamp-6">{description}</p>
        </CardContent>
      ) : null}
      <CardFooter className="hidden md:flex">
        <Typography.muted>{date}</Typography.muted>
      </CardFooter>
    </Card>
  );
}
