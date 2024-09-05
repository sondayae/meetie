import { Icon } from '@/types/icon';

const StudyIcon = (props: Icon) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 16"
      fill="none"
      {...props}
    >
      <path d="M10.1641.5H1.83073C.914063.5.164062 1.25.164062 2.16667V15.5L5.9974 13l5.8333 2.5V2.16667C11.8307 1.25 11.0807.5 10.1641.5Zm0 12.5-4.1667-1.8167L1.83073 13V2.16667h8.33337V13Z" />
    </svg>
  );
};

export default StudyIcon;
