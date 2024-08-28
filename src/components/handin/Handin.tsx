'use client';
import { useRouter } from 'next/navigation';
import MoreCircles from './MoreCircles';
import ProfileImg from '../common/ProfileImg';
import { useModal } from '@/hooks/hooks';

export type HandinType = {
  id: string;
  userName: string,
  text: string,
  handinImg: string,
  date: string;
  openModal: () => void;
  closeModal: () => void;
};

const dateFormatter = (timestamp: string) => {
    const date = new Date(timestamp).toLocaleString().slice(0,-3);
    return date;
  }

const Handin = ({ id, userName, handinImg, text, date, openModal, closeModal }: HandinType) => {
    const router = useRouter();
    const handleClick = (handinId: string) => {
        router.push(`./studyRoom/handin/${handinId}`)
    }

  return (
    <div
      key={id}
      className="border-b-2 border-b-middle-gray p-[15px] bg-light-purple"
      onClick={() => handleClick(id)}
    >
      <div className='grid grid-cols-[1fr_7fr_1fr] gap-2'>
        <div>
          <ProfileImg img={handinImg}/>
        </div>
        <div className=''>
          <div className='pb-[16px]'>
            <span className='pr-[30px]'>{userName}</span>
            <span>14일차 과제</span>
          </div>
          <div className='pb-[10px]'>
            <span>{text}</span>
          </div>
          <div className='overflow-hidden rounded-lg bg-black aspect-video'>
            <img src={handinImg} alt='과제 인증 사진' className='w-full h-full object-cover'/>
          </div>
          <div>
            <span>{dateFormatter(date)}</span>
          </div>
        </div>
        <div>
          <MoreCircles openModal={openModal} closeModal={closeModal}/>
        </div>
      </div>
    </div>
  );
};
export default Handin;
