import Link from 'next/link';
import { Typography } from '@/components/typography/typography';
import { Button } from '@/components/ui/button';

export default function NotFound(): JSX.Element {
  return (
    <div className="grid h-[calc(100vh-121px+64px)] grid-cols-1 md:grid-cols-2">
      <div className="invisible h-full bg-slate-700 md:visible"></div>
      <div className="flex flex-col items-center justify-center p-4">
        <Typography.h1>404</Typography.h1>
        <Typography.muted>요청하신 페이지를 찾지 못했어요.</Typography.muted>
        <Typography.p>
          아래 버튼을 눌러 홈으로 돌아가거나 <Typography.code>/</Typography.code> 를 눌러 다른 페이지를 검색해보세요!
        </Typography.p>
        <div className="mt-4">
          <Link href="/">
            <Button>홈으로 돌아가기</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
