'use client';

import { useEffect, useRef, useState } from 'react';
import { MouseEvent } from 'react';

import Picker from '@emoji-mart/react';

export default function useEmojiPicker(setSelectedEmoji: (emoji: string) => void) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleOutsideClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      close();
    }
  };

  function EmojiPicker() {
    return (
      <div className={`absolute bottom-10 ${isOpen ? '' : 'hidden'}`} ref={ref}>
        <Picker onEmojiSelect={(e: any) => setSelectedEmoji(e.native)} locale="ko"/>
      </div>
    );
  }
  return {
    EmojiPicker,
    open,
    close,
  };
}
