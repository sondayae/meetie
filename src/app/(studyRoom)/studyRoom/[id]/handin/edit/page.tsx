'use client';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation'
import NoticeBox from '@/components/common/NoticeBox';
import HandinForm from '@/components/handin/HandinForm';
import HandinHeader from '@/components/handin/HandinHeader';
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter();
    const [data, setData] = useState(null);
    const handinId = useSearchParams().get('id');

    const fetchData = async () => {
        const response = await fetch(`/api/handin?id=${handinId}`);
        const data = await response.json();
        setData(data[0]);
    }

    const onSubmitHandler = async (data: any) => {
        const formData = new FormData();
        data.images = Array.from(data.images);
        data.images.map((image: File) => {formData.append('files', image)});
        formData.append('data', JSON.stringify({
            id: data.id,
            homework_id: '2',
            text: data.text,
            date: data.created_at
        }));

        const response = await fetch('/api/handin/edit', {
            method: 'POST',
            body: formData,
        });
        const res = await response;
        const json = await res.json();
        if (res.ok) {
            console.log('success');
            router.push('./complete');
        } else {
            console.log('error');
            console.log(json);
        }
        
    }

    useEffect(() => {
        fetchData();
    }, []);

  return (
    data ? <>
        <HandinHeader title='과제 인증 수정'/>
        <section className='flex flex-col items-center'>
            <div className='mb-[35px] my-[16px] mt-[18px] w-full'>
                <NoticeBox />
            </div>
            <HandinForm preloadedValues={data} onSubmitHandler={onSubmitHandler} />
        </section>
    </> : 
    <div>Loading...</div>
  );
};
export default page;