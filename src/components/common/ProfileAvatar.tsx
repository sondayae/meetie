'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import My from '../icons/Navigator/My';

interface ProfileAvatarProps {
  src?: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
}

export default function ProfileAvatar({
  src,
  alt,
  className,
  onClick,
}: ProfileAvatarProps) {
  return (
    <Avatar className={className} onClick={onClick}>
      <AvatarImage src={src} alt={alt} />
      {/* 폴백으로 이미지 또는 이름 사용 가능 */}
      <AvatarFallback>
        {/* <img src="https://github.com/shadcn.png" alt="" /> */}
        <My />
      </AvatarFallback>
      {/* <AvatarFallback>이름</AvatarFallback> */}
    </Avatar>
  );
}
