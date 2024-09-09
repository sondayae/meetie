import React from 'react';
import { Progress } from '../ui/progress';

type TProgressBarProps = {
  currentStepIndex: number;
  totalSteps: number;
};

const ProgressBar: React.FC<TProgressBarProps> = ({
  currentStepIndex,
  totalSteps,
}) => {
  const progressValue = ((currentStepIndex + 1) / totalSteps) * 100;

  return (
    <div className="w-full">
      <Progress value={progressValue} className="mb-4" />
    </div>
  );
};

export default ProgressBar;
