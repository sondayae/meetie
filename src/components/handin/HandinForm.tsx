import { useRef, useState } from 'react';

import Button from '../common/Button';
import Mark from '../common/Mark';
import NoticeBox from '../common/NoticeBox';
import SelectBox from '../studyRoom/SelectBox';
import { createHandin } from '@/lib/actions/createHandin';
import ImageFrame from './ImageFrame';
import ImageInput from './ImageInput';
import { redirect } from 'next/navigation';
import { useFormState } from 'react-dom';

const initialState = {
  success: false,
};
const MAX_LENGTH = 500;

export default function HandinForm({homeworkList}) {
  const [state, formAction] = useFormState(createHandin, initialState);
  const [selected, setSelected] = useState('');
  // const [text, setText] = useState<string>('');
  // const [previews, setPreviews] = useState<string>();

  // const fileInputRef = useRef<HTMLInputElement | null>(null);
  // const formRef = useRef<HTMLFormElement>(null);

  if (formRef.current && state.success) {
    formRef.current.reset();
    redirect('./complete');
  }

  // const handleFileClick = () => {
  //   fileInputRef.current?.click();
  // }
  // const readAndPreview = (file: any) => {
  //   const reader = new FileReader()
  //   reader.onload = async () => {
  //     const result = await reader.result as string;
  //     // setPreviews(prev => [...prev!, result]); // TODO type
  //     setPreviews(result);
  //   }
  //   reader.readAsDataURL(file)
  // }
  // const handleFileChange = () => {
  //   const files = fileInputRef.current?.files;
  //   if (files) {
  //     [].forEach.call(files, readAndPreview)
  //   }
  // }

  // const handleTextChange = (e) => {
  //   let newText = e.target.value;
  //   if (newText.length > MAX_LENGTH) {
  //     newText = e.target.value.slice(0, MAX_LENGTH);
  //   }
  //   setText(newText);
  // }

  return (
    <div className="p-[16px]">
      <NoticeBox />
      <div className="flex items-center gap-[12px] pb-[16px] pt-[34px]">
        <span className="items-center justify-center gap-[12px] text-lg font-medium">
          14일차 과제
        </span>
        <Mark label={'진행중'} />
      </div>
      <div className="pb-[24px]">
        <SelectBox selectList={homeworkList} setSelected={setSelected}/>
      </div>
      <div onClick={() => handleFileClick()} className='mb-[40px]'>
        {previews ? <ImageFrame src={previews} alt='preview' /> : <ImageInput />}
        {/* {previews.length > 0 ? (
          previews.map((preview, idx) => {
            return <ImageFrame key={idx} src={preview} alt='preview'/>
          })
        ) : (
          <ImageInput />
        )} */}
      </div>
      <form action={formAction} ref={formRef}>
        <input type="text" name='id' className='hidden'/>
        <input type="text" name='homeworkId' className='hidden'/>
        <input 
          type="file"
          name='file' 
          className='hidden'
          accept='image/*'
          ref={fileInputRef}
          // multiple
          onChange={handleFileChange}
        />
        <div className='flex flex-col gap-[12px] mb-[40px]'>
          <label htmlFor="text" className='block font-bold'>기록</label>
          <input
            required
            type="text"
            name="text"
            placeholder="과제를 하며 나누고 싶은 생각을 적어보세요."
            className={`w-full rounded-lg bg-[#f3f3f3] border-[#E9E9E9] border text-sm placeholder-gray-purple focus:outline-none px-[14px] py-[11.5px]`}
            onChange={(e) => handleTextChange(e)}
            value={text}
          />
          <span className='text-xs text-[#9d9d9d] self-end mr-[2px]'>{`${text.length}`} / 500</span>
        </div>
        <ImageInput size='small'/>
        <div className='mt-[40px]'>
          <Button type='primary' buttonType='submit' label='인증하기'></Button>
        </div>
      </form>
    </div>
  );
}