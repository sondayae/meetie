import { getFeedbacks } from '@/actions/studyroom/feedbackActions';
import { getSchedule } from '@/apis/calendar';
import WeeklyScheduleCalendar from '@/components/calendarPage/WeeklyScheduleCalendar';
import Navigator from '@/components/common/Navigator';
import NoticeBox from '@/components/common/NoticeBox';
import AddFeedbackBtn from '@/components/handin/AddFeedbackBtn';
import Feed from '@/components/studyRoom/feedback/Feed';
import StudyroomHeader from '@/components/studyRoom/Header';
import { dateWithDayFormatter } from '@/utils/common/dateFormatter';

export default async function FeedbackListPage({
  params,
}: {
  params: { id: string };
}) {
  const schedule = await getSchedule(new Date(), Number(params.id));
  const feedbacks: Feedback[] = await getFeedbacks(params.id);

  return (
    <>
      <StudyroomHeader />
      <div className="h-screen flex-grow overflow-y-scroll bg-[#FAFAFA] px-4 scrollbar-hide">
        <div className="py-7">
          <div className="mb-[20px] flex flex-col gap-1">
            <h1 className="text-lg font-bold">📚 과제 일정</h1>
            <p className="text-sm text-muted-foreground">
              주차별 과제 현황을 확인하고 소통해요.
            </p>
          </div>
          <NoticeBox />
        </div>
        <div>
          <WeeklyScheduleCalendar
            initialSchedule={schedule}
            studyRoomId={Number(params.id)}
          />
        </div>
        <div className="rounded-t-2xl bg-white drop-shadow-[0_-1px_5px_rgba(0,0,0,0.06)]">
          <div className="flex flex-col gap-1 border-b px-7 pb-6 pt-9">
            <h1 className="text-lg font-semibold">
              ✏️ {dateWithDayFormatter(new Date())}
            </h1>
            <p className="text-sm text-muted-foreground">
              과제를 완료한 팀원들을 확인해 보세요.
            </p>
          </div>
          <div>
            {feedbacks.map((feedback: Feedback) => (
              <Feed key={feedback.id} feedback={feedback} />
            ))}
          </div>
          <AddFeedbackBtn />
        </div>
      </div>
      <Navigator />
    </>
  );
}
