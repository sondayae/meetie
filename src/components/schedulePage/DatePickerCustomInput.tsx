import { forwardRef } from 'react';

import CalendarIcon from '@/components/icons/CalendarIcon';

interface DatePickerCustomInputProps {
  onClick?: () => void;
  value?: string;
}

export default forwardRef<HTMLButtonElement, DatePickerCustomInputProps>(
  function DatePickerCustomInput({ onClick, value }, ref) {
    return (
      <div className="flex items-center justify-between px-4">
        <span className="font-semibold text-dark-gray">{value}월</span>
        <button type="button" aria-label="달력" onClick={onClick} ref={ref}>
          <CalendarIcon />
        </button>
      </div>
    );
  },
);
