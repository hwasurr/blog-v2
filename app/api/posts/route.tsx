import { siteConfig } from '@/config/site';
import { getTimeToRead } from '@/lib/md-util';
import { getRandomColor } from '@/lib/utils';
import { PostSummary } from '@/types/post.type';
import fs from 'fs';
import matter from 'gray-matter';
import * as path from 'path';

const mdfileExtension = 'md';
const contentsDirectory = 'content/blog';
const mdfilename = `/index.${mdfileExtension}`;

export type PostsResponseData = { data: PostSummary[] };
export async function GET(request: Request): Promise<Response> {
  const mdFiles = getFilesInDirectory(contentsDirectory, mdfileExtension);
  const result = mdFiles.map<PostSummary>((filePath) => {
    const fp = filePath.replace(contentsDirectory, '');
    const slug = fp.endsWith(mdfilename) ? fp.slice(0, fp.length - mdfilename.length) : fp;
    const mdContents = fs.readFileSync(filePath);
    const { content, data: frontmatter } = matter(mdContents);
    const tags = frontmatter.tags.map((t: string) => ({ name: t, color: getRandomColor() }));
    return {
      slug,
      href: `${siteConfig.baseURL}/blog${slug.startsWith('/') ? slug : '/' + slug}`,
      title: frontmatter.title,
      createdAt: frontmatter.createdAt || frontmatter.date,
      description: frontmatter.description,
      tags: tags || [],
      timeToRead: frontmatter.timeToRead || getTimeToRead(content),
    };
  });

  const data = result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return Response.json({ data });
}

function getFilesInDirectory(directoryPath: string, fileExtension: string): string[] {
  const files: string[] = [];

  function readDirectory(currentPath: string): void {
    const items = fs.readdirSync(currentPath);
    items.forEach((item) => {
      const itemPath = path.join(currentPath, item);
      const stats = fs.statSync(itemPath);
      if (stats.isDirectory()) {
        readDirectory(itemPath);
      } else if (stats.isFile() && item.endsWith(fileExtension)) {
        files.push(itemPath);
      }
    });
  }
  readDirectory(directoryPath);
  return files;
}
