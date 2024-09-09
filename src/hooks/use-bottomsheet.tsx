import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function useBottomSheet() {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  function BottomSheet({ children }: { children: React.ReactNode }) {
    return (
        <div
          className={twMerge('ease-out-expo fixed left-[50%] top-0 z-10 h-full w-full max-w-[600px] translate-x-[-50%] bg-black bg-opacity-30 transition-opacity duration-300',
            isOpen? 'opacity-100' : 'pointer-events-none opacity-0')}
        >
          <div
            className={twMerge('duration-400 transform px-5 py-10 transition-transform ease-in-out absolute bottom-0 h-auto w-full max-w-[600px] rounded-t-lg bg-white shadow-[0_2px_8px_0px_rgb(0,0,0,0.16)]', isOpen ? 'translate-y-0' : 'translate-y-full')}
          >
            {children}
          </div>
        </div>
    );
  }
  return {
    BottomSheet,
    open,
    close,
  };
};