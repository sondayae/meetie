'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { useParams, useRouter } from 'next/navigation';

import Button from '@/components/common/Button';
import Input from '@/components/form/Input';
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
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      eventType: 'meeting',
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
        event_date: formData.eventDate, // 날짜
        start_time: formData.startTime, // 시간
        event_type: formData.eventType, // 일정 분류
        created_by: user?.id, // 작성자 ID
      },
    ]);
    if (error) {
      alert('예상치 못한 오류');
    }
    router.replace(`/studyRoom/${params.id}/schedule`);
  };

  return (
    <form>
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
        rules={{}}
      />
      <div className="flex gap-2">
        <Input<FormData>
          id="eventDate"
          name="eventDate"
          type="date"
          label="날짜"
          register={register}
          errors={errors}
          rules={{ required: true }}
        />
        <Input<FormData>
          id="startTime"
          name="startTime"
          type="time"
          label="시간"
          register={register}
          errors={errors}
          rules={{ required: true }}
        />
      </div>
      <label htmlFor="eventType" className="mb-2 block font-bold text-gray-700">
        <select
          {...register('eventType')}
          className="w-full rounded border border-gray-300 px-3 py-2"
        >
          <option value="meeting">회의</option>
          <option value="assignment">과제 제출</option>
        </select>
      </label>
      <Button
        type="primary"
        onClick={handleSubmit(onSubmit)}
        label="일정 추가"
      />
    </form>
  );
}
