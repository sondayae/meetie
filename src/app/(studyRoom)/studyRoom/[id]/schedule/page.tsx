import { getSchedule, getUpcomingSchedule } from '@/apis/calendar';
import Calendar from '@/components/schedulePage/Calendar';
import UpcomingSchedule from '@/components/schedulePage/UpcomingSchedule';

export default async function Schedule({ params }: { params: { id: number } }) {
  const schedule = await getSchedule(new Date(), params.id);
  const upcomingSchedule = await getUpcomingSchedule(params.id);
  // const [dueSoonTasks, setDueSoonTasks] = useState<ScheduleEvent[] | null>(
  //   null,
  // ); // 추가: 마감 직전 과제 상태 추가
  // const [timeRemaining, setTimeRemaining] = useState<number | null>(null); // 추가: 남은 시간 상태

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // 추가: 마감 직전 과제 필터링 로직
  //     const now = new Date();
  //     const filteredDueSoonTasks: ScheduleEvent[] | null = data?.filter(
  //       (event: ScheduleEvent) => {
  //         const eventDate = new Date(`${event.event_date}T${event.start_time}`);
  //         const hoursLeft = differenceInHours(eventDate, now);
  //         return hoursLeft <= 24 && hoursLeft > 0; // 24시간 이내의 과제만 필터링
  //       },
  //     );
  //     setDueSoonTasks(filteredDueSoonTasks);

  //     // 추가: 첫 번째 마감 과제 시간에 대한 타이머 시작
  //     if (filteredDueSoonTasks && filteredDueSoonTasks.length > 0) {
  //       const firstTaskDeadline = new Date(
  //         `${filteredDueSoonTasks[0].event_date}T${
  //           filteredDueSoonTasks[0].start_time
  //         }`,
  //       );
  //       const secondsLeft = differenceInSeconds(firstTaskDeadline, now);
  //       setTimeRemaining(secondsLeft);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   // 타이머 설정 (매 초마다 남은 시간을 업데이트)
  //   const intervalId = setInterval(() => {
  //     setTimeRemaining((prevTime) =>
  //       prevTime !== null && prevTime > 0 ? prevTime - 1 : 0,
  //     );
  //   }, 1000);

  //   return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 정리
  // }, []);

  // const formatTime = (seconds: number) => {
  //   const hours = Math.floor(seconds / 3600);
  //   const minutes = Math.floor((seconds % 3600) / 60);
  //   const secs = seconds % 60;
  //   return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  // };
  return (
    <div className="mb-28">
      <div className="px-4 pb-5 pt-10">
        <p className="text-lg font-bold">🤙 팀원과의 약속</p>
        <span className="text-sm text-muted-foreground">
          #이번 주의 과제와 회의 시간을 확인해보세요
        </span>
      </div>

      <Calendar initialSchedule={schedule} studyRoomId={params.id} />

      <div className="px-4 pb-5 pt-10">
        <p className="text-lg font-bold">✍ 다가오는 일정</p>
        <span className="text-sm text-muted-foreground">
          #이번 주의 과제와 회의 시간을 확인해보세요
        </span>
      </div>

      <UpcomingSchedule upcomingSchedule={upcomingSchedule} />
    </div>
  );
}
