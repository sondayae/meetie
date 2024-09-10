import { Icon } from '@/types/icon';

export default function PlusIcon({ className }: Icon) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.83342 8.66667H0.83342V7H6.83342V0.83342H8.5V7H14.5V8.66667H8.5V14.6667H6.83342V8.66667Z"
        fill="#A9A9A9"
        className={className}
      />
    </svg>
  );
}
