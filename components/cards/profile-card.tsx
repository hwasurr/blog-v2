import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CardTitle } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import Link from 'next/link';

export function ProfileCard(): JSX.Element {
  return (
    <div className="border-0 py-4">
      <div className="pb-4">
        <CardTitle>{siteConfig.name}</CardTitle>
      </div>
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={siteConfig.profile.avatarSrc} alt={'@' + siteConfig.profile.name}></AvatarImage>
          <AvatarFallback>{siteConfig.profile.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium leading-none">{`${siteConfig.profile.name}`}</p>
          <Link passHref href={`mailto:${siteConfig.profile.email}`}>
            <p className="text-sm text-muted-foreground hover:text-primary">{siteConfig.profile.email}</p>
          </Link>
        </div>
      </div>

      <div className="pt-4">
        <p className="text-sm font-medium leading-5">{siteConfig.profile.description}</p>
      </div>
    </div>
  );
}
