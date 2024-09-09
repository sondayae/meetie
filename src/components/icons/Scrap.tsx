export default function ScrapIcon({
  fill,
  stroke,
  className,
}: {
  fill?: string;
  stroke?: string;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="25"
      fill="none"
      className={className}
    >
      <path
        fill={fill}
        stroke={stroke}
        strokeWidth={2}
        d="m19 21.5-7-5-7 5v-16c0-.53043.21071-1.03914.58579-1.41421C5.96086 3.71071 6.46957 3.5 7 3.5h10c.5304 0 1.0391.21071 1.4142.58579C18.7893 4.46086 19 4.96957 19 5.5v16Z"
      />
    </svg>
  );
}
