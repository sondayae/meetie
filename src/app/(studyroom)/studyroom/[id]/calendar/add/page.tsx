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

  return (
    <>
      <Header label="일정 추가" leftIcon useBorderBottom />

      <form className="m-4 flex flex-col">
        <Input<FormData>
          id="title"
          name="title"
          type="text"
          label="제목"
          register={register}
          errors={errors}
          rules={{ required: true }}
        />

        <Input<FormData>
          id="description"
          name="description"
          as="textarea"
          label="내용"
          register={register}
          errors={errors}
          rules={{ required: true }}
        />
        <div>
          <label
            className="mb-2 mt-5 block font-bold text-gray-700"
            htmlFor="eventDate"
          >
            날짜
            <Controller
              name="eventDate"
              control={control}
              defaultValue={addDays(new Date(), 1)}
              render={({ field }) => (
                <div className="tab mt-2 overflow-hidden rounded-lg border">
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

          <label
            className="mb-2 mt-5 block font-bold text-gray-700"
            htmlFor="startTime"
          >
            시간
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
                <div className="tab mt-2 overflow-hidden rounded-lg border">
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
        <div className="my-5">
          <label
            htmlFor="eventType"
            className="mb-2 block font-bold text-gray-700"
          >
            일정 유형
            <select
              {...register('eventType')}
              className="mt-2 w-full rounded border border-gray-300 px-3 py-2"
            >
              <option value="회의">회의</option>
              <option value="과제 제출">과제 제출</option>
            </select>
          </label>
        </div>

        <Button
          type="primary"
          onClick={handleSubmit(onSubmit)}
          label="일정 추가"
        />
      </form>
    </>
  );
}
