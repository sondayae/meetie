import { ComponentType } from 'react';

import { Provider } from '@supabase/supabase-js';

import GithubIcon from '@/components/icons/GithubIcon';
import GoogleIcon from '@/components/icons/GoogleIcon';
import KakaoIcon from '@/components/icons/KakaoIcon';

interface SocialIcon {
  name: Provider;
  icon: ComponentType;
}

const SOCIAL_ICONS: SocialIcon[] = [
  { name: 'github', icon: GithubIcon },
  { name: 'kakao', icon: KakaoIcon },
  { name: 'google', icon: GoogleIcon },
];

export default SOCIAL_ICONS;
