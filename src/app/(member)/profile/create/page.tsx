"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Profile() {
  const supabase = createClient();
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedIntros, setSelectedIntros] = useState<string[]>([]);

  const jobs = ["개발자", "디자이너", "기획자"];
  const goals = [
    "자기 개발",
    "툴 능력 향상",
    "해당 분야의 네트워킹 확장",
    "취미",
  ];
  const introductions = [
    "주도적인",
    "열정적인",
    "손이 빠른",
    "시간을 지키는",
    "꼼꼼한",
    "모험적인",
    "신중한",
    "커뮤니케이션에 능숙한",
    "논리적인",
    "파워 J",
    "분석적인",
    "동기부여가 필요한",
    "완벽주의",
  ];

  const handleJobClick = (job: string) => {
    setSelectedJob((prev) => (prev === job ? "" : job));
  };

  const handleGoalClick = (goal: string) => {
    setSelectedGoals((prevGoals) =>
      prevGoals.includes(goal)
        ? prevGoals.filter((g) => g !== goal)
        : [...prevGoals, goal],
    );
  };

  const handleIntroClick = (introduction: string) => {
    setSelectedIntros((prevIntros) =>
      prevIntros.includes(introduction)
        ? prevIntros.filter((i) => i !== introduction)
        : [...prevIntros, introduction],
    );
  };

  const handleNextClick = () => {
    if (!selectedJob) {
      alert("직업은 필수 선택입니다");
    }
  };

  const addProfile = async () => {
    try {
      const { data, error } = await supabase.from("profile").insert({
        job: selectedJob,
        goal: selectedGoals,
        introduction: selectedIntros,
      });

      if (data) {
        console.log("Profile added:", data);
      }

      if (error) throw error;
    } catch (error) {
      console.error("Error adding profile:", error);
      alert("프로필을 추가하는 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <h1>Profile</h1>
      <div id="jobs">
        <h2>직업 선택</h2>
        {jobs.map((job) => (
          <div
            key={job}
            onClick={() => handleJobClick(job)}
            className={`cursor-pointer rounded-lg py-[10.5px] text-center transition duration-300 ${
              selectedJob === job
                ? "border border-[#6224FD] bg-[#EFE9FF]"
                : "border border-[#D9D9D9] bg-[#FFFFFF]"
            } inline-flex h-10 items-center justify-center pl-[40px] pr-[12px]`}
          >
            {job}
          </div>
        ))}
      </div>
      <button onClick={handleNextClick}>다음</button>

      <div id="goals">
        <h2>목표 선택</h2>
        {goals.map((goal) => (
          <div
            key={goal}
            onClick={() => handleGoalClick(goal)}
            className={`cursor-pointer rounded-lg py-1.5 text-center transition duration-300 ${
              selectedGoals.includes(goal)
                ? "border border-[#6224FD] bg-[#EFE9FF]"
                : "border border-[#D9D9D9] bg-[#FFFFFF]"
            } inline-flex items-center justify-center px-3`}
          >
            {goal}
          </div>
        ))}
      </div>
      <button>다음</button>

      <div id="introduction">
        <h2>소개 선택</h2>
        {introductions.map((introduction) => (
          <div
            key={introduction}
            onClick={() => handleIntroClick(introduction)}
            className={`cursor-pointer rounded-lg py-1.5 text-center transition duration-300 ${
              selectedIntros.includes(introduction)
                ? "border border-[#6224FD] bg-[#EFE9FF]"
                : "border border-[#D9D9D9] bg-[#FFFFFF]"
            } inline-flex items-center justify-center px-3`}
          >
            {introduction}
          </div>
        ))}
      </div>

      <button onClick={addProfile} className="submit-btn">
        프로필 추가
      </button>
    </>
  );
}
