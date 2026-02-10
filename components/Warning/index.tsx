import DismissButton from "../DismissButton";
import styles from "./Warning.module.css";

interface WarningProps {
  message: string;
  handleDismiss: (value: boolean) => void;
}

export default function Warning({ message, handleDismiss }: WarningProps) {
  return (
    <div className={styles.base}>
      <div className={styles.iconAndMessage}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2592_254)">
            <path
              d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
              fill="#D9230C"
            />
            <path
              d="M8.39223 5.96116C8.18932 4.94659 8.96533 4 10 4C11.0347 4 11.8107 4.94659 11.6078 5.96116L10.5981 11.0097C10.541 11.2948 10.2907 11.5 10 11.5C9.70927 11.5 9.45896 11.2948 9.40194 11.0097L8.39223 5.96116Z"
              fill="#FFFAF8"
            />
            <path
              d="M8.5 14.5C8.5 13.6716 9.17157 13 10 13V13C10.8284 13 11.5 13.6716 11.5 14.5V14.5C11.5 15.3284 10.8284 16 10 16V16C9.17157 16 8.5 15.3284 8.5 14.5V14.5Z"
              fill="#FFFAF8"
            />
          </g>
          <defs>
            <clipPath id="clip0_2592_254">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>

        {message}
      </div>
      <DismissButton handleDismiss={handleDismiss} />
    </div>
  );
}
