import { Study } from '@/types/study';
import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { UseFormSetValue } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '@/components/icons/CalendarIcon';

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
          dateFormatCalendar={'yyyy년 MMMM'}
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
          [&>*:last-child>:first-child]:!border-b-[#f1f1f1]
          [&>*:last-child>:first-child>*]:!text-base !rounded-lg
          [&>*:last-child>:first-child>*]:!font-normal


          [&>button]:!font-normal
           [&>button>*:before]:!border-t-2  
           [&>button>*:before]:!border-r-2
           [&>button>*:before]:!w-4 
           [&>button>*:before]:!h-4
           
           [&>button]:!top-[10px]
           [&>button:last-of-type]:!right-[16px] 
         
           "
          // header - [&>*:nth-child(4)>:first-child]

          dayClassName={(date: Date) => {
            let classes = '';

            // 토요일인 경우
            if (date.getDay() === 6) {
              classes += '!text-blue-500';
            }

            // 일요일인 경우
            if (date.getDay() === 0) {
              classes += '!text-red-500 ';
            }

            // 선택된 날짜인 경우
            if (date > startDate && date < endDate) {
              classes +=
                ' !bg-accent !text-black !rounded-full hover:!bg-[#E3E3E3] focus:!bg-border ';
            }

            // 시작일, 종료일인 경우
            if (
              `${date.getFullYear()}${date.getMonth()}${date.getDate()}` ===
              `${startDate.getFullYear()}${startDate.getMonth()}${startDate.getDate()}`
            ) {
              classes = ' !bg-primary !rounded-full';
            }
            // 종료일인 경우
            if (
              `${date.getFullYear()}${date.getMonth()}${date.getDate()}` ===
              `${endDate?.getFullYear()}${endDate?.getMonth()}${endDate?.getDate()}`
            ) {
              classes = ' !bg-primary !rounded-full';
            }

            return classes;
          }}
          // 요일 스타일
          weekDayClassName={(date: Date) =>
            date && date.getDay() === 6
              ? '!text-blue-500 text-sm'
              : date && date.getDay() === 0
                ? '!text-red-500 text-sm'
                : '!text-[#777] text-sm'
          }
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
          <div className="relative w-full cursor-pointer">
            <label
              className="mb-[10px] inline-block font-semibold [&+div]:h-0"
              htmlFor="startDate"
            >
              시작일
            </label>
            <p className="min-h-[50px] w-full rounded-lg border border-[#c4c4c4] py-3 pl-4 pr-10">
              {start}
            </p>
            <CalendarIcon className="absolute bottom-[-2px] right-4 h-7 w-7 -translate-y-1/2" />
          </div>
          {/* 종료일 */}
          <div className="relative w-full cursor-pointer">
            <label
              className="mb-[10px] inline-block font-semibold [&+div]:h-0"
              htmlFor="endDate"
            >
              종료일
            </label>
            <p className="min-h-[50px] w-full rounded-lg border border-[#c4c4c4] py-3 pl-4 pr-10">
              {end === 'undefined' ? '' : end}
            </p>
            <CalendarIcon className="absolute bottom-[-2px] right-4 h-7 w-7 -translate-y-1/2" />
          </div>
        </div>
        {/* 안내문구 */}
        <p className="mb-[34px] mt-[10px] text-sm text-secondary">
          스터디 시작일이 모집 마감일로 설정돼요
        </p>
      </div>
    </div>
  );
}
