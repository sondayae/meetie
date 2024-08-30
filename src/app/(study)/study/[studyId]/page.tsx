import StudyDetail from '@/components/study/StudyDetail';
import StatusDisplay from '@/components/study/StatusDisplay';
import { Suspense } from 'react';

export default async function Page({
  params,
}: {
  params: { studyId: string };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(
    new URL(`/api/study/${params.studyId}`, baseUrl).toString(),
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Error occurred while updating profile');
  }

  return (
    <div className="flex flex-col">
      <StudyDetail {...data} />
      <div className='flex-1'>
      <StatusDisplay />
      </div>
    </div>
  );
}
