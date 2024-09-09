import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

import { AvatarProps } from '@/types/common';

export default function StudyAvatar({src, alt='study_image', fallback='https://github.com/shadcn.png', className='rounded-md'}: AvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={alt}/>
      {!src && <AvatarFallback><img src={fallback} alt={alt}/></AvatarFallback>}
    </Avatar> 
  )
};