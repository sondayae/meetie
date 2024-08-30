'use client';
import { useState, useEffect } from 'react';
import HandinList from '@/components/handin/HandinList';
import MainLayout from '@/components/studyRoom/MainLayout';

const page = ({params}: {params: {id: string}}) => {
    const [handinList, setHandinList] = useState<any[]>([]);
    const [studyRoomList, setStudyRoomList] = useState<[]>();
    const [studyRoom, setStudyRoom] = useState();

    const fetchData = async () => {
        
      const res = await fetch('/api/handin');
      const data = await res.json();
      setHandinList(data);

      const tempStudyRoomList = [{id: '1', title: '스터디룸 1', subtitle: '디자인 | 멤버 5'}, {id: '2', title: '스터디룸 2', subtitle: '개발 | 멤버 5'}];
      setStudyRoomList(tempStudyRoomList);
      setStudyRoom(tempStudyRoomList[0]);
    }
  
    useEffect(() => {
      fetchData();
    }, []);

    return (
        <div className="bg-[#FAFAFA]">
            {
                studyRoom &&  <MainLayout list={studyRoomList} selectedItem={studyRoom} setSelectedItem={setStudyRoom}/>
            }
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
                    <HandinList data={handinList} />
                </div>
            </div>
        </div>
    )
}
export default page