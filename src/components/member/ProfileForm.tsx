import { useRef, useState } from 'react';
import ProfileAvatar from '../common/ProfileAvatar';
import { useUser } from '@/stores/user/user';
import My from '../icons/Navigator/My';
import { EditIcon } from 'lucide-react';

interface ProfileFormProps {
  onFileChange: (file: File | null) => void;
  onNicknameChange: (nickname: string) => void;
  onIntroductionChange: (introduction: string) => void;
}

export default function ProfileForm({
  onFileChange,
  onNicknameChange,
  onIntroductionChange,
}: ProfileFormProps) {
  const user = useUser();
  const userName = user.user?.user_metadata.name;
  console.log(user);

  const [nickname, setNickname] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    onNicknameChange(e.target.value);
  };

  const handleIntroductionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setIntroduction(e.target.value);
    onIntroductionChange(e.target.value);
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        onFileChange(file);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImage(null);
      onFileChange(null);
    }
  };

  return (
    <>
      <div>
        <div className="mb-5 text-2xl font-semibold leading-9">
          {`${userName}님의 `} <br />
          프로필을 작성해주세요!
        </div>
        <div className="mb-[60px] text-[14px] text-[#82829B]">
          작성하신 내용은 공개 프로필에 사용됩니다.
        </div>
      </div>

      <div className="mb-[138px] flex flex-col items-center">
        <div className={'relative'}>
          <ProfileAvatar
            src={profileImage || undefined}
            alt="Profile"
            onClick={handleAvatarClick}
            className="mb-8 h-24 w-24 cursor-pointer"
            fallback={<My className="h-12 w-12" />}
          />
          <EditIcon className="absolute bottom-9 right-[-6px] mr-[10px] rounded-lg bg-border p-1" />
        </div>
        {/* 숨겨진 파일 입력 요소 */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
        <form className="w-full space-y-3">
          <div className="mb-[34px]">
            <label
              htmlFor="nickname"
              className="mb-[10px] block text-base font-semibold"
            >
              닉네임
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              placeholder="닉네임을 입력해주세요"
              onChange={handleNicknameChange}
              className="w-full flex-initial truncate rounded-lg border bg-white py-[14px] pl-4 pr-14 outline-none transition-all focus:border-primary"
            />
          </div>
          <div className="">
            <label
              htmlFor="introduction"
              className="mb-[10px] block text-base font-semibold"
            >
              자기 소개
            </label>
            <textarea
              id="introduction"
              value={introduction}
              placeholder="자신을 나타낼 수 있는 소개글을 작성해주세요"
              onChange={handleIntroductionChange}
              className="min-h-36 w-full flex-initial resize-none truncate rounded-lg border bg-white py-[14px] pl-4 pr-14 outline-none transition-all focus:border-primary"
            />
          </div>
        </form>
      </div>
    </>
  );
}
