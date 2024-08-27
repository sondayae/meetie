'use client';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import supabase from '@/utils/supabase/client';
import CalendarIcon from '@/components/icons/CalendarIcon';
import LeftArrowIcon from '@/components/icons/LeftArrowIcon';
import NoticeBox from '@/components/common/NoticeBox';
import Mark from '@/components/common/Mark';
import SelectBox from '@/components/studyRoom/SelectBox';
import Input from '@/components/form/Input';
import Button from '@/components/common/Button';
import PlusIcon from '@/components/icons/PlusIcon';
import Image from 'next/image';

type HandinForm = {
    image: File,
    text: string,
}

const page = () => {
    const [previewImg, setPreviewImg] = useState<string>();
    const [imgUrl, setImgUrl] = useState<string>();
    const { register, handleSubmit, setValue } = useForm<any>();

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { ref, ...rest } = register('handinImage');


    const onSubmit = (data: any) => {
        console.log(data);


    // 가장 마지막에 핸드아웃 인서트를 하고 그 전에 캐치하여 에러 발생하면 지우는 방식으로 진행, 한 함수 내에서 여러 번 부르기
        // try {
        //     saveStorage()
        //     .then(res => saveImage(res.url))
        //     .then(res => saveHandin(res.image_id));
        // } catch (error) {

        // }
    }

    const saveStorage = async () => {
        const response = await fetch('/api/studyRoom/handin/storage',
            {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({name: 'test', id: '1'})
            });

        debugger;
        if (!response.ok) {
            return { message: 'error' };
        }
        return response.json();
    }

    const saveImage = async (imgUrl: string) => {
        const response = await fetch('api/studyRoom/handin/images',
            {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({name: 'test', id: '1'})
            });
        return response.json();
    }

    const saveHandin = async (image_id: string) => {
        const response = await fetch('api/studyRoom/handin',
            {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({name: 'test', id: '1'})
            });
        return response.json();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) return;
        setValue('handinImage', file);
        setPreviewImg(URL.createObjectURL(file));
    }

    const handleClick = () => {
        fileInputRef.current?.click();
    }

  return (
    <div>
      <header className="border-b-2 pb-2 mt-8">
        <div className="flex justify-between mx-8">
          <LeftArrowIcon className='w-3 h-3 stroke-black' />
          <span>과제 인증</span>
          <CalendarIcon className='w-5 h-5 fill-white stroke-black'/>
        </div>
      </header>
      <section className='flex flex-col items-center'>
        <div className='mb-[35px] my-[16px] mt-[18px] w-full'>
            <NoticeBox />
        </div>
        <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
            <div className='pb-[25px]'>
                <div className='flex pb-[16px] items-center'>
                    <span className='font-medium mr-[12px]'>14일차 과제</span>
                    <Mark />
                </div>
                <SelectBox />
            </div>
            {/* <label htmlFor="handinId">과제 아이디</label>
            <input type='text' id='handinId' className='border-2' {...register('homeworkId')}/> */}
            <div className='flex justify-center mb-[40px] aspect-video rounded-md border-light-gray border-2 bg-[#f9f9f9] hover:cursor-pointer overflow-hidden' onClick={handleClick}>
                <div className={`flex flex-col items-center justify-center ${previewImg ? 'hidden' : ''}`}>
                    <span className='bg-[#eaeaea] p-1 rounded-full mb-[8px]'>
                        <PlusIcon className='w-5 h-5 fill-[#a9a9a9] stroke-[#a9a9a9]'/>
                    </span>
                    <span className='text-[#a9a9a9]'>인증 구역</span>
                </div>
                <input
                    {...rest}
                    type='file'
                    name='handinImage'
                    onChange={handleChange}
                    ref={(e) => {
                        ref(e)
                        fileInputRef.current = e // you can still assign to ref
                    }}
                    className='hidden'
                />
                <img src={previewImg} className={`${previewImg ? '' : 'hidden'} w-full object-cover `}/>
            </div>
            <div>
                <p className='mb-[12px]'>
                    <label htmlFor="handinText" className='font-medium'>기록</label>
                </p>
                <input type="text" id='handinText' placeholder='과제를 하며 나누고 싶은 생각을 적어보세요.' className='w-full border-2 p-[13px] rounded-lg bg-[#f9f9f9] border-[#e9e9e9] text-sm' {...register('text')} />
                <p className='text-end text-xs text-[#9d9d9d] mt-1'>0 / 500</p>
            </div>
            <div className='mt-[100px]'>
                <Button type='primary' label='인증하기' size='large' borderStyle='none' />
            </div>
        </form>
      </section>
    </div>
  );
};
export default page;