type SpinnerProps = {
  className?: string;
};

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
    >
      <circle cx="75" cy="50" r="6.39718" fill="#F2EFFF">
        <animate
          attributeName="r"
          begin="-0.875s"
          dur="1s"
          repeatCount="indefinite"
          values="4.8;4.8;8;4.8;4.8"
        />
        <animate
          attributeName="fill"
          values="#F2EFFF;#D9CEFF;#A78DFF;#F2EFFF"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="67.678" cy="67.678" r="4.8" fill="#E6DEFF">
        <animate
          attributeName="r"
          begin="-0.75s"
          dur="1s"
          repeatCount="indefinite"
          values="4.8;4.8;8;4.8;4.8"
        />
        <animate
          attributeName="fill"
          values="#E6DEFF;#CDBEFF;#9B7DFF;#E6DEFF"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="50" cy="75" r="4.8" fill="#D9CEFF">
        <animate
          attributeName="r"
          begin="-0.625s"
          dur="1s"
          repeatCount="indefinite"
          values="4.8;4.8;8;4.8;4.8"
        />
        <animate
          attributeName="fill"
          values="#D9CEFF;#B59EFF;#A78DFF;#D9CEFF"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="32.322" cy="67.678" r="4.8" fill="#CDBEFF">
        <animate
          attributeName="r"
          begin="-0.5s"
          dur="1s"
          repeatCount="indefinite"
          values="4.8;4.8;8;4.8;4.8"
        />
        <animate
          attributeName="fill"
          values="#CDBEFF;#A78DFF;#9B7DFF;#CDBEFF"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="25" cy="50" r="4.8" fill="#C0AEFF">
        <animate
          attributeName="r"
          begin="-0.375s"
          dur="1s"
          repeatCount="indefinite"
          values="4.8;4.8;8;4.8;4.8"
        />
        <animate
          attributeName="fill"
          values="#C0AEFF;#9B7DFF;#F2EFFF;#C0AEFF"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="32.322" cy="32.322" r="4.80282" fill="#B59EFF">
        <animate
          attributeName="r"
          begin="-0.25s"
          dur="1s"
          repeatCount="indefinite"
          values="4.8;4.8;8;4.8;4.8"
        />
        <animate
          attributeName="fill"
          values="#B59EFF;#A78DFF;#9B7DFF;#B59EFF"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="50" cy="25" r="6.40282" fill="#A78DFF">
        <animate
          attributeName="r"
          begin="-0.125s"
          dur="1s"
          repeatCount="indefinite"
          values="4.8;4.8;8;4.8;4.8"
        />
        <animate
          attributeName="fill"
          values="#A78DFF;#9B7DFF;#CDBEFF;#A78DFF"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="67.678" cy="32.322" r="7.99718" fill="#9B7DFF">
        <animate
          attributeName="r"
          begin="0s"
          dur="1s"
          repeatCount="indefinite"
          values="4.8;4.8;8;4.8;4.8"
        />
        <animate
          attributeName="fill"
          values="#9B7DFF;#F2EFFF;#A78DFF;#9B7DFF"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
};
