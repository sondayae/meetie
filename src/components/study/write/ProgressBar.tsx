// "use client"
import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

type ProgressBarProps = {
  value?: number;
};

export default function ProgressBar({ value }: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(30), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Progress
      value={value !== undefined ? value : progress}
      className="w-full"
    />
  );
}
