type CheckSignProps = {
  sizeClassName?: string;
  circleClassName: string;
  checkClassName: string;
};

export default function NewCheckSignIcon({
  sizeClassName,
  circleClassName,
  checkClassName,
}: CheckSignProps) {
  return (
    <svg
      width="27"
      height="28"
      viewBox="0 0 27 28"
      xmlns="http://www.w3.org/2000/svg"
      className={sizeClassName}
    >
      <path
        d="M26.5 14.2493C26.5 21.4681 20.6774 27.3159 13.5 27.3159C6.32261 27.3159 0.5 21.4681 0.5 14.2493C0.5 7.03053 6.32261 1.18274 13.5 1.18274C20.6774 1.18274 26.5 7.03053 26.5 14.2493Z"
        className={circleClassName}
      />
      <path
        d="M20.0791 9.6762C20.2357 9.83096 20.3236 10.0407 20.3236 10.2595C20.3236 10.4782 20.2357 10.688 20.0791 10.8427L11.9978 18.8213C11.841 18.9759 11.6285 19.0627 11.407 19.0627C11.1854 19.0627 10.973 18.9759 10.8162 18.8213L7.19353 15.2447C7.04568 15.0883 6.96513 14.8813 6.96887 14.6674C6.97262 14.4534 7.06036 14.2493 7.21359 14.098C7.36684 13.9467 7.5736 13.8601 7.79028 13.8564C8.00696 13.8527 8.21663 13.9322 8.37508 14.0782L11.407 17.0715L18.8975 9.6762C19.0543 9.52163 19.2668 9.43481 19.4883 9.43481C19.7099 9.43481 19.9223 9.52163 20.0791 9.6762Z"
        className={checkClassName}
      />
    </svg>
  );
}
