import Navigator from '@/components/common/Navigator'
import Header from '@/components/handin/Header'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <>
    <div className='flex flex-col h-full'>
        <div className='flex-grow'>{children}</div>
    </div>
    </>
  )
}