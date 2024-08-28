interface ButtonProps {
  label: string,
  type?: 'primary' | 'secondary' | 'disabled',
  size?: 'small' | 'medium' | 'large',
  borderStyle?: string,
  onClick: () => void;
}

const Button = ({type, label, size, borderStyle='none', onClick}: ButtonProps) => {
  const getSize = () => {
    switch(size) {
      case 'small': return 'min-w-[124px] w-full';
      case 'medium': return 'min-w-[254px] w-full';
      case 'large': return 'min-w-[340px] w-full';
      default: return 'min-w-[250px] w-full'
    }
  }

  const getColor = () => {
    switch(type) {
      case 'primary': return 'bg-main-purple border-main-purple text-white';
      case 'secondary': return 'border-main-purple text-main-purple';
      case 'disabled': return 'bg-disabled border-disabled text-white';
      default: return 'border-middle-gray text-gray-purple';
    }
  };

  return (
    <button className={`rounded-lg border-2 p-3 ${getSize()} ${getColor()} ${borderStyle}`} onClick={() => onClick()}>
      {label}
    </button>
  );
};
export default Button;
