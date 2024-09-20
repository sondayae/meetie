import { getStudyDetails } from '@/actions/study.action';
import ProfileAvatar from '@/components/common/ProfileAvatar';
import { getStudyMemberImage } from '@/actions/studymember.action';
import Button from '@/components/common/Button';

import Link from 'next/link';
import Navigator from '@/components/common/Navigator';
import SuccessShadow from '@/components/icons/SuccessShadow';
import SuccessCrown from '@/components/icons/SucessCrown';
import FireWork from '@/components/common/Firework';

export default async function page({ params }: { params: any }) {
  const memberData = await getStudyMemberImage(params.studyId);
  console.log(memberData);

  return (
    <>
      <div className="relative">
        <section className="px-4 pb-20 pt-[100px] text-neutral-800">
          <h1 className={'text-2xl font-semibold leading-normal'}>
            멤버들이 모두 모여
            <br />
            스터디룸이 생성되었어요 👏
          </h1>
          <p className="mt-3 text-sm text-[#86869e]">
            모두 함께 스터디 완주를 하는 그 날까지!
          </p>
          <h2></h2>
        </section>
        {/* swiper */}

        {/* <div className="relative h-full w-full">
          <FireWork />
        </div> */}
        <main className="flex items-center justify-center scroll-smooth pb-16">
          <div className="flex min-w-max gap-6 scroll-smooth px-6 transition-transform">
            <div className="relative h-full w-full">
              <FireWork />
            </div>
            {memberData.map((member: any, index: number) => (
              <div className="relative h-[260px] w-[180px]">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#B8B9FF] to-[#7273FF]"></div>
                <div className="h-full w-full origin-top-left rotate-[0.66deg] animate-moveCard rounded-xl border border-[#f2f2f2] bg-gradient-to-r from-[#fafaff] to-[#eaeaff] p-4 opacity-80 backdrop-blur-sm">
                  <div className="flex flex-col items-center justify-center">
                    {/* <div className="h-20 w-20 rounded-full bg-[#eaeaff] blur-lg" /> */}
                    <div className="flex flex-col items-center justify-center">
                      <SuccessCrown avatarSrc={member?.user?.images?.url} />
                      <p className="mt-4 text-sm font-semibold leading-tight text-[#464646]">
                        {member.user.name}
                      </p>
                      <p className="mb-4 text-[10px] font-medium leading-tight text-[#81819b]">
                        {member.user.job ? member.user.job : '직업 없음'}
                      </p>
                      <p className="text-xs text-[#393953]">
                        {member.user?.personality.slice(0, 5).join(' · ') ||
                          '-'}
                      </p>
                    </div>
                  </div>
                </div>
                <SuccessShadow />
              </div>
            ))}
          </div>
        </main>

        {/* Button */}
        <div className="fixed bottom-4 w-full max-w-[600px] px-4 pb-4">
          <div className="mx-auto max-w-[600px]">
            <Link href={`/studyroom/${params.studyId}/calendar`}>
              <Button label="스터디룸 보러가기" type="primary" size="medium" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
