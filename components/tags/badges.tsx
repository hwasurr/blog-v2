'use client';

import { Badge } from '@/components/ui/badge';
import { type PostSummary } from '@/types/post.type';

export function TagBadges({ tags }: { tags: PostSummary['tags'] }): JSX.Element {
  return (
    <div className="flex items-center gap-1">
      {tags?.map((tag) => <ColoredTagBadge key={tag.name} tag={tag}></ColoredTagBadge>)}
    </div>
  );
}

export function ColoredTagBadge({ tag }: { tag: Required<PostSummary>['tags'][number] }): JSX.Element {
  return (
    <Badge variant="outline">
      <span style={{ color: tag.color }}>#</span>
      {tag.name}
    </Badge>
  );
}
