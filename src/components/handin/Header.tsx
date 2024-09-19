'use client';

import { twMerge } from 'tailwind-merge';
import BackArrowIcon from '../icons/BackArrowIcon';
import { useState } from 'react';
import ToggleMenu from '../study/ToggleMenu';

type HeaderType = {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  useBorderBottom?: boolean;
  sticky?: boolean;
  bgColor?: string;
};

function Header({
  label,
  leftIcon = true,
  rightIcon,
  useBorderBottom = true,
  sticky = false,
  bgColor = 'bg-white',
}: HeaderType) {
  const px = leftIcon && rightIcon ? 'px-2' : 'px-4';

  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
  };
  return (
    <div
      className={twMerge(
        'py-2',
        bgColor,
        useBorderBottom && 'border-b',
        sticky && 'sticky top-0 z-50 shadow-sm',
      )}
    >
      <div
        className={`flex h-[40px] items-center justify-between ${px} border-[#E6E6E6]`}
      >
        {leftIcon && (
          <span
            className="flex h-[40px] w-[40px] items-center justify-center hover:cursor-pointer"
            onClick={() => window.history.back()}
          >
            <BackArrowIcon />
          </span>
        )}
        <span className="text-center text-lg font-bold">{label}</span>
        {rightIcon && (
          <div
            className="relative flex h-[40px] w-[40px] items-center justify-center hover:cursor-pointer"
            onClick={!label ? handleToggleMenu : undefined}
          >
            {rightIcon}
            {toggleMenu && (
              <ToggleMenu
                toggleMenu={toggleMenu}
                onClose={() => setToggleMenu(false)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default Header;
