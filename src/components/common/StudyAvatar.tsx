import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import { AvatarProps } from '@/types/common';

export default function StudyAvatar({src, alt='study_image', fallback='https://wyzkmcctbltzehszxyvt.supabase.co/storage/v1/object/public/admin/assets/logo.png', className='rounded-md'}: AvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt}/>
      {!src && <AvatarFallback><img src={fallback} alt={alt}/></AvatarFallback>}
    </Avatar> 
  )
};