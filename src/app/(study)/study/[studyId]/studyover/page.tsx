'use client';
import { getStudyDetails } from '@/actions/study.action';
import Button from '@/components/common/Button';

import Link from 'next/link';

export default function page({ params }: { params: any }) {
  console.log(params.studyId)
  // const { data, error } = getStudyDetails(params.studyId);
  // console.log(data.study)

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
      <main className="flex flex-col items-center justify-center gap-12 py-16">
        {/* {data.title} */}
        <div className="h-52 w-36 origin-top-left rotate-[0.66deg] rounded-xl border border-[#f2f2f2] bg-gradient-to-r from-[#fafaff] to-[#eaeaff] backdrop-blur-sm" />
        <div className="h-3.5 w-40 rounded-full bg-[#5d5fd2] blur-lg" />
      </main>
      <footer>
        <div className="flex w-full items-center justify-center">
          <div className="fixed bottom-0 mx-auto w-full bg-white pt-8">
            <div className="flex items-center justify-center">
              <Link href={`/studyRoom/${params.studyId}/schedule`}>
                <Button label="스터디룸 보러가기" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
