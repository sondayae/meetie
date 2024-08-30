import LeftArrowIcon from '../icons/LeftArrowIcon';

type HeaderType = {
  label?: string;
  rightIcon?: string;
};

function Header({ label, rightIcon }: HeaderType) {
  const handleClick = () => {
    window.history.back();
  };

  return (
    <div className='flex justify-between py-[40px]'>
      <div
        onClick={() => {handleClick}}
        className='hover:cursor-pointer'
      >
        <LeftArrowIcon className='h-5 w-5' />
      </div>
      <span>{label}</span>
      <span>{rightIcon || ''}</span>
    </div>
  );
}
export default Header;
