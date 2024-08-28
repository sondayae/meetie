interface ButtonProps {
  label: string,
  type?: 'primary' | 'secondary' | 'disabled',
  size?: 'small' | 'medium' | 'large',
  borderStyle?: string,
}

const Button = ({type, label, size, borderStyle='none'}: ButtonProps) => {
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
  }

  return (
    <button className={`border-2 rounded-lg p-3 ${getSize()} ${getColor()} ${borderStyle}`}>{label}</button>
  )
}
export default Button;