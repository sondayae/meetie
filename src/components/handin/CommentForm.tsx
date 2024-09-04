'use client';

import { useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import SendIcon from '../icons/SendIcon';


const initialState = {
  success: false,
};

type CommentFormProps = {
  targetId: string;
};

export default function CommentForm({ targetId }: CommentFormProps) {
  // const [state, formAction] = useFormState(upsertComment, initialState);
  // const formRef = useRef<HTMLFormElement>(null);

  // if (formRef.current && state.success) {
  //   formRef.current.reset();
  // }

  return (
    <div>commentform</div>
    // <form action={formAction} className="relative" ref={formRef}>
    //   <input
    //     type="text"
    //     name="targetId"
    //     className="hidden"
    //     defaultValue={targetId}
    //     required
    //   />
    //   <input
    //     required
    //     type="text"
    //     name="comment"
    //     placeholder="스터디원에게 응원의 메세지 보내기"
    //     className={`w-full rounded-lg bg-[#f3f3f3] py-[11.5px] border border-[#E9E9E9] text-sm placeholder-gray-purple focus:outline-none p-2`}
    //   />
    //   <button
    //     type="submit"
    //     className="absolute bottom-[8px] right-[14px] top-[8px]"
    //     aria-label="send"
    //   >
    //     <SendIcon />
    //   </button>
    // </form>
  );
}
