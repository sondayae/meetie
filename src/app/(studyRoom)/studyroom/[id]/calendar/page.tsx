import { getDueSoon, getSchedule, getUpcomingSchedule } from '@/apis/calendar';
import DueSoonTasks from '@/components/calendarPage/DueSoonTasks';
import UpcomingEvents from '@/components/calendarPage/UpcomingEvents';
import WeeklyScheduleCalendar from '@/components/calendarPage/WeeklyScheduleCalendar';
import TabMenu from '@/components/studyRoom/TabMenu';

export default async function Calendar({ params }: { params: { id: number } }) {
  const schedule = await getSchedule(new Date(), params.id);
  const upcomingSchedule = await getUpcomingSchedule(params.id);
  const dueSoon = await getDueSoon(params.id);

  return (
    <>
      <TabMenu />
      <div className="mb-28">
        <div className="px-4 pb-5 pt-10">
          <p className="text-lg font-bold">🤙 팀원과의 약속</p>
          <span className="text-sm text-muted-foreground">
            #이번 주의 과제와 회의 시간을 확인해보세요
          </span>
        </div>

        <WeeklyScheduleCalendar
          initialSchedule={schedule}
          studyRoomId={params.id}
        />

        <div className="px-4 pb-5 pt-10">
          <p className="text-lg font-bold">✍ 다가오는 일정</p>
          <span className="text-sm text-muted-foreground">
            #이번 주의 과제와 회의 시간을 확인해보세요
          </span>
        </div>

        <UpcomingEvents upcomingSchedule={upcomingSchedule} />

        <DueSoonTasks dueSoonSchedule={dueSoon} />
      </div>
    </>
  );
}
