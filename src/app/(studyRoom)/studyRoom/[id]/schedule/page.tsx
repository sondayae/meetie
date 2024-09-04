'use client';

import { useState } from 'react';
import DatePicker from 'react-datepicker';

import { addDays, format, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';

import 'react-datepicker/dist/react-datepicker.css';
import DatePickerCustomInput from '@/components/schedulePage/DatePickerCustomInput';
import MainLayout from '@/components/studyRoom/MainLayout';

export default function Schedule() {
  const today = new Date();
  const initialRange = Array.from({ length: 7 }, (_, i) => addDays(today, i));

  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [dateRange, setDateRange] = useState<Date[]>(initialRange);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    const range = date
      ? Array.from({ length: 7 }, (_, i) => addDays(date, i))
      : [];

    setDateRange(range);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <MainLayout />
      <div className="px-4 pb-5 pt-10">
        <p className="text-lg font-bold">🤙 팀원과의 약속</p>
        <span className="text-sm text-gray-purple">
          #이번 주의 과제와 회의 시간을 확인해보세요
        </span>
      </div>

      <div className="border-t-2 bg-light-gray py-4">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => handleDateChange(date)}
          customInput={<DatePickerCustomInput />}
          dateFormat="MM"
          locale={ko}
          wrapperClassName="w-full"
          withPortal
          minDate={new Date()}
        />
        {dateRange.length > 0 && (
          <div className="mt-8 flex items-center justify-evenly">
            {dateRange.map((date) => (
              <button
                key={date.toDateString()}
                className="flex flex-col items-center gap-2"
                type="button"
                onClick={() => handleDateClick(date)}
              >
                <span
                  className={`text-sm ${selectedDate && isSameDay(selectedDate, date) ? 'text-main-purple' : 'text-[#000417]'}`}
                >
                  {format(date, 'EEE', { locale: ko })}
                </span>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border bg-light-gray text-sm font-bold ${selectedDate && isSameDay(selectedDate, date) ? 'border-main-purple' : ''}`}
                >
                  {format(date, 'dd')}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-4 pb-5 pt-10">
        <p className="text-lg font-bold">✍ 다가오는 일정</p>
        <span className="text-sm text-gray-purple">
          #이번 주의 과제와 회의 시간을 확인해보세요
        </span>
      </div>
    </div>
  );
}
