import { twMerge } from 'tailwind-merge';

export default function Message({isMine, message}: {isMine: boolean, message: string}) {
  return (
    <span className={twMerge('border p-2 w-fit rounded-lg mb-2 text-sm', isMine ? 'bg-white self-end' : 'bg-accent self-start')}>{message}</span>
  )
}