import { Button } from '@/components/ui/button';
import { Typography } from '@/components/typography/typography';

export default function BlogSlugPage({ params }: { params: { slug: string } }): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {params.slug}
      <Typography.h1>This is blog page</Typography.h1>
      <Typography.h2>This is blog page</Typography.h2>
      <Typography.h3>This is blog page</Typography.h3>
      <Typography.h4>This is blog page</Typography.h4>
      <Typography.p>This is blog page</Typography.p>
      <Typography.large>This is blog page</Typography.large>
      <Typography.small>This is blog page</Typography.small>
      <Typography.muted>This is blog page</Typography.muted>
      <Typography.blockquote>This is blog page</Typography.blockquote>
      <Typography.code>This is blog page</Typography.code>
      <Typography.ul>
        <Typography.li>This is blog page</Typography.li>
        <Typography.li>This is blog page</Typography.li>
        <Typography.li>This is blog page</Typography.li>
      </Typography.ul>
      <Button>Click me</Button>
    </main>
  );
}
