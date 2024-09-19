'use client';

import DatePicker from 'react-datepicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useParams, useRouter } from 'next/navigation';

import { addDays, format, set, startOfToday } from 'date-fns';
import { ko } from 'date-fns/locale';
import { AlarmClock, CalendarCheck } from 'lucide-react';

import 'react-datepicker/dist/react-datepicker.css';
import Button from '@/components/common/Button';
import Input from '@/components/form/Input';
import Header from '@/components/handin/Header';
import { useUser } from '@/stores/user/user';
import supabase from '@/utils/supabase/client';
import { useState } from 'react';
import CalendarBottomSheet from '@/components/study/write/CalendarBottomSheet';

interface FormData {
  title: string;
  description: string;
  eventDate: Date;
  startTime: Date;
  eventType: string;
}

export default function ScheduleAdd() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      eventType: '회의',
    },
  });
  const user = useUser((store) => store.user);
  const params = useParams();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    const { error } = await supabase.from('schedule').insert([
      {
        study_room_id: params.id, // 스터디룸 ID
        title: formData.title, // 제목
        description: formData.description, // 내용
        event_date: format(formData.eventDate, 'yyyy-MM-dd'), // 날짜
        start_time: format(formData.startTime, 'HH:mm:ss'), // 시간
        event_type: formData.eventType, // 일정 분류
        created_by: user?.id, // 작성자 ID
      },
    ]);
    if (error) {
      alert('예상치 못한 오류');
    }
    router.replace(`/studyroom/${params.id}/calendar`);
  };
  const [bottomSheet, setBottomSheet] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState<string>('회의');

  // 바텀 시트에서 아이템 선택
  const handleSelect = (item: string) => {
    setSelectedEventType(item);
    setValue('eventType', item);
    setBottomSheet(false);
  };

  // 바텀 시트 열기
  const openBottomSheet = () => {
    setBottomSheet(true);
  };

  // 바텀 시트 닫기
  const closeBottomSheet = () => {
    setBottomSheet(false);
  };

  return (
    <>
      <Header
        label="일정 만들기"
        leftIcon
        useBorderBottom
        rightIcon={<div></div>}
      />

      <form className="m-4 flex flex-1 flex-col">
        <div className={'flex-1'}>
          <Input<FormData>
            id="title"
            name="title"
            type="text"
            label="일정 제목"
            placeholder={'일정 제목을 입력해주세요'}
            register={register}
            errors={errors}
            rules={{ required: true }}
          />
          <div className={'mt-[32px]'}></div>
          <Input<FormData>
            id="description"
            name="description"
            as="textarea"
            label="일정 내용"
            placeholder={'일정 내용을 입력해주세요'}
            register={register}
            errors={errors}
            rules={{ required: true }}
          />
          <div>
            <label className="mt-8 block text-gray-700" htmlFor="eventDate">
              <span className="font-bold">날짜</span>
              <Controller
                name="eventDate"
                control={control}
                defaultValue={addDays(new Date(), 1)}
                render={({ field }) => (
                  <div className="tab mt-2 min-h-[50px] overflow-hidden rounded-lg border py-2 pl-2">
                    <DatePicker
                      showIcon
                      icon={<CalendarCheck />}
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="yyyy-MM-dd"
                      className="ml-2 w-full border-none focus:outline-none"
                      locale={ko}
                      wrapperClassName="w-full"
                      withPortal
                      minDate={addDays(new Date(), 1)}
                      ariaLabelledBy="eventDate"
                    />
                  </div>
                )}
              />
            </label>

            <label className="mt-8 block text-gray-700" htmlFor="startTime">
              <span className="font-bold">시간</span>
              <Controller
                name="startTime"
                control={control}
                defaultValue={set(startOfToday(), {
                  hours: 9,
                  minutes: 0,
                  seconds: 0,
                  milliseconds: 0,
                })}
                render={({ field }) => (
                  <div className="tab mt-2 min-h-[50px] overflow-hidden rounded-lg border py-2 pl-2">
                    <DatePicker
                      showIcon
                      icon={<AlarmClock />}
                      selected={field.value}
                      onChange={(date) => field.onChange(date)}
                      locale={ko}
                      showTimeSelect
                      className="ml-2 w-full border-none focus:outline-none"
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="a h:mm"
                      ariaLabelledBy="startTime"
                    />
                  </div>
                )}
              />
            </label>
          </div>
          {/* <div className="my-8">
            <label htmlFor="eventType" className="mb-2 block text-gray-700">
              <span className="font-bold">일정 유형</span>
              <select
                {...register('eventType')}
                className="mt-2 min-h-[50px] w-full rounded border border-gray-300 px-3 py-2"
              >
                <option value="회의">회의</option>
                <option value="과제 제출">과제 제출</option>
              </select>
            </label>
          </div>  */}

          <div className="my-8">
            <label htmlFor="eventType" className="mb-2 block text-gray-700">
              <span className="font-bold">일정 유형</span>
              <div
                className="mt-2 min-h-[50px] w-full cursor-pointer rounded-lg border border-gray-300 px-3 py-3"
                onClick={openBottomSheet}
              >
                {selectedEventType}
              </div>
            </label>
          </div>
          <CalendarBottomSheet
            title="일정 유형"
            data={['회의', '과제 제출']}
            bottomSheet={bottomSheet}
            onClick={closeBottomSheet}
            selectedItems={[selectedEventType]}
            setSelectedItems={(items) => handleSelect(items[0])}
            onSelect={handleSelect}
          />
        </div>
        <Button
          type="primary"
          onClick={handleSubmit(onSubmit)}
          label="일정 만들기"
        />
      </form>
    </>
  );
}
