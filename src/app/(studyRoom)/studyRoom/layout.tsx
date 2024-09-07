import Navigator from '@/components/common/Navigator'
import Header from '@/components/handin/Header'

export default function layout({children}: {children: React.ReactNode}) {
  return (
    <div className='grid grid-rows-[1fr_60px] h-full'>
        {children}
    </div>
  )
}