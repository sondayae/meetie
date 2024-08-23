import GithubIcon from '@/components/icons/GithubIcon';
import GoogleIcon from '@/components/icons/GoogleIcon';
import KakaoIcon from '@/components/icons/KakaoIcon';

function SocialButtons() {
  return (
    <div className="flex justify-center gap-6">
      <GithubIcon width={46} height={46} />
      <KakaoIcon width={46} height={46} />
      <GoogleIcon width={46} height={46} />
    </div>
  );
}
export default SocialButtons;
