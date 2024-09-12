'use client';
import { getStudyDetails } from '@/actions/study.action';
import { getStudyMember } from '@/actions/studymember.action';
import Button from '@/components/common/Button';

import Link from 'next/link';

export default async function page({ params }: { params: any }) {
  const memberData = await getStudyMember(params.studyId);

  return (
    <>
      <header className="px-4 pt-20 text-2xl font-semibold leading-tight text-neutral-800">
        <h1>
          멤버들이 모두 모여
          <br />
          <p>스터디룸이 생성되었어요</p>
          <p className="text-sm text-[#81819b]">
            모두 함께 스터디 완주를 하는 그 날까지!
          </p>
        </h1>
        <h2></h2>
      </header>
      {/* swiper */}

      <main className="flex items-center justify-center scroll-smooth py-16">
        <div className="scroll animate-testScroll  flex min-w-max gap-12 scroll-smooth px-6">
          {memberData.map((member: any, index: number) => (
            <div
              key={index}
              className="scroll-snap-align-center flex flex-col items-center justify-center gap-12 py-16"
            >
              <div className="h-52 animate-rocketMove w-36 origin-top-left rotate-[0.66deg] rounded-xl border border-[#f2f2f2] bg-gradient-to-r from-[#fafaff] to-[#eaeaff] backdrop-blur-sm">
                <div className="flex flex-col items-center justify-center">
                  {/* <img src={member.user.image_id} alt="user" /> */}
                  <div className="h-20 w-20 rounded-full bg-[#eaeaff] blur-lg" />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <p className="text-lg font-semibold leading-tight text-[#464646]">
                      {member.user.name}
                    </p>
                    <p className="text-sm font-normal leading-tight text-[#81819b]">
                      {member.user.job ? member.user.job : '직업 없음'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-3.5 w-40 rounded-full bg-[#5d5fd2] blur-lg" />
            </div>
          ))}
        </div>
      </main>

      <footer>
        <div className="flex w-full items-center justify-center">
          <div className="fixed bottom-0 mx-auto w-full bg-white pt-8">
            <div className="flex items-center justify-center">
              <Link href={`/studyroom/${params.studyId}/calendar`}>
                <Button label="스터디룸 보러가기" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
