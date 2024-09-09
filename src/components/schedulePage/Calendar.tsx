'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';

import { addDays, format, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';
import { getSchedule } from '@/apis/calendar';
import DatePickerCustomInput from '@/components/schedulePage/DatePickerCustomInput';
import { ScheduleEvent } from '@/types/calendar';

interface CalendarProps {
  initialSchedule: ScheduleEvent[];
}

export default function Calendar({ initialSchedule }: CalendarProps) {
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

  const updateDateRange = (date: Date | null) => {
    setSelectedDate(date);
    const range = date
      ? Array.from({ length: 7 }, (_, i) => addDays(date, i))
      : [];

    setCurrentWeekDates(range);
  };

  const fetchScheduleForDate = async (date: Date) => {
    const data = await getSchedule(date);
    setSelectedDate(date);
    setScheduleForSelectedDate(data);
  };

  return (
    <div className="border-t-2 bg-muted py-4">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => updateDateRange(date)}
        customInput={<DatePickerCustomInput />}
        dateFormat="MM"
        locale={ko}
        wrapperClassName="w-full"
        withPortal
        minDate={new Date()}
      />
      {currentWeekDates.length > 0 && (
        <div className="mt-8 flex items-center justify-evenly">
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
                className={`flex h-9 w-9 items-center justify-center rounded-full border bg-muted text-sm font-bold ${selectedDate && isSameDay(selectedDate, date) ? 'border-primary bg-accent' : ''}`}
              >
                {format(date, 'dd')}
              </div>
            </button>
          ))}
        </div>
      )}

      <div className="my-6 flex flex-col gap-4">
        {scheduleForSelectedDate?.map((schedule) => (
          <div
            key={schedule.id}
            className="relative mx-4 rounded bg-[#3f3fff1f] px-2 after:absolute after:left-0 after:top-0 after:h-full after:w-0.5 after:rounded-[32px] after:bg-[#7876E3] after:content-['']"
          >
            {schedule.event_type}
          </div>
        ))}
      </div>
    </div>
  );
}
