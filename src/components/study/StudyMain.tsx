'use client';
import { format } from 'date-fns';
import Link from 'next/link';
import ProfileAvatar from '@/components/common/ProfileAvatar';
import Image from 'next/image';
import EyeIcon from '../icons/EyeIcon';
import Button from '@/components/common/Button';

import { StudyDetail } from '@/types/studydetail';
import { useState } from 'react';
import { postApply, deleteApply } from '@/actions/studyapply.action';

export default function StudyMain({
  userdata,
  isApply,
  params,
  title,
  endDate,
  startDate,
  created_at,
  viewCount,
  goal,
  info,
  tags,
  user,
  recruitNum,
  isRecruiting,
}: StudyDetail) {
  const [btnisApply, setbtnisApply] = useState(isApply);

  const ddays = Math.round(
    (Number(new Date(endDate)) - Number(new Date())) / 1000 / 60 / 60 / 24,
  );

  const isAuthor = userdata?.id === user?.id;

  const handleApply = async (type: boolean) => {
    if (type) {
      postApply(params.studyId, userdata.id);
      setbtnisApply((prev) => !prev);
    } else {
      deleteApply(params.studyId, userdata.id);
      setbtnisApply((prev) => !prev);
    }
  };

  console.log(!user?.images?.url)

  return (
    <div className='min-h-dvh relative h-full flex flex-col'>
      <section className="flex flex-col justify-center border-b-2 border-[#F1F2F6] px-4 pb-[14px] pt-6 ">
        {/* 1 */}
        <div className="mb-5 flex items-center gap-[14px]">
          {/* title */}
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-[24px] font-semibold">
            {title}
          </p>

          {/* d-day */}
          <div className="flex h-6 w-14 items-center justify-center gap-2 rounded-full border border-[#8346ff] bg-white p-1.5">
            <div className="text-xs font-medium text-[#8346ff]">
              {ddays > 0 ? `D-${ddays}` : `D+${Math.abs(ddays)}`}
            </div>
          </div>
        </div>
        {/* 2 tags */}
        <div className="mb-6 flex overflow-hidden whitespace-nowrap">
          {tags?.map((tag, idx) => (
            <span
              key={idx}
              className="text-text-primary mr-2 rounded-lg bg-[#f5f1ff] px-[10px] py-[5px] text-[14px]"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* 3 */}
        <div className="flex gap-2">
          <Link href={`/profile/${user.id}`}>
            <ProfileAvatar
              src={user?.images?.url}
              alt="user profile img"
              className="relative h-10 w-10 overflow-hidden rounded-full object-cover"
              // fallback={
              //   <Image
              //     alt="user profile img"
              //     src={user?.images?.url || ''}
              //     fill
              //   />
              // }
            />
          </Link>
          <div className="flex h-[42px] w-full flex-col gap-1">
            {/* name */}
            <Link href={`/profile/read/${user?.id}`}>
              <p className="flex text-[13px] font-bold">{user.name}</p>
            </Link>
            <div className="flex justify-between text-xs font-normal text-[#81819b]">
              <span className="flex gap-1">
                <span>작성일</span>
                <span>{format(created_at, 'yyyy-MM-dd')}</span>
                <span>&#124;</span>
                <span>{format(startDate, 'hh:mm')}</span>
              </span>
              <div className="flex gap-1">
                <EyeIcon />
                <span>{viewCount}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex flex-col gap-8 p-4 h-full">
        {/* <main className="flex flex-col gap-8"> */}
        <div className="flex flex-col gap-4 text-[#434343]">
          <p className="font-semibold">스터디 주제</p>
          <div className="whitespace-pre-line text-[15px]">
            {info.split('\n').map((line, idx) => (
              <div key={idx}>
                {line.includes('https') ? (
                  <Link className="underline" href={line} target="_black">
                    {line}
                  </Link>
                ) : (
                  line
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4 text-[#434343]">
          <p className="whitespace-break-spaces font-semibold">스터디 목표</p>
          <p className="text-[15px]">{goal}</p>
        </div>
        <div className="flex flex-col gap-4 text-[#434343]">
          <p className="font-semibold">스터디 인원</p>
          <p className="text-[15px]">{recruitNum} 명</p>
        </div>
        <div className="flex flex-col gap-4 text-[#434343]">
          <p className="font-semibold">스터디 기간</p>
          <p className="text-[15px]">
            <span>{format(startDate, 'yyyy-MM-dd')}</span>
            <span>&nbsp;~ &nbsp;</span>
            <span>{format(endDate, 'yyyy-MM-dd')}</span>
          </p>
        </div>
      </main>
      {/* </main> */}

      <div className="sticky bottom-0 flex min-h-[104px] max-w-[600px] justify-between border-t-[1px] border-[#DDDDDD] bg-white p-2 px-4 py-7">
        {/* 신청마감 */}
        {!isRecruiting && (
          <Button type="disabled" label="모집이 마감되었습니다."></Button>
        )}
        {/* 신청중 => 로그인x */}
        {isRecruiting && !userdata?.id && (
          <Link className="w-full" href={`/login`}>
            <Button type="disabled" label="로그인 후 신청하기" />
          </Link>
        )}
        {/* 신청여부확인 => 로그인O */}
        {isRecruiting && userdata?.id && (
          <div className="flex w-full gap-[19px]">
            <div className="flex w-[74px] flex-col items-center">
              <div className="w-[74px] text-sm font-medium text-[#81819b]">
                참여가능인원
              </div>
              <div>
                <span className="text-lg font-medium leading-normal text-[#6224fd]">
                  2명
                </span>
                <span className="text-lg font-medium leading-normal text-[#9d9d9d]">
                  {' '}
                  /{' '}
                </span>

                <span className="text-lg font-medium leading-normal text-[#6f6f6f]">
                  {recruitNum}명
                </span>
              </div>
            </div>
            {/* 신청여부확인 => 로그인O => 작성자*/}
            {isAuthor && (
              <Link className="w-full" href={`/study/${params.studyId}/studyrequest`}>
                <Button
                  type="primary"
                  label="대기 중인 요청 확인"
                  onClick={() => {}}
                />
              </Link>
            )}
            {!isAuthor && (
              <Button
                type={btnisApply ? 'disabled' : 'primary'}
                size="large"
                label={!btnisApply ? '신청하기' : '신청취소'}
                onClick={async () => {
                  if (!btnisApply) {
                    await handleApply(true);
                  } else {
                    await handleApply(false);
                  }
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
