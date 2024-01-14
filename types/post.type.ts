export interface PostSummary {
  id: number;
  slug: string;
  title: string;
  createdAt: string;
  contents?: string;
  tags?: string[];
  timeToRead?: number;
}
