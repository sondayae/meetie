import {
  jobs,
  purposes,
  personalities,
  studySpans,
} from '@/lib/profileConstants';
import { useUser } from '@/stores/user/user';

type TStepConfig = {
  title: string;
  description: string;
  options: string[];
  selectedOptions: string | string[];
  handleClick: (option: string) => void;
};

export const createStepsConfig = (
  selectedJob: string,
  selectedPurposes: string[],
  selectedPersonalities: string[],
  selectedStudySpan: string,
  handleJobClick: (job: string) => void,
  handlePurposeClick: (purpose: string) => void,
  handlePersonalityClick: (personality: string) => void,
  handleStudySpanClick: (studySpan: string) => void,
): Record<string, TStepConfig> => {
  const user = useUser();
  const userName = user.user?.user_metadata.name;

  return {
    job: {
      title: `${userName}님이 관심있는\n직무는 무엇인가요?`,
      description: '선택한 직무를 바탕으로 스터디를 추천해줄게요!',
      options: jobs,
      selectedOptions: selectedJob,
      handleClick: handleJobClick,
    },
    purpose: {
      title: `${userName}님의\n스터디 목적은 무엇인가요?`,
      description: '중복선택도 가능해요',
      options: purposes,
      selectedOptions: selectedPurposes,
      handleClick: handlePurposeClick,
    },
    personality: {
      title: `${userName}님은\n어떤 스타일이신가요?`,
      description: '중복선택도 가능해요',
      options: personalities,
      selectedOptions: selectedPersonalities,
      handleClick: handlePersonalityClick,
    },
    studySpan: {
      title: `${userName}님의\n예상 스터디 기간은 얼마인가요?`,
      description: '나와 비슷한 유저들과 스터디할 수 있도록 도와드려요!',
      options: studySpans,
      selectedOptions: selectedStudySpan,
      handleClick: handleStudySpanClick,
    },
  };
};
