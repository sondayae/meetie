import ProfileAvatar from '../common/ProfileAvatar';
import TimeAgo from 'javascript-time-ago';
import ko from 'javascript-time-ago/locale/ko';

TimeAgo.setDefaultLocale(ko.locale)
TimeAgo.addLocale(ko)
const timeAgo = new TimeAgo('ko-KR');

export default function Person({name, onlinedAt, onClick}: {name: string, onlinedAt: string, onClick?: () => void}) {

  return (
    <div className='flex border p-4 gap-2 bg-white hover:bg-muted hover:delay-55' onClick={onClick}>
      <ProfileAvatar />
      <div className='flex-grow'>
        <p className='font-bold text-sm'>{name}</p>
        {onlinedAt ?
          <p className='text-xs text-muted-foreground'>timeAgo.format(Date.parse(onlinedAt))</p>
          : <p className='text-xs text-muted-foreground'>접속일자 없음</p>
        }
      </div>
    </div>
  )
}
