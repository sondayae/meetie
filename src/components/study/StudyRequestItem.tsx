'use client';

import { UUID } from 'crypto';
import Link from 'next/link';
import { useState } from 'react';
import ProfileAvatar from '../common/ProfileAvatar';

type ItemType = {
  id: number;
  status: string;
  studyId: number;
  user: {
    id: UUID;
    name: string;
    job: string;
    nickname?: string;
    introduce?: string;
    personality?: string[];
    images: { url: string };
    introduction: string;
    expected_study_span?: string;
  };
};

export default function StudyRequestItem({
  item,
  modApply,
}: {
  params: string;
  item: ItemType;
  acceptedStudy: number;
  recruitNum: number;
  modApply: (studyId: number, userId: UUID, status: string) => void;
}) {
  console.log(item);
  return (
    <>
      <li key={item.id}>
        {/* {item.status === 'waiting' && ( */}
        <div className="flex h-[191px] w-full flex-col items-center justify-center gap-2 rounded-lg border border-gray-200">
          <div className="flex w-full items-start justify-between gap-4 px-[19px] pb-[9px] pt-5">
            <div className="flex items-start justify-start gap-2.5">
              <div className="flex flex-col items-end justify-start">
                <Link href={`/profile/read/${item.user.id}`}>
                  <ProfileAvatar
                    src={item?.user?.images?.url}
                    alt="user profile img"
                    className="relative h-14 w-14 overflow-hidden rounded-full object-cover"
                  />
                </Link>
              </div>
              <div className="flex flex-col items-start justify-start gap-1">
                <div className="text-base font-semibold text-black">
                  {item.user.nickname === ''
                    ? item.user.name
                    : item.user.nickname}
                </div>
                <div className="text-xs font-medium text-gray-500">
                  {item.user.job}
                </div>
                <div className="flex gap-1">
                  <span
                    className={
                      'whitespace-nowrap text-xs font-medium text-gray-500'
                    }
                  >
                    스터디
                    {/* 예상 스터디 기간 */}
                  </span>
                  <span className="whitespace-nowrap text-xs font-medium text-indigo-500">
                    {/* 8회 */}
                    {item.user.expected_study_span}
                  </span>
                  {/* <span className="text-xs font-medium text-gray-500">
                    | 출석률
                  </span>
                  <span className="text-xs font-medium text-indigo-500">
                    98%
                  </span> */}
                </div>
              </div>
            </div>
            <div className="flex items-start justify-start gap-1.5">
              {item.status === 'waiting' && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      modApply(item.studyId, item.user.id, 'refused')
                    }
                    className="flex h-8 items-center justify-center gap-2 rounded-full bg-[#f1f1f1] px-4 py-2"
                  >
                    <div className="text-sm font-medium text-[#434343]">
                      거절
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      modApply(item.studyId, item.user.id, 'accepted')
                    }
                    className="flex h-8 items-center justify-center gap-2 rounded-full bg-[#7f4cff] px-4 py-2"
                  >
                    <div className="text-sm font-medium text-white">수락</div>
                  </button>
                </>
              )}

              {item.status !== 'waiting' && (
                <>
                  <button
                    type="button"
                    disabled
                    // onClick={() => modApply(item.id, 'refused')}
                    className="text-dark-gray flex items-center justify-center gap-2 rounded-full bg-muted px-4 py-2 text-sm font-medium"
                  >
                    {item.status === 'accepted' ? '수락됨' : '거절됨'}
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="flex w-full flex-col items-start justify-start gap-[13px] px-[26px] pb-5">
            <div className="w-72 text-sm font-normal leading-tight text-[#434343]">
              {item.user.introduction
                ? item.user.introduction
                : '자기소개가 없습니다.'}
            </div>

            <div className="flex w-full items-start justify-start gap-2.5 overflow-scroll overflow-x-auto whitespace-nowrap">
              {/* 여기서 범위를 벗어남 */}
              {item.user.personality?.map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="mr-2 whitespace-nowrap rounded-lg bg-[#f5f1ff] px-2 py-2 text-[14px] text-[#434343]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* )} */}
      </li>
    </>
  );
}
