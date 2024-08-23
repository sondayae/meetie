interface ButtonProps {
  label: string,
  primary: boolean,
  size?: 'small' | 'medium' | 'large',
  borderStyle: string,
}

const Button = ({primary, label, size, borderStyle}: ButtonProps) => {
  const getSize = () => {
    switch(size) {
      case 'small': return 'w-[120px]';
      case 'medium': return 'w-[200px]';
      case 'large': return 'w-[350px]';
    }
  }

  const color = primary ? 'bg-main-purple border-main-purple text-white' : '';

  return (
    <button className={`border-2 border-middle-gray rounded-lg p-3 ${getSize()} ${color} ${borderStyle} text-gray-purple`}>{label}</button>
  )
}
export default Button;