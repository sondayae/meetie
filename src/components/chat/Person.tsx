import ProfileAvatar from '../common/ProfileAvatar';

export default function Person({id, onlinedAt, onClick, isActive}) {
  return <div className='flex' onClick={onClick}>
    <ProfileAvatar />
    <div>
      <p>{id}</p>
      <p>{onlinedAt}</p>
      <p>{isActive}</p>
    </div>
  </div>
}
