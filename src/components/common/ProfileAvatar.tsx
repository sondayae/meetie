/* eslint-disable simple-import-sort/imports */

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AvatarProps } from '@/types/common';
import My from '../icons/Navigator/My';

export default function ProfileAvatar({
  src,
  alt,
  fallback = <My className="stroke-current" />,
  className,
  onClick,
}: AvatarProps) {
  return (
    <Avatar className={className} onClick={onClick}>
      <AvatarImage src={src} alt={alt} />
      {!src && <AvatarFallback>{fallback}</AvatarFallback>}
    </Avatar>
  );
}
