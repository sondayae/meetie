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

      const { title, subtitle } = data;

      const { error } = await supabase.from('homework').insert([
        {
          title,
          subtitle,
          startDate,
          endDate,
          study_id: pathID, // studyroomID
        },
      ]);

      if (error) throw error;

      router.push(`../${pathID}/feedback`);
    } catch (error) {
      console.error('Error during form submission:', error);
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  return (
    <>
      <div className="h-full min-h-screen w-full max-w-[600px] items-center">
        <Header
          label="과제 만들기"
          leftIcon
          rightIcon
          sticky={true}
          bgColor={'bg-white'}
        />
        <div className={'flex min-h-dvh px-4'}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 h-full flex-1"
          >
            <div className="text-left text-base font-semibold leading-normal">
              과제 제목
            </div>
            <input
              className="mt-2 h-12 w-full rounded-lg border border-[#c4c4c4] px-4"
              type="text"
              id="title"
              placeholder="과제 제목을 작성해주세요."
              {...register('title', { required: '제목을 작성해주세요.' })}
            />
            <div className="mt-8 text-left text-base font-semibold leading-normal">
              과제 부제목
            </div>
            <input
              className="mt-2 h-12 w-full rounded-lg border border-[#c4c4c4] px-4"
              type="text"
              id="subtitle"
              placeholder="과제 부제목을 작성해주세요."
              {...register('subtitle', { required: '부제목을 작성해주세요.' })}
            />
            <div className="mt-8 flex justify-between">
              <div className="w-1/2">
                <div className="text-base font-semibold leading-normal text-black">
                  시작일
                </div>
                <DatePicker
                  withPortal
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="시작일을 선택해주세요."
                  dateFormat="yyyy-MM-dd"
                  locale={ko}
                />
              </div>

              <div className="ml-4 w-1/2">
                <div className="text-base font-semibold leading-normal text-black">
                  종료일
                </div>
                <DatePicker
                  withPortal
                  className="mt-2 w-full rounded-lg border border-gray-300 p-3 transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  placeholderText="종료일을 선택해주세요."
                  dateFormat="yyyy-MM-dd"
                  locale={ko}
                />
              </div>
            </div>
          </form>
        </div>
        <footer className="sticky bottom-0 flex w-full justify-center bg-white p-4">
          <Button
            type="primary"
            label={isLoading ? '생성 중...' : '과제 만들기'} // 로딩 상태에 따라 버튼 텍스트 변경
            onClick={handleSubmit(onSubmit)}
          />
        </footer>
      </div>
    </>
  );
}
