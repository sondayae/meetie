import ProfileAvatar from '../common/ProfileAvatar';
import UserProfileIcon from '../icons/UserProfileIcon';

interface Friend {
  name: string;
  job: string;
  personality: string[];
  images?: {
    url: string;
  };
  nickname?: string;
}

export default function FriendCard(friend: Friend) {
  console.log(friend);
  return (
    <div className="h-56 w-40 rounded-lg border border-[#f6f6f6] bg-white shadow">
      <div
        className="relative flex cursor-pointer flex-col items-center rounded-lg border border-[#F6F6F6] bg-white p-4 text-center"
        // onClick={handleViewProfile}
      >
        <UserProfileIcon />
        <ProfileAvatar
          src={friend.images?.url}
          alt={`${friend.name}'s profile`}
          className="mb-3 mt-6 h-[60px] w-[60px] rounded-full"
        />
        <div className="mb-3">
          <h3 className="text-sm font-medium">{`${friend.nickname ? friend.nickname : friend.name} `}</h3>
          <p className="text-xs font-semibold text-[#82829B]">{friend.job}</p>
        </div>

        <p className="truncate whitespace-nowrap text-center w-full text-xs font-normal leading-none text-[#000417]">
          {friend.personality?.join('·')}
        </p>
      </div>
    </div>
  );
}
