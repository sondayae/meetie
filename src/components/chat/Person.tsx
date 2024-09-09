import ProfileAvatar from '../common/ProfileAvatar';
import TimeAgo from 'javascript-time-ago';
import ko from 'javascript-time-ago/locale/ko';

TimeAgo.addDefaultLocale(ko);
const timeAgo = new TimeAgo('ko-KR');

export default function Person({name, onlinedAt, onClick}: {name: string, onlinedAt: string, onClick?: () => void}) {

  return (
    <div className='flex border p-4 gap-4 bg-white' onClick={onClick}>
      <ProfileAvatar />
      <div className='flex-grow'>
        <p>{name}</p>
        <p>{onlinedAt && timeAgo.format(Date.parse(onlinedAt))}</p>
      </div>
    </div>
  )
}
