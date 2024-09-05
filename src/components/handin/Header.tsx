import BackArrowIcon from '../icons/BackArrowIcon';

type HeaderType = {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

function Header({ label, leftIcon, rightIcon }: HeaderType) {
  const px = leftIcon && rightIcon ? 'px-2' : 'px-4';
  return (
    <div className='py-2 border-b'>
    <div className={`border-[#E6E6E6] flex items-center justify-between h-[40px] ${px}`}>
      {leftIcon &&
        <span className='hover:cursor-pointer w-[40px] h-[40px]'>
          <BackArrowIcon />
        </span>
      }
      <span className='text-lg font-bold text-center'>{label}</span>
      {rightIcon &&
        <span className='hover:cursor-pointer w-[40px] h-[40px]'>
          {rightIcon}
        </span>
      }
    </div>
    </div>
  );
}
export default Header;
