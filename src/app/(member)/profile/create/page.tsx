'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { steps } from '@/lib/profileConstants';
import ProfileForm from '@/components/member/ProfileForm';
import ProgressBar from '@/components/html/ProgressBar';
import Button from '@/components/common/Button';
import { useUser } from '@/stores/user/user';
import { addProfile, saveImageUrl, uploadImage } from '@/utils/member/profile';
import StudySpanStep from '@/components/member/StudySpanStep';
import PersonalityStep from '@/components/member/PersonalityStep';
import PurposeStep from '@/components/member/PurposeStep';
import JobStep from '@/components/member/JobStep';

export default function Profile() {
  const router = useRouter();
  const [step, setStep] = useState<string>(steps[0]);
  const [nickname, setNickname] = useState<string>('');
  const [imageId, setImageId] = useState<number | null>(null);
  const [introduction, setIntroduction] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>([]);
  const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>(
    [],
  );
  const [selectedStudySpan, setSelectedStudySpan] = useState<string>('');

  const user = useUser();
  const userName = user.user?.user_metadata.name;

  const handleNextClick = async () => {
    if (step === 'initial') {
      let imageId: number | null = null;
      if (imageFile) {
        // 이미지 업로드 및 URL 저장
        const imageUrl = await uploadImage(imageFile);
        if (!imageUrl) return;

        const id = await saveImageUrl(imageUrl);
        if (id === null) return;

        setImageId(id);
      }

      setStep('job');
    } else if (step === 'job') {
      if (!selectedJob) {
        alert('직업은 필수 선택입니다');
        return;
      }

      const currentStepIndex = steps.indexOf(step);
      const nextStep = steps[currentStepIndex + 1];

      if (nextStep) {
        setStep(nextStep);
      } else {
        await addProfile(
          {
            nickname,
            introduction,
            job: selectedJob,
            purposes: selectedPurposes,
            personalities: selectedPersonalities,
            studySpan: selectedStudySpan,
          },
          imageId,
        );
        router.push('/profile/success');
      }
    } else {
      const currentStepIndex = steps.indexOf(step);
      const nextStep = steps[currentStepIndex + 1];

      if (nextStep) {
        setStep(nextStep);
      } else {
        await addProfile(
          {
            nickname,
            introduction,
            job: selectedJob,
            purposes: selectedPurposes,
            personalities: selectedPersonalities,
            studySpan: selectedStudySpan,
          },
          imageId,
        );
        router.push('/profile/success');
      }
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
    // 프로필을 완성하고 성공 페이지로 이동
    await addProfile(
      {
        nickname,
        introduction,
        job: selectedJob,
        purposes: selectedPurposes,
        personalities: selectedPersonalities,
        studySpan: selectedStudySpan,
      },
      imageId,
    );
    router.push('/profile/success');
  };

  const renderStepContent = () => {
    switch (step) {
      case 'job':
        return (
          <JobStep
            selectedJob={selectedJob}
            handleJobClick={(job) => setSelectedJob(job)}
            userName={userName || ''}
          />
        );
      case 'purpose':
        return (
          <PurposeStep
            selectedPurposes={selectedPurposes}
            handlePurposeClick={(purpose) =>
              setSelectedPurposes((prev) =>
                prev.includes(purpose)
                  ? prev.filter((p) => p !== purpose)
                  : [...prev, purpose],
              )
            }
            userName={userName || ''}
          />
        );
      case 'personality':
        return (
          <PersonalityStep
            selectedPersonalities={selectedPersonalities}
            handlePersonalityClick={(personality) =>
              setSelectedPersonalities((prev) =>
                prev.includes(personality)
                  ? prev.filter((p) => p !== personality)
                  : [...prev, personality],
              )
            }
            userName={userName || ''}
          />
        );
      case 'studySpan':
        return (
          <StudySpanStep
            selectedStudySpan={selectedStudySpan}
            handleStudySpanClick={(studySpan) =>
              setSelectedStudySpan(studySpan)
            }
            userName={userName || ''}
          />
        );
      default:
        return (
          <ProfileForm
            onFileChange={(file) => setImageFile(file)}
            onIntroductionChange={(introduction) =>
              setIntroduction(introduction)
            }
            onNicknameChange={(nickname) => setNickname(nickname)}
          />
        );
    }
  };

  return (
    <>
      <div className="relative mb-20">
        <ProgressBar
          currentStepIndex={steps.indexOf(step)}
          totalSteps={steps.length}
        />

        {!(step === 'initial' || step === 'job') && (
          <button
            onClick={handleSkipClick}
            className="absolute right-0 top-0 mb-8 mr-4 mt-2 text-[#82829B]"
          >
            Skip
          </button>
        )}
      </div>

      <div className="px-4 sm:px-5">{renderStepContent()}</div>

      <div className="fixed bottom-0 left-0 w-full bg-white p-4">
        <div className="mx-auto w-full max-w-[600px]">

          <div className="mb-3 text-xs text-border">

            내용은 다시 수정할 수 있어요!
          </div>
          <div className="flex w-full gap-x-3">
            {step !== 'initial' && (
              <Button
                label="이전"
                size="small"
                borderStyle="w-full min-w-[100px] rounded-[8px] border h-[49px]"
                onClick={handlePreviousClick}
              />
            )}
            <Button
              label={step === 'studySpan' ? '프로필 추가' : '다음'}
              type="primary"

              size="small"

              borderStyle="w-full min-w-[100px] rounded-[8px] h-[49px]"
              onClick={handleNextClick}
            />
          </div>
        </div>
      </div>
    </>
  );
}
