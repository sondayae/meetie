'use client';
import { useEffect, useState } from 'react';
import supabase from '@/utils/supabase/client';
import MoreIcon from '@/components/icons/MoreIcon';

const page = () => {
  const [handinList, setHandinList] = useState<any[]>([])
  const fetchData = async () => {
    const {data} = await supabase.from('handin').select(`
      id,
      text,
      created_at,
      images ( url ),
      user ( name )`)
      .order('created_at', { ascending: false });

    console.log(data);
    setHandinList(data || []);
  }

  const dateFormatter = (timestamp: string) => {
    const date = new Date(timestamp).toLocaleString().slice(0,-3);
    return date;
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#FAFAFA]">
      <div className="border-b-2 border-middle-gray p-[34px]">
        <p>과제 일정</p>
        <p>주차별 과제 현황을 확인하고 소통해요.</p>
        <div className="rounded-lg bg-light-purple p-3">
          <p>우리는 이렇게 소통해요</p>
        </div>
      </div>
      <div className="p-[13px]">
        <p>6월</p>
        캘린더 영역
      </div>
      <div className="rounded-md bg-white">
        <div className="border-b-2 border-middle-gray pb-[24px] pt-[37px]">
          <p>6월 4일 화요일</p>
          <p>과제를 인증한 팀원들을 확인해 보세요.</p>
        </div>
        <div>
          {handinList.map((handin) => (
            <div
              key={handin.id}
              className="grid grid-rows-2 grid-cols-2 border-b-2 border-b-middle-gray p-[30px]"
            >
              <div className='col-span-2'>
                <span>유저 이미지</span>
                <span className="pr-[30px]">{handin.user.name}</span>
                <span>14일차 과제</span>
                <MoreIcon className="fill-black w-5 h-5"/>
              </div>
              <div className='row-span-2 col-span-2'>
                <p>{handin.text}</p>
                <img
                  src={handin.images ? handin.images.url : ''}
                  className="w-20"
                />
                <p>{dateFormatter(handin.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
