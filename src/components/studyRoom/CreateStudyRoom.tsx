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
    <div>
      <section className="mx-4 mt-10 flex flex-wrap items-center justify-between gap-5 rounded-lg border border-[#eeeeee] bg-[#f9f9f9] px-4 py-5 text-neutral-800">
        <>
          <div className="text-sm">
            <div>
              <p className="font-semibold leading-snug text-[#555555]">
                팀원이 모이지 않아도 <br />
                스터디룸을 생성할 수 있어요!
              </p>
            </div>
            <div className="mt-2 font-normal text-[#81819b]">
              # 바로 스터디룸을 생성해 볼까요?
            </div>
          </div>
        </>
        <button
          className="font-primary w-auto rounded-md bg-[#E3E3FA] px-4 py-2 text-xs font-normal"
          onClick={() => handleCreateStudyRoom()}
        >
          스터디룸 생성
        </button>
      </section>
    </div>
  );
};

export default CreateStudyRoom;
