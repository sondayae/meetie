import { Icon } from '@/types/icon';

const DownArrowIcon = (props: Icon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      //   width="16"
      //   height="16"
      fill="none"
      {...props}
    >
      <path
        fill="#61646B"
        d="M2.97848 5.31442c.17751-.17752.45528-.19365.65103-.04842l.05607.04842L7.9987 9.6273l4.3131-4.31288c.1775-.17752.4553-.19365.651-.04842l.0561.04842c.1775.17751.1937.45528.0484.65102l-.0484.05608-4.66665 4.66668c-.17751.1775-.45529.1936-.65103.0484l-.05608-.0484-4.66666-4.66668c-.19526-.19526-.19526-.51184 0-.7071Z"
      />
    </svg>
  );
};

export default DownArrowIcon;