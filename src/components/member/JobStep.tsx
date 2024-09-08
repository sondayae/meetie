import DeveloperIcon from '../icons/DeveloperIcon';
import DesignIcon from '../icons/DesignIcon';
import ManagerIcon from '../icons/ManagerIcon';
import { useUser } from '@/stores/user/user';

interface JobStepProps {
  selectedJob: string;
  handleJobClick: (job: string) => void;
  userName: string;
}

const jobs = [
  { id: 1, label: '개발자', icon: <DeveloperIcon /> },
  { id: 2, label: '디자이너', icon: <DesignIcon /> },
  { id: 3, label: '기획자', icon: <ManagerIcon /> },
];

const JobStep: React.FC<JobStepProps> = ({
  selectedJob,
  handleJobClick,
  userName,
}) => {
  return (
    <div>
      <div className="mb-5 text-2xl font-semibold">
        {userName}님이 관심있는
        <br />
        직무는 무엇인가요?
      </div>
      <div className="mb-[60px] text-[14px] text-[#82829B]">
        선택한 직무를 바탕으로 스터디를 추천해줄게요!
      </div>
      <div className="mb-[138px] flex flex-wrap gap-2">
        {jobs.map((job) => (
          <div
            key={job.id}
            className={`flex h-[120px] w-full max-w-[calc(33.333%_-_0.5rem)] flex-1 cursor-pointer flex-col items-center rounded-lg p-[26px] text-center transition duration-300 ${
              selectedJob === job.label
                ? 'border border-primary bg-[#EFE9FF]'
                : 'border border-[#D9D9D9] bg-[#F5F5F5]'
            }`}
            onClick={() => handleJobClick(job.label)}
          >
            <div className="mb-[20px] flex h-[60px] w-[60px] items-center justify-center">
              {job.icon}
            </div>
            <div className="text-xs">{job.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobStep;
