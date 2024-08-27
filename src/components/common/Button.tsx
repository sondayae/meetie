interface ButtonProps {
  label: string,
  type?: string,
  size?: 'small' | 'medium' | 'large',
  borderColor?: string,
  borderStyle?: string,
}

const Button = ({type, label, size, borderColor='border-middle-gray', borderStyle='none'}: ButtonProps) => {
  const getSize = () => {
    switch(size) {
      case 'small': return 'w-[120px]';
      case 'medium': return 'w-[200px]';
      case 'large': return 'min-w-[340px] w-full';
    }
  }

  const getColor = () => {
    switch(type) {
      case 'primary': return 'bg-main-purple border-main-purple text-white';
      case 'secondary': return 'border-main-purple text-main-purple';
      default: return 'border-middle-gray text-gray-purple';
    }
  }

  return (
    <button className={`border-2 rounded-lg p-3 ${getSize()} ${getColor()} ${borderStyle}`}>{label}</button>
  )
}
export default Button;