import { Icon } from '../../types/icon';

function CheckIcon(props: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="800"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        // stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 12.6111 8.92308 17.5 20 6.5"
      />
    </svg>
  );
}

export default CheckIcon;
