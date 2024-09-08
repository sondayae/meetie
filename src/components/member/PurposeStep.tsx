import Chip from '@/components/html/Chip';
import { purposes } from '@/lib/profileConstants';

interface PurposeStepProps {
  selectedPurposes: string[];
  handlePurposeClick: (purpose: string) => void;
  userName: string;
}

const PurposeStep: React.FC<PurposeStepProps> = ({
  selectedPurposes,
  handlePurposeClick,
  userName,
}) => {
  return (
    <div>
      <div className="mb-5 text-2xl font-semibold">
        {userName}님의
        <br />
        스터디 목적은 무엇인가요?
      </div>
      <div className="mb-[60px] text-[14px] text-[#82829B]">
        중복선택도 가능해요
      </div>
      <div className="mb-[138px] flex flex-col items-start gap-y-3">
        {purposes.map((purpose) => (
          <Chip
            key={purpose}
            label={purpose}
            selected={selectedPurposes.includes(purpose)}
            onClick={() => handlePurposeClick(purpose)}
          />
        ))}
      </div>
    </div>
  );
};

export default PurposeStep;
