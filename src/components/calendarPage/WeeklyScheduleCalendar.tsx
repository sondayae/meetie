'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';

import { addDays, format, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';
import { getSchedule } from '@/apis/calendar';
import DatePickerCustomInput from '@/components/calendarPage/DatePickerCustomInput';
import { ScheduleEvent } from '@/types/calendar';

interface CalendarProps {
  initialSchedule: ScheduleEvent[];
  studyRoomId: number;
}

export default function WeeklyScheduleCalendar({
  initialSchedule,
  studyRoomId,
}: CalendarProps) {
  const today = new Date();
  const initialWeekDates = Array.from({ length: 7 }, (_, i) =>
    addDays(today, i),
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [currentWeekDates, setCurrentWeekDates] =
    useState<Date[]>(initialWeekDates);
  const [scheduleForSelectedDate, setScheduleForSelectedDate] = useState<
    ScheduleEvent[] | null
  >(initialSchedule);

  const updateDateRange = async (date: Date | null) => {
    const data = await getSchedule(date!, studyRoomId);
    setSelectedDate(date);
    const range = date
      ? Array.from({ length: 7 }, (_, i) => addDays(date, i))
      : [];

    setCurrentWeekDates(range);
    setScheduleForSelectedDate(data);
  };

  const fetchScheduleForDate = async (date: Date) => {
    const data = await getSchedule(date, studyRoomId);
    setSelectedDate(date);
    setScheduleForSelectedDate(data);
  };

  return (
    <div className="border-t bg-muted px-4 py-6">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => updateDateRange(date)}
        customInput={<DatePickerCustomInput />}
        dateFormat="MM"
        locale={ko}
        wrapperClassName="w-full"
        withPortal
        minDate={new Date()}
        dateFormatCalendar={'yyyy년 MMMM'}
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
      />
      {currentWeekDates.length > 0 && (
        <div className="my-6 flex items-center justify-between">
          {currentWeekDates.map((date) => (
            <button
              key={date.toDateString()}
              className="flex flex-col items-center gap-2"
              type="button"
              onClick={() => fetchScheduleForDate(date)}
            >
              <span
                className={`text-sm ${selectedDate && isSameDay(selectedDate, date) ? 'text-primary' : 'text-[#000417]'}`}
              >
                {format(date, 'EEE', { locale: ko })}
              </span>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border bg-muted text-sm font-bold ${selectedDate && isSameDay(selectedDate, date) ? 'border-primary bg-accent text-primary' : ''}`}
              >
                {format(date, 'dd')}
              </div>
            </button>
          ))}
        </div>
      )}
      {scheduleForSelectedDate && (
        <div className="flex flex-col gap-4">
          {scheduleForSelectedDate?.map((schedule) => (
            <div
              key={schedule.id}
              className="relative mx-4 rounded bg-[#3f3fff1f] px-2 after:absolute after:left-0 after:top-0 after:h-full after:w-0.5 after:rounded-[32px] after:bg-[#7876E3] after:content-['']"
            >
              {schedule.event_type}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
