import FindPasswordForm from '@/components/findPasswordPage/FindPasswordForm';

export default async function FindPassword() {
  return (
    <div className="flex flex-col items-center py-20">
      <div className="flex flex-col items-center justify-center gap-1">
        <h2 className="text-2xl font-bold">비밀번호 찾기</h2>
        <p className="text-center">
          가입한 이메일을 입력해 주세요.
          <br />
          이메일을 통해 비밀번호 변경 링크가 전송됩니다
        </p>
      </div>
      <FindPasswordForm />
    </div>
  );
}
