import Chip from '@/components/html/Chip';
import { studySpans } from '@/lib/profileConstants';

interface StudySpanStepProps {
  selectedStudySpan: string;
  handleStudySpanClick: (studySpan: string) => void;
  userName: string;
}

const StudySpanStep: React.FC<StudySpanStepProps> = ({
  selectedStudySpan,
  handleStudySpanClick,
  userName,
}) => {
  return (
    <div>
      <div className="mb-5 text-2xl font-semibold">
        {userName}님의
        <br />
        예상 스터디 기간은 얼마인가요?
      </div>
      <div className="mb-[60px] text-[14px] text-[#82829B]">
        나와 비슷한 유저들과 스터디할 수 있도록 도와드려요!
      </div>
      <div className="mb-[138px] flex flex-col items-start gap-y-3">
        {studySpans.map((studySpan) => (
          <Chip
            key={studySpan}
            label={studySpan}
            selected={selectedStudySpan === studySpan}
            onClick={() => handleStudySpanClick(studySpan)}
          />
        ))}
      </div>
    </div>
  );
};

export default StudySpanStep;
