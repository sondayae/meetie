'use client';

import Picker from '@emoji-mart/react'
import { useState } from 'react';

export default function useEmojiPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  function EmojiPicker({handleSelect}: {handleSelect: (e: any) => void}) {
    return (
      <>
      {isOpen &&
        <div className={`absolute right-10`}>
          <Picker onEmojiSelect={(e: any) => handleSelect(e)} locale={'ko'}/>
        </div>
      }
      </>
    );
  }
  return {
    EmojiPicker,
    open,
    close,
  };
};