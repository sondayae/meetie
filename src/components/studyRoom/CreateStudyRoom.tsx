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
      <header className="px-4 pb-8 pt-20 text-2xl font-semibold leading-tight text-neutral-800">
        <h1 className="flex justify-between">
          <div>
            <p>팀원이 모이지 않아도</p>
            <p>스터디룸을 생성할 수 있어요!</p>
          </div>

          <div className="px-16">
            <Button
              label="스터디룸 생성"
              type="primary"
              size="small"
              onClick={() => handleCreateStudyRoom()}
            ></Button>
          </div>
        </h1>
        <h2></h2>
      </header>
    </>
  );
};

export default CreateStudyRoom;
