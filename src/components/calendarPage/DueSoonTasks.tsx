import Link from 'next/link';

import RemainingTime from './RemainingTime';
import Button from '../common/Button';

type Thandin = {
  id: number;
  text: string;
  user_id: string; // UUID 형식의 문자열
  study_id: number;
  created_at: string; // ISO 8601 형식의 날짜 문자열
  homework_id: number;
  study: { recruitNum: number }; // recruitNum: 모집된 팀원 수
};

type Task = {
  id: number;
  created_at: string; // ISO 8601 형식의 날짜 문자열
  studyId: number;
  title: string;
  startDate: string; // ISO 8601 형식의 날짜 문자열
  endDate: string; // ISO 8601 형식의 날짜 문자열
  subtitle: string;
  study_id: number;
  handin: Thandin[];
};

interface DueSoonTasksProps {
  dueSoonSchedule: Task[];
}

export default function DueSoonTasks({ dueSoonSchedule }: DueSoonTasksProps) {
  const now = new Date();

  // 마감 임박 과제 필터링
  // const filteredTasks = dueSoonSchedule.filter((task) => {
  //   const endDate = new Date(task.endDate);
  //   return (
  //     endDate > now && endDate.getTime() - now.getTime() <= 24 * 60 * 60 * 1000
  //   );
  // });
  const filteredTasks = Array.isArray(dueSoonSchedule)
    ? dueSoonSchedule.filter((task) => {
        const endDate = new Date(task.endDate);
        return (
          endDate > now &&
          endDate.getTime() - now.getTime() <= 24 * 60 * 60 * 1000
        );
      })
    : []; // 배열이 아닌 경우 빈 배열을 반환

  return (
    <>
      <div className="mx-4 mb-3 mt-14 flex items-center justify-between">
        <div className="text-dark-gray text-lg font-bold">
          🚨 마감 직전 과제{' '}
          <span className="font-semibold text-[#E12C78]">
            {filteredTasks.length}
          </span>
        </div>
        {filteredTasks.length > 0 && (
          <RemainingTime endDate={filteredTasks[0].endDate} />
        )}
      </div>
      <div className="flex flex-col gap-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            // 과제 완료 퍼센트 계산 (모집된 팀원의 수 대비 제출된 팀원의 수)
            const recruitNum =
              task.handin.length > 0 ? task.handin[0].study.recruitNum : 1; // recruitNum이 없는 경우 1로 설정하여 오류 방지
            const completedPercent = Math.floor(
              (task.handin.length / recruitNum) * 100,
            );

            return (
              <div
                key={task.id}
                className="mx-4 flex flex-col gap-5 rounded-lg border px-4 py-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-xs font-medium text-muted-foreground">
                      <span className="text-[#4C4CC7]">
                        {task.handin.length}명의 팀원
                      </span>
                      이 수행했어요👍
                    </p>
                  </div>
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{
                      background: `conic-gradient(#6224FD calc(${completedPercent} * 1%), #EDF1FF 0)`,
                    }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-center text-sm font-bold text-primary">
                      {completedPercent}%
                    </div>
                  </div>
                </div>
                <Link href={`/studyroom/${task.study_id}/handin/add`}>
                  <Button type="primary" label="인증하기" />
                </Link>
              </div>
            );
          })
        ) : (
          <div className="mx-4 py-5 text-center text-sm text-muted-foreground">
            마감 직전 과제가 없습니다.
          </div>
        )}
      </div>
    </>
  );
}
