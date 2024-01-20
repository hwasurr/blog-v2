import Utterances from '@/components/comments/utterances';
import { TagBadges } from '@/components/tags/badges';
import { Typography } from '@/components/typography/typography';
import { readFileAsync } from '@/lib/file-utils';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.min.css';
import markdownit from 'markdown-it';
import markdownItAncherPlugin from 'markdown-it-anchor';
import { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import path from 'path';
import './page.css';
import TimeToReadText from '@/components/text/time-to-read';

interface BlogSlugPageProps {
  params: BlogSlugPageParams;
}
interface BlogSlugPageParams {
  slug: string | string[];
}
export async function generateMetadata({ params }: BlogSlugPageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const markdown = await getMarkdown(params.slug);
  if (!markdown) return {};
  const { data: frontmatter } = matter(markdown);
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.tags,
    creator: 'Hwasoo Kang',
    openGraph: {
      images: [frontmatter.image.src || '', ...previousImages],
    },
  };
}
export default async function BlogSlugPage({ params }: BlogSlugPageProps): Promise<JSX.Element> {
  const markdown = await getMarkdown(params.slug);
  if (!markdown) return <main>404</main>;
  const { content, data: frontmatter } = matter(markdown);
  const rendered = md.render(content);
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
            {frontmatter.date}
          </Typography.muted>
        </section>

        {/* posting contents */}
        <section
          id="posting-contents"
          className="markdown-body w-full"
          dangerouslySetInnerHTML={{ __html: rendered }}
        ></section>
      </article>

      <section id="comments">
        <Utterances repo="hwasurr/hwasurr.io" />
      </section>
    </div>
  );
}

const md = markdownit({
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }
    return ''; // use external default escaping
  },
});
md.use(markdownItAncherPlugin, {
  permalink: markdownItAncherPlugin.permalink.ariaHidden({ placement: 'before' }),
});

async function getMarkdown(slug: string | string[]): Promise<Buffer | null> {
  const url = path.resolve(`./content/blog/${Array.isArray(slug) ? slug.join('/') : slug}/index.md`);
  const markdown = await readFileAsync(url);
  return markdown || null;
}
