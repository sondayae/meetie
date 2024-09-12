import supabase from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';

export default function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push('/');
    } else {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <>
      <Button label="로그아웃" type="secondary" onClick={handleLogout}></Button>
    </>
  );
}
