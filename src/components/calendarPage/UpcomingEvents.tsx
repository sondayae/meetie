import { format, parse } from 'date-fns';
import { ko } from 'date-fns/locale';

import { ScheduleEvent } from '@/types/calendar';

interface UpcomingScheduleProps {
  upcomingSchedule: ScheduleEvent[];
}

export default function UpcomingEvents({
  upcomingSchedule,
}: UpcomingScheduleProps) {
  return (
    <div className="mx-4 flex flex-col gap-3">
      {upcomingSchedule.length > 0 ? (
        upcomingSchedule?.map((schedule) => (
          <div
            key={schedule.id}
            className="bg-light-gray flex items-center gap-3 rounded-lg border px-4 py-3"
          >
            <div className="text-dark-gray relative flex-1 text-sm font-medium after:absolute after:right-0 after:top-0 after:h-full after:w-0.5 after:rounded-lg after:bg-[#7876E3] after:content-['']">
              {format(
                parse(schedule.start_time, 'HH:mm:ss', new Date()),
                'a h:mm',
              )}
            </div>
            <div className="flex flex-[4] flex-col">
              <div className="text-dark-gray text-sm font-bold">
                {schedule.event_type}
              </div>
              <div className="text-xs text-muted-foreground">
                {format(
                  parse(
                    `${schedule.event_date}T${schedule.start_time}`,
                    `yyyy-MM-dd'T'HH:mm:ss`,
                    new Date(),
                  ),
                  'M월 d일 a h:mm ',
                  { locale: ko },
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="mx-4 py-5 text-center text-sm text-muted-foreground">
          다가오는 일정이 없습니다.
        </div>
      )}
    </div>
  );
}
