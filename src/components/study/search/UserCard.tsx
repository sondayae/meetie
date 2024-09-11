import { addFriend } from '@/actions/study/friendActions';
import Button from '@/components/common/Button';
import ProfileAvatar from '@/components/common/ProfileAvatar';
import UserProfileIcon from '@/components/icons/UserProfileIcon';
import { getImgUrl } from '@/utils/supabase/storage';
import { useRouter } from 'next/navigation';

type UserCardProps = {
  // name?: string;
  // nickname?: string;
  // job: string;
  // personality?: string[];
  // imageUrl: string;
  // id: string;
  user: any;
  addFriend: (id: string) => void;
};
export default function UserCard({
  user,
  addFriend,
}: UserCardProps) {

  const router = useRouter();
  const handleViewProfile = () => {
    router.push(`/profile/${user.id}`);
  };

  return (
    <div className="relative flex flex-col items-center rounded-lg border border-[#F6F6F6] bg-white p-4 text-center"
      onClick={handleViewProfile}
    >
      <UserProfileIcon onClick={handleViewProfile} />
      <ProfileAvatar
        src={user.images?.url}
        alt={`${user.name}'s profile`}
        className="mb-3 mt-6 h-[60px] w-[60px] rounded-full"
      />
      <div className="mb-3">
        <h3 className="text-sm font-medium">{user.nickname || user.name}</h3>
        <p className="text-xs font-semibold text-[#82829B]">{user.job}</p>
      </div>

      <p className="mb-4 w-full truncate text-xs">
        {user.personality?.slice(0, 3).join(' · ') || '-'}
      </p>
      {user.friend?.length > 0 ? (
        <button className='w-full rounded-lg border border-primary px-[24px] py-1 text-xs bg-primary text-white' onClick={(e) => {
          e.stopPropagation();
          addFriend(user.id)
        }}>
          친구 추가됨
        </button>
      ) : (
        <button className='w-full rounded-lg border border-primary px-[24px] py-1 text-xs text-primary' onClick={(e) => {
          e.stopPropagation();
          addFriend(user.id)
        }}>
          친구 추가하기 +
        </button>
      )}
    </div>
  );
}
