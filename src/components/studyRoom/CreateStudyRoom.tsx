'use client';
import { createStudyRoom } from '@/actions/studyroom.action';

const CreateStudyRoom = ({ params }: { params: any }) => {
  return (
    <div className="flex h-20 w-full items-center justify-center">
      <div className="max-w-[340px] rounded-xl border border-[#e2d6ff] bg-white/60 backdrop-blur-md">
        <div className="flex items-center justify-center gap-4 text-center text-base font-normal leading-tight text-[#464646]">
          <div>
            <p>원하는 팀원이 없으신가요?</p>
            <p>지금 바로 스터디룸을 생성해보세요!</p>
          </div>
          <button type="button" onClick={() => createStudyRoom(params)}>
            스터디룸 생성
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStudyRoom;
