"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";

const DUMMY = [
  {
    title: "웹 개발 프레임워크 비교",
    due_date: "2024-10-15",
    tags: ["웹개발", "프레임워크", "비교"],
    study_leader: {
      creation_date: "2024-08-14",
      creation_time: "14:45",
      profile_views: 950,
    },
    views: 420,
    study_topic: "주요 웹 개발 프레임워크(React, Vue, Angular) 비교 및 실습",
    study_goal:
      "다양한 웹 개발 프레임워크의 특징과 장단점을 이해하고, 각 프레임워크를 사용해 간단한 웹 애플리케이션을 개발해 보기",
    study_description:
      "React, Vue, Angular 등 주요 웹 개발 프레임워크를 비교하고, 각 프레임워크의 장단점을 실습을 통해 경험해보는 스터디입니다. 프레임워크의 기본적인 사용법과 실제 프로젝트를 통해 학습합니다.",
    available_slots: 10,
    study_period: {
      start_date: "2024-09-01",
      end_date: "2024-10-15",
    },
  },
];

const isLeader = true;
// const isLeader = false;

function Page() {
  const params = useParams();
  console.log(params);

  const postApply = async () => {
    try {
      const { data, error } = await supabase.from("study_apply").insert([
        // TODO: 유저 중복 요청 처리
        {
          studyId: 1,
          uesrId: "10669baa-7476-4f40-8bbf-37ba8765de74",
          status: false,
        },
      ]);
    } catch (error) {
      alert("예상치 못한 문제가 발생하였습니다. 다시 시도하여 주십시오.");
    }
  };

  return (
    <>
      {DUMMY.map((data) => (
        <div className="flex flex-col gap-8 p-4" key={data.title}>
          <header className="flex flex-col gap-2 border-b-2 border-[#F2F2F2] pb-4">
            <div className="mb-2 flex w-full items-center justify-between">
              <p className="text-[24px] font-bold">{data.title}</p>
              <span className="rounded-full border-[1px] border-[#8446FF] px-2 py-1 text-[14px] text-[#8446FF]">
                D-day
              </span>
            </div>
            <div className="mb-2">
              {data.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="mr-2 rounded-lg bg-[#f5f1ff] px-2 py-2 text-[14px] text-[#434343]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <img
                className="h-[38px] w-[38px] rounded-full"
                src="https://th.bing.com/th/id/OIG3.6Q6JSjGGulke2mGv6MPj?pid=ImgGn"
                alt="Profile"
              />
              <div className="flex w-full flex-col text-[#555555]">
                <p className="flex text-[13px] font-semibold">Study Leader</p>
                <div className="flex w-full justify-between">
                  <span className="text-[12px] text-[#82829B]">
                    작성일 {data.study_leader.creation_date} |{" "}
                    {data.study_leader.creation_time} | 조회수{" "}
                    {data.study_leader.profile_views}
                  </span>
                  <span className="items-end text-[11px] text-[#908794]">
                    VIEW {data.views}
                  </span>
                </div>
              </div>
            </div>
          </header>
          <main className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 text-[#434343]">
              <p className="font-semibold">스터디 주제</p>
              <p className="text-[15px]">{data.study_topic}</p>
            </div>
            <div className="flex flex-col gap-4 text-[#434343]">
              <p className="font-semibold">스터디 목표</p>
              <p className="text-[15px]">{data.study_goal}</p>
            </div>
            <div className="flex flex-col gap-4 text-[#434343]">
              <p className="font-semibold">스터디 소개</p>
              <p className="text-[15px]">{data.study_description}</p>
            </div>
            <div className="flex flex-col gap-4 text-[#434343]">
              <p className="font-semibold">스터디 인원</p>
              <p className="text-[15px]">
                {data.available_slots} slots available
              </p>
            </div>
            <div className="flex flex-col gap-4 text-[#434343]">
              <p className="font-semibold">스터디 기간</p>
              <p className="text-[15px]">
                {data.study_period.start_date} - {data.study_period.end_date}
              </p>
            </div>
          </main>
        </div>
      ))}
      <div className="fixed bottom-0 w-full">
        <div className="flex h-[#104px] w-full items-center justify-center gap-4 bg-white py-6">
          <div>
            <p>참여가능인원</p>
            <p>0명/4명</p>
          </div>
          {/* TODO
           스터디장 => 요청확인
           */}
          {/* <button type="button">아직 대기 인원이 없습니다</button> */}
          {isLeader && (
            <Link href={`${params.studyId}/studyrequest`}>
              <button type="button">대기 중인 요청 확인</button>
            </Link>
          )}

          {/* TODO
           스터디원 => 요청(상태)
           */}
          {!isLeader && (
            <button type="button" onClick={() => postApply()}>
              참가 요청
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
