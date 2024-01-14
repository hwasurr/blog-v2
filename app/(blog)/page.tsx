'use client';

import { PostCard } from '@/components/cards/post-card';
import { TagSelector } from '@/components/combobox/tag-selector';
import { PostSummary } from '@/types/post.type';
import { useMemo, useState } from 'react';

const cardList: PostSummary[] = [
  {
    id: 1,
    slug: '/nestjs/caching',
    createdAt: '2023. 06. 09.',
    title: 'Nestjs REST 애플리케이션의 캐시 처리와 캐시 무효화',
    contents:
      'Nestjs REST 애플리케이션에서 캐시에 대한 전반적인 내용을 다룹니다. 캐시를 등록하는 방법과 캐시를 무효화하는 방법에 대해서 살펴보며 더 효율적인 방식을 찾아나갑니다.',
    tags: ['nestjs', 'rest', 'cache'],
    timeToRead: 5,
  },
  {
    id: 2,
    slug: '/redis/cluster',
    createdAt: '2022. 02. 18.',
    title: 'Docker로 Redis 클러스터 구성하기',
    contents:
      '레디스 Redis는 대표적인 인 메모리 데이터 스토어로 매우 빠른 데이터 액세스 시간을 보장합니다. key-value 형식으로 데이터를 저장하며 다른 key-value 스토어와는 다르게, 사용할 수 있는 데이터 구조가 많습니다. (Strings…',
    tags: ['docker', 'redis'],
    timeToRead: 5,
  },
  {
    id: 3,
    slug: '/AWS/architecting-on-aws',
    createdAt: '2022. 02. 18.',
    title: 'Docker로 Redis 클러스터 구성하기 2',
    contents:
      '레디스 Redis는 대표적인 인 메모리 데이터 스토어로 매우 빠른 데이터 액세스 시간을 보장합니다. key-value 형식으로 데이터를 저장하며 다른 key-value 스토어와는 다르게, 사용할 수 있는 데이터 구조가 많습니다. (Strings…',
    tags: ['docker', 'redis'],
    timeToRead: 5,
  },
  {
    id: 3,
    slug: '/git-github/git-manage',
    createdAt: '2022. 02. 18.',
    title: 'Docker로 Redis 클러스터 구성하기 3',
    contents:
      '레디스 Redis는 대표적인 인 메모리 데이터 스토어로 매우 빠른 데이터 액세스 시간을 보장합니다. key-value 형식으로 데이터를 저장하며 다른 key-value 스토어와는 다르게, 사용할 수 있는 데이터 구조가 많습니다. (Strings…',
    tags: ['docker', 'redis'],
    timeToRead: 5,
  },
];

export default function Home(): JSX.Element {
  const [selectedTag, setSelectedTag] = useState('');
  function onSelect(tag: string): void {
    setSelectedTag(tag);
  }

  const allTags = useMemo(() => {
    const tttt = Array.from(
      new Set(cardList.reduce((prev, curr) => [...prev, ...(curr.tags || [])], [] as string[])),
    ).map((t) => ({ label: '#' + t.toLowerCase(), value: t.toLowerCase() }));
    return tttt;
  }, []);

  return (
    <div className="flex flex-col justify-center gap-6">
      <TagSelector tags={allTags} value={selectedTag} onSelect={onSelect}></TagSelector>
      <div id="list" className="flex flex-col gap-6">
        {cardList
          .filter((post) => (!selectedTag ? true : post.tags?.includes(selectedTag)))
          .map((post) => (
            <PostCard key={post.title} data={post}></PostCard>
          ))}
      </div>
    </div>
  );
}
