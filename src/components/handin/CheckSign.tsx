import CheckIcon from '../icons/CheckIcon'

const CheckSign = ({fill, background, border, size}: {fill: string, background: string, border: string, size:string}) => {

  const getSize = () => {
    switch(size) {
      case 'small': return 'py-[9px] px-[13px]';
      case 'large': return 'py-[30px] px-[24px]';
    }
  }
  
  const getIconSize = () => {
    switch(size) {
      case 'small': return 'w-[26px] h-[33px]';
      case 'large': return 'w-[46px] h-[33px]';
    }
  }
  return (
    <div className='inline-block'>
        <div className={`rounded-full p-[2px] ${border}`}>
            <div className={`rounded-full ${getSize()} ${background}`}>
                <CheckIcon className={`${fill} ${getIconSize()}`}/>
            </div>
        </div>
    </div>
  )
}
export default CheckSign