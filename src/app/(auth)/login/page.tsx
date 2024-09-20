import WavingHand from '@/components/common/WavingHand';
import AccountRecoveryLinks from '@/components/loginPage/AccountRecoveryLinks';
import LoginForm from '@/components/loginPage/LoginForm';
import SocialButtons from '@/components/loginPage/SocialButtons';

export default function Login() {
  return (
    <div className="flex-1 p-4 bg-gradient-custom">
      <div className="mt-[74px]">
        <div className="mb-5 flex flex-col gap-3">
          <WavingHand />
          <p className="text-[26px] font-semibold leading-8">
            반가워요! <br />
            밋티에 오신 것을 환영해요
          </p>
        </div>
        <div>
          <LoginForm />
        </div>
        <div className="mt-8 flex flex-col gap-6">
          <div className="flex items-center justify-center">
            <span className="w-full border-t border-border"></span>
            <span className="px-3 text-xs font-medium text-disabled">OR</span>
            <span className="w-full border-t border-border"></span>
          </div>
          <div className="flex justify-center gap-6">
            <SocialButtons />
          </div>
          <div className="mt-10">
            <AccountRecoveryLinks />
          </div>
        </div>
      </div>
    </div>
  );
}
