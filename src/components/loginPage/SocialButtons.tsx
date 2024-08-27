'use client';

import { Provider } from '@supabase/supabase-js';

import SOCIAL_ICONS from '@/constants/socialIcons';
import supabase from '@/utils/supabase/client';

function SocialButtons() {
  const signInWithSocial = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `http://localhost:3000/api/auth/callback` },
    });
  };

  return (
    <div className="flex justify-center gap-6">
      {SOCIAL_ICONS.map((social) => (
        <button
          className={`flex h-11 w-11 items-center justify-center rounded shadow ${social.bgColor}`}
          key={social.name}
          type="button"
          aria-label={social.name}
          onClick={() => signInWithSocial(social.name as Provider)}
        >
          <social.icon />
        </button>
      ))}
    </div>
  );
}
export default SocialButtons;
