import Utterances from '@/components/comments/utterances';
import { TagBadges } from '@/components/tags/badges';
import TimeToReadText from '@/components/text/time-to-read';
import { Typography } from '@/components/typography/typography';
import { getOnePostDetail } from '@/hooks/quries/get-one-post-detail';
import { formatDate } from '@/lib/date-util';
import 'highlight.js/styles/atom-one-light.min.css';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { JSX } from 'react';
import './page.css';

export async function generateMetadata(props: BlogSlugPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params;
  const { frontmatter } = (await getOnePostDetail(params.slug)) || {};
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: frontmatter?.title,
    description: frontmatter?.description,
    keywords: frontmatter?.tags.map((t) => t.name),
    creator: 'Hwasoo Kang',
    openGraph: {
      images: [frontmatter?.image?.src || '', ...previousImages],
    },
  };
}
interface BlogSlugPageProps {
  params: Promise<BlogSlugPageParams>;
}
interface BlogSlugPageParams {
  slug: string | string[];
}
export default async function BlogSlugPage(props: BlogSlugPageProps): Promise<JSX.Element> {
  const params = await props.params;
  const data = await getOnePostDetail(params.slug);
  if (!data) return notFound();
  const { contentHtml, frontmatter } = data;
  return (
    <div className="flex min-h-screen flex-col items-center justify-between md:px-12 md:py-8">
      <article className="w-full">
        {/* posting metadata */}
        <section id="posting-metadata" className="flex flex-col justify-center gap-4 pb-4 md:pb-12">
          {frontmatter.image ? (
            <figure>
              <div className="relative min-h-80 w-full">
                <Image
                  className="rounded-xl object-cover"
                  src={frontmatter.image.src}
                  alt={frontmatter.title}
                  fill
                  placeholder="empty"
                ></Image>
              </div>
              <figcaption className="my-2 text-center text-xs italic text-muted-foreground">
                {frontmatter.image.description}{' '}
                {frontmatter.image.author ? `(Pictured by ${frontmatter.image.author})` : null}
              </figcaption>
            </figure>
          ) : null}
          <Typography.h1 className="leading-tight">{frontmatter.title}</Typography.h1>
          <Typography.muted>{frontmatter.description}</Typography.muted>
          <TagBadges tags={frontmatter.tags} />
          <Typography.muted>
            <TimeToReadText timeToRead={frontmatter.timeToRead || 30}></TimeToReadText>
            {' • '}
            {formatDate(frontmatter.createdAt || frontmatter.date)}
          </Typography.muted>
        </section>

        {/* posting contents */}
        <section
          id="posting-contents"
          className="markdown-body w-full pb-14"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        ></section>
      </article>
      <section id="comments" className="utterances-dark w-full">
        <Utterances repo="hwasurr/hwasurr.io" theme="dark" slug={params.slug} />
      </section>
      <section id="comments" className="utterances-light w-full">
        <Utterances repo="hwasurr/hwasurr.io" theme="light" slug={params.slug} />
      </section>
    </div>
  );
}
