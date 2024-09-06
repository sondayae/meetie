export type AvatarProps = {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

export type MenuProps = {
  id: string;
  title: string;
  path: string;
  icon?: string;
}[] ;