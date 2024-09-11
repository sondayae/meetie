'use client';

import { useEffect, useState } from 'react';

import BadgeCard from '@/components/badge/BadgeCard';
import Header from '@/components/handin/Header';
import AlramIcon from '@/components/icons/AlramIcon';
import { getBadges } from '@/lib/actions/badge';
import { getBadgeImgUrl } from '@/utils/supabase/storage';

export default function page() {
  const [badgeList, setBadgeList] = useState<any>();

  const fetchData = async () => {
    const { data } = await getBadges();
    setBadgeList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header label="내 능력 현황" />
      <div className='px-[20px]'>
        <div className="flex items-center justify-between py-[12px]">
          <h1 className="text-lg font-semibold">내 뱃지</h1>
          <div className="flex items-center justify-center gap-1">
            <span>
              <AlramIcon />
            </span>
            <span className="text-xs text-muted-foreground">업데이트 매일 오전</span>
          </div>
        </div>
          <div>
            <h1 className='font-medium'>댓글 뱃지</h1>
            <div className='flex items-center gap-3'>
              {badgeList?.comment.map((item: any) => {
                return (
                  <div key={item.id}>
                    {/* <BadgeCard badge={item} type='댓'/> */}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h1 className='font-medium'>피드 뱃지</h1>
            <div className='flex items-center gap-3'>
              {badgeList?.feedback.map((item: any) => {
                return (
                  <div key={item.id}>
                    {/* <BadgeCard badge={item} type='피드'/> */}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h1 className='font-medium'>스터디 뱃지</h1>
            <div className='flex items-center gap-3'>
              {badgeList?.study.map((item: any) => {
                return (
                  <div key={item.id}>
                    {/* <BadgeCard badge={item} type='스터디'/> */}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h1 className='font-medium'>밋티 뱃지</h1>
            <div className='flex items-center gap-3'>
              {badgeList?.meett.map((item: any) => {
                return (
                  <div key={item.id}>
                    {/* <BadgeCard badge={item} type='밋티'/> */}
                  </div>
                );
              })}
            </div>
          </div>
      </div>
    </>
  );
}
