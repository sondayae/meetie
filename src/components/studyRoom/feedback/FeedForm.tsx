'use client';

import StudyroomDrawer from '../StudyroomDrawer'
import { useEffect, useRef, useState } from 'react'
import { createFeedback, updateFeedback } from '@/actions/studyroom/feedbackActions';
import ImageInput from '@/components/handin/ImageInput';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

const MAX = 500;

export default function FeedForm({studyId, feedback, homeworks}: {studyId: string, feedback?: Feedback, homeworks: Homework[]|null}) {
  const router = useRouter();
  const [selectedHomework, setSelectedHomework] = useState<string>('');
  const [text, setText] = useState(feedback ? feedback.text : '');
  const [state, formAction] = useFormState(createFeedback, null);

  const handleTextChange = (text: string) => {
    let newText = text;
    if (text.length > MAX) {
      text.slice(0, MAX);
    }
    setText(newText);
  }

  useEffect(() => {
    if (state?.success) {
      router.push('./complete');
    }
  }, [state]);

  return (
    <>
    {/* <NoticeBox /> */}
    <form className='flex flex-col gap-8 p-4 flex-grow' action={formAction}>
      <StudyroomDrawer list={homeworks} handleSelect={setSelectedHomework}/>
      <ImageInput />
      <p className='flex flex-col gap-2'>
        <label htmlFor="feedbackText" className='font-semibold'>기록</label>
        <textarea name="text" id='feedbackText' 
          className='bg-muted resize-none rounded-lg outline-none p-2' 
          maxLength={MAX} 
          onChange={(e) => handleTextChange(e.target.value)}
        />
        <small className='text-muted-foreground text-xs text-end'>{text.length} / {MAX}</small>
      </p>
      <input type="text" name='homeworkId' hidden value={selectedHomework} readOnly/>
      <input type="text" name='studyId' hidden value={studyId} readOnly/>
      <SubmitBtn />
    </form>
    </>
  )
}

export function SubmitBtn() {
  const {pending} = useFormStatus();
  return <button type='submit' className='bg-primary text-white p-4 rounded-lg mt-auto'>{pending ? '저장 중' : '인증하기'}</button>;
}