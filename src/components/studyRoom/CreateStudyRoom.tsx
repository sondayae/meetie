'use client';
import { createStudyRoom } from '@/actions/studyroom.action';
import { useRouter } from 'next/navigation';
import Button from '../common/Button';

const CreateStudyRoom = ({ params }: { params: any }) => {
  const router = useRouter();

  const handleCreateStudyRoom = async () => {
    createStudyRoom(params);
    router.push(`/study/${params}/studyover`);
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 pb-4 pt-4 font-semibold text-neutral-800">
        <>
          <div className="text-lg font-bold leading-normal text-neutral-800">
            <div>
              <p>팀원이 모이지 않아도</p>
              <p>스터디룸을 생성할 수 있어요!</p>
            </div>
            <div className="text-sm font-normal text-[#81819b]">
              #바로 스터디 룸을 생성해 볼까요?
            </div>
          </div>
        </>
        <button
          className="h-10 rounded-lg bg-[#E3E3FA] p-2 text-xs font-semibold w-24"
          onClick={() => handleCreateStudyRoom()}
        >
          스터디룸 생성
        </button>
      </header>
    </>
  );
};

export default CreateStudyRoom;
