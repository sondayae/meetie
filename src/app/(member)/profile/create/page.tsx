'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { addProfile } from './actions';
import Chip from '@/components/html/Chip';

export default function Profile() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>(
    [],
  );
  const [selectedStudySpan, setSelectedStudySpan] = useState<string>('');

  const steps = ['job', 'purpose', 'personality', 'studySpan'];

  const jobs = ['개발자', '디자이너', '기획자'];
  const purposes = [
    '자기 개발',
    '툴 능력 향상',
    '해당 분야의 네트워킹 확장',
    '취미',
  ];
  const personalities = [
    '주도적인',
    '열정적인',
    '손이 빠른',
    '시간을 지키는',
    '꼼꼼한',
    '모험적인',
    '신중한',
    '커뮤니케이션에 능숙한',
    '논리적인',
    '파워 J',
    '분석적인',
    '동기부여가 필요한',
    '완벽주의',
  ];
  const studySpans = ['1개월 이내', '1개월~3개월', '3개월~6개월', '6개월 이상'];

  const handleJobClick = (job: string) => {
    setSelectedJob((prev) => (prev === job ? '' : job));
  };

  const handlePurposeClick = (purpose: string) => {
    setSelectedPurposes((prevPurposes) =>
      prevPurposes.includes(purpose)
        ? prevPurposes.filter((g) => g !== purpose)
        : [...prevPurposes, purpose],
    );
  };

  const handlePersonalityClick = (personality: string) => {
    setSelectedPersonalities((prevPersonalities) =>
      prevPersonalities.includes(personality)
        ? prevPersonalities.filter((i) => i !== personality)
        : [...prevPersonalities, personality],
    );
  };

  const handleStudySpanClick = (studySpan: string) => {
    setSelectedStudySpan((prev) => (prev === studySpan ? '' : studySpan));
  };

  const handleNextClick = async () => {
    const currentStepIndex = steps.indexOf(searchParams.get('step') as string);

    if (!selectedJob) {
      alert('직업은 필수 선택입니다');
      return;
    }

    if (currentStepIndex === -1) return;

    const nextStep = steps[currentStepIndex + 1];
    if (nextStep) {
      router.push(`/profile/create?step=${nextStep}`);
    } else {
      await addProfile(
        selectedJob,
        selectedPurposes,
        selectedPersonalities,
        selectedStudySpan,
        router,
      );
    }
  };

  const handlePreviousClick = () => {
    const currentStepIndex = steps.indexOf(searchParams.get('step') as string);

    if (currentStepIndex > 0) {
      const previousStep = steps[currentStepIndex - 1];
      router.push(`/profile/create?step=${previousStep}`);
    }
  };

  const handleSkipClick = async () => {
    if (searchParams.get('step') !== 'job') {
      await addProfile(
        selectedJob,
        selectedPurposes,
        selectedPersonalities,
        selectedStudySpan,
        router,
      );

      router.push('/profile/success');
    }
  };

  useEffect(() => {
    if (!searchParams.get('step')) {
      router.push('/profile/create?step=job');
    }
  }, [searchParams, router]);

  return (
    <>
      <h1>Profile</h1>
      {searchParams.get('step') !== 'job' && (
        <button onClick={handleSkipClick}>skip</button>
      )}

      {searchParams.get('step') === 'job' && (
        <div id="jobs">
          <h2>직업 선택</h2>
          {jobs.map((job) => (
            <Chip
              key={job}
              label={job}
              selected={selectedJob === job}
              onClick={() => handleJobClick(job)}
            />
          ))}
        </div>
      )}

      {searchParams.get('step') === 'purpose' && (
        <div id="purposes">
          <h2>목표 선택</h2>
          {purposes.map((purpose) => (
            <Chip
              key={purpose}
              label={purpose}
              selected={selectedPurposes.includes(purpose)}
              onClick={() => handlePurposeClick(purpose)}
            />
          ))}
        </div>
      )}

      {searchParams.get('step') === 'personality' && (
        <div id="personality">
          <h2>소개 선택</h2>
          {personalities.map((personality) => (
            <Chip
              key={personality}
              label={personality}
              selected={selectedPersonalities.includes(personality)}
              onClick={() => handlePersonalityClick(personality)}
            />
          ))}
        </div>
      )}

      {searchParams.get('step') === 'studySpan' && (
        <div id="studySpans">
          <h2>스터디 기간 선택</h2>
          {studySpans.map((studySpan) => (
            <Chip
              key={studySpan}
              label={studySpan}
              selected={selectedStudySpan === studySpan}
              onClick={() => handleStudySpanClick(studySpan)}
            />
          ))}
        </div>
      )}

      <button
        onClick={handlePreviousClick}
        disabled={searchParams.get('step') === 'job'}
      >
        이전
      </button>
      <button onClick={handleNextClick}>
        {searchParams.get('step') === 'studySpan' ? '프로필 추가' : '다음'}
      </button>
    </>
  );
}
