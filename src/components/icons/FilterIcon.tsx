interface FilterIconProps {
  onClick: () => void;
}

export default function FilterIcon({ onClick }: any) {
  return (
    <>
      <button onClick={onClick} className="ml-4">
        <svg
          width="18"
          height="16"
          viewBox="0 0 18 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.07834 13.5938H0.777344C0.363344 13.5938 0.0273438 13.2578 0.0273438 12.8438C0.0273438 12.4297 0.363344 12.0938 0.777344 12.0938H7.07834C7.49234 12.0938 7.82834 12.4297 7.82834 12.8438C7.82834 13.2578 7.49234 13.5938 7.07834 13.5938"
            fill="#434343"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.1906 3.89844H9.89062C9.47662 3.89844 9.14062 3.56244 9.14062 3.14844C9.14062 2.73444 9.47662 2.39844 9.89062 2.39844H16.1906C16.6046 2.39844 16.9406 2.73444 16.9406 3.14844C16.9406 3.56244 16.6046 3.89844 16.1906 3.89844"
            fill="#434343"
          />
          <mask
            id="mask0_2659_11331"
            style={{ maskType: 'luminance' }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="7"
            height="7"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0 0H6.2258V6.1916H0V0Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_2659_11331)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.113 1.5C2.224 1.5 1.5 2.216 1.5 3.097C1.5 3.977 2.224 4.692 3.113 4.692C4.003 4.692 4.726 3.977 4.726 3.097C4.726 2.216 4.003 1.5 3.113 1.5M3.113 6.192C1.397 6.192 0 4.804 0 3.097C0 1.39 1.397 0 3.113 0C4.83 0 6.226 1.39 6.226 3.097C6.226 4.804 4.83 6.192 3.113 6.192"
              fill="#434343"
            />
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.3874 11.2109C13.4974 11.2109 12.7734 11.9269 12.7734 12.8069C12.7734 13.6879 13.4974 14.4029 14.3874 14.4029C15.2764 14.4029 15.9994 13.6879 15.9994 12.8069C15.9994 11.9269 15.2764 11.2109 14.3874 11.2109M14.3874 15.9029C12.6704 15.9029 11.2734 14.5139 11.2734 12.8069C11.2734 11.0999 12.6704 9.71094 14.3874 9.71094C16.1034 9.71094 17.4994 11.0999 17.4994 12.8069C17.4994 14.5139 16.1034 15.9029 14.3874 15.9029"
            fill="#434343"
          />
        </svg>
      </button>
    </>
  );
}