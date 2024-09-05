import iconStyle from './iconStyle';

const HomeIcon = (props: iconStyle) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M0 0h24v24H0z" stroke="none" />
        <path
          strokeLinecap="round"
          strokeWidth="2"
          d="M5 10v9c0 .5523.44772 1 1 1h12c.5523 0 1-.4477 1-1v-9"
        />
        <path
          strokeLinecap="round"
          strokeWidth="2"
          d="m21 11-8.693-6.76125c-.1806-.14043-.4334-.14043-.614 0L3 11"
        />
      </g>
    </svg>
  );
};

export default HomeIcon;
