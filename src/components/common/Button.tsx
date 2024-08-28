interface ButtonProps {
  label: string;
  type?: string;
  size?: 'small' | 'medium' | 'large';
  borderColor?: string;
  borderStyle?: string;
  onClick?: () => void;
}

const Button = ({
  type,
  label,
  size,
  borderColor = 'border-middle-gray',
  borderStyle = 'none',
  onClick,
}: ButtonProps) => {
  const getSize = () => {
    switch (size) {
      case 'small':
        return 'w-[120px]';
      case 'medium':
        return 'w-[200px]';
      case 'large':
        return 'min-w-[340px] w-full';
    }
  };

  const getColor = () => {
    switch (type) {
      case 'primary':
        return 'bg-main-purple border-main-purple text-white';
      case 'secondary':
        return 'border-main-purple text-main-purple';
      default:
        return 'border-middle-gray text-gray-purple';
    }
  };

  return (
    <button
      className={`rounded-lg border-2 p-3 ${getSize()} ${getColor()} ${borderStyle}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
export default Button;
