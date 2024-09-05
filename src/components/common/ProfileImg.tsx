
type AvatarProps = {
  src?: string;
  username?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

function ProfileImg({ src, size = 'md', className }: AvatarProps) {
  return (
    <>
    {/* { src ? (
      <Avatar src={src} showFallback className='bg-main-purple'/>
    ) : (
      <Avatar src='https://api.dicebear.com/9.x/glass/svg?backgroundColor=d1d4f9' showFallback className='bg-main-purple'/>
    )} */}
    </>
  )
}
export default ProfileImg;
