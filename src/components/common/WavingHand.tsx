import { Icon } from '@/types/icon';
import Image from 'next/image';

export default function WavingHand(props: Icon) {
  const handImg =
    'https://wyzkmcctbltzehszxyvt.supabase.co/storage/v1/object/public/admin/assets/waving-hand.png';
  return (
    <Image
      width={80}
      height={80}
      src={handImg}
      alt="손 흔드는 이미지"
      className={`origin-[70%_70%] animate-wavingHand ${props.className}`}
      priority
    />
  );
}
