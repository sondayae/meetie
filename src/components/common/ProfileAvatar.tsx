'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AvatarProps } from '@/types/common';
import My from '../icons/Navigator/My';

export default function ProfileAvatar({
  src,
  alt,
  fallback = <My />,
  className,
  onClick,
}: AvatarProps) {
  return (
    <Avatar className={className} onClick={onClick}>
      <AvatarImage src={src} alt={alt} />
      {/* 폴백으로 이미지 또는 이름 사용 가능 */}
      {!src && <AvatarFallback>{fallback}</AvatarFallback>}
    </Avatar>
  );
}
