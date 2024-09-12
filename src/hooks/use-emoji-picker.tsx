'use client';

import { useEffect, useRef, useState } from 'react';
import { MouseEvent } from 'react';

import Picker from '@emoji-mart/react';

export default function useEmojiPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmoji, setSelected] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    close();
  }, [selectedEmoji]);

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
        <Picker onEmojiSelect={(e: any) => setSelected(e.native)} locale="ko"/>
      </div>
    );
  }
  return {
    EmojiPicker,
    open,
    close,
    selectedEmoji,
  };
}
