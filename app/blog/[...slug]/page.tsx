import { TagBadges } from '@/components/tags/badges';
import { Typography } from '@/components/typography/typography';
import { readFileAsync } from '@/lib/file-utils';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import markdownit from 'markdown-it';
import markdownItAncherPlugin from 'markdown-it-anchor';
import path from 'path';
import './page.css';
import Utterances from '@/components/comments/utterances';
import Image from 'next/image';
import 'highlight.js/styles/atom-one-light.min.css';

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
md.use(markdownItAncherPlugin, { permalink: true });

interface BlogSlugPageProps {
  params: BlogSlugPageParams;
}
interface BlogSlugPageParams {
  slug: string | string[];
}
export default async function BlogSlugPage({ params }: BlogSlugPageProps): Promise<JSX.Element> {
  const url = path.resolve(
    `./content/blog/${Array.isArray(params.slug) ? params.slug.join('/') : params.slug}/index.md`,
  );
  const markdown = await readFileAsync(url);
  if (!markdown) return <main>404</main>;

  const { content, data: frontmatter } = matter(markdown);
  const rendered = md.render(content);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-12 py-8">
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
          <Typography.muted>{frontmatter.date}</Typography.muted>
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
    </main>
  );
}
