'use client';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import supabase from '@/utils/supabase/client';
import CalendarIcon from '@/components/icons/CalendarIcon';
import LeftArrowIcon from '@/components/icons/LeftArrowIcon';
import NoticeBox from '@/components/common/NoticeBox';
import HandinForm from '@/components/handin/HandinForm';

const page = () => {
    const [data, setData] = useState(null);
    const [previewImg, setPreviewImg] = useState<string>();
    const [imgUrl, setImgUrl] = useState<string>();
    const [text, setText] = useState(handinInfo ? handinInfo.text : '');

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { ref, ...rest } = register('handinImage');

    const searchParams = useSearchParams()
    const handinId = searchParams.get('id')
    
    const fetchData = async () => {
        const response = await fetch(`/api/handin?id=${handinId}`);
        const data = await response.json();
        setData(data[0]);
    }

    const onSubmitHandler = (data: any) => {
        console.log(data);
        // 가장 마지막에 핸드아웃 인서트를 하고 그 전에 캐치하여 에러 발생하면 지우는 방식으로 진행, 한 함수 내에서 여러 번 부르기
            // try {
            //     saveStorage()
            //     .then(res => saveImage(res.url))
            //     .then(res => saveHandin(res.image_id));
            // } catch (error) {

            // }
    }

    useEffect(() => {
        fetchData();
    }, [handinId]);

    const handleTextChange = (e) => {
        const newText = e.target.value;
        setText(newText);
    }

    const saveStorage = async () => {
        const response = await fetch('/api/studyRoom/handin/storage',
            {
                method: 'POST', 
                headers: {'Content-Type': 'application/json'}, 
                body: JSON.stringify({name: 'test', id: '1'})
            });

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
        {
            data &&
            <>
            <header className="border-b-2 pb-2 mt-8">
                <div className="flex justify-between mx-8">
                <LeftArrowIcon className='w-3 h-3 stroke-black' />
                <span>과제 인증 수정</span>
                <CalendarIcon className='w-5 h-5 fill-white stroke-black'/>
                </div>
            </header>
            <section className='flex flex-col items-center'>
                <div className='mb-[35px] my-[16px] mt-[18px] w-full'>
                    <NoticeBox />
                </div>
                <HandinForm preloadedValues={data} onSubmitHandler={onSubmitHandler} />
            </section>
                </>
        }
    </div>
  );
};
export default page;