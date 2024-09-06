import { Study } from '@/types/study';
import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { UseFormSetValue } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

type CalendarProps = {
  isEditMode: boolean;
  prevStartDate: Date;
  prevEndDate: Date;
  setValue: UseFormSetValue<Study>;
  getValues: any;
};

export default function Calendar({
  isEditMode,
  prevStartDate,
  prevEndDate,
  setValue,
  getValues,
}: CalendarProps) {
  // 캘린더
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(),
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  ]);

  useEffect(() => {
    const newStartDate = new Date(prevStartDate);
    const newEndDate = new Date(prevEndDate);
    isEditMode && setDateRange([newStartDate, newEndDate]);
    setValue('startDate', prevStartDate, { shouldDirty: true });
    setValue('endDate', prevEndDate, { shouldDirty: true });

    setStart(
      newStartDate?.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short',
      }),
    );
    setEnd(
      newEndDate?.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short',
      }),
    );
  }, [isEditMode]);

  const [startDate, endDate] = dateRange;

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const datePickerRef = useRef(null);

  const handleDateChange = (dates: [Date, Date]) => {
    // console.log('dates', dates);
    const [newStartDate, newEndDate] = dates;

    setDateRange([newStartDate, newEndDate]);
    setValue('startDate', newStartDate, { shouldDirty: true });
    setValue('endDate', newEndDate, { shouldDirty: true });

    // value를 split하여 처리
    const formattedValue = `${newStartDate?.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
    })} - ${newEndDate?.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'short',
    })}`;
    const [start, end] = formattedValue.split(' - ');
    setStart(start);
    setEnd(end);
  };

  return (
    <div className="flex flex-col">
      <div className="w-full">
        {/* 캘린더 */}
        <DatePicker
          ref={datePickerRef}
          locale={ko}
          dateFormat={'YYYY.MM.dd (eee)'}
          selectsRange
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          closeOnScroll={true}
          onChange={(dates) => handleDateChange(dates as [Date, Date])}
          withPortal
          placeholderText="시작일, 종료일을 선택하세요"
          className="h-0 opacity-0"
          calendarClassName="rounded-lg border border-gray-300 shadow-lg *:!bg-white !font-['Pretendard'] [&:nth-child(4)]:!bg-primary 
          
          [&>*:last-child>:first-child]:!bg-white
          [&>*:last-child>:first-child]:!pt-4
          [&>*:last-child>:first-child]:!border-b-[#e2e2e2]
          [&>*:last-child>:first-child>*]:!text-base
          [&>*:last-child>:first-child>*]:!font-normal


          [&>button]:!font-normal
           [&>button>*:before]:!border-t-2  
           [&>button>*:before]:!border-r-2
           [&>button>*:before]:!w-4 
           [&>button>*:before]:!h-4
           
           [&>button:first-child]:!left-[16px] 
           [&>button]:!top-[10px]
           [&>button:last-of-type]:!right-[16px] 
           [&>+button:first-of-type +button]:!left-[10px]
           [&>:last-child>div:last-child>div>div.react-datepicker__day--in-selecting-range]:!bg-light-gray
           "
          // header - [&>*:nth-child(4)>:first-child]

          dayClassName={(date: Date) => {
            let classes = '';

            if (date > startDate && date < endDate) {
              classes +=
                ' !bg-light-gray !text-dark-gray !rounded-full  hover:!bg-middle-gray focus:!bg-middle-gray ';
            }

            if (
              `${date.getFullYear()}${date.getMonth()}${date.getDate()}` ===
              `${startDate.getFullYear()}${startDate.getMonth()}${startDate.getDate()}`
            ) {
              classes = ' !bg-primary !rounded-full';
            }
            if (
              `${date.getFullYear()}${date.getMonth()}${date.getDate()}` ===
              `${endDate?.getFullYear()}${endDate?.getMonth()}${endDate?.getDate()}`
            ) {
              classes = ' !bg-primary !rounded-full';
            }

            return classes;
          }}
          weekDayClassName={(date: Date) => {
            return date ? '!text-[#777] text-sm' : '';
          }}
        />
        {/* 캘린더 선택 결과 표시 */}
        <div
          className="flex items-center justify-between gap-3"
          onClick={() => {
            if (datePickerRef.current) {
              (datePickerRef.current as any).setFocus(true);
            }
          }}
        >
          {/* 시작일 */}
          <div className="w-full">
            <label
              className="mb-[10px] inline-block font-semibold [&+div]:h-0"
              htmlFor="startDate"
            >
              시작일
            </label>
            <p className="min-h-[50px] w-full rounded-lg border border-[#c4c4c4] px-4 py-3">
              {start}
            </p>
          </div>
          {/* 종료일 */}
          <div className="w-full">
            <label
              className="mb-[10px] inline-block font-semibold [&+div]:h-0"
              htmlFor="endDate"
            >
              종료일
            </label>
            <p className="min-h-[50px] w-full rounded-lg border border-[#c4c4c4] px-4 py-3">
              {end}
            </p>
          </div>
        </div>
        {/* 안내문구 */}
        <p className="mb-[34px] mt-[10px] text-sm text-sub-purple">
          스터디 시작일이 모집 마감일로 설정돼요
        </p>
      </div>
    </div>
  );
}
