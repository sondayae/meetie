import Link from 'next/link';

import { getDueSoon, getSchedule, getUpcomingSchedule } from '@/apis/calendar';
import DueSoonTasks from '@/components/calendarPage/DueSoonTasks';
import UpcomingEvents from '@/components/calendarPage/UpcomingEvents';
import WeeklyScheduleCalendar from '@/components/calendarPage/WeeklyScheduleCalendar';
import Navigator from '@/components/common/Navigator';
import Header from '@/components/handin/Header';
import Plus from '@/components/icons/Header/Plus';
import TabMenu from '@/components/studyRoom/TabMenu';
import StudyroomHeader from '@/components/studyRoom/Header';

export default async function Calendar({ params }: { params: { id: number } }) {
  const schedule = await getSchedule(new Date(), params.id);
  const upcomingSchedule = await getUpcomingSchedule(params.id);
  const dueSoon = await getDueSoon(params.id);

  return (
    <>
      {/* 헤더 영역 */}
      <StudyroomHeader studyId={params.id} />
      {/* 콘텐츠 영역 */}
      <div className="mb-10 flex-1">
        <div className="flex flex-col gap-1 px-4 py-7">
          <p className="text-lg font-bold">🤙 팀원과의 약속</p>
          <span className="text-sm text-muted-foreground">
            #이번 주의 과제와 회의 시간을 확인해보세요
          </span>
        </div>
        <WeeklyScheduleCalendar
          initialSchedule={schedule}
          studyRoomId={params.id}
        />
        <div className="flex flex-col gap-6 px-4 pb-5 pt-9">
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">✍ 다가오는 일정</p>
            <span className="text-sm text-muted-foreground">
              #이번 주의 과제와 회의 시간을 확인해보세요
            </span>
          </div>
          <UpcomingEvents upcomingSchedule={upcomingSchedule} />
        </div>
        <DueSoonTasks dueSoonSchedule={dueSoon} />
      </div>
      <Navigator />
    </>
  );
}
