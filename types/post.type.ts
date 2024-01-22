interface PostTag {
  color: string;
  name: string;
}
export interface PostSummary {
  slug: string;
  title: string;
  createdAt: string;
  description?: string;
  tags?: PostTag[];
  timeToRead?: number;
}

export interface FrontMatterRaw {
  timeToRead: number;
  title: string;
  date: string;
  createdAt?: string;
  tags: string[];
  description?: string;
  image?: {
    src: string;
    author?: string;
    description?: string;
  };
}
export interface PostDetail {
  content: string;
  contentHtml: string;
  frontmatter: {
    timeToRead: number;
    title: string;
    date: string;
    createdAt?: string;
    tags: PostTag[];
    description?: string;
    image?: {
      src: string;
      author?: string;
      description?: string;
    };
  };
}
