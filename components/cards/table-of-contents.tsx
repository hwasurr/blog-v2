'use client';

import { Button } from '@/components/ui/button';
import { TocNode, useTableOfContents } from '@/hooks/use-table-of-contents';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function TableOfContentsCard(): JSX.Element {
  const items = useTableOfContents();
  if (!items.length) return <div></div>;
  return (
    <div className="border-0 py-4">
      <div className="flex flex-col">
        {items.map((item) => (
          <TableOfContentsItem
            key={item.contents}
            contents={item.contents}
            nodeName={item.nodeName}
            link={item.link}
            childNodes={item.childNodes}
            depth={0}
          />
        ))}
      </div>
    </div>
  );
}

interface TableOfContentsItemProps extends TocNode {
  depth?: number;
  paddingSize?: number;
}
function TableOfContentsItem(props: TableOfContentsItemProps): JSX.Element {
  const { contents, nodeName, childNodes, link, depth = 0, paddingSize = 10 } = props;
  const _contents = contents.startsWith('# ') ? contents.slice(2, contents.length) : contents;
  return (
    <div style={{ marginLeft: paddingSize * depth }}>
      <a className="anchor" href={link} target="_self">
        <Button variant="link" className={cn('h-auto p-0 text-blue-600 dark:text-blue-600')}>
          {_contents}
        </Button>
      </a>
      {!childNodes?.length
        ? null
        : childNodes.map((child) => (
            <TableOfContentsItem
              key={nodeName + child.contents}
              contents={child.contents}
              nodeName={child.nodeName}
              link={child.link}
              childNodes={child.childNodes}
              depth={depth + 1}
            />
          ))}
    </div>
  );
}
