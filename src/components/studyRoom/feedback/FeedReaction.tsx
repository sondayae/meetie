'use client';

import Separator from '@/components/common/Separator';
import AddReaction from '@/components/icons/AddReaction';
import useEmojiPicker from '@/hooks/use-emoji-picker';

export default function ({reactionLength, commentLength}: {reactionLength: number|undefined, commentLength: number|undefined}) {
  const { open, close, EmojiPicker } = useEmojiPicker();
  const handleSelect = (e: any) => {
    console.log(e);
    close();
  }
  return (
    <div className='p-4 flex flex-col gap-4 border-y'>
      <div className='flex items-center font-semibold text-sm gap-1'>
        <span>표정</span>
        <span>{reactionLength ? reactionLength : 0}</span>
        <Separator type='circle'/>
        <span>댓글</span>
        <span>{commentLength ? commentLength : 0}</span>
      </div>
      <div className='flex items-center gap-2'>
        <span className='w-10 h-10 p-2 bg-muted border rounded-full flex items-center justify-center' onClick={() => open()}>
          <AddReaction className='w-5 h-5 fill-[#504F50]'/>
        </span>
      </div>
      <EmojiPicker handleSelect={handleSelect}/>
  </div>
  )
}