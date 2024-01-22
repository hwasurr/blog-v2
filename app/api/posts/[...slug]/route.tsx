/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileAsync } from '@/lib/file-utils';
import path from 'path';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import markdownit from 'markdown-it';
import markdownItAncherPlugin from 'markdown-it-anchor';
import { getTimeToRead } from '@/lib/md-util';

async function getMarkdown(slug: string): Promise<Buffer | null> {
  const url = path.resolve(`./content/blog/${Array.isArray(slug) ? slug.join('/') : slug}/index.md`);
  const markdown = await readFileAsync(url);
  return markdown || null;
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
  permalink: markdownItAncherPlugin.permalink.ariaHidden({ placement: 'before', class: 'anchor' }),
});
export type PostResponseData = { content: string; frontmatter: any; contentHtml: string };
export async function GET(request: Request, { params }: { params: { slug: string } }): Promise<Response> {
  const markdown = await getMarkdown(params.slug);
  if (!markdown) return Response.json({ data: undefined });
  const { content, data: frontmatter } = matter(markdown);
  const contentHtml = md.render(content);
  const timeToRead = frontmatter.timeToRead || getTimeToRead(content);
  const resp = { content, frontmatter: { ...frontmatter, timeToRead }, contentHtml };
  return Response.json(resp); // Fetch posts
}
