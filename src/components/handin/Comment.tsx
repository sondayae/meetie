import ProfileImg from '../common/ProfileImg'
import MoreCircles from './MoreCircles';

const Comment = ({ data }:any) => {
  console.log(data);
  
  return (
    <div className='grid grid-rows-[2fr_1fr] grid-cols-[1fr_3fr_1fr] bg-[#fdfdfd] border-t border-b border-[#efefef] gap-x-2'>
        <div className=''>
            <ProfileImg />
        </div>
        <div>
            <p>{data.userName}</p>
            <p>{data.comment}</p>
            <p>{data.date}</p>
        </div>
        <div className='justify-self-end'>
          <MoreCircles />
        </div>
        <div className='col-start-2'>
            이모지 영역
        </div>
    </div>
  )
}
export default Comment