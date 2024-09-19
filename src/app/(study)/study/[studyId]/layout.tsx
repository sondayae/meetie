import { incView } from '@/actions/study/increseView';

export default async function StudyDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { studyId: string };
}) {
  await incView({ studyId: params.studyId });
  return <>{children}</>;
}
