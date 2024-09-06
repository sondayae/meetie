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
    <div>
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
        <div className="relative">
          <FireWork />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold">
            {`${userName}님의`} <br />
            공개 프로필이 생성되었어요 🎉
          </h1>
          <p className="mt-2 text-gray-600">
            나와 딱 맞는 스터디를 찾으러 떠나볼까요?
          </p>
        </div>

        <div className="relative mt-10 h-[300px] w-[200px]">
          {/* Back Card */}
          <div className="absolute inset-0 h-full rounded-xl bg-gradient-to-tr from-[#B8B9FF] to-[#7273FF]"></div>

          {/* Front Card */}
          <div
            className={`absolute inset-0 rounded-xl bg-white p-6 shadow-lg transition-transform ${
              animate ? 'animate-moveCard opacity-80' : 'opacity-90'
            } h-full`}
          >
            <div className="flex h-full flex-col items-center justify-center pb-10">
              <SucessCrown avatarSrc={profile?.imageUrl} />

              <div className="mt-6">
                <p className="mt-4 text-center text-sm font-bold">{userName}</p>
                <p className="text-center text-[10px] text-gray-700">
                  {profile?.job}
                </p>
                <p className="mt-2 text-center text-xs text-gray-500">
                  {profile?.personality.join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <SuccessShadow />

        {/* Button */}
        <div className="relative mt-10">
          <Button
            label="확인하러 가기"
            type="primary"
            size="large"
            onClick={handleGoProfile}
          />
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
    </div>
  );
}
