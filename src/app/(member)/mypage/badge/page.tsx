'use client';

import { useEffect, useState } from 'react';

import BadgeCard from '@/components/badge/BadgeCard';
import Header from '@/components/handin/Header';
import AlramIcon from '@/components/icons/AlramIcon';
import { getBadges } from '@/lib/actions/badge';
import { getBadgeImgUrl } from '@/utils/supabase/storage';

function Badge() {
  const [badgeList, setBadgeList] = useState<string[]>();

  const fetchData = async () => {
    const { data } = await getBadges();
    // let list = data?.map((item) => {
    //   item.src = getBadgeImgUrl(item.name);
    //   return item;
    // });
    console.log(data);

    // setBadgeList(list);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header label="내 능력 현황" />
      <div className="flex items-center justify-between px-[14px] py-[12px]">
        <h1 className="text-lg font-semibold">내 뱃지</h1>
        <div className="flex items-center justify-center gap-1">
          <span>
            <AlramIcon />
          </span>
          <span className="text-xs text-gray-purple">업데이트 매일 오전</span>
        </div>
      </div>
      <div className="grid grid-cols-3">
        {badgeList?.map((badge) => {
          return (
            <div key={badge.id}>
              <BadgeCard badge={badge} />
            </div>
          );
        })}
      </div>
    </>
  );
}
export default Badge;
