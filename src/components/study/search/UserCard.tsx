import ProfileAvatar from '@/components/common/ProfileAvatar';
import UserProfileIcon from '@/components/icons/UserProfileIcon';
import { useRouter } from 'next/navigation';

type UserCardProps = {
  name?: string;
  nickname?: string;
  job: string;
  personality?: string[];
  imageUrl: string;
  id: string;
};
export default function UserCard({
  name,
  job,
  imageUrl,
  nickname,
  personality,
  id,
}: UserCardProps) {
  const router = useRouter();

  const handleViewProfile = () => {
    router.push(`/profile/${id}`);
  };

  return (
    <div
      className="relative flex flex-col items-center rounded-lg border border-[#F6F6F6] bg-white p-4 text-center"
      onClick={handleViewProfile}
    >
      <UserProfileIcon onClick={handleViewProfile} />
      <ProfileAvatar
        src={imageUrl}
        alt={`${name}'s profile`}
        className="mb-3 mt-6 h-[60px] w-[60px] rounded-full"
      />
      <div className="mb-3">
        <h3 className="text-sm font-medium">{nickname || name}</h3>
        <p className="text-xs font-semibold text-[#82829B]">{job}</p>
      </div>

      <p className="mb-4 w-full truncate text-xs">
        {personality?.slice(0, 3).join(' · ') || '-'}
      </p>

      <button
        className="w-full rounded-lg border border-primary px-[24px] py-1 text-xs text-primary"
        onClick={(e) => {
          e.stopPropagation(); // 부모 요소의 클릭 이벤트가 발생하지 않도록 전파 중단
          // 친구 추가 로직 추가
        }}
      >
        친구 추가하기 +
      </button>
    </div>
  );
}
