'use client';

import { useRef, useState } from 'react';
import Button from '../common/Button';
import ImageFrame from './ImageFrame';
import ImageInput from './ImageInput';
import SelectBox from '../studyRoom/SelectBox';
import { getImgUrl } from '@/utils/supabase/storage';
import { updateFeedback } from '@/actions/studyroom/feedbackActions';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';

const MAX_LENGTH = 500;

export default function HandinForm({data}: {data: any}) {
  const src = getImgUrl(data.images?.[0].url);
  console.log(data);
  

  const [text, setText] = useState<string>(data.text);
  const [previews, setPreviews] = useState<string>(src);

  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const formAction = async (formData: FormData) => {
  //   const { success } = await updateFeedback(formData);
  //   if (success) {
  //     redirect('../');
  //   }
  // };

  const readAndPreview = (file: any) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const result = (await reader.result) as string;
      setPreviews(result);
    };
    reader.readAsDataURL(file);
  };
  const handleFileClick = () => {
    fileInputRef.current?.click();
  };
  const handleFileChange = () => {
    const files = fileInputRef.current?.files;
    if (files) {
      [].forEach.call(files, readAndPreview);
    }
  };
  const handleTextChange = (text: string) => {
    let newText = text;
    if (text.length > MAX_LENGTH) {
      newText = text.slice(0, MAX_LENGTH);
    }
    setText(newText);
  };

  return (
    <></>
    // <div className='flex flex-col gap-10'>
    //   <div onClick={handleFileClick} className="mb-[40px]">
    //     {previews ? (
    //       <ImageFrame src={previews} alt="preview" />
    //     ) : (
    //       <ImageInput />
    //     )}
    //   </div>
    //   <form action={formAction} ref={formRef}>
    //       <input
    //         type="text"
    //         name="id"
    //         className="hidden"
    //         value={data.id}
    //         />
    //       <input
    //         type="text"
    //         name="homeworkId"
    //         className="hidden"
    //         value={!Array.isArray(data.homework) ? data.homework?.id : data.homework?.[0].id}
    //         />
    //       <input
    //         type="file"
    //         name="file"
    //         className="hidden"
    //         accept="image/*"
    //         ref={fileInputRef}
    //         onChange={handleFileChange}
    //         />
    //       <div className="mb-[40px] flex flex-col gap-[12px]">
    //         <label htmlFor="text" className="block font-bold">
    //           기록
    //         </label>
    //         <input
    //           type="text"
    //           name="text"
    //           placeholder="과제를 하며 나누고 싶은 생각을 적어보세요."
    //           className="w-full rounded-lg border border-[#E9E9E9] bg-[#f3f3f3] px-[14px] py-[11.5px] text-sm placeholder-gray-purple focus:outline-none"
    //           value={text}
    //           onChange={(e) => handleTextChange(e.target.value)}
    //           />
    //         <span className="mr-[2px] self-end text-xs text-[#9d9d9d]">
    //           {`${text.length}`} / 500
    //         </span>
    //       </div>
    //       <Button type="primary" buttonType="submit" label="인증하기" />
    //     </form>
    // </div>
  )
}