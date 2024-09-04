import CircleIcon from '../icons/CircleIcon';

export default function Separator({type}: {type?: string}) {
  return (
    <span id='separator' className='mx-[2px]'>
      {type === 'bar' ? '|' : <CircleIcon />}
    </span>
    )
}