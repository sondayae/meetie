import ProfileAvatar from '@/components/common/ProfileAvatar';

type UserCardProps = {
  name?: string;
  nickname?: string;
  job: string;
  personality?: string[];
  imageUrl: string;
};
export default function UserCard({
  name,
  job,
  imageUrl,
  nickname,
  personality,
}: UserCardProps) {
  return (
    <div className="flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-md">
      <ProfileAvatar
        src={imageUrl}
        alt={`${name}'s profile`}
        className="mb-3 h-[60px] w-[60px] rounded-full"
      />
      <div className="mb-3">
        <h3 className="text-sm font-medium">{nickname || name}</h3>
        <p className="text-xs font-semibold text-[#82829B]">{job}</p>
      </div>

      <p className="mb-4 w-full truncate text-xs">
        {personality?.slice(0, 3).join(' · ') || '-'}
      </p>

      <button className="w-[137px] rounded-lg border border-primary px-[29.5px] py-1 text-xs text-primary">
        친구 추가하기 +
      </button>
    </div>
  );
}
