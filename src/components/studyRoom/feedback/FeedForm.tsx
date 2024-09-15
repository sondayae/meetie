'use client';

import NoticeBox from '@/components/common/NoticeBox'
import ImageInput from '@/components/handin/ImageInput'
import Button from '@/components/common/Button'
import Mark from '@/components/common/Mark'
import StudyroomDrawer from '../StudyroomDrawer'
import { useEffect, useState } from 'react'
import { getImgUrl } from '@/utils/supabase/storage';
import { updateFeedback } from '@/actions/studyroom/feedbackActions';
import { useRouter } from 'next/navigation';

export default function FeedForm({feedback, homeworks}: {feedback?: Feedback, homeworks: Homework[]}) {
  const router = useRouter();
  const [selectedHomework, setSelectedHomework] = useState<Homework>();
  const [selectedImage, setSelectedImage] = useState<File>();
  const [text, setText] = useState(feedback?.text);

  const handleSubmit = async () => {
    let imgData = new FormData();
    let newData = {};
    
    // todo 변경사항 없는 경우 알림
    if (selectedHomework?.id !== feedback?.homework.id) {
      newData = {homework_id: selectedHomework?.id};
    }
    if (text !== feedback?.text) {
      newData = {...newData, text: text};
    }
    if (selectedImage) {
      imgData.append('image', selectedImage);
    }
    if (feedback) {
      const data = await updateFeedback(feedback?.id, newData, imgData);
      console.log(data);
      
    } else {
      // const data = await insertFeedback(newData);
    }
  }

  return (
    <>
    <div className='p-4 flex flex-col justify-center gap-2 mb-auto'>
      <NoticeBox />
      <div className='mt-8'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-3'>
            <span className='font-medium text-lg'>14일차 과제</span>
            <span><Mark label='진행중'/></span>
          </div>
          <StudyroomDrawer list={homeworks} preSelected={feedback?.homework} handleSelect={setSelectedHomework}/>
        </div>
        <section className='mt-6'>
          {feedback?.images &&
            <ImageInput src={getImgUrl(feedback.images[0].url)} setSelected={setSelectedImage}/>
          }
          <div className='flex flex-col gap-3 mt-10'>
            <label htmlFor="feedText" className='font-bold'>기록</label>
            <textarea
              value={text}
              name='feedText'
              placeholder='과제를 하며 나누고 싶은 생각을 적어보세요.'
              className='w-full text-sm bg-[#F9F9F9] resize-none rounded-lg content-center p-2 border border-[#E9E9E9]'
              onChange={(e) => setText(e.target.value)}
              />
          </div>
        </section>
    </div>
    </div>
    <div className='flex flex-col justify-center p-4'>
      <Button type='primary' label='인증하기' onClick={handleSubmit}></Button>
      <button className='text-muted-foreground'>
        <span className='border-b border-muted-foreground text-sm'>임시 저장</span>
      </button>
    </div>
    </>
  )
}