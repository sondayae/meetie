import { Icon } from '@/types/icon';

const ScrapIcon = (props: Icon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 15 15"
      {...props}
    >
      <path d="M1.5 3H0v10.5c0 .825.675 1.5 1.5 1.5H12v-1.5H1.5V3Zm12-3h-9C3.675 0 3 .675 3 1.5v9c0 .825.675 1.5 1.5 1.5h9c.825 0 1.5-.675 1.5-1.5v-9c0-.825-.675-1.5-1.5-1.5Zm0 10.5h-9v-9h9v9ZM6 5.25h6v1.5H6v-1.5ZM6 7.5h3V9H6V7.5ZM6 3h6v1.5H6V3Z" />
    </svg>
  );
};

export default ScrapIcon;
