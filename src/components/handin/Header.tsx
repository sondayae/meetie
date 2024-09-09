'use client';

import { twMerge } from 'tailwind-merge';
import BackArrowIcon from '../icons/BackArrowIcon';

type HeaderType = {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  useBorderBottom?: boolean;
}

function Header({ label, leftIcon, rightIcon, useBorderBottom = true }: HeaderType) {
  const px = leftIcon && rightIcon ? 'px-2' : 'px-4';
  return (
    <div className={twMerge('py-2', useBorderBottom && 'border-b')}>
    <div className={`flex items-center justify-between h-[40px] ${px} border-[#E6E6E6]`}>
      {leftIcon &&
        <span className='flex items-center justify-center hover:cursor-pointer w-[40px] h-[40px]' onClick={() => window.history.back()}>
          <BackArrowIcon />
        </span>
      }
      <span className='text-lg font-bold text-center'>{label}</span>
      {rightIcon &&
        <div className='flex items-center justify-center hover:cursor-pointer w-[40px] h-[40px]'>
            {rightIcon}
        </div>
      }
    </div>
    </div>
  );
}
export default Header;
