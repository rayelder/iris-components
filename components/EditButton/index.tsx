import styles from "./EditButton.module.css";

export default function EditButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      className={styles.base}
      type="button"
      onClick={onClick}
      aria-label="Edit information"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <g clipPath="url(#clip0_4_1779)">
          <path
            d="M5 19L17.59 6.41C17.9625 6.03528 18.1716 5.52837 18.1716 5C18.1716 4.47163 17.9625 3.96473 17.59 3.59L16.41 2.41C16.0353 2.0375 15.5284 1.82841 15 1.82841C14.4716 1.82841 13.9647 2.0375 13.59 2.41L1 15V19H5Z"
            stroke="#0066BE"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M1 16V19H4L1 16Z" fill="#0066BE" />
          <path
            d="M12 4L16 8"
            stroke="#0066BE"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_4_1779">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </button>
  );
}
