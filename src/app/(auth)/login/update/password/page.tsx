import UpdatePasswordForm from '@/components/updatePasswordPage/UpdatePasswordForm';

export default async function UpdatePassword({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  return (
    <div className="flex flex-col items-center py-20">
      <div className="flex flex-col items-center justify-center gap-1">
        <h2 className="text-2xl font-bold">비밀번호 변경</h2>
        <p className="text-center">변경할 비밀번호를 입력해 주세요.</p>
      </div>
      <UpdatePasswordForm searchParams={searchParams} />
    </div>
  );
}
