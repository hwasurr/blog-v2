export interface PostSummary {
  slug: string;
  title: string;
  createdAt: string;
  description?: string;
  tags?: string[];
  timeToRead?: number;
}
