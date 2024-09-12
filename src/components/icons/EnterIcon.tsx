import { Icon } from '../../types/icon';

function EnterIcon(props: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        stroke="#a9a9a9"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 7v1.2c0 1.68016 0 2.5202-.327 3.162-.2876.5645-.7465 1.0234-1.311 1.311C17.7202 13 16.8802 13 15.2 13H4m0 0 4-4m-4 4 4 4"
      />
    </svg>
  );
}

export default EnterIcon;
