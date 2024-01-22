import { PostResponseData } from '@/app/api/posts/[...slug]/route';
import Utterances from '@/components/comments/utterances';
import { TagBadges } from '@/components/tags/badges';
import TimeToReadText from '@/components/text/time-to-read';
import { Typography } from '@/components/typography/typography';
import 'highlight.js/styles/atom-one-light.min.css';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import './page.css';
import { formatDate } from '@/lib/date-util';

async function getData(slug: string | string[]): Promise<Required<PostResponseData>> {
  const _slugParam = Array.isArray(slug) ? slug.join('/') : slug;
  const res = await fetch('http://localhost:3000' + '/api/posts/' + _slugParam);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  const data = (await res.json()) as PostResponseData;
  if (!data) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Post not found');
  }
  return data;
}

export async function generateMetadata({ params }: BlogSlugPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const { frontmatter } = await getData(params.slug);
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    creator: 'Hwasoo Kang',
    openGraph: {
      images: [frontmatter.image?.src || '', ...previousImages],
    },
  };
}

interface BlogSlugPageProps {
  params: BlogSlugPageParams;
}
interface BlogSlugPageParams {
  slug: string | string[];
}
export default async function BlogSlugPage({ params }: BlogSlugPageProps): Promise<JSX.Element> {
  const data = await getData(params.slug);
  const { contentHtml, frontmatter } = data;
  return (
    <div className="flex min-h-screen flex-col items-center justify-between md:px-12 md:py-8">
      <article className="w-full">
        {/* posting metadata */}
        <section id="posting-metadata" className="flex flex-col justify-center gap-4 pb-12">
          {frontmatter.image ? (
            <>
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
            </>
          ) : null}
          <Typography.h1>{frontmatter.title}</Typography.h1>
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
          className="markdown-body w-full pt-12"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        ></section>
      </article>

      <section id="comments">
        <Utterances repo="hwasurr/hwasurr.io" />
      </section>
    </div>
  );
}
