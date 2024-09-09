import React from 'react';
import { twMerge } from 'tailwind-merge';

interface TagProps {
  children: React.ReactNode;
  className?: string; // 추가 스타일을 위한 className prop
}

const Tag: React.FC<TagProps> = ({ children, className }) => (
  <span
    className={twMerge(
      'inline-block rounded-md border border-[#BCBCBC] bg-white px-3 py-[10px] text-sm',
      className,
    )}
  >
    {children}
  </span>
);

export default Tag;
