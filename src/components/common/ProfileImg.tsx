import Image from 'next/image';

function ProfileImg(img: string) {
  return (
    <div className="aspect-square overflow-hidden rounded-full border-2 border-middle-gray">
      <Image src={img} alt="profileImg" className="w-full" />
    </div>
  );
}
export default ProfileImg;
