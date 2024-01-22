const tags: string[] = ['nestjs', 'rest', 'cache', 'asdf'];

export type TagsResponseData = { data: string[] };
export async function GET(request: Request): Promise<Response> {
  return Response.json({ data: tags }); // Fetch posts
}
