'use client';
import { ko } from 'date-fns/locale';
import supabase from '@/utils/supabase/client';
import Button from '@/components/common/Button';
import { useForm } from 'react-hook-form';
import NavLink from '@/components/study/NavLink';
import { usePathname, useRouter } from 'next/navigation';
import ErrorMessage from '@/components/form/ErrorMessage';
import Header from '@/components/handin/Header';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Page() {
  const path = usePathname();
  const pathID = path.split('/')[2];
  const router = useRouter();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true); // 로딩 시작
    try {
      console.log(data);

      const { title, context } = data;

      const { error } = await supabase.from('homework').insert([
        {
          title,
          context,
          startDate,
          endDate,
          study_id: pathID, // studyroomID
        },
      ]);

      if (error) throw error;

      router.push(`../${pathID}/handin`);
    } catch (error) {
      console.error('Error during form submission:', error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <>
      <Header
        leftIcon
        label={`문의사항`}
        sticky={true}
        useBorderBottom={false}
        bgColor={'bg-white'}
      />

      <div className="flex h-full min-h-screen w-full max-w-[600px] flex-1 flex-col items-center gap-4 px-4 py-2">
        <div className="flex h-12 w-full flex-col items-start justify-start gap-2">
          <p className="text-dark-gray text-lg font-bold">
             무엇을 도와 드릴까요?
          </p>
          <p className="text-sm font-normal text-muted-foreground">
            아래의 정보를 입력해주세요.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full min-h-screen w-full flex-1 flex-col"
        >
          <div className="text-left text-base font-semibold leading-normal">
            📣 답변 받을 이메일을 입력해주세요.
          </div>
          <input
            className="mt-2 h-12 w-full rounded-lg border border-[#c4c4c4] px-4"
            type="text"
            id="title"
            placeholder="example@example.com"
            {...register('title', { required: '제목을 작성해주세요.' })}
          />
          <div className="mt-4 text-left text-base font-semibold leading-normal">
            아래의 정보를 입력해주세요.
          </div>
          <textarea
            className="mt-2 h-40 w-full rounded-lg border border-[#c4c4c4] px-4 flex "
            type="text"
            id="context"
            placeholder="내용을 입력해주세요."
            {...register('context', { required: '부제목을 작성해주세요.' })}
          />
        </form>
        <footer className="sticky bottom-0 flex w-full justify-center bg-white py-4">
          <Button
            type="primary"
            label={isLoading ? '생성 중...' : '문의하기'}
            onClick={handleSubmit(onSubmit)}
          />
        </footer>
      </div>
    </>
  );
}
