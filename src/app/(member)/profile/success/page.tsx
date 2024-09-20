'use client';
import Button from '@/components/common/Button';
import FireWork from '@/components/common/Firework';
import SuccessShadow from '@/components/icons/SuccessShadow';
import SucessCrown from '@/components/icons/SucessCrown';
import { useUser } from '@/stores/user/user';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserProfileData {
  job: string;
  personality: string[];
  imageUrl: string;
}

export default function ProfileSuccess() {
  const [animate, _] = useState(true); // Set to true to ensure immediate effect

  const [profile, setProfile] = useState<UserProfileData | null>(null);

  const { user } = useUser();
  console.log(user);

  const userName = user?.user_metadata.name;

  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile/');
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setProfile(data); // data에서 이미지 URL 추출
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleGoProfile = () => {
    router.push('/profile');
  };

  return (
    <div className="mx-auto flex h-screen w-full max-w-[600px] flex-col items-center">
      {/* Header and Description */}
      <div className="mb-20 mt-[100px] w-full px-4 text-left">
        <h1 className="text-2xl font-bold">
          {`${userName}님의`} <br />
          공개 프로필이 생성되었어요 🎉
        </h1>
        <p className="mt-2 text-gray-600">
          나와 딱 맞는 스터디를 찾으러 떠나볼까요?
        </p>
      </div>

      {/* Card */}
      <div className="relative h-[260px] w-[180px]">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-[#B8B9FF] to-[#7273FF]"></div>
        <div className="relative h-full w-full">
          <FireWork />
          <div
            className={`absolute inset-0 rounded-xl bg-white p-4 shadow-lg transition-transform ${
              animate ? 'animate-moveCard opacity-80' : 'opacity-90'
            }`}
          >
            <div className="flex h-full flex-col items-center">
              <SucessCrown avatarSrc={profile?.imageUrl} />
              <div className="mt-4 text-center">
                <p className="text-sm font-bold">{userName}</p>
                <p className="mb-[15px] text-[10px] font-semibold">
                  {profile?.job}
                </p>
                <p className="text-xs text-[#393953]">
                  {profile?.personality.slice(0, 5).join(' · ') || '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessShadow />

      {/* Button */}
      <div className="fixed bottom-0 w-full max-w-[600px] px-4 pb-8">
        <div className="mx-auto max-w-[600px]">
          <Button
            label="확인하러 가기"
            type="primary"
            size="medium"
            onClick={handleGoProfile}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes moveCard {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(10px) rotate(3deg);
          }
        }
        .animate-moveCard {
          animation: moveCard 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
