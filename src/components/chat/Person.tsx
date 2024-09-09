import ProfileAvatar from '../common/ProfileAvatar';

export default function Person({name, onlinedAt, onClick}: {name: string, onlinedAt: string, onClick?: () => void}) {
  return <div className='flex border p-4 gap-4 bg-white' onClick={onClick}>
    <ProfileAvatar />
    <div className='flex-grow'>
      <p>{name}</p>
      <p>{onlinedAt}</p>
    </div>
  </div>
}
