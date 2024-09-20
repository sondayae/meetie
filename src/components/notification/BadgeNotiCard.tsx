'use client';

import supabase from '@/utils/supabase/client';
import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Button from '../common/Button';
import { getBadgeImgUrl } from '@/utils/supabase/storage';
import { useRouter } from 'next/navigation';
import { useUser } from '@/stores/user/user';

export default function BadgeNotiCard() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [badge, setBadge] = useState<any>();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    buttonRef.current?.click();
  }, [badge])

  useEffect(() => {
    const channel = supabase.channel('user-badge-changes')
    .on('postgres_changes',
    {
      event: "INSERT",
      schema: 'public',
      table: 'user_badge',
    },
    (payload) => {
      console.log('Change received!', payload);
      if (payload.new.user_id === user?.id) {
        const getBadgeInfo = async () => {
          console.log('get badge info');
          const {data, error} = await supabase.from('badge').select().eq('id', payload.new.badge_id);
          if (error) {
            console.log('뱃지 알림 팝업 뱃지 정보 조회 실패', error.message);
            return null;
          }
          if (data) {
            setBadge(data[0]);
          }
        };
        getBadgeInfo();
      }
    }
  )
  .subscribe();

  return () => {
    channel.unsubscribe();
  };
  }, []);

  return (
  <>
    {badge &&
      <Dialog>
        <DialogTrigger asChild>
          <button ref={buttonRef} hidden>모달 열기</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] border border-primary">
          <DialogHeader className='items-center'>
            <DialogTitle className='font-semibold text-xl'>뱃지 획득!</DialogTitle>
            <DialogDescription>
              새로운 뱃지를 획득했어요.
            </DialogDescription>
          </DialogHeader>
          <div className='flex flex-col items-center'>
            <img 
              src={getBadgeImgUrl(badge.image_path)}
              alt="뱃지 이미지"
              className='w-[200px]'
              />
            <small className='text-muted-foreground'>획득한 뱃지</small>
            <p className='font-semibold text-lg'>{badge.name}</p>
          </div>
          <DialogFooter>
          <DialogClose asChild>
            <Button label='바로 보러 가기' type='primary' onClick={() => router.push('/mypage/badge')}/>
          </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    }
  </>
  )
}