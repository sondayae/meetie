import Image from 'next/image';

export default function WavingHand() {
  const handImg = 'https://wyzkmcctbltzehszxyvt.supabase.co/storage/v1/object/public/admin/assets/waving-hand-blue.png';
  return (
  <>
  <Image 
    width={80} 
    height={80} 
    src={handImg}
    alt='손 흔드는 이미지'
    className='animate-wavingHand origin-[70%_70%]'/>
  </>
  )
}