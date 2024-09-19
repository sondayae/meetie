type StudyButtonProps = {
  style?: 'primary' | 'secondary' | 'disabled';
  type?: 'button' | 'submit';
  label?: string;
  size?: string;
  borderStyle?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  id?: string;
  buttonStyle?: string;
};

export default function StudyButton({
  style,
  type = 'button',
  label,
  size,
  borderStyle,
  onClick,
  children,
  disabled,
  id,
  buttonStyle,
  ...props
}: StudyButtonProps) {
  const getSize = () => {
    switch (size) {
      case 'small':
        return ' flex-[1]';
      case 'medium':
        return ' flex-[1.66]';
      case 'large':
        return 'w-full  max-w-[600px]';
    }
  };

  const getColor = () => {
    switch (style) {
      case 'primary':
        return 'border-primary text-white bg-primary text-center transition-all hover:bg-secondary ';
      case 'secondary':
        return 'border-primary text-primary';
      case 'disabled':
        return 'bg-disabled text-white';
      default:
        return 'border-border text-muted-foreground';
    }
  };

  return (
    <>
      <button
        id={id}
        type={type}
        className={`h-[50px] rounded-lg border ${getSize()} ${getColor()} ${borderStyle} ${buttonStyle}`}
        onClick={onClick}
        disabled={disabled}
        {...props}
      >
        {label}
        {children}
      </button>
    </>
  );
}
