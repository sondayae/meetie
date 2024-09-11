import { forwardRef } from 'react';
import EventCalendarIcon from '../icons/EventCalendarIcon';


interface DatePickerCustomInputProps {
  onClick?: () => void;
  value?: string;
}

export default forwardRef<HTMLButtonElement, DatePickerCustomInputProps>(
  function DatePickerCustomInput({ onClick, value }, ref) {
    return (
      <div className="flex items-center justify-between">
        <span className="font-semibold text-dark-gray">{value}월</span>
        <button type="button" aria-label="달력" onClick={onClick} ref={ref}>
          <EventCalendarIcon />
        </button>
      </div>
    );
  },
);
