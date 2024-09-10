import { Icon } from '@/types/icon';

const HomeIcon = (props: Icon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeWidth="2"
        d="M5.83203 11.668v10.5c0 .6443.52234 1.1666 1.16667 1.1666h14c.6443 0 1.1667-.5223 1.1667-1.1666v-10.5"
      />
      <path
        strokeLinecap="round"
        strokeWidth="2"
        d="M24.5 12.8352 14.3582 4.9471c-.2107-.16384-.5057-.16384-.7164 0L3.5 12.8352"
      />
    </svg>
  );
};

export default HomeIcon;
