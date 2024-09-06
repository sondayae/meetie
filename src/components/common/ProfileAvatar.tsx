'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AvatarProps } from '@/types/common';

export default function ProfileAvatar({src, alt, fallback='https://wyzkmcctbltzehszxyvt.supabase.co/storage/v1/object/public/images/profile/profileImg_0d8556a0-4769-4fbc-82c7-b46ecf9d00a8', className}: AvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt}/>
      {/* 폴백으로 이미지 또는 이름 사용 가능 */}
      {!src && <AvatarFallback><img src={fallback} alt={alt}/></AvatarFallback>}
    </Avatar> 
  )
};
