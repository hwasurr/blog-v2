'use server';
import { readFileAsync } from '@/lib/file-utils';
import { getTimeToRead } from '@/lib/md-util';
import { getRandomColor } from '@/lib/utils';
import { FrontMatterRaw, PostDetail } from '@/types/post.type';
import matter from 'gray-matter';
import hljs from 'highlight.js';
import markdownit from 'markdown-it';
import markdownItAncherPlugin from 'markdown-it-anchor';
import path from 'path';

async function getMarkdown(slug: string): Promise<Buffer | null> {
  const url = path.resolve(`./content/blog/${Array.isArray(slug) ? slug.join('/') : slug}/index.md`);
  try {
    const markdown = await readFileAsync(url);
    return markdown || null;
  } catch (err) {
    return null;
  }
}
const md = markdownit({
  linkify: true,
  html: true,
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
export async function getOnePostDetail(slug: string | string[]): Promise<PostDetail | null> {
  const _slugParam = Array.isArray(slug) ? slug.join('/') : slug;
  const markdown = await getMarkdown(_slugParam);
  if (!markdown) return null;
  const { content, data: _frontmatter } = matter(markdown);
  const frontmatter = _frontmatter as FrontMatterRaw;
  const contentHtml = md.render(content);
  const timeToRead = (frontmatter.timeToRead || getTimeToRead(content)) as number;
  const tags = frontmatter.tags.map((t: string) => ({ name: t, color: getRandomColor() }));
  const resp = { content, frontmatter: { ...frontmatter, timeToRead, tags }, contentHtml };
  return resp;
}
