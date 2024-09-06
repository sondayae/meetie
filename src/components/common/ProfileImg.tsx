import { Avatar } from '@nextui-org/avatar';

type AvatarProps = {
  src?: string;
  username?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

function ProfileImg({ src, size = 'md', className }: AvatarProps) {
  return (
    <>
      {src ? (
        <Avatar size={size} src={src} showFallback className="bg-main-purple" />
      ) : (
        <Avatar
          size={size}
          src="https://api.dicebear.com/9.x/glass/svg?backgroundColor=d1d4f9"
          showFallback
          className={className}
        />
      )}
    </>
  );
}
export default ProfileImg;
