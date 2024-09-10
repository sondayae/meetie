import WavingHand from '@/components/common/WavingHand';
import AccountRecoveryLinks from '@/components/loginPage/AccountRecoveryLinks';
import LoginForm from '@/components/loginPage/LoginForm';
import SocialButtons from '@/components/loginPage/SocialButtons';

export default function Login() {
  return (
    <div className='flex-1 p-4 bg-gradient-custom'>
      <div className="mt-20">
        <div className="flex flex-col gap-3 mb-5">
          <WavingHand />
          <p className="font-semibold text-2xl">
            반가워요! <br />
            밋티에 오신 것을 환영해요
          </p>
        </div>
        <div>
          <LoginForm />
        </div>
        <div className='flex flex-col mt-10 gap-6'>
          <div className='flex items-center justify-center'>
            <span className='border-t border-border w-full'></span>
            <span className='px-3 text-xs text-disabled font-medium'>OR</span>
            <span className='border-t border-border w-full'></span>
          </div>
          <div className="flex justify-center gap-6">
            <SocialButtons />
          </div>
          <div className='mt-10'>
            <AccountRecoveryLinks />
          </div>
        </div>
        </div>
    </div>
  );
}
