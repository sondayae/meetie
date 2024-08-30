'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Chip from '@/components/html/Chip';
import ProgressBar from '@/components/html/ProgressBar';
import { steps } from '@/lib/profileConstants';
import { createStepsConfig } from '@/lib/profileStepsConfig';

interface IProfileData {
  job: string;
  purposes: string[];
  personalities: string[];
  studySpan: string;
}
export default function Profile() {
  const router = useRouter();
  const [step, setStep] = useState<string>(steps[0]);
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>(
    [],
  );
  const [selectedStudySpan, setSelectedStudySpan] = useState<string>('');

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

  const addProfile = async ({
    job,
    purposes,
    personalities,
    studySpan,
  }: IProfileData) => {
    try {
      const response = await fetch('/api/profile/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job,
          purposes,
          personalities,
          studySpan,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '프로필 업데이트 중 오류 발생');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('프로필 추가 또는 업데이트 오류:', error);
    }
  };

  const handleNextClick = async () => {
    const currentStepIndex = steps.indexOf(step);

    if (!selectedJob) {
      alert('직업은 필수 선택입니다');
      return;
    }

    if (currentStepIndex === -1) return;

    const nextStep = steps[currentStepIndex + 1];
    if (nextStep) {
      setStep(nextStep);
    } else {
      await addProfile({
        job: selectedJob,
        purposes: selectedPurposes,
        personalities: selectedPersonalities,
        studySpan: selectedStudySpan,
      });
      router.push('/profile/success');
    }
  };

  const handlePreviousClick = () => {
    const currentStepIndex = steps.indexOf(step);

    if (currentStepIndex > 0) {
      const previousStep = steps[currentStepIndex - 1];
      setStep(previousStep);
    }
  };

  const handleSkipClick = async () => {
    if (step !== 'job') {
      await addProfile({
        job: selectedJob,
        purposes: selectedPurposes,
        personalities: selectedPersonalities,
        studySpan: selectedStudySpan,
      });

      router.push('/profile/success');
    }
  };

  const currentStepIndex = steps.indexOf(step);

  const stepsConfig = createStepsConfig(
    selectedJob,
    selectedPurposes,
    selectedPersonalities,
    selectedStudySpan,
    handleJobClick,
    handlePurposeClick,
    handlePersonalityClick,
    handleStudySpanClick,
  );

  const renderStep = stepsConfig[step];

  return (
    <>
      <div className="relative mb-20">
        <ProgressBar
          currentStepIndex={currentStepIndex}
          totalSteps={steps.length}
        />

        {step !== 'job' && (
          <button
            onClick={handleSkipClick}
            className="absolute right-0 top-0 mb-8 mr-4 mt-2 text-[#82829B]"
          >
            skip
          </button>
        )}
      </div>

      <div id={step} className="text-left">
        <div>
          <div className="mb-5 text-2xl font-semibold">
            {renderStep.title.split('\n').map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </div>
          <div className="mb-[60px] text-[14px]">{renderStep.description}</div>
        </div>

        <div className="mb-[138px] flex flex-col items-start gap-y-3">
          {renderStep.options.map((option) => (
            <Chip
              key={option}
              label={option}
              selected={
                Array.isArray(renderStep.selectedOptions)
                  ? renderStep.selectedOptions.includes(option)
                  : renderStep.selectedOptions === option
              }
              onClick={() => renderStep.handleClick(option)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-y-[13px]">
        <div className="text-xs text-middle-gray">
          내용은 다시 수정할 수 있어요!
        </div>
        <div className="flex w-full gap-x-5">
          <button
            onClick={handlePreviousClick}
            className={`flex-[2] cursor-pointer rounded-[8px] border border-middle-gray bg-white ${
              step === 'job' ? 'opacity-50' : ''
            } h-[49px] w-[124px]`}
          >
            이전
          </button>
          <button
            onClick={handleNextClick}
            className="h-[49px] w-[206px] flex-[3] cursor-pointer rounded-[8px] bg-main-purple text-white"
          >
            {step === 'studySpan' ? '프로필 추가' : '다음'}
          </button>
        </div>
      </div>
    </>
  );
}
