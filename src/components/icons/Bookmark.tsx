export default function BookmarkIcon({ fill }: { fill: string }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 3H0V13.5C0 14.325 0.675 15 1.5 15H12V13.5H1.5V3ZM13.5 0H4.5C3.675 0 3 0.675 3 1.5V10.5C3 11.325 3.675 12 4.5 12H13.5C14.325 12 15 11.325 15 10.5V1.5C15 0.675 14.325 0 13.5 0ZM13.5 10.5H4.5V1.5H13.5V10.5ZM6 5.25H12V6.75H6V5.25ZM6 7.5H9V9H6V7.5ZM6 3H12V4.5H6V3Z"
        fill={fill}
      />
    </svg>
  );
}
