import iconStyle from './iconStyle';

const EmailIcon = (props: iconStyle) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 7.00005 10.2 11.65c1.0667.8 2.5333.8 3.6 0L20 7"
      />
      <rect
        width="18"
        height="14"
        x="3"
        y="5"
        strokeLinecap="round"
        strokeWidth="2"
        rx="2"
      />
    </svg>
  );
};

export default EmailIcon;
