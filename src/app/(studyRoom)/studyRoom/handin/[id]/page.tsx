'use client';
import { useState, useEffect } from 'react';
import { HandinType } from '@/components/handin/Handin';
import ProfileImg from '@/components/common/ProfileImg';
import MoreCircles from '@/components/handin/MoreCircles';
import SendIcon from '@/components/icons/SendIcon';
import CommentList from '@/components/handin/CommentList';

const page = ({ params }: { params: { id: string }}) => {
  const [handinInfo, setHandinInfo] = useState<any>();
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState<any[]>([]);
  const handinId = params.id;
  
  const fetchData = async () => {
    const res = await fetch(`/api/studyRoom/handin?id=${handinId}`);
    const data = await res.json();

    const { id, user, text, images, created_at } = data[0];
    const handinInfo = {id: id, userName: user.name, text: text, image: images.url, date: created_at};

    setHandinInfo(handinInfo);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const dateFormatter = (timestamp: string) => {
    const date = new Date(timestamp).toLocaleString().slice(0,-3);
    return date;
  }

  const handleClick = () => {
    insertComment();
    setComment('');
  }
  
  const insertComment = async () => {
    const response = await fetch('/api/studyRoom/handin/comments',
      {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({handin_id: '2', user_id: '', comment: comment})
      });
      const res = await response.json();
  }

  return (
    <>
    { handinInfo ?
        (
        <div className='h-full'>
          <div className='grid grid-cols-[1fr_7fr_1fr] gap-[8px] border-b-2 border-middle-gray py-[30px]'>
            <div className=''>
              <ProfileImg img={handinInfo.image}/>
            </div>
            <div className=''>
              <span>{handinInfo.userName}</span>
            </div>
            <div className=''>
              <MoreCircles />
            </div>
          </div>
          <div className='bg-[#FAFAFA] py-[60px]'>
            <div className='mb-[30px]'>
              <span>{handinInfo.text}</span>
            </div>
            <div className='aspect-video border-2 border-middle-gray rounded-md mb-[40px]'>
              <img src={handinInfo.image}/>
            </div>
            <div className='aspect-video border-2 border-middle-gray rounded-md mb-[40px]'>
              <img src={handinInfo.image}/>
            </div>
            <div className='aspect-video border-2 border-middle-gray rounded-md mb-[40px]'>
              <img src={handinInfo.image}/>
            </div>
            <span>{dateFormatter(handinInfo.date)}</span>
          </div>
          <div className='flex bg-white justify-center items-center px-[10px] py-[20px] sticky bottom-0'>
            <div className='w-[50px] mr-[10px]'>
              <ProfileImg img={handinInfo.image} />
            </div>
            <div className='flex-grow-[2] relative'>
              <input type='text' placeholder='스터디원에게 응원의 메세지 보내기' className='border-2 border-light-gray rounded-lg w-full bg-[#F3F3F3] p-[10px]' 
                onChange={(e) => setComment(e.target.value)}
              />
              <button className='absolute top-1 bottom-1 right-2' onClick={handleClick}>
                <SendIcon />
              </button>
            </div>
          </div>
          <div>
            <CommentList commentList={commentList} setCommentList={setCommentList} handinId={handinId} dateFormatter={dateFormatter}/>
          </div>
        </div>
        )
          :
        (
        <div>
          <span>Loading</span>
        </div>
        )
    }
    </>
  )
}
export default page