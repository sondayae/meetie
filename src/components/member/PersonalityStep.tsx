import Chip from '@/components/html/Chip';
import { personalities } from '@/lib/profileConstants';

interface PersonalityStepProps {
  selectedPersonalities: string[];
  handlePersonalityClick: (personality: string) => void;
  userName: string;
}

const PersonalityStep: React.FC<PersonalityStepProps> = ({
  selectedPersonalities,
  handlePersonalityClick,
  userName,
}) => {
  return (
    <div>
      <div className="mb-5 text-2xl font-semibold">
        {userName}님은
        <br />
        어떤 스타일이신가요?
      </div>
      <div className="mb-[60px] text-[14px]">중복선택도 가능해요</div>
      {/* Chip들이 가로로 정렬되도록 flex-wrap 속성을 추가 */}
      <div className="mb-[138px] flex flex-wrap gap-3">
        {personalities.map((personality) => (
          <Chip
            key={personality}
            label={personality}
            selected={selectedPersonalities.includes(personality)}
            onClick={() => handlePersonalityClick(personality)}
          />
        ))}
      </div>
    </div>
  );
};

export default PersonalityStep;
