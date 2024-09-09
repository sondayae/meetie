import { Icon } from '@/types/icon';

export default function WritingIcon(props: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="61"
      height="61"
      fill="none"
      {...props}
    >
      <g filter="url(#a)">
        <g filter="url(#b)">
          <circle cx="30.5" cy="29.5" r="24.5" fill="url(#c)" />
        </g>
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeWidth="1.8"
          d="M31 38h8"
        />
        <path
          stroke="#fff"
          strokeWidth="1.8"
          d="M30.9062 19.8008 20.0674 30.1683c-.2793.2672-.4525.6265-.4874 1.0114l-.4069 4.4754c-.0852.937.6526 1.7449 1.5934 1.7449h4.4522c.4126 0 .8092-.1594 1.1071-.4448l11.2555-10.7865c.6692-.6414.6551-1.7155-.0308-2.3391l-4.4621-4.0564c-.6218-.5653-1.5749-.5532-2.1822.0276Z"
        />
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeWidth="1.8"
          d="M28.5 23.5 34 29"
        />
      </g>
      <defs>
        <filter
          id="a"
          width="61"
          height="61"
          x="0"
          y="0"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix values="0 0 0 0 0.744753 0 0 0 0 0.744306 0 0 0 0 0.766667 0 0 0 1 0" />
          <feBlend
            in2="BackgroundImageFix"
            result="effect1_dropShadow_2227_5834"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_dropShadow_2227_5834"
            result="shape"
          />
        </filter>
        <filter
          id="b"
          width="57"
          height="57"
          x="2"
          y="1"
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="2" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_2227_5834"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect1_backgroundBlur_2227_5834"
            result="shape"
          />
        </filter>
        <linearGradient
          id="c"
          x1="90.5"
          x2="16"
          y1="91"
          y2="29"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8655FF" stopOpacity=".12" />
          <stop offset="1" stopColor="#8655FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
